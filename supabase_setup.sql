-- ============================================================================
-- INFLUMETRIC COS® - KULLANICI ADI (USERNAME) VE E-POSTA BAĞLANTILI SQL SETUP
-- ============================================================================
-- 1. ADMIN HESABI: Kullanıcı Adı: Influmetric (E-Posta: batur.guzey@gmail.com | Şifre: deneme123)
-- 2. MÜŞTERİ HESABI: Kullanıcı Adı: Demo (E-Posta: batur.steam@gmail.com | Şifre: demo123)
--    (24 Yaşında Oyuncu & Moda Sosyal Medya Fenomeni Persona)
-- ============================================================================

-- 1. EKLENTİLER
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABLOLAR
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  company_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'client', -- 'admin' veya 'client'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Var olan profiles tablosuna username sütununu garanti et
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='username') THEN
    ALTER TABLE public.profiles ADD COLUMN username TEXT UNIQUE;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.dashboard_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category_key TEXT NOT NULL,
  content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_category UNIQUE (user_id, category_key)
);

-- 3. GÜVENLİK VE ADMIN RPC FONKSİYONLARI (RLS Engellerini Aşmak İçin SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin Paneli İçin Tüm Profilleri Getiren Fonksiyon
CREATE OR REPLACE FUNCTION public.get_all_profiles_for_admin()
RETURNS TABLE (
  id UUID,
  email TEXT,
  username TEXT,
  full_name TEXT,
  company_name TEXT,
  avatar_url TEXT,
  role TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.email, p.username, p.full_name, p.company_name, p.avatar_url, p.role, p.created_at, p.updated_at
  FROM public.profiles p
  ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin Paneli İçin Tüm Kategorileri Getiren Fonksiyon
CREATE OR REPLACE FUNCTION public.get_all_categories_for_admin()
RETURNS TABLE (
  id UUID,
  user_id UUID,
  category_key TEXT,
  content_json JSONB,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT c.id, c.user_id, c.category_key, c.content_json, c.created_at, c.updated_at
  FROM public.dashboard_categories c;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin Paneli İçin Kategori Güncelleyen Süper Yetkili RPC Fonksiyonu
CREATE OR REPLACE FUNCTION public.admin_upsert_category(
  p_user_id UUID,
  p_category_key TEXT,
  p_content_json JSONB
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.dashboard_categories (user_id, category_key, content_json, updated_at)
  VALUES (p_user_id, p_category_key, p_content_json, NOW())
  ON CONFLICT (user_id, category_key)
  DO UPDATE SET content_json = EXCLUDED.content_json, updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 4. ROW LEVEL SECURITY (RLS) POLİTİKALARI
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_categories ENABLE ROW LEVEL SECURITY;

-- Profiles RLS
DROP POLICY IF EXISTS "Profiles select policy" ON public.profiles;
CREATE POLICY "Profiles select policy" ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Profiles update policy" ON public.profiles;
CREATE POLICY "Profiles update policy" ON public.profiles FOR UPDATE
  USING (true);

-- Dashboard Categories RLS
DROP POLICY IF EXISTS "Categories select policy" ON public.dashboard_categories;
CREATE POLICY "Categories select policy" ON public.dashboard_categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Categories all policy" ON public.dashboard_categories;
CREATE POLICY "Categories all policy" ON public.dashboard_categories FOR ALL
  USING (true);

-- 5. YENİ KULLANICI OTOMATİK PROFİL SENKRONİZASYON TRIGGERI
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    CASE WHEN NEW.email = 'batur.guzey@gmail.com' THEN 'admin' ELSE 'client' END
  )
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================================
-- 6. HESAP TEMİZLİĞİ VE EKSİKSİZ KULLANICI ADI (USERNAME) BAĞLANTILI HESAPLAR
-- ============================================================================

DELETE FROM auth.users WHERE email IN (
  'batur.guzey@gmail.com',
  'batur.steam@gmail.com',
  'growth@influmetric.com',
  'starter@influmetric.com',
  'boutique@influmetric.com'
);

DELETE FROM public.profiles WHERE email IN (
  'batur.guzey@gmail.com',
  'batur.steam@gmail.com',
  'growth@influmetric.com',
  'starter@influmetric.com',
  'boutique@influmetric.com'
);

DO $$
DECLARE
  admin_id UUID := '11111111-1111-1111-1111-111111111111';
  demo_id UUID  := '44444444-4444-4444-4444-444444444444';
  
  admin_pw TEXT := crypt('deneme123', gen_salt('bf'));
  demo_pw  TEXT := crypt('demo123', gen_salt('bf'));
BEGIN

  -- --------------------------------------------------------------------------
  -- 1. ADMIN HESABI: Influmetric (batur.guzey@gmail.com) -> Şifre: deneme123
  -- --------------------------------------------------------------------------
  INSERT INTO auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at, 
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud,
    confirmation_token, recovery_token, email_change_token_new, email_change
  ) VALUES (
    admin_id, '00000000-0000-0000-0000-000000000000', 'batur.guzey@gmail.com', admin_pw, NOW(), 
    '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Influmetric (Admin)","username":"Influmetric"}'::jsonb, 
    NOW(), NOW(), 'authenticated', 'authenticated', '', '', '', ''
  );

  INSERT INTO auth.identities (
    id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
  ) VALUES (
    admin_id, admin_id, format('{"sub":"%s","email":"%s"}', admin_id, 'batur.guzey@gmail.com')::jsonb, 
    'email', admin_id::text, NOW(), NOW(), NOW()
  );

  INSERT INTO public.profiles (id, email, username, full_name, company_name, role)
  VALUES (admin_id, 'batur.guzey@gmail.com', 'Influmetric', 'Batur Güzey (Admin)', 'INFLUMETRIC Executive', 'admin')
  ON CONFLICT (id) DO UPDATE SET username = EXCLUDED.username, full_name = EXCLUDED.full_name, company_name = EXCLUDED.company_name, role = 'admin';

  -- Admin Categories
  INSERT INTO public.dashboard_categories (user_id, category_key, content_json)
  VALUES (admin_id, 'analytics', '{
    "title": "Kurumsal Admin Analitik Paneli",
    "score_title": "Platform Büyüme Skoru",
    "score_value": 99.2,
    "scanned_profiles": "2,450+ Analiz Edilen Profil",
    "processed_data_points": "1.2M+ Veri Seti",
    "kpi_metrics": [
      {"label": "Toplam Müşteri Erişimi", "value": "12.8M", "change": "+54%"},
      {"label": "AI Dönüşüm Verimliliği", "value": "%96.4", "change": "+22%"},
      {"label": "Sponsorluk ROI", "value": "4.8x", "change": "+38%"}
    ],
    "chart_data": [
      {"name": "Pzt", "value": 120}, {"name": "Sal", "value": 155},
      {"name": "Çar", "value": 190}, {"name": "Per", "value": 240},
      {"name": "Cum", "value": 310}, {"name": "Cmt", "value": 380},
      {"name": "Paz", "value": 450}
    ]
  }'::jsonb) ON CONFLICT (user_id, category_key) DO UPDATE SET content_json = EXCLUDED.content_json;

  INSERT INTO public.dashboard_categories (user_id, category_key, content_json)
  VALUES (admin_id, 'growth_strategy', '{
    "title": "INFLUMETRIC Executive Stratejileri",
    "subtitle": "Platform genelindeki müşteri büyütme ve AI algoritma adımları",
    "strategies": [
      {"id": 1, "title": "Moda & Gaming fenomenleri için çapraz sponsorluk ağı", "impact_score": 99.0, "result": "Gelirde %65 Artış", "status": "Uygulandı"},
      {"id": 2, "title": "Gemini AI ile otomatik niş ve içerik fikir jeneratörü", "impact_score": 97.5, "result": "Verimlilik %80 Artış", "status": "Devam Ediyor"}
    ]
  }'::jsonb) ON CONFLICT (user_id, category_key) DO UPDATE SET content_json = EXCLUDED.content_json;

  INSERT INTO public.dashboard_categories (user_id, category_key, content_json)
  VALUES (admin_id, 'content_ideas', '{
    "title": "Executive AI Trend Sensörü",
    "weekly_focus": "Bu Hafta Odak: Lüks Moda & Gaming Çapraz İçerik Trendleri",
    "ideas": [
      {"title": "Lüks Moda Markaları Gaming Dünyasına Nasıl Girdi?", "format": "YouTube Essay", "estimated_views": "1.2M - 2.5M", "tags": ["#fashion", "#gaming", "#trends"]}
    ]
  }'::jsonb) ON CONFLICT (user_id, category_key) DO UPDATE SET content_json = EXCLUDED.content_json;

  INSERT INTO public.dashboard_categories (user_id, category_key, content_json)
  VALUES (admin_id, 'custom_notes', '{
    "title": "Admin Sistem Notları & Yönetim",
    "consultant_note": "Influmetric Admin Notu: batur.steam@gmail.com (Kullanıcı Adı: Demo) hesabı aktifleştirildi.",
    "action_checklist": [
      {"task": "Demo Müşteri İçeriklerini İncele", "done": true},
      {"task": "AI Niş Jeneratörünü Test Et", "done": true}
    ],
    "quick_links": [
      {"label": "Admin Panel Konsolu", "url": "/admin"}
    ]
  }'::jsonb) ON CONFLICT (user_id, category_key) DO UPDATE SET content_json = EXCLUDED.content_json;


  -- --------------------------------------------------------------------------
  -- 2. DEMO MÜŞTERİ HESABI: Demo (batur.steam@gmail.com) -> Şifre: demo123
  -- Persona: 24 Yaşında Oyuncu & Moda Sosyal Medya Fenomeni
  -- --------------------------------------------------------------------------
  INSERT INTO auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at, 
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud,
    confirmation_token, recovery_token, email_change_token_new, email_change
  ) VALUES (
    demo_id, '00000000-0000-0000-0000-000000000000', 'batur.steam@gmail.com', demo_pw, NOW(), 
    '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Demo (Moda & Gaming Influencer)","username":"Demo"}'::jsonb, 
    NOW(), NOW(), 'authenticated', 'authenticated', '', '', '', ''
  );

  INSERT INTO auth.identities (
    id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
  ) VALUES (
    demo_id, demo_id, format('{"sub":"%s","email":"%s"}', demo_id, 'batur.steam@gmail.com')::jsonb, 
    'email', demo_id::text, NOW(), NOW(), NOW()
  );

  INSERT INTO public.profiles (id, email, username, full_name, company_name, role)
  VALUES (demo_id, 'batur.steam@gmail.com', 'Demo', 'Demo (Moda & Gaming Influencer)', 'Demo Creative & Fashion Studio', 'client')
  ON CONFLICT (id) DO UPDATE SET username = EXCLUDED.username, full_name = EXCLUDED.full_name, company_name = EXCLUDED.company_name, role = 'client';

  -- Demo Customer Category 1: analytics (Moda & Gaming Focus)
  INSERT INTO public.dashboard_categories (user_id, category_key, content_json)
  VALUES (demo_id, 'analytics', '{
    "title": "Moda & Gaming Performans Analitiği",
    "score_title": "Etkileşim & Estetik Skoru",
    "score_value": 96.8,
    "scanned_profiles": "1,650+ Analiz Edilen Profil",
    "processed_data_points": "740K+ Veri Seti",
    "kpi_metrics": [
      {"label": "Moda / GRWM İzlenme", "value": "2.1M", "change": "+45%"},
      {"label": "Gaming Stream Retention", "value": "%92.8", "change": "+18%"},
      {"label": "Kombin Link Tıklama (CTR)", "value": "%24.5", "change": "+32%"}
    ],
    "chart_data": [
      {"name": "Pzt", "value": 75}, {"name": "Sal", "value": 98},
      {"name": "Çar", "value": 130}, {"name": "Per", "value": 175},
      {"name": "Cum", "value": 220}, {"name": "Cmt", "value": 290},
      {"name": "Paz", "value": 340}
    ]
  }'::jsonb) ON CONFLICT (user_id, category_key) DO UPDATE SET content_json = EXCLUDED.content_json;

  -- Demo Customer Category 2: growth_strategy (Fashion & Gaming Sponsorship)
  INSERT INTO public.dashboard_categories (user_id, category_key, content_json)
  VALUES (demo_id, 'growth_strategy', '{
    "title": "Moda & Gaming AI Büyüme Stratejisi",
    "subtitle": "24 Yaş Kadın Oyuncu & Style Creator için Marka Ortaklık Adımları",
    "strategies": [
      {"id": 1, "title": "Twitch yayınlarında lüks makyaj ve kulaklık sponsorluğu entegrasyonu", "impact_score": 97.2, "result": "Sponsorluk ROI %50 Artış", "status": "Uygulandı"},
      {"id": 2, "title": "Instagram GRWM (Get Ready With Me) & Gaming Setup dönüşüm kurgusu", "impact_score": 94.5, "result": "Kitle Bağlılığında Sıçrama", "status": "Devam Ediyor"},
      {"id": 3, "title": "Haftalık kapsül gardırop ve e-spor canlı yayın serisi", "impact_score": 91.0, "result": "Takipçi Artışı %35", "status": "Planlandı"}
    ]
  }'::jsonb) ON CONFLICT (user_id, category_key) DO UPDATE SET content_json = EXCLUDED.content_json;

  -- Demo Customer Category 3: content_ideas (Fashion & Gaming Viral Ideas)
  INSERT INTO public.dashboard_categories (user_id, category_key, content_json)
  VALUES (demo_id, 'content_ideas', '{
    "title": "Viral Moda & Gaming İçerik Konseptleri",
    "weekly_focus": "Bu Hafta Odak: Pembe Setup Turu & Şık Gece Kombinleri",
    "ideas": [
      {"title": "1 Günde Oyun Rutinim & 2026 Favori Makyaj Ürünlerim", "format": "Shorts / Reels", "estimated_views": "650K - 950K", "tags": ["#fashion", "#gaming", "#grwm", "#vlog"]},
      {"title": "Oyuncu Koltuğumda 3 Farklı Stil Kombini (Get Ready With Me)", "format": "TikTok / Reels", "estimated_views": "400K - 700K", "tags": ["#ootd", "#gamergirl", "#style"]}
    ]
  }'::jsonb) ON CONFLICT (user_id, category_key) DO UPDATE SET content_json = EXCLUDED.content_json;

  -- Demo Customer Category 4: custom_notes (Personalized Consultant Notes)
  INSERT INTO public.dashboard_categories (user_id, category_key, content_json)
  VALUES (demo_id, 'custom_notes', '{
    "title": "Demo Studio Danışman Notları & Aksiyonlar",
    "consultant_note": "Demo Hanım, bu haftaki kozmetik ve gaming kulaklık sponsorluk medya kitiniz güncellendi.",
    "action_checklist": [
      {"task": "Gaming Kulaklık Sponsorluk Sözleşmesini Onayla", "done": true},
      {"task": "Yeni Sezon Moda Kombin Fotoğraflarını Yükle", "done": true},
      {"task": "Haftalık Twitch & Reels Yayın Takvimini Doğrula", "done": false}
    ],
    "quick_links": [
      {"label": "Moda & Gaming Medya Kiti PDF", "url": "#"},
      {"label": "Affiliate Link Performans Raporu", "url": "#"}
    ]
  }'::jsonb) ON CONFLICT (user_id, category_key) DO UPDATE SET content_json = EXCLUDED.content_json;

END $$;
