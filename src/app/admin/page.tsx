import { createClient, isSupabaseConfigured } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { MasterAdminStudio } from "@/components/admin/master-admin-studio"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const configured = isSupabaseConfigured()
  const supabase = await createClient()

  if (!configured) {
    redirect("/login")
  }

  // 1. Authenticate & Verify Admin Role
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()

  const isAdmin = currentProfile?.role === "admin" || user.email === "batur.guzey@gmail.com"

  if (!isAdmin) {
    redirect("/cos")
  }

  // 2. Fetch All Registered Users (RPC SECURITY DEFINER for 100% RLS bypass)
  let users: any[] = []
  const { data: rpcUsers, error: rpcErr } = await supabase.rpc("get_all_profiles_for_admin")

  if (!rpcErr && rpcUsers && rpcUsers.length > 0) {
    users = rpcUsers
  } else {
    const { data: usersData } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })
    users = usersData || []
  }

  // 3. Fetch All Dashboard Categories (RPC SECURITY DEFINER)
  let categoriesData: any[] = []
  const { data: rpcCats, error: catRpcErr } = await supabase.rpc("get_all_categories_for_admin")

  if (!catRpcErr && rpcCats && rpcCats.length > 0) {
    categoriesData = rpcCats
  } else {
    const { data: catData } = await supabase
      .from("dashboard_categories")
      .select("*")
    categoriesData = catData || []
  }

  // Group categories by user_id
  const allCategories: Record<string, Record<string, any>> = {}
  if (categoriesData) {
    categoriesData.forEach((row) => {
      if (!allCategories[row.user_id]) {
        allCategories[row.user_id] = {}
      }
      allCategories[row.user_id][row.category_key] = row.content_json
    })
  }

  return (
    <MasterAdminStudio 
      users={users} 
      allCategories={allCategories} 
    />
  )
}
