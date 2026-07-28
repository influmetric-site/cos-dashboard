import { getUserCategoriesData } from "@/utils/supabase/get-user-categories"
import { TrendSensorPage } from "@/components/pages/trend-sensor-page"

export const dynamic = "force-dynamic"

export default async function TrendSensoruPage() {
  const { categoryMap } = await getUserCategoriesData()
  return <TrendSensorPage categoryMap={categoryMap} />
}
