import { getUserCategoriesData } from "@/utils/supabase/get-user-categories"
import { MarketAnalysisPage } from "@/components/pages/market-analysis-page"

export const dynamic = "force-dynamic"

export default async function PazarAnaliziPage() {
  const { categoryMap } = await getUserCategoriesData()
  return <MarketAnalysisPage categoryMap={categoryMap} />
}
