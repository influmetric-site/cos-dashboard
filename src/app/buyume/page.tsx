import { getUserCategoriesData } from "@/utils/supabase/get-user-categories"
import { GrowthAnalysisPage } from "@/components/pages/growth-analysis-page"

export const dynamic = "force-dynamic"

export default async function BuyumePage() {
  const { categoryMap } = await getUserCategoriesData()
  return <GrowthAnalysisPage categoryMap={categoryMap} />
}
