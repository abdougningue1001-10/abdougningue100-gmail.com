import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Radio, 
  Eye, 
  Heart, 
  Send, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  Volume2, 
  Calendar,
  Zap,
  Star
} from 'lucide-react';

export const LiveShoppingView: React.FC = () => {
  const { products, addToCart, formatPrice, setSelectedProductForDetail, showToast } = useApp();
  
  const [liveChatMessages, setLiveChatMessages] = useState([
    { user: 'Ibrahima D.', text: 'Le tissu Bazin est vraiment disponible en 50 mètres ?', time: '14:02' },
    { user: 'Amina K.', text: 'Superbe qualité ! Est-ce que la livraison à Cocody est assurée aujourd’hui ?', time: '14:03' },
    { user: 'Ousmane S.', text: 'Je viens de commander le pack de 10 panneaux solaires via Wave 🔥', time: '14:04' },
    { user: 'Sophie M.', text: 'Le code promo LIVE2026 fonctionne parfaitement ! Merci Gningue Empire', time: '14:05' }
  ]);

  const [inputChat, setInputChat] = useState('');
  const [likesCount, setLikesCount] = useState(1420);
  const [hasLiked, setHasLiked] = useState(false);

  // Featured product in this live
  const featuredProduct = products[0]; // Solar kit or phone

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChat.trim()) return;

    setLiveChatMessages(prev => [
      ...prev,
      { user: 'Moi (Direct)', text: inputChat, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInputChat('');
  };

  const handleLike = () => {
    setLikesCount(prev => prev + 1);
    setHasLiked(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-white">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase animate-pulse">
            <Radio className="w-4 h-4" />
            <span>EN DIRECT LIVE</span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-heading text-white">
              GNINGUE LIVE SHOWROOM & VENTES FLASH
            </h1>
            <p className="text-xs text-gray-400">Présentation en direct des arrivages B2B gros & offres flash exclusives.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 bg-[#181B26] px-3 py-1.5 rounded-xl border border-white/10 text-gray-300">
            <Eye className="w-4 h-4 text-red-500" />
            <strong>3 840</strong> spectateurs connectés
          </span>
        </div>
      </div>

      {/* Main Grid: Stream Player (8 cols) & Live Chat (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Simulated Video Stream & Floating Product Pin */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl flex flex-col justify-between p-6 group">
            
            {/* Background Simulated Live Video Banner */}
            <img
              src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=1200&auto=format&fit=crop&q=80"
              alt="Live Show"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />

            {/* Top Streamer Info Overlay */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md p-2 rounded-2xl border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Host"
                  className="w-10 h-10 rounded-xl object-cover border border-[#FFC300]"
                />
                <div>
                  <h4 className="font-bold text-white text-xs flex items-center gap-1">
                    <span>Aminata & Cheikh (Hub Dakar)</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC300]" />
                  </h4>
                  <p className="text-[10px] text-gray-300">Démonstration Électronique & Bazin Getzner</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`p-3 rounded-full backdrop-blur-md transition-transform active:scale-125 flex items-center gap-1.5 text-xs font-bold ${
                    hasLiked ? 'bg-red-600 text-white' : 'bg-black/60 text-gray-200 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white' : ''}`} />
                  <span>{likesCount}</span>
                </button>
              </div>
            </div>

            {/* Bottom Floating Featured Product Pin with 1-Click Buy */}
            {featuredProduct && (
              <div className="relative z-10 bg-[#12141C]/95 backdrop-blur-xl p-4 rounded-2xl border border-[#FFC300]/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl animate-in slide-in-from-bottom">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <img
                    src={featuredProduct.images[0]}
                    alt={featuredProduct.title}
                    className="w-14 h-14 rounded-xl object-cover bg-black shrink-0"
                  />
                  <div>
                    <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                      Offre Spéciale Live
                    </span>
                    <h3 className="font-bold text-white text-xs line-clamp-1 mt-0.5">{featuredProduct.title}</h3>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-base font-black text-[#FFC300] font-heading">{formatPrice(featuredProduct.retailPrice)}</span>
                      {featuredProduct.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">{formatPrice(featuredProduct.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setSelectedProductForDetail(featuredProduct)}
                    className="px-3 py-2 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-xs"
                  >
                    Détails
                  </button>
                  <button
                    onClick={() => {
                      addToCart(featuredProduct, 1);
                      showToast("Produit du Live ajouté à votre panier !");
                    }}
                    className="px-4 py-2 bg-[#FFC300] hover:bg-[#e6b000] text-black font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-[#FFC300]/20"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Acheter en Direct</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Live Interactive Chat Stream */}
        <div className="lg:col-span-4 bg-[#12141C] border border-white/10 rounded-3xl p-4 flex flex-col justify-between h-[420px] lg:h-auto shadow-xl">
          
          <div className="border-b border-white/10 pb-3 flex items-center justify-between text-xs">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FFC300]" />
              <span>Chat des Acheteurs en Direct</span>
            </h3>
            <span className="text-gray-400 text-[10px]">Temps Réel</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto py-3 space-y-2.5 text-xs">
            {liveChatMessages.map((msg, i) => (
              <div key={i} className="p-2.5 bg-[#181B26] rounded-xl border border-white/5 space-y-0.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#FFC300]">{msg.user}</span>
                  <span className="text-gray-500 text-[10px]">{msg.time}</span>
                </div>
                <p className="text-gray-200 text-xs">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Send Input */}
          <form onSubmit={handleSendChat} className="pt-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={inputChat}
              onChange={(e) => setInputChat(e.target.value)}
              placeholder="Poser une question aux présentateurs..."
              className="flex-1 bg-[#181B26] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC300]"
            />
            <button
              type="submit"
              className="p-2 bg-[#FFC300] text-black font-bold rounded-xl hover:bg-[#e6b000]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

      {/* Upcoming Live Sessions Schedule */}
      <div className="bg-[#12141C] p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#FFC300]" />
          <span>Prochaines Sessions Live Shopping GNINGUE EMPIRE</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#181B26] rounded-2xl border border-white/10 space-y-2">
            <span className="bg-[#FFC300]/20 text-[#FFC300] text-[10px] font-bold px-2 py-0.5 rounded-full">
              Demain à 18h00 GMT
            </span>
            <h4 className="font-bold text-white text-sm">Grande Vente de Gros B2B - Import Solaire & Batteries</h4>
            <p className="text-gray-400 text-[11px]">Tarifs usine dégressifs dès 5 kits solaires complets commandés.</p>
          </div>

          <div className="p-4 bg-[#181B26] rounded-2xl border border-white/10 space-y-2">
            <span className="bg-purple-500/20 text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Samedi à 20h00 GMT
            </span>
            <h4 className="font-bold text-white text-sm">Défilé Bazin Riche & Haute Couture Africaine</h4>
            <p className="text-gray-400 text-[11px]">Modèles exclusifs Bamako / Dakar présentés avec essayages en direct.</p>
          </div>

          <div className="p-4 bg-[#181B26] rounded-2xl border border-white/10 space-y-2">
            <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Dimanche à 15h00 GMT
            </span>
            <h4 className="font-bold text-white text-sm">Vente Flash Digitale - Licences Canva Pro & IPTV</h4>
            <p className="text-gray-400 text-[11px]">Distribution de codes en live à -50% pour les 100 premiers spectateurs.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
