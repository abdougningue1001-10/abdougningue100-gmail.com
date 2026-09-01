import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Store, 
  Sparkles, 
  TrendingUp, 
  Package, 
  Wallet, 
  ShieldCheck, 
  PlusCircle, 
  ArrowUpRight, 
  AlertTriangle, 
  RefreshCw,
  CheckCircle2,
  DollarSign,
  Zap,
  BarChart3,
  BrainCircuit,
  Eye,
  Sliders,
  Send
} from 'lucide-react';
import { Product, ProductCategory } from '../types';

export const VendorDashboardView: React.FC = () => {
  const { 
    products, 
    orders, 
    currentUser, 
    formatPrice, 
    addProduct, 
    vendorWallet, 
    withdrawVendorFunds, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'ai_generator' | 'stock_ai' | 'products' | 'wallet'>('overview');
  
  // AI Generator state
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiCategory, setAiCategory] = useState<ProductCategory>('physique');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [generatedProduct, setGeneratedProduct] = useState<any>(null);

  // Stock AI prediction state
  const [stockPredictionData, setStockPredictionData] = useState<any>(null);
  const [isLoadingStockAI, setIsLoadingStockAI] = useState(false);

  // Wallet withdrawal form
  const [withdrawAmount, setWithdrawAmount] = useState(50000);
  const [withdrawMethod, setWithdrawMethod] = useState<'wave' | 'orange_money' | 'bank'>('wave');
  const [withdrawPhone, setWithdrawPhone] = useState('+221 77 123 45 67');

  // Vendor calculations
  const vendorProducts = products.filter(p => p.vendorId === currentUser.id || currentUser.role === 'superadmin');
  const totalSalesVolume = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleGenerateWithAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/ai/generate-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          category: aiCategory
        })
      });
      const data = await res.json();
      setGeneratedProduct(data);
      showToast("Fiche produit générée avec succès par l'IA !");
    } catch (err) {
      showToast("Erreur lors de la génération IA", "info");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handlePublishGeneratedProduct = () => {
    if (!generatedProduct) return;

    const newProd: Product = {
      id: `p-${Date.now()}`,
      title: generatedProduct.title || 'Nouveau Produit IA',
      slug: `prod-${Date.now()}`,
      description: generatedProduct.description || '',
      retailPrice: generatedProduct.suggestedRetailPrice || 25000,
      originalPrice: (generatedProduct.suggestedRetailPrice || 25000) * 1.3,
      category: aiCategory,
      subcategory: aiCategory === 'digital' ? 'logiciels_outils' : aiCategory === 'service' ? 'sites_web_shopify' : 'electronique',
      images: [
        aiCategory === 'digital' 
          ? 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
          : aiCategory === 'service'
          ? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
      ],
      stock: generatedProduct.suggestedInitialStock || 50,
      minOrderQuantity: 1,
      b2bAvailable: generatedProduct.b2bAvailable || false,
      bulkPricing: generatedProduct.bulkPricing || [],
      rating: 5.0,
      reviewCount: 0,
      salesCount: 0,
      vendorId: currentUser.id,
      vendorName: currentUser.name,
      vendorRating: 4.9,
      vendorVerified: true,
      vendorCountry: 'Sénégal',
      features: generatedProduct.features || [],
      autoDeliveryInstant: aiCategory === 'digital',
      digitalCodeSample: aiCategory === 'digital' ? 'AUTO-GEN-AI-2026-KEY-9941' : undefined,
      seoTags: ['ecommerce', 'afrique', 'b2b'],
      reviews: []
    };

    addProduct(newProd);
    setGeneratedProduct(null);
    setAiPrompt('');
    setActiveTab('products');
  };

  const handleRunStockPrediction = async () => {
    setIsLoadingStockAI(true);
    try {
      const res = await fetch('/api/ai/predict-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentStock: products.map(p => ({ title: p.title, stock: p.stock, category: p.category })),
          salesHistory: orders.length
        })
      });
      const data = await res.json();
      setStockPredictionData(data);
      showToast("Prédiction des stocks IA mise à jour !");
    } catch {
      showToast("Erreur analyse prédictive", "info");
    } finally {
      setIsLoadingStockAI(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-white">
      
      {/* Vendor Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FFC300] to-[#E67E22] p-0.5 shadow-xl shadow-[#FFC300]/20">
            <div className="w-full h-full bg-[#12141C] rounded-[14px] flex items-center justify-center text-[#FFC300]">
              <Store className="w-7 h-7" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">Espace Vendeur & Grossiste</h1>
              <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> KYC Vérifié ✓
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              Gérez votre boutique, créez des fiches produits en 1-clic avec l'IA et suivez votre trésorerie Escrow.
            </p>
          </div>
        </div>

        {/* Quick CTA to AI generator */}
        <button
          onClick={() => setActiveTab('ai_generator')}
          className="px-5 py-3 bg-gradient-to-r from-[#FFC300] to-[#FFA000] hover:from-[#e6b000] hover:to-[#e68e00] text-black font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-[#FFC300]/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Générer un Produit avec IA</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto scrollbar-none text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === 'overview' ? 'bg-[#FFC300] text-black' : 'text-gray-400 hover:text-white bg-[#181B26]'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Vue Globale
        </button>

        <button
          onClick={() => setActiveTab('ai_generator')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === 'ai_generator' ? 'bg-[#FFC300] text-black' : 'text-gray-400 hover:text-white bg-[#181B26]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400" /> Générateur IA 1-Clic
        </button>

        <button
          onClick={() => { setActiveTab('stock_ai'); if (!stockPredictionData) handleRunStockPrediction(); }}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === 'stock_ai' ? 'bg-[#FFC300] text-black' : 'text-gray-400 hover:text-white bg-[#181B26]'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-blue-400" /> Prédiction Stocks IA
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === 'products' ? 'bg-[#FFC300] text-black' : 'text-gray-400 hover:text-white bg-[#181B26]'
          }`}
        >
          <Package className="w-4 h-4" /> Mes Articles ({vendorProducts.length})
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === 'wallet' ? 'bg-[#FFC300] text-black' : 'text-gray-400 hover:text-white bg-[#181B26]'
          }`}
        >
          <Wallet className="w-4 h-4 text-green-400" /> Trésorerie & Retraits
        </button>
      </div>

      {/* TAB 1: OVERVIEW STATS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 bg-[#12141C] rounded-3xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-gray-400 text-xs">
                <span>Chiffre d'Affaires Brut</span>
                <DollarSign className="w-4 h-4 text-[#FFC300]" />
              </div>
              <p className="text-2xl font-black font-heading text-white">{formatPrice(totalSalesVolume)}</p>
              <p className="text-[11px] text-green-400 font-semibold">+24.5% ce mois</p>
            </div>

            <div className="p-5 bg-[#12141C] rounded-3xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-gray-400 text-xs">
                <span>Solde Disponible Retrait</span>
                <Wallet className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-2xl font-black font-heading text-green-400">{formatPrice(vendorWallet?.availableBalance || 0)}</p>
              <p className="text-[11px] text-gray-400">Retirable instantanément via Wave / OM</p>
            </div>

            <div className="p-5 bg-[#12141C] rounded-3xl border border-[#FFC300]/30 space-y-2">
              <div className="flex items-center justify-between text-gray-400 text-xs">
                <span>Fonds en Séquestre Escrow (48h)</span>
                <ShieldCheck className="w-4 h-4 text-[#FFC300]" />
              </div>
              <p className="text-2xl font-black font-heading text-[#FFC300]">{formatPrice(vendorWallet?.escrowBalance || 0)}</p>
              <p className="text-[11px] text-gray-400">Déblocage auto après validation client</p>
            </div>

            <div className="p-5 bg-[#12141C] rounded-3xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-gray-400 text-xs">
                <span>Commission Plateforme Gningue</span>
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-black font-heading text-white">1% SEULEMENT</p>
              <p className="text-[11px] text-gray-400">Le taux le plus bas du marché mondial</p>
            </div>

          </div>

          {/* Quick AI Stock Status Warning banner */}
          <div className="bg-[#181B26] p-5 rounded-3xl border border-[#FFC300]/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFC300]/15 flex items-center justify-center text-[#FFC300] shrink-0">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Optimisation des Stocks Assistée par IA (Gemini 3.7 Flash)</h4>
                <p className="text-xs text-gray-400">L'algorithme analyse vos ventes et recommande les réapprovisionnements B2B en avance.</p>
              </div>
            </div>

            <button
              onClick={() => { setActiveTab('stock_ai'); handleRunStockPrediction(); }}
              className="px-4 py-2.5 bg-[#FFC300] text-black font-bold text-xs rounded-xl hover:bg-[#e6b000] shrink-0"
            >
              Voir le Rapport Prédictif
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: AI 1-CLICK PRODUCT GENERATOR */}
      {activeTab === 'ai_generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Prompt input Form */}
          <div className="lg:col-span-6 bg-[#12141C] p-6 rounded-3xl border border-white/10 space-y-5">
            <div className="flex items-center gap-2 text-purple-400">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-bold text-white text-base">Générateur Automatique de Fiche Produit (Gemini AI)</h3>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Décrivez simplement en quelques mots votre produit physique, abonnement digital ou service. L'IA rédige le titre marketing, les arguments de vente, calcule les paliers de gros B2B (Alibaba style) et prépare la mise en ligne immédiate.
            </p>

            <form onSubmit={handleGenerateWithAI} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Catégorie de produit :</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAiCategory('physique')}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      aiCategory === 'physique' ? 'bg-[#FFC300] text-black border-[#FFC300]' : 'bg-[#181B26] text-gray-300 border-white/10'
                    }`}
                  >
                    📦 Physique (Gros/Détail)
                  </button>

                  <button
                    type="button"
                    onClick={() => setAiCategory('digital')}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      aiCategory === 'digital' ? 'bg-[#FFC300] text-black border-[#FFC300]' : 'bg-[#181B26] text-gray-300 border-white/10'
                    }`}
                  >
                    ⚡ Digital / Codes
                  </button>

                  <button
                    type="button"
                    onClick={() => setAiCategory('service')}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      aiCategory === 'service' ? 'bg-[#FFC300] text-black border-[#FFC300]' : 'bg-[#181B26] text-gray-300 border-white/10'
                    }`}
                  >
                    🚀 Service Clé en Main
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">Description brute ou mots-clés :</label>
                <textarea
                  rows={4}
                  required
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Ex: Lot de 20 batteries lithium 48V 100Ah pour installation solaire avec garantie 5 ans et livraison directe par conteneur..."
                  className="w-full bg-[#181B26] border border-white/15 rounded-2xl p-3 text-white focus:outline-none focus:border-[#FFC300] text-xs leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isGeneratingAI}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-[#FFC300] hover:from-purple-500 hover:to-[#e6b000] text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-purple-600/20 disabled:opacity-50"
              >
                {isGeneratingAI ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>L'IA rédige la fiche produit...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Générer la Fiche Produit Complète</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* AI Result Preview & 1-Click Publish */}
          <div className="lg:col-span-6 bg-[#12141C] p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#FFC300]" />
                  <span>Aperçu de la Fiche Générée</span>
                </h3>
                {generatedProduct && (
                  <span className="bg-green-500/20 text-green-400 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    Prêt à publier
                  </span>
                )}
              </div>

              {!generatedProduct ? (
                <div className="text-center py-16 text-gray-500 space-y-2">
                  <Sparkles className="w-10 h-10 mx-auto opacity-30" />
                  <p className="text-xs">Remplissez le formulaire de gauche pour voir la magie de l'IA opérer.</p>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-gray-400">Titre optimisé SEO :</span>
                    <h4 className="font-black text-white text-sm mt-0.5">{generatedProduct.title}</h4>
                  </div>

                  <div>
                    <span className="text-gray-400">Description persuasive :</span>
                    <p className="text-gray-300 mt-0.5 line-clamp-3 leading-relaxed">{generatedProduct.description}</p>
                  </div>

                  {/* Pricing grid */}
                  <div className="grid grid-cols-2 gap-3 bg-[#181B26] p-3 rounded-xl border border-white/10">
                    <div>
                      <span className="text-gray-400">Prix détail suggéré :</span>
                      <p className="text-base font-bold text-white mt-0.5">{formatPrice(generatedProduct.suggestedRetailPrice || 25000)}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Stock de départ :</span>
                      <p className="text-base font-bold text-[#FFC300] mt-0.5">{generatedProduct.suggestedInitialStock || 50} unités</p>
                    </div>
                  </div>

                  {/* Bullet features */}
                  {generatedProduct.features && (
                    <div>
                      <span className="text-gray-400">Arguments clés :</span>
                      <ul className="mt-1 space-y-1 text-gray-300">
                        {generatedProduct.features.map((f: string, i: number) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC300]" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {generatedProduct && (
              <button
                onClick={handlePublishGeneratedProduct}
                className="w-full py-3 bg-[#FFC300] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#FFC300]/20"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publier Instantanément sur le Marché Gningue</span>
              </button>
            )}
          </div>

        </div>
      )}

      {/* TAB 3: AI STOCK PREDICTION */}
      {activeTab === 'stock_ai' && (
        <div className="bg-[#12141C] p-6 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-blue-400" />
                <span>Prévisions de Ventes & Analyse des Stocks IA</span>
              </h3>
              <p className="text-xs text-gray-400">Modèle Gemini 3.7 entraîné sur les tendances e-commerce africaines et internationales.</p>
            </div>

            <button
              onClick={handleRunStockPrediction}
              disabled={isLoadingStockAI}
              className="px-4 py-2 bg-[#181B26] hover:bg-[#222636] border border-white/15 text-white font-bold text-xs rounded-xl flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStockAI ? 'animate-spin' : ''}`} />
              <span>Actualiser l'Analyse</span>
            </button>
          </div>

          {stockPredictionData ? (
            <div className="space-y-6">
              
              {/* Highlights summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/30 space-y-1">
                  <span className="text-red-400 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Risque de Rupture Imminente
                  </span>
                  <p className="text-white font-bold text-sm">Panneaux Solaires & iPhone 15</p>
                  <p className="text-gray-400 text-[11px]">Réapprovisionner sous 3 jours pour éviter -1.2M F de manque à gagner.</p>
                </div>

                <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/30 space-y-1">
                  <span className="text-green-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> Forte Croissance Digitale
                  </span>
                  <p className="text-white font-bold text-sm">Netflix 4K & IPTV 12M</p>
                  <p className="text-gray-400 text-[11px]">Demande en hausse de +42% le week-end. Augmenter le pool de codes.</p>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/30 space-y-1">
                  <span className="text-blue-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> Tendance B2B Grossistes
                  </span>
                  <p className="text-white font-bold text-sm">Bazin Riche Getzner</p>
                  <p className="text-gray-400 text-[11px]">Commandes par lots de 50m recommandées pour la saison des mariages.</p>
                </div>
              </div>

              {/* Detailed recommendations list */}
              <div className="space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider text-gray-400">Recommandations détaillées de réassort :</h4>
                {stockPredictionData.recommendations?.map((rec: any, i: number) => (
                  <div key={i} className="p-3.5 bg-[#181B26] rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{rec.productTitle}</p>
                      <p className="text-[11px] text-gray-400">{rec.actionReason}</p>
                    </div>
                    <span className="bg-[#FFC300]/20 text-[#FFC300] font-bold px-3 py-1 rounded-xl">
                      Commander +{rec.suggestedRestockQty} pcs
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <BrainCircuit className="w-10 h-10 mx-auto opacity-30" />
              <p className="text-xs mt-2">Cliquez sur Actualiser pour charger les prédictions IA.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PRODUCT LIST */}
      {activeTab === 'products' && (
        <div className="bg-[#12141C] p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-bold text-white text-base">Catalogue de votre Boutique</h3>
            <button
              onClick={() => setActiveTab('ai_generator')}
              className="px-4 py-2 bg-[#FFC300] text-black font-bold rounded-xl text-xs flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Ajouter un Produit
            </button>
          </div>

          <div className="space-y-3">
            {vendorProducts.map((p) => (
              <div key={p.id} className="p-4 bg-[#181B26] rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={p.images[0]} alt={p.title} className="w-14 h-14 rounded-xl object-cover bg-black shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-xs">{p.title}</h4>
                    <p className="text-[11px] text-gray-400">Stock restant : <strong className="text-white">{p.stock} pcs</strong> • Ventes : {p.salesCount}</p>
                    {p.b2bAvailable && <span className="text-[10px] text-[#FFC300] font-bold">✓ Éligible Gros B2B</span>}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-xs text-gray-400">Prix détail :</span>
                    <p className="font-bold text-white text-sm">{formatPrice(p.retailPrice)}</p>
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2.5 py-1 rounded-xl font-bold">
                    En Ligne
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: WALLET & WITHDRAWALS */}
      {activeTab === 'wallet' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-6 bg-[#12141C] p-6 rounded-3xl border border-white/10 space-y-5">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Wallet className="w-5 h-5 text-green-400" />
              <span>Demande de Retrait Instantané</span>
            </h3>

            <div className="p-4 bg-[#181B26] rounded-2xl border border-white/10 space-y-1">
              <span className="text-xs text-gray-400">Solde disponible pour retrait immédiat :</span>
              <p className="text-3xl font-black text-green-400 font-heading">{formatPrice(vendorWallet?.availableBalance || 0)}</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                withdrawVendorFunds(withdrawAmount, withdrawMethod, withdrawPhone);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Méthode de réception :</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setWithdrawMethod('wave')}
                    className={`py-2 px-3 rounded-xl font-bold border ${withdrawMethod === 'wave' ? 'bg-[#1CA8FF] text-white border-[#1CA8FF]' : 'bg-[#181B26] border-white/10 text-gray-300'}`}
                  >
                    Wave (0% frais)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWithdrawMethod('orange_money')}
                    className={`py-2 px-3 rounded-xl font-bold border ${withdrawMethod === 'orange_money' ? 'bg-[#FF6600] text-white border-[#FF6600]' : 'bg-[#181B26] border-white/10 text-gray-300'}`}
                  >
                    Orange Money
                  </button>
                  <button
                    type="button"
                    onClick={() => setWithdrawMethod('bank')}
                    className={`py-2 px-3 rounded-xl font-bold border ${withdrawMethod === 'bank' ? 'bg-purple-600 text-white border-purple-500' : 'bg-[#181B26] border-white/10 text-gray-300'}`}
                  >
                    Virement Bancaire
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">Numéro de téléphone / Compte :</label>
                <input
                  type="text"
                  value={withdrawPhone}
                  onChange={(e) => setWithdrawPhone(e.target.value)}
                  className="w-full bg-[#181B26] border border-white/15 rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">Montant à retirer (FCFA) :</label>
                <input
                  type="number"
                  max={vendorWallet?.availableBalance || 0}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full bg-[#181B26] border border-white/15 rounded-xl px-3 py-2.5 text-white font-bold"
                />
              </div>

              <button
                type="submit"
                disabled={(vendorWallet?.availableBalance || 0) < 1000}
                className="w-full py-3.5 bg-green-600 hover:bg-green-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-green-600/20 disabled:opacity-50"
              >
                Transférer les Fonds Immédiatement
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 bg-[#12141C] p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-base">Historique des Transactions Vendeur</h3>
            
            <div className="space-y-3">
              <div className="p-3.5 bg-[#181B26] rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Vente #ORD-89410 (Panneaux Solaires)</p>
                  <p className="text-[10px] text-gray-400">Escrow 48h libéré avec succès</p>
                </div>
                <span className="font-black text-green-400">+1.237.500 F</span>
              </div>

              <div className="p-3.5 bg-[#181B26] rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Retrait Wave vers {withdrawPhone}</p>
                  <p className="text-[10px] text-gray-400">Envoyé instantanément</p>
                </div>
                <span className="font-black text-white">-500.000 F</span>
              </div>

              <div className="p-3.5 bg-[#181B26] rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Commission GNINGUE EMPIRE (1%)</p>
                  <p className="text-[10px] text-gray-400">Frais de plateforme prélevés</p>
                </div>
                <span className="font-black text-gray-400">-12.500 F</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
