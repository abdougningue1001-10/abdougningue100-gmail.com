import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Sparkles, 
  Store, 
  Zap, 
  CreditCard, 
  MessageSquare, 
  Globe, 
  Smartphone,
  ChevronRight,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setActiveCategory, setB2bOnlyFilter, showToast } = useApp();

  return (
    <footer className="bg-[#0A0A0A] border-t border-gray-800 text-white mt-16">
      
      {/* Top Value Propositions */}
      <div className="border-b border-gray-800 py-10 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          
          <div className="flex items-start gap-3.5 bg-[#111111] p-4 rounded-xl border border-gray-800">
            <div className="p-2.5 bg-[#FFC300]/10 text-[#FFC300] rounded-xl shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Garantie Escrow 48h</h4>
              <p className="text-gray-400 mt-1 leading-relaxed text-[11px]">Fonds bloqués et libérés 48h après la réception certifiée de votre colis.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-[#111111] p-4 rounded-xl border border-gray-800">
            <div className="p-2.5 bg-[#FFC300]/10 text-[#FFC300] rounded-xl shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Hybride B2B & B2C</h4>
              <p className="text-gray-400 mt-1 leading-relaxed text-[11px]">Achetez à l'unité (Amazon) ou en gros conteneurs/palettes (Alibaba).</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-[#111111] p-4 rounded-xl border border-gray-800">
            <div className="p-2.5 bg-[#FFC300]/10 text-[#FFC300] rounded-xl shrink-0">
              <Zap className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Codes Instantanés (3s)</h4>
              <p className="text-gray-400 mt-1 leading-relaxed text-[11px]">Netflix, IPTV, Canva Pro, Xbox Cloud délivrés par SMS et à l'écran.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-[#111111] p-4 rounded-xl border border-gray-800">
            <div className="p-2.5 bg-[#FFC300]/10 text-[#FFC300] rounded-xl shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">1% de Commission Fixe</h4>
              <p className="text-gray-400 mt-1 leading-relaxed text-[11px]">Le taux le plus équitable du monde pour stimuler le commerce africain.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8 text-xs text-gray-400">
        
        {/* Col 1: Brand & Slogan */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FFC300] to-[#E67E22] p-0.5 flex items-center justify-center font-heading font-black text-black text-base">
              GE
            </div>
            <span className="text-xl font-black font-heading text-white">
              GNINGUE <span className="text-[#FFC300]">EMPIRE</span>
            </span>
          </div>

          <p className="text-gray-300 italic text-xs leading-relaxed">
            « Tout le monde vend, tout le monde achète, tout le monde gagne. »
          </p>

          <p className="text-gray-400 text-xs leading-relaxed">
            La plateforme e-commerce tout-en-un révolutionnaire conçue pour l'Afrique et le monde entier.
          </p>

          {/* WhatsApp Support CTA */}
          <div className="pt-2">
            <a
              href="https://wa.me/221770000000?text=Bonjour%20Gningue%20Empire"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-black rounded-xl font-bold text-xs transition-colors shadow-lg shadow-[#25D366]/20"
            >
              <MessageSquare className="w-4 h-4 text-black" />
              <span>Assistance Client WhatsApp 24/7</span>
            </a>
          </div>
        </div>

        {/* Col 2: Acheter & Catégories */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Acheter</h4>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => { setB2bOnlyFilter(true); setActiveView('home'); }} 
                className="hover:text-[#FFC300] transition-colors"
              >
                Vente en Gros B2B (Alibaba)
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveCategory('digital'); setActiveView('home'); }} 
                className="hover:text-[#FFC300] transition-colors"
              >
                Abonnements & Codes Digitaux
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveCategory('service'); setActiveView('home'); }} 
                className="hover:text-[#FFC300] transition-colors"
              >
                Boutiques Clé en Main & Services
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveView('live_shopping')} 
                className="hover:text-[#FFC300] transition-colors flex items-center gap-1 text-red-400 font-semibold"
              >
                <span>Live Shopping Show 🔥</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Vendre & Marchands */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Vendre</h4>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveView('vendor_dashboard')} 
                className="hover:text-[#FFC300] transition-colors"
              >
                Créer sa Boutique Vendeur
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveView('vendor_dashboard')} 
                className="hover:text-[#FFC300] transition-colors text-purple-400 font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" /> Fiches Produits avec IA
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveView('vendor_dashboard')} 
                className="hover:text-[#FFC300] transition-colors"
              >
                Prédiction des Stocks IA
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveView('vendor_dashboard')} 
                className="hover:text-[#FFC300] transition-colors"
              >
                Retraits Instantanés Wave / OM
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Garanties & Paiement */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Paiements & Sécurité</h4>
          <p className="text-[11px] text-gray-400">Paiement 100% sécurisé multi-canaux :</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Wave', 'Orange Money', 'MTN MoMo', 'Visa', 'Mastercard', 'PayPal', 'USDT'].map((p, i) => (
              <span key={i} className="bg-[#1A1A1A] border border-gray-700 px-2 py-0.5 rounded text-[10px] text-gray-300 font-bold">
                {p}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => showToast("Application PWA prête ! Ajoutez-la à votre écran d'accueil.")}
              className="flex items-center gap-2 text-xs text-[#FFC300] hover:underline"
            >
              <Smartphone className="w-4 h-4" />
              <span>Installer l'App PWA Mobile</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-800 py-6 bg-[#080808] text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} GNINGUE EMPIRE (gningue-empire.com / gninguemarket.com). Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Garantie Escrow 48h Certifiée</span>
            <span>•</span>
            <span>Commission Plateforme 1.0%</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
