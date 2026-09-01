import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  ShoppingBag, 
  X, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  MessageSquare, 
  Phone, 
  CheckCircle2, 
  ExternalLink,
  ShieldAlert,
  Clock,
  Volume2
} from 'lucide-react';

export const CartReminderNotification: React.FC = () => {
  const { 
    cartReminderNotification, 
    dismissCartReminder, 
    cart, 
    cartTotal, 
    formatPrice, 
    setIsCartOpen, 
    applyCoupon,
    currentUser
  } = useApp();

  const [showWhatsAppPreview, setShowWhatsAppPreview] = useState(false);

  if (!cartReminderNotification?.isOpen || cart.length === 0) {
    return null;
  }

  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const primaryItem = cart[0];

  const handleResumeCart = (withDiscount = false) => {
    if (withDiscount) {
      applyCoupon('RAPPEL5');
    }
    dismissCartReminder();
    setIsCartOpen(true);
  };

  const getReasonLabel = () => {
    switch (cartReminderNotification.triggerReason) {
      case 'tab_switch':
        return 'Changement d’onglet détecté';
      case 'exit_intent':
        return 'Tentative de quitter le site';
      case 'drawer_close':
        return 'Panier fermé avec articles';
      default:
        return 'Rappel automatisé';
    }
  };

  return (
    <>
      {/* Floating OS / Browser Style Web Push Notification Card */}
      <aside 
        aria-label="Notification de rappel panier"
        className="fixed top-4 right-4 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-[420px] bg-[#12141C]/95 backdrop-blur-md border-2 border-[#FFC300]/60 rounded-2xl shadow-2xl shadow-black/80 text-white overflow-hidden animate-in fade-in slide-in-from-top-6 duration-300"
      >
        {/* Top OS-style header */}
        <div className="bg-[#181B26] px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#FFC300] flex items-center justify-center text-black font-black text-[10px] shadow-sm">
              G
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-extrabold text-white tracking-wide">GNINGUE EMPIRE</span>
              <span className="text-gray-400 text-[10px]">• Push Web</span>
              <span className="text-amber-400 text-[10px] flex items-center gap-0.5 font-semibold">
                <Clock className="w-3 h-3" /> À l'instant
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[10px] bg-[#FFC300]/15 text-[#FFC300] font-bold px-2 py-0.5 rounded-full border border-[#FFC300]/30 hidden sm:inline">
              {getReasonLabel()}
            </span>
            <button
              onClick={dismissCartReminder}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Ignorer le rappel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3.5">
          <div className="flex items-start gap-3">
            {/* Pulsing Bell Icon & Thumbnail */}
            <div className="relative shrink-0">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-black/50 border border-white/20 relative">
                {primaryItem ? (
                  <img
                    src={primaryItem.product.images[0]}
                    alt={primaryItem.product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#FFC300]">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-black shadow-md animate-bounce">
                {itemsCount}
              </div>
            </div>

            {/* Notification Title & Body */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-amber-300 font-extrabold text-xs">
                <Bell className="w-3.5 h-3.5 fill-amber-300" />
                <span>Vous avez oublié vos articles !</span>
              </div>
              
              <p className="text-xs text-gray-200 mt-1 leading-relaxed">
                Votre panier de <strong className="text-white">{itemsCount} article{itemsCount > 1 ? 's' : ''}</strong> d'un montant de <strong className="text-[#FFC300] font-heading">{formatPrice(cartTotal)}</strong> est en attente.
              </p>

              {/* Stock Reservation notice */}
              <div className="flex items-center gap-1 text-[11px] text-amber-200/90 mt-1">
                <ShieldAlert className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="truncate">Stocks grossistes limités – réservation temporaire (30 min).</span>
              </div>
            </div>
          </div>

          {/* Special Recovery Coupon Badge */}
          <div className="bg-gradient-to-r from-[#FFC300]/15 via-amber-500/10 to-transparent border border-[#FFC300]/40 rounded-xl p-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FFC300]" />
              <div>
                <span className="font-bold text-white block">Cadeau de rattrapage : -5%</span>
                <span className="text-[10px] text-gray-300">Code promo exclusif : <strong className="text-[#FFC300] font-mono">RAPPEL5</strong></span>
              </div>
            </div>

            <button
              onClick={() => handleResumeCart(true)}
              className="px-2.5 py-1 bg-[#FFC300] hover:bg-[#e6b000] text-black font-extrabold text-[11px] rounded-lg shadow-sm whitespace-nowrap transition-transform active:scale-95"
            >
              Appliquer -5%
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
            <button
              onClick={() => handleResumeCart(false)}
              className="w-full sm:flex-1 py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-white/15"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#FFC300]" />
              <span>Reprendre mon panier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setShowWhatsAppPreview(true)}
              className="w-full sm:w-auto py-2.5 px-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              title="Voir le message SMS / WhatsApp de relance"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="sm:hidden">Aperçu WhatsApp</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Simulated Multi-channel WhatsApp / SMS Abandoned Cart Modal */}
      {showWhatsAppPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#12141C] border border-white/20 rounded-2xl p-5 space-y-4 shadow-2xl text-white animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <MessageSquare className="w-4 h-4" />
                <span>Simulation Relance WhatsApp / SMS</span>
              </div>
              <button 
                onClick={() => setShowWhatsAppPreview(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* WhatsApp UI Simulation Frame */}
            <div className="bg-[#0B141A] rounded-xl p-3.5 border border-emerald-500/20 space-y-3 font-sans text-xs">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white">
                  GE
                </div>
                <div>
                  <h5 className="font-bold text-white text-xs">Gningue Empire Support 🟢</h5>
                  <p className="text-[10px] text-gray-400">Compte Entreprise Vérifié</p>
                </div>
              </div>

              {/* Message Bubble */}
              <div className="bg-[#005C4B] text-white p-3 rounded-xl rounded-tl-none space-y-2 text-xs shadow-md">
                <p>
                  👋 Bonjour <strong>{currentUser.name}</strong>,
                </p>
                <p>
                  Vous avez laissé <strong>{itemsCount} article(s)</strong> dans votre panier sur <strong>GNINGUE EMPIRE</strong> (Total : {formatPrice(cartTotal)}).
                </p>
                <div className="p-2 bg-black/30 rounded-lg border border-white/10 space-y-1">
                  <p className="font-bold text-[#FFC300]">🎁 Offre Exclusive de Relance :</p>
                  <p className="text-[11px] text-gray-200">
                    Bénéficiez de <strong>-5% de réduction immédiate</strong> avec le code <strong className="text-white font-mono bg-black/50 px-1 py-0.5 rounded">RAPPEL5</strong> valable 2 heures.
                  </p>
                </div>
                <p className="text-[11px] text-emerald-200">
                  👉 Cliquez ici pour finaliser en 1 clic : <u>https://gningue-empire.sn/cart?ref=reminder</u>
                </p>
                <div className="text-right text-[9px] text-emerald-300">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ✓✓
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowWhatsAppPreview(false);
                  handleResumeCart(true);
                }}
                className="flex-1 py-2.5 bg-[#FFC300] hover:bg-[#e6b000] text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#FFC300]/20"
              >
                <span>Utiliser le Code RAPPEL5 & Ouvrir le Panier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
