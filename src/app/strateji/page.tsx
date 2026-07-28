import { getUserCategoriesData } from "@/utils/supabase/get-user-categories"
import { StrategyPage } from "@/components/pages/strategy-page"

export const dynamic = "force-dynamic"

export default async function StratejiPage() {
  const { categoryMap } = await getUserCategoriesData()
  return <StrategyPage categoryMap={categoryMap} />
}
