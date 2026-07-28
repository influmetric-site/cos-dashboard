/**
 * INFLUMETRIC COS® - KULLANICI & NİŞ VERİ YAPILANDIRMASI
 * 
 * Bu dosya, platformdaki tüm kullanıcıların (Influmetric & Demo) ve alt sayfaların 
 * (/cos, /metrik, /buyume, /performans, /strateji, /raporlar, /trend-sensoru, /pazar-analizi)
 * içeriklerini, sayılarını, metinlerini ve kartlarını yönetir.
 */

export interface UserNicheProfile {
  username: string
  email: string
  niche_name: string
  role: string
  categories: {
    analytics: {
      title: string
      score_title: string
      score_value: number
      scanned_profiles: string
      processed_data_points: string
      kpi_metrics: Array<{ label: string; value: string; change: string }>
      chart_data: Array<{ name: string; value: number }>
    }
    growth_strategy: {
      title: string
      subtitle: string
      net_reach: string
      boost_note: string
      strategies: Array<{
        id: number | string
        title: string
        impact_score: number
        result: string
        status: string
      }>
    }
    content_ideas: {
      title: string
      weekly_focus: string
      ideas: Array<{
        title: string
        format: string
        estimated_views: string
        tags: string[]
      }>
      brand_cards?: Array<{
        marka: string
        odak: string
        beklenti: string
        renk?: string
        anlasmalar: Array<{ model: string; kriter: string; kazanc: string; metrik: string }>
      }>
    }
    custom_notes: {
      title: string
      consultant_note: string
      action_checklist: Array<{ task: string; done: boolean }>
      quick_links: Array<{ label: string; url: string }>
    }
  }
}

