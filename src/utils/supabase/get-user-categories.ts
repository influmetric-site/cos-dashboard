import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { getProfileDataByEmail } from "@/data/user-profiles-data"

export async function getUserCategoriesData() {
  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData?.user) {
    redirect("/login")
  }

  const user = authData.user

  // 1. Get Niche Preset Profile Data for the logged-in user
  const presetProfile = getProfileDataByEmail(user.email)
  const categoryMap: Record<string, any> = { ...presetProfile.categories }

  // 2. Fetch any custom DB rows from Supabase
  try {
    const { data: categoriesData } = await supabase
      .from("dashboard_categories")
      .select("*")
      .eq("user_id", user.id)

    if (categoriesData && categoriesData.length > 0) {
      categoriesData.forEach((row) => {
        if (row.content_json && Object.keys(row.content_json).length > 0) {
          categoryMap[row.category_key] = row.content_json
        }
      })
    }
  } catch (err) {
    console.warn("Supabase fetch fallback to preset profiles:", err)
  }

  return { user, categoryMap, presetProfile }
}
