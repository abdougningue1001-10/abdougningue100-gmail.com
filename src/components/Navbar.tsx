import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Heart, 
  Layers, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Globe, 
  Coins, 
  User, 
  Radio, 
  Package, 
  Store, 
  SlidersHorizontal,
  ChevronDown,
  Menu,
  X,
  Zap,
  Tag,
  Cpu,
  Tv,
  LayoutGrid
} from 'lucide-react';
import { ProductCategory } from '../types';

export const Navbar: React.FC = () => {
  const { 
    cart, 
    setIsCartOpen, 
    wishlist, 
    compareList, 
    currency, 
    setCurrency, 
    language, 
    setLanguage, 
    currentUser, 
    switchUserRole, 
    activeView, 
    setActiveView, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery,
    b2bOnlyFilter,
    setB2bOnlyFilter,
    formatPrice
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCategoryClick = (cat: ProductCategory | 'all') => {
    setActiveCategory(cat);
    setActiveView('home');
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F0F0F]/98 backdrop-blur-md border-b border-gray-800 text-white">
      {/* Top micro announcement bar */}
      <div className="bg-[#0A0A0A] text-xs py-1.5 px-4 border-b border-gray-800/80 flex justify-between items-center text-gray-300">
        <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center gap-1 text-[#FFC300] font-bold">
            <Zap className="w-3.5 h-3.5" /> GNINGUE EMPIRE
          </span>
          <span className="hidden sm:inline text-gray-600">|</span>
          <span className="hidden sm:inline text-gray-400 text-[11px]">
            GLOBAL AFRICAN MARKETPLACE • « Tout le monde vend, tout le monde gagne. »
          </span>
          <span className="bg-[#FFC300]/10 text-[#FFC300] border border-[#FFC300]/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Garantie Escrow 48h
          </span>
        </div>

        {/* Currency, Lang & Live switchers */}
        <div className="flex items-center gap-3 text-xs">
          {/* Live Shopping pill */}
          <button 
            onClick={() => setActiveView('live_shopping')}
            className="flex items-center gap-1.5 bg-red-600/90 hover:bg-red-600 text-white px-2.5 py-0.5 rounded-full font-medium transition-all shadow-sm shadow-red-500/30 animate-pulse"
          >
            <Radio className="w-3 h-3" />
            <span className="hidden md:inline text-[11px] font-bold">Live Shopping</span>
          </button>

          {/* Loyalty Coins */}
          <div className="hidden lg:flex items-center gap-1 text-[#FFC300] font-medium bg-[#1A1A1A] px-2.5 py-0.5 rounded-lg border border-gray-700">
            <Coins className="w-3.5 h-3.5" />
            <span className="text-[11px]">{currentUser.gningueCoins} Coins</span>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-[#1A1A1A] px-2 py-0.5 rounded-lg border border-gray-700">
            {(['XOF', 'EUR', 'USD'] as const).map(cur => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  currency === cur ? 'bg-[#FFC300] text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {cur}
              </button>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors bg-[#1A1A1A] px-2 py-0.5 rounded-lg border border-gray-700"
            >
              <Globe className="w-3.5 h-3.5 text-[#FFC300]" />
              <span className="font-semibold text-[11px]">{language === 'WO' ? '🇸🇳 Wolof' : language === 'FR' ? '🇫🇷 FR' : '🇬🇧 EN'}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#111111] border border-gray-800 rounded-xl shadow-xl py-1 z-50">
                <button
                  onClick={() => { setLanguage('FR'); setIsLangDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#1A1A1A] text-xs flex items-center gap-2 text-gray-300 hover:text-white"
                >
                  <span>🇫🇷</span> Français
                </button>
                <button
                  onClick={() => { setLanguage('WO'); setIsLangDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#1A1A1A] text-xs flex items-center gap-2 text-[#FFC300]"
                >
                  <span>🇸🇳</span> Wolof
                </button>
                <button
                  onClick={() => { setLanguage('EN'); setIsLangDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#1A1A1A] text-xs flex items-center gap-2 text-gray-300 hover:text-white"
                >
                  <span>🇬🇧</span> English
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveView('home'); setActiveCategory('all'); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FFC300] via-[#F39C12] to-[#FFD700] p-0.5 shadow-lg shadow-[#FFC300]/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#0A0A0A] rounded-[10px] flex items-center justify-center">
                <span className="font-black text-xl font-heading text-[#FFC300] tracking-tighter">GE</span>
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight font-heading flex items-center gap-1 text-white">
                GNINGUE <span className="text-[#FFC300]">EMPIRE</span>
              </span>
              <p className="text-[10px] text-gray-400 -mt-1 tracking-wider uppercase font-semibold hidden sm:block">
                GLOBAL AFRICAN MARKETPLACE
              </p>
            </div>
          </div>

          {/* Search Bar with AI tag */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <div className="relative w-full flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher parmi +100 000 produits gros/détail, Netflix, Canva, Shopify..."
                className="w-full bg-[#1A1A1A] text-sm text-white placeholder-gray-500 pl-10 pr-24 py-2 rounded-full border border-gray-700 focus:outline-none focus:border-[#FFC300] focus:ring-1 focus:ring-[#FFC300] transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
              <button 
                onClick={() => { setActiveView('home'); }}
                className="absolute right-1.5 bg-[#FFC300] hover:bg-[#e6b000] text-black text-xs font-extrabold px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1 shadow-sm"
              >
                <Sparkles className="w-3 h-3" />
                <span>Chercher</span>
              </button>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* B2B Wholesale Quick Toggle Button */}
            <button
              onClick={() => {
                setB2bOnlyFilter(!b2bOnlyFilter);
                if (activeView !== 'home') setActiveView('home');
              }}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                b2bOnlyFilter 
                  ? 'bg-[#FFC300] text-black border-[#FFC300] shadow-md shadow-[#FFC300]/20' 
                  : 'bg-[#1A1A1A] text-gray-300 border-gray-700 hover:border-[#FFC300]/50'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-[#FFC300]" />
              <span>Gros B2B</span>
              {b2bOnlyFilter && <span className="w-2 h-2 rounded-full bg-black"></span>}
            </button>

            {/* Compare Tool */}
            <button
              onClick={() => setActiveView('compare')}
              className={`relative p-2 rounded-xl border transition-colors ${
                activeView === 'compare' ? 'bg-[#FFC300]/20 border-[#FFC300] text-[#FFC300]' : 'bg-[#1A1A1A] border-gray-700 text-gray-300 hover:text-white'
              }`}
              title="Comparateur de produits"
            >
              <Layers className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FFC300] text-black font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActiveView('wishlist')}
              className={`relative p-2 rounded-xl border transition-colors ${
                activeView === 'wishlist' ? 'bg-[#FFC300]/20 border-[#FFC300] text-[#FFC300]' : 'bg-[#1A1A1A] border-gray-700 text-gray-300 hover:text-white'
              }`}
              title="Mes Favoris"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3 py-2 bg-[#FFC300] text-black hover:bg-[#e6b000] rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-[#FFC300]/20"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-black hidden sm:inline">Panier</span>
              {cartItemCount > 0 && (
                <span className="bg-black text-[#FFC300] font-black text-xs px-1.5 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Account / Role Switcher Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#1A1A1A] border border-gray-700 hover:border-gray-500 transition-all text-xs"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#FFC300]"
                />
                <div className="hidden lg:block text-left">
                  <div className="font-bold text-white text-xs truncate max-w-[100px]">{currentUser.name}</div>
                  <div className="text-[10px] text-[#FFC300] uppercase font-semibold">
                    {currentUser.role === 'superadmin' ? '👑 Super Admin' : currentUser.role === 'vendor' ? '🏪 Vendeur' : '🛍️ Client'}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {/* Account Dropdown */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#111111] border border-gray-800 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl">
                  <div className="px-4 py-2 border-b border-gray-800">
                    <p className="text-xs text-gray-400">Compte actif</p>
                    <p className="font-bold text-white text-sm">{currentUser.name}</p>
                    <p className="text-xs text-gray-400">{currentUser.email}</p>
                    <div className="mt-2 flex items-center justify-between text-xs bg-[#1A1A1A] p-2 rounded-lg border border-gray-800">
                      <span className="text-gray-300">Solde Gningue Coins:</span>
                      <span className="font-bold text-[#FFC300]">{currentUser.gningueCoins} pts</span>
                    </div>
                  </div>

                  <div className="px-2 py-1">
                    <p className="px-3 py-1 text-[10px] uppercase tracking-wider text-gray-400 font-bold">Changer de profil (Simulation)</p>
                    
                    <button
                      onClick={() => { switchUserRole('superadmin'); setActiveView('admin_dashboard'); setIsUserDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        currentUser.role === 'superadmin' ? 'bg-[#FFC300]/15 text-[#FFC300] font-bold' : 'hover:bg-[#1A1A1A] text-gray-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">👑 Super Admin (Propriétaire)</span>
                      <span className="text-[10px] text-gray-400">1% Comms</span>
                    </button>

                    <button
                      onClick={() => { switchUserRole('vendor'); setActiveView('vendor_dashboard'); setIsUserDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        currentUser.role === 'vendor' ? 'bg-[#FFC300]/15 text-[#FFC300] font-bold' : 'hover:bg-[#1A1A1A] text-gray-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">🏪 Vendeur (Dakar Tech Hub)</span>
                      <span className="text-[10px] text-gray-400">Wallet</span>
                    </button>

                    <button
                      onClick={() => { switchUserRole('buyer'); setActiveView('orders'); setIsUserDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        currentUser.role === 'buyer' ? 'bg-[#FFC300]/15 text-[#FFC300] font-bold' : 'hover:bg-[#1A1A1A] text-gray-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">🛍️ Client Particulier (Fatou)</span>
                      <span className="text-[10px] text-gray-400">Commandes</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-800 pt-1 px-2">
                    <button
                      onClick={() => { setActiveView('orders'); setIsUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#1A1A1A] text-xs text-gray-300 flex items-center gap-2"
                    >
                      <Package className="w-4 h-4 text-[#FFC300]" />
                      <span>Mes Commandes & Suivi GPS</span>
                    </button>
                    <button
                      onClick={() => { setActiveView('vendor_dashboard'); setIsUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#1A1A1A] text-xs text-[#FFC300] font-semibold flex items-center gap-2"
                    >
                      <Store className="w-4 h-4" />
                      <span>Espace Vendeur & Ajout Produit IA</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#1A1A1A] text-gray-300 border border-gray-700"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Category Navigation Bar & Mega Menu */}
        <div className="mt-3 pt-2 border-t border-gray-800 flex items-center justify-between text-xs overflow-x-auto scrollbar-none gap-2">
          <div className="flex items-center gap-2 whitespace-nowrap">
            
            {/* Mega menu trigger button */}
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                isMegaMenuOpen ? 'bg-[#FFC300] text-black' : 'bg-[#1A1A1A] text-white hover:bg-[#252525] border border-gray-700'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Toutes les Catégories</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* 3 Grand Categories Tabs */}
            <button
              onClick={() => handleCategoryClick('physique')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeCategory === 'physique' && activeView === 'home'
                  ? 'bg-white/15 text-[#FFC300] font-bold border border-[#FFC300]/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              📦 Produits Physiques (Gros & Détail)
            </button>

            <button
              onClick={() => handleCategoryClick('digital')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                activeCategory === 'digital' && activeView === 'home'
                  ? 'bg-white/15 text-[#FFC300] font-bold border border-[#FFC300]/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-3 h-3 text-[#FFC300]" />
              <span>Abonnements & Codes Digitaux</span>
              <span className="bg-[#FFC300]/20 text-[#FFC300] text-[9px] px-1.5 py-0.2 rounded font-bold">Auto</span>
            </button>

            <button
              onClick={() => handleCategoryClick('service')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeCategory === 'service' && activeView === 'home'
                  ? 'bg-white/15 text-[#FFC300] font-bold border border-[#FFC300]/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              🚀 Services & Boutiques Shopify
            </button>
          </div>

          {/* Quick links on right */}
          <div className="hidden lg:flex items-center gap-4 text-gray-400 font-medium whitespace-nowrap">
            <button 
              onClick={() => setActiveView('orders')}
              className="hover:text-[#FFC300] flex items-center gap-1 transition-colors"
            >
              <Package className="w-3.5 h-3.5" /> Suivre un Colis
            </button>
            <button 
              onClick={() => setActiveView('vendor_dashboard')}
              className="hover:text-[#FFC300] flex items-center gap-1 transition-colors"
            >
              <Store className="w-3.5 h-3.5" /> Vendre sur Gningue (+ IA)
            </button>
          </div>
        </div>

        {/* MEGA MENU POPOVER */}
        {isMegaMenuOpen && (
          <div className="absolute left-0 right-0 top-full bg-[#111111]/98 border-b border-gray-800 shadow-2xl backdrop-blur-2xl p-6 z-50">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Category A: Physical Goods */}
              <div className="bg-[#181B26] p-4 rounded-2xl border border-white/10 hover:border-[#FFC300]/40 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-[#FFC300]/10 rounded-xl text-[#FFC300]">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Produits Physiques</h3>
                    <p className="text-[11px] text-gray-400">Vente en gros (Alibaba) & détail (Amazon)</p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li 
                    onClick={() => handleCategoryClick('physique')} 
                    className="hover:text-[#FFC300] cursor-pointer flex items-center justify-between"
                  >
                    <span>📱 Smartphones & Tablettes (Apple, Samsung, Xiaomi)</span>
                    <span className="text-[10px] text-gray-500">B2B/B2C</span>
                  </li>
                  <li 
                    onClick={() => handleCategoryClick('physique')} 
                    className="hover:text-[#FFC300] cursor-pointer flex items-center justify-between"
                  >
                    <span>☀️ Solaire, Onduleurs & Batteries Lithium</span>
                    <span className="text-[10px] text-[#FFC300]">Gros</span>
                  </li>
                  <li 
                    onClick={() => handleCategoryClick('physique')} 
                    className="hover:text-[#FFC300] cursor-pointer flex items-center justify-between"
                  >
                    <span>👑 Bazin Riche, Boubous & Mode Africaine</span>
                    <span className="text-[10px] text-gray-500">Luxe</span>
                  </li>
                  <li 
                    onClick={() => handleCategoryClick('physique')} 
                    className="hover:text-[#FFC300] cursor-pointer flex items-center justify-between"
                  >
                    <span>👟 Sneakers, Chaussures & Accessoires</span>
                  </li>
                </ul>
              </div>

              {/* Category B: Digital Goods */}
              <div className="bg-[#181B26] p-4 rounded-2xl border border-white/10 hover:border-[#FFC300]/40 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-[#FFC300]/10 rounded-xl text-[#FFC300]">
                    <Tv className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Produits & Abonnements Digitaux</h3>
                    <p className="text-[11px] text-gray-400">Livraison automatique de codes par SMS/Email</p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li 
                    onClick={() => handleCategoryClick('digital')} 
                    className="hover:text-[#FFC300] cursor-pointer flex items-center justify-between"
                  >
                    <span>🎬 Netflix 4K UHD, Prime Video, Spotify, YouTube</span>
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-1 rounded">Instantané</span>
                  </li>
                  <li 
                    onClick={() => handleCategoryClick('digital')} 
                    className="hover:text-[#FFC300] cursor-pointer flex items-center justify-between"
                  >
                    <span>📡 IPTV Smarters Pro 4K (25.000+ Chaînes)</span>
                    <span className="text-[10px] text-[#FFC300]">Best-Seller</span>
                  </li>
                  <li 
                    onClick={() => handleCategoryClick('digital')} 
                    className="hover:text-[#FFC300] cursor-pointer flex items-center justify-between"
                  >
                    <span>🎨 Canva Pro Lifetime, Office 365, Adobe CC</span>
                  </li>
                  <li 
                    onClick={() => handleCategoryClick('digital')} 
                    className="hover:text-[#FFC300] cursor-pointer flex items-center justify-between"
                  >
                    <span>🎮 Xbox Cloud Gaming, PlayStation Plus, VPN</span>
                  </li>
                </ul>
              </div>

              {/* Category C: Digital Services */}
              <div className="bg-[#181B26] p-4 rounded-2xl border border-white/10 hover:border-[#FFC300]/40 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-[#FFC300]/10 rounded-xl text-[#FFC300]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Services & Boutiques Clé en Main</h3>
                    <p className="text-[11px] text-gray-400">Démos en ligne, accès admin & garanties</p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li 
                    onClick={() => handleCategoryClick('service')} 
                    className="hover:text-[#FFC300] cursor-pointer flex items-center justify-between"
                  >
                    <span>🛍️ Boutiques E-commerce Shopify Prêtes en 48h</span>
                    <span className="text-[10px] text-[#FFC300]">Clé en main</span>
                  </li>
                  <li 
                    onClick={() => handleCategoryClick('service')} 
                    className="hover:text-[#FFC300] cursor-pointer flex items-center justify-between"
                  >
                    <span>🎨 Création Logos 3D Luxe & Charte Graphique</span>
                    <span className="text-[10px] text-gray-500">24h</span>
                  </li>
                  <li 
                    onClick={() => handleCategoryClick('service')} 
                    className="hover:text-[#FFC300] cursor-pointer flex items-center justify-between"
                  >
                    <span>💻 Templates Next.js, Flutter & Code Source</span>
                  </li>
                  <li 
                    onClick={() => handleCategoryClick('service')} 
                    className="hover:text-[#FFC300] cursor-pointer flex items-center justify-between"
                  >
                    <span>🚀 Campagnes Publicitaires Facebook & TikTok Ads</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Mobile Search Bar if mobile */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher gros, détail, Netflix..."
            className="w-full bg-[#12141C] text-xs text-white placeholder-gray-400 pl-9 pr-4 py-2 rounded-full border border-white/15 focus:outline-none focus:border-[#FFC300]"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3" />
        </div>
      </div>
    </header>
  );
};
