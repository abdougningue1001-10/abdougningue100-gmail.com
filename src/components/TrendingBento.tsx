import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { 
  Flame, 
  Sparkles, 
  ShoppingBag, 
  Eye, 
  Heart, 
  Star, 
  Zap, 
  Store, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight,
  CheckCircle2,
  Package
} from 'lucide-react';

export const TrendingBento: React.FC = () => {
  const { 
    products, 
    formatPrice, 
    addToCart, 
    setSelectedProductForDetail, 
    toggleWishlist, 
    wishlist,
    showToast,
    setActiveCategory,
    setB2bOnlyFilter,
    setActiveView
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'physique' | 'digital' | 'b2b'>('all');

  // Compute trending products sorted by sales and rating
  const trendingList = useMemo(() => {
    let list = [...products];
    if (activeTab === 'physique') {
      list = list.filter(p => p.category === 'physique');
    } else if (activeTab === 'digital') {
      list = list.filter(p => p.category === 'digital');
    } else if (activeTab === 'b2b') {
      list = list.filter(p => p.b2bAvailable);
    }
    return list.sort((a, b) => b.salesCount - a.salesCount);
  }, [products, activeTab]);

  const topProduct = trendingList[0];
  const secondProduct = trendingList[1];
  const thirdProduct = trendingList[2];
  const fourthProduct = trendingList[3];
  const fifthProduct = trendingList[4];

  if (!topProduct) return null;

  const isWishlisted = (id: string) => wishlist.includes(id);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`✅ ${product.title} ajouté au panier !`);
  };

  const handleWishlistClick = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    toggleWishlist(productId);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 bg-[#FFC300]/10 border border-[#FFC300]/30 text-[#FFC300] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 fill-[#FFC300]" />
              Meilleures Ventes & Tendances
            </span>
            <span className="text-gray-500 text-xs hidden sm:inline">• Live Analytics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
            LES FAVORIS DU <span className="text-[#FFC300]">MARCHÉ AFRICAIN</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Les produits les plus demandés cette semaine avec expédition express et garantie Escrow 48h.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 bg-[#111111] p-1.5 rounded-xl border border-gray-800 self-start md:self-auto overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-[#FFC300] text-black shadow-md shadow-[#FFC300]/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🔥 Tout le Top
          </button>
          <button
            onClick={() => setActiveTab('physique')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'physique'
                ? 'bg-[#FFC300] text-black shadow-md shadow-[#FFC300]/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Package className="w-3 h-3" /> Physique
          </button>
          <button
            onClick={() => setActiveTab('digital')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'digital'
                ? 'bg-[#FFC300] text-black shadow-md shadow-[#FFC300]/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Zap className="w-3 h-3 text-green-400" /> Digital
          </button>
          <button
            onClick={() => setActiveTab('b2b')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'b2b'
                ? 'bg-[#FFC300] text-black shadow-md shadow-[#FFC300]/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Store className="w-3 h-3 text-[#FFC300]" /> Gros B2B
          </button>
        </div>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(190px,auto)]">
        
        {/* ============================================================ */}
        {/* BENTO HERO CARD (#1 BESTSELLER) - Spans 6 Cols, 2 Rows on Desktop */}
        {/* ============================================================ */}
        {topProduct && (
          <div 
            onClick={() => setSelectedProductForDetail(topProduct)}
            className="md:col-span-6 md:row-span-2 group relative bg-gradient-to-b from-[#161616] via-[#111111] to-[#0D0D0D] border border-gray-800 hover:border-[#FFC300] rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 cursor-pointer"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFC300]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#FFC300]/20 transition-all" />

            {/* Top Badges & Actions */}
            <div className="relative z-10 flex items-start justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-[#FFC300] text-black font-black text-[11px] px-3 py-1 rounded-full shadow-lg shadow-[#FFC300]/30 tracking-wider uppercase">
                  <Flame className="w-3.5 h-3.5 fill-black" />
                  N°1 Meilleure Vente
                </span>
                {topProduct.b2bAvailable && (
                  <span className="bg-white/10 text-white border border-white/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Tarif Usine B2B
                  </span>
                )}
                {topProduct.autoDeliveryInstant && (
                  <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ⚡ Instant 3s
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={(e) => handleWishlistClick(e, topProduct.id)}
                className={`p-2.5 rounded-2xl border transition-all ${
                  isWishlisted(topProduct.id)
                    ? 'bg-red-500/20 border-red-500/40 text-red-400'
                    : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                }`}
                title="Ajouter aux favoris"
              >
                <Heart className={`w-4 h-4 ${isWishlisted(topProduct.id) ? 'fill-red-500' : ''}`} />
              </button>
            </div>

            {/* Product Center Visual with Dynamic Image Scaling */}
            <div className="relative z-10 my-6 flex items-center justify-center">
              <div className="relative w-48 sm:w-56 aspect-square rounded-2xl overflow-hidden shadow-2xl bg-black/40 border border-white/5 p-2">
                <img
                  src={topProduct.images[0]}
                  alt={topProduct.title}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                />
                {/* Live Sales Counter Floating Pill */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center justify-between text-[10px]">
                  <span className="text-gray-300 font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-400" /> Vendu
                  </span>
                  <span className="text-[#FFC300] font-black">{topProduct.salesCount.toLocaleString()} fois</span>
                </div>
              </div>
            </div>

            {/* Bottom Content & Pricing */}
            <div className="relative z-10 space-y-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <span className="text-[#FFC300] font-bold">{topProduct.vendorName}</span>
                  {topProduct.vendorVerified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 inline" />
                  )}
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {topProduct.rating.toFixed(1)} ({topProduct.reviewCount})
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FFC300] transition-colors line-clamp-1">
                  {topProduct.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                  {topProduct.description}
                </p>
              </div>

              {/* Price Row & Quick Actions */}
              <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Prix Unitaire</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black text-[#FFC300] font-heading">
                      {formatPrice(topProduct.retailPrice)}
                    </span>
                    {topProduct.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(topProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleQuickAdd(e, topProduct)}
                    className="bg-[#FFC300] hover:bg-[#e6b000] text-black px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-[#FFC300]/20 transition-transform active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ajouter</span>
                  </button>
                  
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-[#FFC300] group-hover:border-[#FFC300]/40 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* BENTO CARD 2: Trending Digital / Fast Delivery (Spans 6 Cols, 1 Row) */}
        {/* ============================================================ */}
        {secondProduct && (
          <div 
            onClick={() => setSelectedProductForDetail(secondProduct)}
            className="md:col-span-6 group relative bg-[#111111] hover:bg-[#141414] border border-gray-800 hover:border-green-500/60 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Left side text info */}
            <div className="flex-1 space-y-2 w-full">
              <div className="flex items-center gap-2">
                <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {secondProduct.category === 'digital' ? 'Livraison Instantanée' : 'Top Tendance'}
                </span>
                <span className="text-[11px] text-gray-400">🔥 +{secondProduct.salesCount} ventes</span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
                {secondProduct.title}
              </h3>
              
              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                <span>Vendeur :</span>
                <span className="text-gray-300 font-semibold">{secondProduct.vendorName}</span>
                <span>•</span>
                <span className="text-amber-400 font-bold flex items-center gap-0.5">
                  ★ {secondProduct.rating.toFixed(1)}
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-lg font-black text-white font-heading">
                    {formatPrice(secondProduct.retailPrice)}
                  </span>
                  {secondProduct.originalPrice && (
                    <span className="text-xs text-gray-500 line-through ml-2">
                      {formatPrice(secondProduct.originalPrice)}
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => handleQuickAdd(e, secondProduct)}
                  className="bg-green-500 hover:bg-green-400 text-black px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-transform active:scale-95 shadow-md shadow-green-500/20"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Prendre</span>
                </button>
              </div>
            </div>

            {/* Right side product thumbnail */}
            <div className="w-28 sm:w-32 aspect-square rounded-2xl overflow-hidden bg-black/40 border border-gray-800 shrink-0 p-1.5 relative">
              <img
                src={secondProduct.images[0]}
                alt={secondProduct.title}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={(e) => handleWishlistClick(e, secondProduct.id)}
                className="absolute top-2.5 right-2.5 p-1.5 bg-black/60 rounded-lg text-gray-300 hover:text-white"
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted(secondProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* BENTO CARD 3: Wholesale B2B Spotlight (Spans 3 Cols, 1 Row) */}
        {/* ============================================================ */}
        {thirdProduct && (
          <div 
            onClick={() => setSelectedProductForDetail(thirdProduct)}
            className="md:col-span-3 group relative bg-[#111111] hover:bg-[#141414] border border-gray-800 hover:border-[#FFC300]/60 rounded-3xl p-4 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-[#FFC300]/10 text-[#FFC300] border border-[#FFC300]/30 text-[9px] font-black px-2 py-0.5 rounded-md uppercase">
                  {thirdProduct.b2bAvailable ? 'Grossiste B2B' : 'Populaire'}
                </span>
                <span className="text-[10px] text-gray-500 font-bold">★ {thirdProduct.rating.toFixed(1)}</span>
              </div>

              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-gray-800 mb-3 relative">
                <img
                  src={thirdProduct.images[0]}
                  alt={thirdProduct.title}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => handleWishlistClick(e, thirdProduct.id)}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg text-gray-300 hover:text-white"
                >
                  <Heart className={`w-3 h-3 ${isWishlisted(thirdProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>

              <h4 className="text-xs font-bold text-white group-hover:text-[#FFC300] transition-colors line-clamp-1">
                {thirdProduct.title}
              </h4>
            </div>

            <div className="pt-2 border-t border-gray-800 flex items-center justify-between mt-2">
              <div>
                <p className="text-[9px] text-gray-400">Prix Direct</p>
                <span className="text-xs font-black text-[#FFC300]">
                  {formatPrice(thirdProduct.retailPrice)}
                </span>
              </div>
              <button
                onClick={(e) => handleQuickAdd(e, thirdProduct)}
                className="w-7 h-7 bg-white/10 hover:bg-[#FFC300] text-white hover:text-black rounded-lg flex items-center justify-center transition-colors"
                title="Ajouter au panier"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* BENTO CARD 4: High Growth Trending Item (Spans 3 Cols, 1 Row) */}
        {/* ============================================================ */}
        {fourthProduct && (
          <div 
            onClick={() => setSelectedProductForDetail(fourthProduct)}
            className="md:col-span-3 group relative bg-[#111111] hover:bg-[#141414] border border-gray-800 hover:border-blue-400/60 rounded-3xl p-4 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[9px] font-black px-2 py-0.5 rounded-md uppercase flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5" /> Forte Demande
                </span>
                <span className="text-[10px] text-gray-500 font-bold">+{fourthProduct.salesCount}</span>
              </div>

              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-gray-800 mb-3 relative">
                <img
                  src={fourthProduct.images[0]}
                  alt={fourthProduct.title}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => handleWishlistClick(e, fourthProduct.id)}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg text-gray-300 hover:text-white"
                >
                  <Heart className={`w-3 h-3 ${isWishlisted(fourthProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>

              <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                {fourthProduct.title}
              </h4>
            </div>

            <div className="pt-2 border-t border-gray-800 flex items-center justify-between mt-2">
              <div>
                <p className="text-[9px] text-gray-400">À partir de</p>
                <span className="text-xs font-black text-white">
                  {formatPrice(fourthProduct.retailPrice)}
                </span>
              </div>
              <button
                onClick={(e) => handleQuickAdd(e, fourthProduct)}
                className="w-7 h-7 bg-white/10 hover:bg-blue-400 text-white hover:text-black rounded-lg flex items-center justify-center transition-colors"
                title="Ajouter au panier"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Micro-banner below Bento: Fast Link to full catalog */}
      <div className="mt-4 bg-gradient-to-r from-[#111111] via-[#161616] to-[#111111] border border-gray-800 rounded-2xl p-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FFC300]/10 flex items-center justify-center text-[#FFC300] font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white">Garantie Qualité & Authenticité Gningue Empire</span>
            <p className="text-[10px] text-gray-400">Tous les vendeurs sont soumis à vérification stricte d'identité KYC.</p>
          </div>
        </div>

        <button
          onClick={() => {
            setActiveCategory('all');
            const catalogEl = document.getElementById('catalog-section');
            if (catalogEl) {
              catalogEl.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="text-[#FFC300] hover:text-white font-bold flex items-center gap-1 transition-colors whitespace-nowrap"
        >
          <span>Voir l'ensemble du catalogue (+{products.length} articles)</span>
          <span>→</span>
        </button>
      </div>

    </section>
  );
};
