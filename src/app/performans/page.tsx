import { getUserCategoriesData } from "@/utils/supabase/get-user-categories"
import { PerformancePage } from "@/components/pages/performance-page"

export const dynamic = "force-dynamic"

export default async function PerformansPage() {
  const { categoryMap } = await getUserCategoriesData()
  return <PerformancePage categoryMap={categoryMap} />
}
