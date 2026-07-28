import { getUserCategoriesData } from "@/utils/supabase/get-user-categories"
import { ReportsPage } from "@/components/pages/reports-page"

export const dynamic = "force-dynamic"

export default async function RaporlarPage() {
  const { categoryMap } = await getUserCategoriesData()
  return <ReportsPage categoryMap={categoryMap} />
}