export const USER_PROFILES_DATA: Record<string, UserNicheProfile> = {
  // 1. INFLUMETRIC HESABI - TEKNOLOJİ & YAZILIM İNCELEMELERİ NİŞİ
  "batur.guzey@gmail.com": {
    username: "Influmetric",
    email: "batur.guzey@gmail.com",
    niche_name: "Teknoloji & Yapay Zeka İncelemeleri",
    role: "admin",
    categories: {
      analytics: {
        title: "Teknoloji & Yapay Zeka Performans Paneli",
        score_title: "Teknoloji Etkileşim Skoru",
        score_value: 96.8,
        scanned_profiles: "2,150+ Teknoloji & Donanım Profili",
        processed_data_points: "1.4M+ Veri Noktası",
        kpi_metrics: [
          { label: "Teknoloji İzlenmesi", value: "4.8M", change: "+42%" },
          { label: "Kitle Bağlılığı", value: "94.2%", change: "+18%" },
          { label: "Affiliate & Dönüşüm", value: "%24.5", change: "+32%" }
        ],
        chart_data: [
          { name: "Pzt", value: 85 }, { name: "Sal", value: 120 },
          { name: "Çar", value: 165 }, { name: "Per", value: 210 },
          { name: "Cum", value: 290 }, { name: "Cmt", value: 380 },
          { name: "Paz", value: 450 }
        ]
      },
      growth_strategy: {
        title: "Teknoloji & Donanım Büyüme Stratejileri",
        subtitle: "Apple, Nvidia, AI araçları ve yazılım odağında performans",
        net_reach: "4.8M",
        boost_note: "Influmetric COS® sistemi, yapay zeka araçları ve donanım inceleme nişinizde %96 uyumlu büyüme ivmesi saptadı. Yazılım incelemelerindeki izlenme süresi rekor seviyede.",
        strategies: [
          { id: 1, title: "3 Saniyelik Donanım Makro Çekim Kurgusu", impact_score: 97.5, result: "Erişimde %55 Sıçrama", status: "Uygulandı" },
          { id: 2, title: "Çapraz Yazılım Sponsorluk & Affiliate Entegrasyonu", impact_score: 94.2, result: "ROAS %40 Artış", status: "Devam Ediyor" },
          { id: 3, title: "Haftalık AI Araçları & Donanım Canlı Testi", impact_score: 91.0, result: "Sadakatte %30 Artış", status: "Planlandı" }
        ]
      },
      content_ideas: {
        title: "Teknoloji & AI Viral İçerik Fikirleri",
        weekly_focus: "Bu Hafta Odak: AI Araçları & Donanım Benchmark Testleri",
        ideas: [
          { title: "2026'da Asla Almamanız Gereken 3 Teknoloji Ürünü", format: "Shorts / Reels", estimated_views: "850K - 1.5M", tags: ["#tekno", "#benchmark", "#ai"] },
          { title: "Benim 2026 AI & Geliştirici Masa Kurulumum (Desk Setup)", format: "Main Video", estimated_views: "450K - 800K", tags: ["#setup", "#productivity"] }
        ],
        brand_cards: [
          {
            marka: "Nvidia / Apple",
            odak: "Yapay Zeka & Donanım",
            beklenti: "GPU Performans Testleri ve Benchmark Analizleri",
            renk: "from-[#3B82F6]/10 to-transparent",
            anlasmalar: [
              { model: "YouTube Donanım İncelemesi", kriter: "100B+ İzlenme", kazanc: "₺85.000+", metrik: "Dönüşüm: %14.2" },
              { model: "Reels Benchmark Geçişi", kriter: "200B+ İzlenme", kazanc: "₺40.000+", metrik: "Kaydetme: Çok Yüksek" }
            ]
          },
          {
            marka: "Samsung / Asus ROG",
            odak: "Mobil & Oyun Sistemleri",
            beklenti: "Ekran Teknolojisi ve İşlemci Yük Testi",
            renk: "from-purple-500/10 to-transparent",
            anlasmalar: [
              { model: "Kutu Açılımı + Oyun Testi", kriter: "150B+ İzlenme", kazanc: "₺95.000+", metrik: "Premium Algı" },
              { model: "Story Set (Linkli)", kriter: "40B+ Tıklama", kazanc: "%15 Pay", metrik: "Sepet Ort: ₺18.500" }
            ]
          },
          {
            marka: "Logitech / Keychron",
            odak: "Yazılımcı & Üretkenlik Kurulumu",
            beklenti: "Ergonomi ve Geliştirici İş Akışı",
            renk: "from-emerald-500/10 to-transparent",
            anlasmalar: [
              { model: "Masa Kurulumu (Setup) Videosu", kriter: "80B+ İzlenme", kazanc: "₺45.000+", metrik: "Ekipman Dönüşümü" },
              { model: "Kombin Setup Reels", kriter: "250B+ İzlenme", kazanc: "₺30.000+", metrik: "Marka Otoritesi" }
            ]
          }
        ]
      },
      custom_notes: {
        title: "Teknoloji Danışmanı Notları & Aksiyonlar",
        consultant_note: "Teknoloji Danışmanı Notu: Yazılım incelemelerindeki kalıcılık (dwell time) son 3 rapordur rekor seviyede. Donanım inceleme kitini güncelleyin.",
        action_checklist: [
          { task: "Nvidia & Apple İnceleme Kiti Hazırla", done: true },
          { task: "Affiliate Bağlantılarını Güncelle", done: true },
          { task: "Yazılım Sponsorluk Teklifini Onayla", done: false }
        ],
        quick_links: [
          { label: "Donanım Medya Kiti PDF", url: "#" },
          { label: "Affiliate Performans Raporu", url: "#" }
        ]
      }
    }
  },

  // 2. DEMO HESABI - MODA & LÜKS LIFESTYLE NİŞİ
  "batur.steam@gmail.com": {
    username: "Demo",
    email: "batur.steam@gmail.com",
    niche_name: "Moda & Lüks Lifestyle",
    role: "client",
    categories: {
      analytics: {
        title: "Moda & Lifestyle Performans Paneli",
        score_title: "Moda Etkileşim Skoru",
        score_value: 95.8,
        scanned_profiles: "1,450+ Analiz Edilen Profil",
        processed_data_points: "920K+ Veri Seti",
        kpi_metrics: [
          { label: "Toplam İzlenme", value: "2.4M", change: "+34%" },
          { label: "Kitle Bağlılığı", value: "92.4%", change: "+14%" },
          { label: "Sponsor Dönüşüm", value: "%19.5", change: "+28%" }
        ],
        chart_data: [
          { name: "Pzt", value: 55 }, { name: "Sal", value: 80 },
          { name: "Çar", value: 110 }, { name: "Per", value: 145 },
          { name: "Cum", value: 190 }, { name: "Cmt", value: 240 },
          { name: "Paz", value: 295 }
        ]
      },
      growth_strategy: {
        title: "Moda & Lifestyle Büyüme Stratejileri",
        subtitle: "Sephora, Dyson & Zara sponsorlukları odağında performans",
        net_reach: "2.4M",
        boost_note: "Influmetric COS® sistemi, 'Sürdürülebilir Lifestyle ve Vlog' segmentinizde yüksek bir etkileşim boşluğu saptadı. Kitle analizi verilerine göre %94 uyum ile ivme yakalayabilirsiniz.",
        strategies: [
          { id: 1, title: "Yüksek Tempolu 'GRWM' Optimizasyonu", impact_score: 96.5, result: "Erişimde %45 Sıçrama", status: "Uygulandı" },
          { id: 2, title: "Günlük 'This or That' Stil Serisi", impact_score: 92.8, result: "ROAS %32 Artış", status: "Devam Ediyor" },
          { id: 3, title: "Soft-Minimalist Renk Paleti & Estetik Edit", impact_score: 89.2, result: "Sadakatte %25 Artış", status: "Planlandı" }
        ]
      },
      content_ideas: {
        title: "Moda & Lifestyle Viral İçerik Fikirleri",
        weekly_focus: "Bu Hafta Odak: Yüksek Etkileşimli GRWM & Haul Konseptleri",
        ideas: [
          { title: "Sektörde En Çok Yapılan 3 Stil Hatası", format: "Shorts / Reels", estimated_views: "450K - 750K", tags: ["#fashion", "#style", "#grwm"] },
          { title: "1 Günde Üretici Rutinim & Favori Ürünlerim", format: "Main Video", estimated_views: "250K - 400K", tags: ["#vlog", "#routine"] }
        ],
        brand_cards: [
          {
            marka: "Sephora / L'Oréal",
            odak: "Güzellik & Cilt Bakımı",
            beklenti: "Ürün dokusu ve uygulama kalitesi odaklı",
            renk: "from-pink-500/10 to-transparent",
            anlasmalar: [
              { model: "YouTube Makyaj Rutini", kriter: "75B+ İzlenme", kazanc: "₺55.000+", metrik: "Dönüşüm: %19.5" },
              { model: "Reels / TikTok Geçiş", kriter: "150B+ İzlenme", kazanc: "₺25.000+", metrik: "Kaydetme: Yüksek" }
            ]
          },
          {
            marka: "Dyson Hair",
            odak: "Premium Lifestyle",
            beklenti: "Estetik görünüm ve teknolojik vurgu",
            renk: "from-purple-500/10 to-transparent",
            anlasmalar: [
              { model: "Unboxing + GRWM", kriter: "100B+ İzlenme", kazanc: "₺70.000+", metrik: "Premium Algı" },
              { model: "Story Set (Linkli)", kriter: "30B+ Tıklama", kazanc: "%12 Pay", metrik: "Sepet Ort: ₺8.500" }
            ]
          },
          {
            marka: "Trendyol / Zara",
            odak: "Moda & Giyim",
            beklenti: "Günlük stil ve erişilebilir şıklık",
            renk: "from-orange-500/10 to-transparent",
            anlasmalar: [
              { model: "Aylık 'Haul' Videosu", kriter: "50B+ İzlenme", kazanc: "₺35.000+", metrik: "Hızlı Tüketim" },
              { model: "Kombin / Lookbook", kriter: "200B+ İzlenme", kazanc: "₺20.000+", metrik: "Marka Bilinirliği" }
            ]
          }
        ]
      },
      custom_notes: {
        title: "Moda Danışmanı Notları & Aksiyonlar",
        consultant_note: "Danışman Özel Notu: İzleyici sadakati ve etkileşim katsayılarınız başarıyla güncellendi. Sephora ve Dyson iş birlikleri devrede.",
        action_checklist: [
          { task: "Sephora Medya Kitini İncele", done: true },
          { task: "Haftalık İçerik Takvimini Onayla", done: false },
          { task: "Zara Haul Videosunu Planla", done: true }
        ],
        quick_links: [
          { label: "Moda Medya Kiti PDF", url: "#" },
          { label: "Canlı Trend Raporu", url: "#" }
        ]
      }
    }
  }
}

/**
 * Kullanıcı e-postasına göre niş profil verilerini getiren yardımcı fonksiyon
 */
export function getProfileDataByEmail(email?: string | null) {
  if (!email) return USER_PROFILES_DATA["batur.steam@gmail.com"] // Varsayılan Demo
  
  const cleanEmail = email.toLowerCase().trim()
  if (USER_PROFILES_DATA[cleanEmail]) {
    return USER_PROFILES_DATA[cleanEmail]
  }

  // E-posta eşleşmezse kullanıcı adına göre eşleştir
  if (cleanEmail.includes("guzey") || cleanEmail.includes("influmetric")) {
    return USER_PROFILES_DATA["batur.guzey@gmail.com"]
  }

  return USER_PROFILES_DATA["batur.steam@gmail.com"]
}
