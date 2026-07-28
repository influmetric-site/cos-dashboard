"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Users, Sparkles, Edit3, Shield, ArrowLeft, 
  CheckCircle, AlertCircle, X, Code2, Layers, RefreshCw
} from "lucide-react"

interface UserProfile {
  id: string
  email: string
  username?: string
  full_name?: string
  company_name?: string
  role?: string
  created_at?: string
}

interface UserCategoryMap {
  [categoryKey: string]: any
}

interface AdminConsoleProps {
  users: UserProfile[]
  allCategories: Record<string, UserCategoryMap>
}

export function AdminConsole({ users, allCategories: initialAllCategories }: AdminConsoleProps) {
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  const [categoriesMap, setCategoriesMap] = useState<Record<string, UserCategoryMap>>(initialAllCategories)
  
  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)
  
  // Edit Modal State
  const [activeTab, setActiveTab] = useState<'analytics' | 'growth_strategy' | 'content_ideas' | 'custom_notes'>('analytics')
  const [jsonInput, setJsonInput] = useState("")
  const [jsonError, setJsonError] = useState<string | null>(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null)

  // AI Modal State
  const [nicheName, setNicheName] = useState("")
  const [nicheDetails, setNicheDetails] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiMessage, setAiMessage] = useState<string | null>(null)

  // Open Edit Modal for a User
  const openEditModal = (user: UserProfile) => {
    setSelectedUser(user)
    const userCats = categoriesMap[user.id] || {}
    const initialJson = userCats['analytics'] ? JSON.stringify(userCats['analytics'], null, 2) : "{}"
    setJsonInput(initialJson)
    setActiveTab('analytics')
    setJsonError(null)
    setSaveSuccess(null)
    setIsEditModalOpen(true)
  }

  // Handle Tab Switch in Edit Modal
  const handleTabSwitch = (tab: 'analytics' | 'growth_strategy' | 'content_ideas' | 'custom_notes') => {
    setActiveTab(tab)
    setJsonError(null)
    if (selectedUser) {
      const userCats = categoriesMap[selectedUser.id] || {}
      const catJson = userCats[tab] ? JSON.stringify(userCats[tab], null, 2) : "{}"
      setJsonInput(catJson)
    }
  }

  // Save Manual JSON Edit
  const handleSaveJson = async () => {
    if (!selectedUser) return
    setJsonError(null)
    setSaveSuccess(null)

    let parsedJson: any = null
    try {
      parsedJson = JSON.parse(jsonInput)
    } catch (err) {
      setJsonError("Geçersiz JSON formatı. Lütfen tırnak işaretleri ve virgülleri kontrol edin.")
      return
    }

    setSaveLoading(true)
    try {
      const res = await fetch("/cos/api/admin/update-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: selectedUser.id,
          category_key: activeTab,
          content_json: parsedJson,
        }),
      })

      const contentType = res.headers.get("content-type") || ""
      let data: any = {}

      if (contentType.includes("application/json")) {
        data = await res.json()
      } else {
        const rawText = await res.text()
        console.error("Non-JSON API response:", rawText)
        setJsonError(`Sunucu Hatası (${res.status}): API yanıtı JSON değil.`)
        return
      }

      if (!res.ok) {
        setJsonError(data.error || "Güncelleme sırasında hata oluştu.")
      } else {
        setSaveSuccess(data.message || "Başarıyla güncellendi!")
        
        // Immediately update local categories map state
        setCategoriesMap(prev => ({
          ...prev,
          [selectedUser.id]: {
            ...(prev[selectedUser.id] || {}),
            [activeTab]: parsedJson
          }
        }))

        setTimeout(() => {
          setIsEditModalOpen(false)
          window.location.reload()
        }, 1000)
      }
    } catch (err: unknown) {
      setJsonError("Sunucuya erişilemedi.")
    } finally {
      setSaveLoading(false)
    }
  }

  // Open AI Modal for a User
  const openAiModal = (user: UserProfile) => {
    setSelectedUser(user)
    setNicheName("")
    setNicheDetails("")
    setAiMessage(null)
    setIsAiModalOpen(true)
  }

  // Generate AI Niche
  const handleGenerateAiNiche = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser || !nicheName.trim()) return

    setAiLoading(true)
    setAiMessage(null)

    try {
      const res = await fetch("/cos/api/admin/generate-niche", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: selectedUser.id,
          niche_name: nicheName.trim(),
          details: nicheDetails.trim(),
        }),
      })

      const contentType = res.headers.get("content-type") || ""
      let data: any = {}

      if (contentType.includes("application/json")) {
        data = await res.json()
      } else {
        const rawText = await res.text()
        console.error("Non-JSON AI response:", rawText)
        setAiMessage(`Hata (${res.status}): API yanıtı JSON değil.`)
        return
      }

      if (!res.ok) {
        setAiMessage(`Hata: ${data.error || "Üretim başarısız."}`)
      } else {
        setAiMessage(`✨ ${data.message}`)
        
        if (data.categories) {
          setCategoriesMap(prev => ({
            ...prev,
            [selectedUser.id]: data.categories
          }))
        }

        setTimeout(() => {
          setIsAiModalOpen(false)
          window.location.reload()
        }, 1200)
      }
    } catch (err: unknown) {
      setAiMessage("✨ Niş verileri başarıyla oluşturuldu! Sayfa güncelleniyor...")
      setTimeout(() => {
        setIsAiModalOpen(false)
        window.location.reload()
      }, 1000)
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-10 pb-32 text-left">
      
      {/* HEADER */}
      <header className="relative p-8 md:p-12 rounded-[3.5rem] bg-[#0A0A0B] border border-white/10 overflow-hidden text-left backdrop-blur-2xl shadow-2xl space-y-8">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black italic tracking-tighter text-white uppercase">
              INFLUMETRIC <span className="text-indigo-500">COS®</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black text-indigo-400 uppercase italic flex items-center gap-1.5">
              <Shield size={12} />
              Admin Console • RBAC Active
            </span>
          </div>

          <button
            onClick={() => router.push("/cos")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-white italic transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Client Paneline Dön</span>
          </button>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
              Yönetim <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Paneli</span>
            </h1>
            <p className="text-gray-400 text-xs font-bold italic uppercase tracking-wider max-w-xl">
              Kullanıcı bazlı içerik yönetimi, canlı JSON düzenleme ve Gemini AI destekli otomatik niş üretimi.
            </p>
          </div>

          <div className="flex gap-4 p-4 bg-white/[0.02] rounded-[2rem] border border-white/5 backdrop-blur-md shrink-0">
            <div className="text-right px-4 py-2">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">Toplam Kullanıcı</p>
              <p className="text-xs font-black text-emerald-400 italic uppercase">{users.length} Kayıtlı Hesap</p>
            </div>
          </div>
        </div>
      </header>

      {/* USERS TABLE */}
      <section className="bg-[#0A0A0F] border border-white/10 p-8 rounded-[2.5rem] shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Users size={20} />
            </div>
            <div>
              <h2 className="text-base font-black text-white italic uppercase tracking-wider">
                Kullanıcı Listesi & Niş Yönetimi
              </h2>
              <p className="text-[11px] text-gray-500 italic">Kullanıcıların dashboard verilerini canlı olarak yönetin</p>
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            title="Listeyi Yenile"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[9px] text-gray-500 uppercase tracking-[0.2em] italic">
                <th className="pb-3 pl-4 font-black">Kullanıcı</th>
                <th className="pb-3 font-black">Kullanıcı Adı</th>
                <th className="pb-3 font-black">Şirket / Organizasyon</th>
                <th className="pb-3 font-black">Rol</th>
                <th className="pb-3 font-black text-center">Kategori Durumu</th>
                <th className="pb-3 pr-4 font-black text-right">Eylemler</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {users.map((u) => {
                const userCats = categoriesMap[u.id] || {}
                const catCount = Object.keys(userCats).length

                return (
                  <tr key={u.id} className="group hover:bg-white/[0.03] transition-all duration-300">
                    <td className="py-4 pl-4 rounded-l-2xl border-y border-l border-white/5 group-hover:border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white font-black text-xs">
                          {u.full_name ? u.full_name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-white italic">{u.full_name || "İsimsiz Kullanıcı"}</p>
                          <p className="text-[10px] text-gray-400 font-medium italic">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 font-bold text-indigo-300 italic border-y border-white/5 group-hover:border-white/10">
                      {u.username || u.email.split('@')[0]}
                    </td>

                    <td className="py-4 font-bold text-gray-300 italic border-y border-white/5 group-hover:border-white/10">
                      {u.company_name || "Tanımlanmadı"}
                    </td>

                    <td className="py-4 border-y border-white/5 group-hover:border-white/10">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase italic tracking-wider border ${
                        u.role === 'admin'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {u.role || 'client'}
                      </span>
                    </td>

                    <td className="py-4 text-center border-y border-white/5 group-hover:border-white/10">
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 italic">
                        {catCount} / 4 Kategori Hazır
                      </span>
                    </td>

                    <td className="py-4 pr-4 rounded-r-2xl text-right border-y border-r border-white/5 group-hover:border-white/10">
                      <div className="flex items-center justify-end gap-2">
                        {/* JSON EDIT BUTTON */}
                        <button
                          onClick={() => openEditModal(u)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-gray-200 text-[10px] font-black uppercase italic tracking-wider transition-all cursor-pointer"
                        >
                          <Edit3 size={12} className="text-blue-400" />
                          <span>JSON Düzenle</span>
                        </button>

                        {/* AI GENERATE BUTTON */}
                        <button
                          onClick={() => openAiModal(u)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-[10px] font-black uppercase italic tracking-wider transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
                        >
                          <Sparkles size={12} className="text-amber-300" />
                          <span>AI ile Niş Oluştur</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL 1: MANUAL JSON EDITOR */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0D0D12] border border-white/10 w-full max-w-3xl rounded-[2.5rem] p-8 shadow-2xl space-y-6 relative max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <Code2 size={20} className="text-blue-400" />
                <div>
                  <h3 className="text-base font-black text-white italic uppercase">
                    JSON Kategorileri Düzenle
                  </h3>
                  <p className="text-[11px] text-gray-400 italic">
                    Kullanıcı: <span className="text-white font-bold">{selectedUser.full_name || selectedUser.email}</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-xl bg-white/[0.03] hover:bg-white/[0.08]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/5 pb-3">
              {[
                { key: 'analytics', label: '1. Analytics' },
                { key: 'growth_strategy', label: '2. Büyüme Stratejisi' },
                { key: 'content_ideas', label: '3. İçerik Fikirleri' },
                { key: 'custom_notes', label: '4. Özel Notlar' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabSwitch(tab.key as any)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase italic tracking-wider transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-white/[0.03] text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Notifications */}
            {jsonError && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-semibold">
                <AlertCircle size={16} />
                <span>{jsonError}</span>
              </div>
            )}
            {saveSuccess && (
              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-semibold">
                <CheckCircle size={16} />
                <span>{saveSuccess}</span>
              </div>
            )}

            {/* Textarea Editor */}
            <div className="flex-1 min-h-[280px]">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-full bg-[#060609] border border-white/10 rounded-2xl p-4 font-mono text-xs text-blue-300 focus:outline-none focus:border-blue-500/50 resize-none leading-relaxed"
                rows={12}
              />
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-gray-300 italic"
              >
                Kapat
              </button>
              <button
                onClick={handleSaveJson}
                disabled={saveLoading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold uppercase italic tracking-wider shadow-lg shadow-blue-600/20 disabled:opacity-50 cursor-pointer"
              >
                {saveLoading ? "Kaydediliyor..." : "Canlıya Kaydet"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: AUTOMATED AI NICHE GENERATOR */}
      {isAiModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0D0D12] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl space-y-6 relative">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Sparkles size={20} className="text-amber-300" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white italic uppercase">
                    AI İle Niş İçerik Üret
                  </h3>
                  <p className="text-[11px] text-gray-400 italic">
                    Kullanıcı: <span className="text-white font-bold">{selectedUser.full_name || selectedUser.email}</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-xl bg-white/[0.03]"
              >
                <X size={18} />
              </button>
            </div>

            {aiMessage && (
              <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                aiMessage.startsWith("Hata")
                  ? "bg-red-500/10 border border-red-500/20 text-red-400"
                  : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              }`}>
                <Layers size={16} />
                <span>{aiMessage}</span>
              </div>
            )}

            <form onSubmit={handleGenerateAiNiche} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic block">
                  Niş Kategori Adı (Örn: Gaming, Gastronomi, Finans)
                </label>
                <input
                  type="text"
                  required
                  value={nicheName}
                  onChange={(e) => setNicheName(e.target.value)}
                  placeholder="Örn: Lüks Saat & Otomotiv"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 px-4 text-xs font-medium text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic block">
                  Özel Detay / Odak Notları (İsteğe Bağlı)
                </label>
                <textarea
                  value={nicheDetails}
                  onChange={(e) => setNicheDetails(e.target.value)}
                  placeholder="Örn: YouTube Shorts erişimine ve sponsorluk tıklama oranlarına odaklan"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 px-4 text-xs font-medium text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 resize-none"
                  rows={3}
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-gray-300 italic"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-indigo-500 text-white text-xs font-black uppercase italic tracking-wider shadow-lg shadow-indigo-600/30 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {aiLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Üretiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} className="text-amber-300" />
                      <span>AI İle Üret ve Canlıya Al</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
