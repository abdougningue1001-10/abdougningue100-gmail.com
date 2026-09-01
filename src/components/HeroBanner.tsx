import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Store, 
  Truck, 
  CreditCard, 
  Radio, 
  ArrowRight, 
  CheckCircle2, 
  Send,
  Coins,
  Layers,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { 
    setActiveView, 
    setActiveCategory, 
    setB2bOnlyFilter, 
    setIsAIChatOpen,
    sendChatMessage,
    showToast
  } = useApp();

  const [aiMiniPrompt, setAiMiniPrompt] = useState('');

  const handleMiniAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMiniPrompt.trim()) return;
    const query = aiMiniPrompt;
    setAiMiniPrompt('');
    setIsAIChatOpen(true);
    sendChatMessage(query);
  };

  const handleQuickAiQuestion = (question: string) => {
    setIsAIChatOpen(true);
    sendChatMessage(question);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(120px,auto)]">
        
        {/* BENTO CELL 1: Univers Gningue Categories & Live Shopping (Col 3, Row span) */}
        <div className="md:col-span-3 bg-[#111111] border border-gray-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#FFC300] text-xs font-bold uppercase tracking-widest">Univers Gningue</h3>
              <span className="text-[10px] text-gray-500 font-bold">3 Piliers</span>
            </div>

            <div className="space-y-3">
              {/* Category 1: Physique */}
              <div 
                onClick={() => { setActiveCategory('physique'); setActiveView('home'); }}
                className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-xl border border-gray-700 hover:border-[#FFC300] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-[#FFC300] text-base group-hover:scale-105 transition-transform">
                    📦
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-[#FFC300] transition-colors">Physique</p>
                    <p className="text-[10px] text-gray-400">Gros & Détail</p>
                  </div>
                </div>
                <div className="text-gray-500 group-hover:text-[#FFC300] transition-colors font-bold text-sm">→</div>
              </div>

              {/* Category 2: Digital */}
              <div 
                onClick={() => { setActiveCategory('digital'); setActiveView('home'); }}
                className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-xl border border-gray-700 hover:border-[#FFC300] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-green-400 text-base group-hover:scale-105 transition-transform">
                    ⚡
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">Digital</p>
                    <p className="text-[10px] text-gray-400">Livraison Auto (3s)</p>
                  </div>
                </div>
                <div className="text-gray-500 group-hover:text-green-400 transition-colors font-bold text-sm">→</div>
              </div>

              {/* Category 3: Services */}
              <div 
                onClick={() => { setActiveCategory('service'); setActiveView('home'); }}
                className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-xl border border-gray-700 hover:border-[#FFC300] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-blue-400 text-base group-hover:scale-105 transition-transform">
                    🛠️
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Services</p>
                    <p className="text-[10px] text-gray-400">Boutiques & Freelance</p>
                  </div>
                </div>
                <div className="text-gray-500 group-hover:text-blue-400 transition-colors font-bold text-sm">→</div>
              </div>
            </div>
          </div>

          {/* Live Shopping Sub-Card */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div 
              onClick={() => setActiveView('live_shopping')}
              className="bg-gradient-to-br from-[#1A1A1A] to-black p-3.5 rounded-xl border border-[#FFC300]/20 hover:border-[#FFC300]/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <p className="text-[10px] text-[#FFC300] uppercase font-black tracking-wider">Live Shopping</p>
                </div>
                <span className="text-[10px] text-gray-400 group-hover:text-white">Regarder →</span>
              </div>
              <p className="text-xs text-gray-300 leading-tight">Rejoignez 14 vendeurs et +3 800 acheteurs en direct.</p>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border-2 border-black bg-red-500 flex items-center justify-center text-[8px] font-bold text-white">DK</div>
                  <div className="w-6 h-6 rounded-full border-2 border-black bg-amber-500 flex items-center justify-center text-[8px] font-bold text-black">AB</div>
                  <div className="w-6 h-6 rounded-full border-2 border-black bg-purple-500 flex items-center justify-center text-[8px] font-bold text-white">CI</div>
                  <div className="w-6 h-6 rounded-full border-2 border-black bg-gray-700 flex items-center justify-center text-[8px] font-bold text-gray-300">+11</div>
                </div>
                <span className="text-[10px] bg-red-500/20 text-red-400 font-bold px-2 py-0.5 rounded-full uppercase">Direct</span>
              </div>
            </div>
          </div>
        </div>

        {/* BENTO CELL 2: Main Hero Centerpiece (Col 6, Span) */}
        <div className="md:col-span-6 relative overflow-hidden rounded-2xl bg-gradient-to-r from-black via-[#111111] to-[#1A1A1A] border border-gray-800 p-6 sm:p-8 flex flex-col justify-between shadow-2xl group">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFC300]/10 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-block bg-[#FFC300] text-black text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                Nouvelle Ère E-Commerce
              </span>
              <span className="text-gray-400 text-xs hidden sm:inline">• B2B + B2C + Digital</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading leading-[0.95] text-white tracking-tight">
              TOUT LE MONDE VEND,<br />
              <span className="text-[#FFC300]">TOUT LE MONDE GAGNE.</span>
            </h1>

            <p className="text-gray-400 text-xs sm:text-sm max-w-md italic leading-relaxed">
              « L'hybride parfait entre Alibaba (gros usine), Amazon (détail express & GPS) et le marketplace digital africain. »
            </p>
          </div>

          <div className="relative z-10 pt-6 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveView('home');
              }}
              className="bg-[#FFC300] hover:bg-[#e6b000] text-black px-5 py-2.5 rounded-full font-extrabold text-xs flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#FFC300]/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Acheter Maintenant</span>
            </button>

            <button
              onClick={() => setActiveView('vendor_dashboard')}
              className="bg-transparent border border-gray-700 hover:border-[#FFC300] hover:bg-white/5 text-white px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Store className="w-4 h-4 text-[#FFC300]" />
              <span>Devenir Vendeur</span>
            </button>

            <button
              onClick={() => {
                setB2bOnlyFilter(true);
                setActiveView('home');
              }}
              className="bg-[#1A1A1A] hover:bg-[#242424] text-gray-300 hover:text-white px-4 py-2.5 rounded-full font-bold text-xs border border-gray-800 transition-colors hidden sm:flex items-center gap-1.5"
            >
              <span>Tarifs Gros B2B</span>
              <span className="text-[#FFC300]">→</span>
            </button>
          </div>
        </div>

        {/* BENTO CELL 3: Gningue AI Assistant Bento Box (Col 3) */}
        <div className="md:col-span-3 bg-[#111111] border border-gray-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Gningue AI Assistant</h3>
              </div>
              <span className="text-[10px] bg-[#FFC300]/10 text-[#FFC300] font-bold px-2 py-0.5 rounded">Gemini Flash</span>
            </div>

            <div className="bg-[#0A0A0A] rounded-xl border border-gray-800 p-3 space-y-2.5 text-[11px] leading-relaxed">
              <div className="text-[10px] text-gray-500 italic flex items-center justify-between">
                <span>Disponible en Wolof, FR, EN</span>
                <Sparkles className="w-3 h-3 text-[#FFC300]" />
              </div>

              {/* Bot greeting */}
              <div className="flex gap-2">
                <div className="w-5 h-5 rounded-full bg-[#FFC300] flex items-center justify-center text-black font-black text-[9px] shrink-0 mt-0.5">
                  AI
                </div>
                <div className="bg-[#1A1A1A] p-2 rounded-lg text-gray-300 text-[11px] border border-gray-800">
                  Bonjour ! Je peux vous aider à trouver un abonnement Netflix ou négocier un tarif de gros B2B.
                </div>
              </div>

              {/* Quick Suggestion chip */}
              <div 
                onClick={() => handleQuickAiQuestion("Où est ma dernière commande et mon livreur ?")}
                className="flex gap-2 justify-end cursor-pointer group"
              >
                <div className="bg-[#FFC300]/10 hover:bg-[#FFC300]/20 text-[#FFC300] p-2 rounded-lg border border-[#FFC300]/20 font-medium text-[10px] transition-colors">
                  📍 Où est ma dernière commande ?
                </div>
              </div>
            </div>
          </div>

          {/* Direct Input trigger */}
          <form onSubmit={handleMiniAiSubmit} className="mt-3 flex gap-2">
            <input
              type="text"
              value={aiMiniPrompt}
              onChange={(e) => setAiMiniPrompt(e.target.value)}
              placeholder="Posez une question à l'IA..."
              className="flex-1 bg-[#1A1A1A] border border-gray-700 rounded-lg py-2 px-3 text-[11px] text-white placeholder-gray-500 outline-none focus:border-[#FFC300]"
            />
            <button
              type="submit"
              className="bg-[#FFC300] hover:bg-[#e6b000] text-black w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* BENTO CELL 4: Admin Commission 1% Fixe Solid Gold Card (Col 3) */}
        <div className="md:col-span-3 bg-[#FFC300] rounded-2xl p-5 text-black flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[10px] font-black uppercase tracking-widest opacity-80">Admin Commission</h3>
              <span className="bg-black text-[#FFC300] text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Équitable</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black tracking-tight mb-3">1% <span className="text-base font-bold">Fixe</span></p>

            <div className="bg-black/5 p-3 rounded-xl border border-black/10 text-xs space-y-1">
              <p className="text-[9px] font-bold uppercase opacity-70">Simulation Vente Standard</p>
              <div className="flex justify-between font-bold">
                <span>Prix Produit :</span>
                <span>10 000 FCFA</span>
              </div>
              <div className="flex justify-between text-xs opacity-75">
                <span>Gningue Fee (1%) :</span>
                <span>- 100 FCFA</span>
              </div>
              <div className="h-[1px] bg-black/10 my-1"></div>
              <div className="flex justify-between font-black text-sm text-black">
                <span>Net Vendeur :</span>
                <span>9 900 FCFA</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] italic font-semibold leading-tight mt-3 text-black/80">
            « L'écosystème le plus rentable pour les commerçants africains. »
          </p>
        </div>

        {/* BENTO CELL 5: Boutiques & Grossistes à la Une (Col 6) */}
        <div className="md:col-span-6 bg-[#111111] border border-gray-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Boutiques à la Une</h3>
                <p className="text-[10px] text-gray-500">Vendeurs certifiés & Grossistes Gningue Empire</p>
              </div>
              <button 
                onClick={() => { setActiveView('home'); }}
                className="text-[10px] text-[#FFC300] font-bold hover:underline"
              >
                Explorer tout →
              </button>
            </div>

            {/* 3 Featured Stores Bento Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div 
                onClick={() => { setActiveView('home'); showToast("Boutique Bio Afrique sélectionnée"); }}
                className="bg-[#1A1A1A] p-3 rounded-xl border border-gray-800 hover:border-[#FFC300]/50 transition-colors cursor-pointer text-center group"
              >
                <div className="w-10 h-10 bg-white/5 rounded-full mx-auto mb-2 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                  🍏
                </div>
                <p className="text-xs font-bold text-white truncate">Bio Afrique</p>
                <p className="text-[9px] text-green-400 font-bold">98% Avis Positifs</p>
              </div>

              <div 
                onClick={() => { setB2bOnlyFilter(true); setActiveView('home'); }}
                className="bg-[#1A1A1A] p-3 rounded-xl border border-gray-800 hover:border-[#FFC300]/50 transition-colors cursor-pointer text-center group"
              >
                <div className="w-10 h-10 bg-white/5 rounded-full mx-auto mb-2 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                  💻
                </div>
                <p className="text-xs font-bold text-white truncate">Tech Hub Sarl</p>
                <p className="text-[9px] text-[#FFC300] font-bold">Top Grossiste B2B</p>
              </div>

              <div 
                onClick={() => { setActiveCategory('digital'); setActiveView('home'); }}
                className="bg-[#1A1A1A] p-3 rounded-xl border border-gray-800 hover:border-[#FFC300]/50 transition-colors cursor-pointer text-center group"
              >
                <div className="w-10 h-10 bg-white/5 rounded-full mx-auto mb-2 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                  📺
                </div>
                <p className="text-xs font-bold text-white truncate">Media Stream</p>
                <p className="text-[9px] text-green-400 font-bold">Vente Instantanée</p>
              </div>
            </div>
          </div>

          {/* 1-Click IA Massive Import Banner */}
          <div className="mt-4 bg-[#0A0A0A] p-3 rounded-xl border border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#FFC300]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Importation Massive & Fiches IA</p>
                <p className="text-[10px] text-gray-500">Synchronisez vos produits Alibaba & 1688 en 1 clic.</p>
              </div>
            </div>
            <button
              onClick={() => setActiveView('vendor_dashboard')}
              className="bg-white hover:bg-[#FFC300] text-black px-3.5 py-1.5 rounded-lg text-[10px] font-bold transition-colors whitespace-nowrap"
            >
              Essayer
            </button>
          </div>
        </div>

        {/* BENTO CELL 6 & 7: Moyens de Paiement & KYC Verified Status (Col 3, 2-row stack) */}
        <div className="md:col-span-3 flex flex-col gap-4">
          
          {/* Payment gateways */}
          <div className="bg-[#111111] border border-gray-800 rounded-2xl p-4 flex-1 flex flex-col justify-between shadow-xl">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Moyens de Paiement</h3>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 bg-[#1A1A1A] border border-gray-700 rounded-lg text-[10px] font-bold text-blue-400">
                WAVE
              </span>
              <span className="px-2.5 py-1 bg-[#1A1A1A] border border-gray-700 rounded-lg text-[10px] font-bold text-orange-400">
                ORANGE MONEY
              </span>
              <span className="px-2.5 py-1 bg-[#1A1A1A] border border-gray-700 rounded-lg text-[10px] font-bold text-yellow-400">
                MTN MOMO
              </span>
              <span className="px-2.5 py-1 bg-[#1A1A1A] border border-gray-700 rounded-lg text-[10px] font-bold text-green-400">
                USDT / BTC
              </span>
              <span className="px-2.5 py-1 bg-[#1A1A1A] border border-gray-700 rounded-lg text-[10px] font-bold text-gray-200">
                VISA / MC
              </span>
            </div>
            <p className="text-[9px] text-gray-500 mt-2">Paiement 100% sécurisé multi-canaux</p>
          </div>

          {/* KYC Verified & Escrow Status */}
          <div className="bg-[#111111] border border-gray-800 rounded-2xl p-4 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 bg-[#FFC300] rounded-full animate-ping-slow"></div>
              <div>
                <span className="text-[11px] font-bold text-white tracking-tight block">KYC VERIFIED STATUS</span>
                <span className="text-[9px] text-gray-400">Garantie Escrow 48h active</span>
              </div>
            </div>
            <div className="text-[#FFC300] text-lg font-black font-heading">99%</div>
          </div>

        </div>

      </div>

    </div>
  );
};
