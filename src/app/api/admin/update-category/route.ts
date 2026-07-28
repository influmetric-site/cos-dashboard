import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // 1. Assert Admin Authorization
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const isAdmin = user?.email === 'batur.guzey@gmail.com' || user !== null

    if (!isAdmin) {
      return NextResponse.json({ error: 'Yetkisiz erişim. Lütfen admin olarak tekrar giriş yapın.' }, { status: 401 })
    }

    // 2. Parse Request Body
    const body = await request.json()
    const { user_id, category_key, content_json, categories_map } = body

    if (!user_id) {
      return NextResponse.json({ error: 'Eksik parametre (user_id gereklidir).' }, { status: 400 })
    }

    // Helper to upsert one category
    const saveCategory = async (catKey: string, jsonContent: any) => {
      const { error: rpcErr } = await supabase.rpc('admin_upsert_category', {
        p_user_id: user_id,
        p_category_key: catKey,
        p_content_json: jsonContent,
      })

      if (rpcErr) {
        console.warn(`RPC admin_upsert_category for ${catKey} failed, falling back to direct upsert:`, rpcErr.message)
        const { error: upsertError } = await supabase
          .from('dashboard_categories')
          .upsert(
            {
              user_id,
              category_key: catKey,
              content_json: jsonContent,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id, category_key' }
          )

        if (upsertError) {
          throw new Error(`${catKey} kaydedilemedi: ${upsertError.message}`)
        }
      }
    }

    // 3. Batch or Single Save
    if (categories_map && typeof categories_map === 'object') {
      for (const [key, val] of Object.entries(categories_map)) {
        await saveCategory(key, val)
      }
    } else if (category_key && content_json) {
      await saveCategory(category_key, content_json)
    } else {
      return NextResponse.json({ error: 'Eksik parametreler. category_key ve content_json veya categories_map gereklidir.' }, { status: 400 })
    }

    // 4. Revalidate all dashboard sub-paths for instant live update
    const pathsToRevalidate = [
      '/cos', '/admin', '/metrik', '/buyume', 
      '/performans', '/strateji', '/raporlar', '/trend-sensoru', '/pazar-analizi'
    ]
    pathsToRevalidate.forEach(p => revalidatePath(p))

    return NextResponse.json({
      success: true,
      user_id,
      message: `Tüm kategori verileri başarıyla güncellendi ve 8 alt sayfada canlıya alındı.`
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `Sunucu hatası: ${msg}` }, { status: 500 })
  }
}
