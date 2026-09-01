import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { TrendingBento } from './components/TrendingBento';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CartReminderNotification } from './components/CartReminderNotification';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerView } from './components/OrderTrackerView';
import { VendorDashboardView } from './components/VendorDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { LiveShoppingView } from './components/LiveShoppingView';
import { WishlistView } from './components/WishlistView';
import { CompareView } from './components/CompareView';
import { AIChatDrawer } from './components/AIChatDrawer';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  Store, 
  Zap, 
  Layers, 
  SlidersHorizontal, 
  CheckCircle2, 
  Search, 
  Radio, 
  Flame, 
  TrendingUp, 
  ShieldCheck, 
  X,
  Package
} from 'lucide-react';
import { ProductCategory } from './types';

function AppContent() {
  const { 
    products, 
    activeView, 
    setActiveView, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery,
    b2bOnlyFilter,
    setB2bOnlyFilter,
    setIsAIChatOpen,
    isAIChatOpen
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating' | 'sales'>('featured');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  // Filter products
  const filteredProducts = products.filter(product => {
    // Category filter
    if (activeCategory !== 'all' && product.category !== activeCategory) {
      return false;
    }

    // B2B Only filter
    if (b2bOnlyFilter && !product.b2bAvailable) {
      return false;
    }

    // Subcategory filter
    if (selectedSubCategory !== 'all' && product.subcategory !== selectedSubCategory) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchVendor = product.vendorName.toLowerCase().includes(q);
      const matchSub = product.subcategory.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchVendor && !matchSub) {
        return false;
      }
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_asc') return a.retailPrice - b.retailPrice;
    if (sortBy === 'price_desc') return b.retailPrice - a.retailPrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'sales') return b.salesCount - a.salesCount;
    return 0; // featured
  });

  // Extract distinct subcategories based on current activeCategory
  const subCategories = Array.from(
    new Set(
      products
        .filter(p => activeCategory === 'all' || p.category === activeCategory)
        .map(p => p.subcategory)
    )
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-[#FFC300] selection:text-black">
      
      {/* Universal Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME & PRODUCT CATALOG */}
        {activeView === 'home' && (
          <div>
            
            {/* Show Hero & Trending Bento only when no specific search is active */}
            {!searchQuery && (
              <>
                <HeroBanner />
                <TrendingBento />
              </>
            )}

            {/* Catalog Section */}
            <div id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
              
              {/* Category & Filters Header Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#111111] p-4 rounded-2xl border border-gray-800 shadow-xl">
                
                {/* 3 Pillars Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
                  <button
                    onClick={() => { setActiveCategory('all'); setSelectedSubCategory('all'); }}
                    className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                      activeCategory === 'all'
                        ? 'bg-[#FFC300] text-black shadow-md shadow-[#FFC300]/20'
                        : 'bg-[#1A1A1A] text-gray-300 hover:text-white border border-gray-800'
                    }`}
                  >
                    Tous les Articles ({products.length})
                  </button>

                  <button
                    onClick={() => { setActiveCategory('physique'); setSelectedSubCategory('all'); }}
                    className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      activeCategory === 'physique'
                        ? 'bg-[#FFC300] text-black shadow-md shadow-[#FFC300]/20'
                        : 'bg-[#1A1A1A] text-gray-300 hover:text-white border border-gray-800'
                    }`}
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Physique (Gros & Détail)</span>
                  </button>

                  <button
                    onClick={() => { setActiveCategory('digital'); setSelectedSubCategory('all'); }}
                    className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      activeCategory === 'digital'
                        ? 'bg-[#FFC300] text-black shadow-md shadow-[#FFC300]/20'
                        : 'bg-[#1A1A1A] text-gray-300 hover:text-white border border-gray-800'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-green-400" />
                    <span>Abonnements Digitaux ⚡</span>
                  </button>

                  <button
                    onClick={() => { setActiveCategory('service'); setSelectedSubCategory('all'); }}
                    className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      activeCategory === 'service'
                        ? 'bg-[#FFC300] text-black shadow-md shadow-[#FFC300]/20'
                        : 'bg-[#1A1A1A] text-gray-300 hover:text-white border border-gray-800'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5 text-blue-400" />
                    <span>Boutiques & Services Clé en Main</span>
                  </button>
                </div>

                {/* Right Side Filters (B2B Toggle + Sort Selector) */}
                <div className="flex items-center gap-3 text-xs">
                  
                  {/* B2B Wholesale Filter Toggle */}
                  <label className="flex items-center gap-2 bg-[#1A1A1A] px-3 py-2 rounded-xl border border-gray-700 cursor-pointer text-gray-300 hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      checked={b2bOnlyFilter}
                      onChange={(e) => setB2bOnlyFilter(e.target.checked)}
                      className="rounded border-gray-700 text-[#FFC300] focus:ring-[#FFC300]"
                    />
                    <span className="font-semibold text-xs flex items-center gap-1">
                      <Store className="w-3.5 h-3.5 text-[#FFC300]" /> Tarifs Gros B2B Seulement
                    </span>
                  </label>

                  {/* Sort by dropdown */}
                  <div className="flex items-center gap-1.5 bg-[#1A1A1A] px-3 py-2 rounded-xl border border-gray-700">
                    <span className="text-gray-400 text-[11px]">Trier :</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="featured" className="bg-[#1A1A1A]">Pertinence & Vedettes</option>
                      <option value="price_asc" className="bg-[#1A1A1A]">Prix : Moins cher</option>
                      <option value="price_desc" className="bg-[#1A1A1A]">Prix : Plus cher</option>
                      <option value="sales" className="bg-[#1A1A1A]">Meilleures Ventes 🔥</option>
                      <option value="rating" className="bg-[#1A1A1A]">Mieux Notés ★</option>
                    </select>
                  </div>

                </div>

              </div>

              {/* Sub-Category Chips */}
              {subCategories.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs pb-1">
                  <button
                    onClick={() => setSelectedSubCategory('all')}
                    className={`px-3 py-1 rounded-lg transition-colors font-medium whitespace-nowrap ${
                      selectedSubCategory === 'all'
                        ? 'bg-[#FFC300]/15 text-[#FFC300] font-bold border border-[#FFC300]/30'
                        : 'bg-[#1A1A1A] text-gray-400 hover:text-white border border-gray-800'
                    }`}
                  >
                    Toutes les sous-catégories
                  </button>

                  {subCategories.map((sub, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSubCategory(sub)}
                      className={`px-3 py-1 rounded-lg transition-colors font-medium whitespace-nowrap ${
                        selectedSubCategory === sub
                          ? 'bg-[#FFC300]/15 text-[#FFC300] font-bold border border-[#FFC300]/30'
                          : 'bg-[#1A1A1A] text-gray-400 hover:text-white border border-gray-800'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}

              {/* Active Search / Filter Indicator */}
              {(searchQuery || b2bOnlyFilter || activeCategory !== 'all' || selectedSubCategory !== 'all') && (
                <div className="flex items-center justify-between bg-[#111111] px-4 py-2 rounded-xl border border-gray-800 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-[#FFC300]" />
                    <span>
                      {sortedProducts.length} résultat(s) trouvé(s)
                      {searchQuery && <> pour « <strong className="text-white">{searchQuery}</strong> »</>}
                      {b2bOnlyFilter && <> avec <strong className="text-[#FFC300]">prix de gros B2B</strong></>}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setB2bOnlyFilter(false);
                      setActiveCategory('all');
                      setSelectedSubCategory('all');
                    }}
                    className="text-[#FFC300] hover:underline font-semibold flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Réinitialiser</span>
                  </button>
                </div>
              )}

              {/* Products Grid */}
              {sortedProducts.length === 0 ? (
                <div className="text-center py-20 bg-[#111111] rounded-2xl border border-gray-800 space-y-4">
                  <Package className="w-16 h-16 text-gray-600 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Aucun produit ne correspond à vos critères.</h3>
                  <p className="text-xs text-gray-400">Essayez d'ajuster vos filtres ou effectuez une recherche différente.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setB2bOnlyFilter(false);
                      setActiveCategory('all');
                      setSelectedSubCategory('all');
                    }}
                    className="px-5 py-2.5 bg-[#FFC300] text-black font-extrabold text-xs rounded-xl"
                  >
                    Voir tous les produits
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

            </div>

          </div>
        )}

        {/* VIEW 2: VENDOR DASHBOARD */}
        {activeView === 'vendor_dashboard' && <VendorDashboardView />}

        {/* VIEW 3: SUPER ADMIN DASHBOARD */}
        {activeView === 'admin_dashboard' && <AdminDashboardView />}

        {/* VIEW 4: ORDERS & GPS TRACKER */}
        {activeView === 'orders' && <OrderTrackerView />}

        {/* VIEW 5: LIVE SHOPPING SHOW */}
        {activeView === 'live_shopping' && <LiveShoppingView />}

        {/* VIEW 6: WISHLIST */}
        {activeView === 'wishlist' && <WishlistView />}

        {/* VIEW 7: COMPARE VIEW */}
        {activeView === 'compare' && <CompareView />}

      </main>

      {/* Floating AI Shopping Assistant Bubble */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAIChatOpen(!isAIChatOpen)}
          className="group relative p-4 rounded-2xl bg-gradient-to-tr from-[#FFC300] via-[#F39C12] to-purple-600 text-black font-bold shadow-2xl shadow-[#FFC300]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
          title="Gningue AI Assistant"
        >
          <Sparkles className="w-6 h-6 text-black animate-spin-slow" />
          <span className="hidden md:inline font-extrabold text-xs tracking-tight">
            GNINGUE AI (Assistant Vente)
          </span>
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] text-white font-black items-center justify-center">
              1
            </span>
          </span>
        </button>
      </div>

      {/* Modal Dialogs & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CartReminderNotification />
      <CheckoutModal />
      <AIChatDrawer />

      {/* Universal Footer */}
      <Footer />

    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
