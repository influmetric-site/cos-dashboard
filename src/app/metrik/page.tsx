import { getUserCategoriesData } from "@/utils/supabase/get-user-categories"
import { MetricFusionPage } from "@/components/pages/metric-fusion-page"

export const dynamic = "force-dynamic"

export default async function MetrikPage() {
  const { categoryMap } = await getUserCategoriesData()
  return <MetricFusionPage categoryMap={categoryMap} />
}
