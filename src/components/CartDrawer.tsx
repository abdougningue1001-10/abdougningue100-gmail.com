import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Coins, 
  Percent, 
  AlertCircle,
  Truck,
  Sparkles,
  Bell,
  BellRing,
  Send,
  MessageSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    cartSubtotal,
    packageInsurance,
    setPackageInsurance,
    packageInsuranceFee,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponDiscountAmount,
    coinsToUse,
    setCoinsToUse,
    coinsDiscountAmount,
    cartTotal,
    formatPrice,
    currentUser,
    setIsCheckoutOpen,
    showToast,
    triggerCartReminder,
    cartReminderEnabled,
    setCartReminderEnabled,
    requestPushNotificationPermission,
    pushPermissionStatus
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [showReminderSettings, setShowReminderSettings] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const handleClose = () => {
    setIsCartOpen(false);
    if (cart.length > 0 && cartReminderEnabled) {
      // Trigger abandoned cart push notification & log
      setTimeout(() => {
        triggerCartReminder('drawer_close');
      }, 700);

      fetch('/api/cart/abandoned-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: currentUser.email,
          userPhone: currentUser.phone,
          itemsCount: cart.length,
          totalValue: cartTotal
        })
      }).catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#12141C] border-l border-white/15 h-full flex flex-col justify-between text-white shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#181B26]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FFC300]" />
            <h3 className="font-bold text-white text-base">Votre Panier</h3>
            <span className="bg-[#FFC300]/20 text-[#FFC300] text-xs px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((t, i) => t + i.quantity, 0)} articles
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#181B26] border border-white/10 flex items-center justify-center mx-auto text-gray-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-gray-400 text-sm font-medium">Votre panier est actuellement vide.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 bg-[#FFC300] text-black font-bold rounded-xl text-xs"
              >
                Explorer les Produits
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={`${item.product.id}-${item.selectedVariant?.id || 'def'}`}
                className="p-3 bg-[#181B26] rounded-2xl border border-white/10 flex items-start gap-3 relative group"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-16 h-16 rounded-xl object-cover bg-black/40 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-xs line-clamp-1">{item.product.title}</h4>
                  {item.selectedVariant && (
                    <p className="text-[11px] text-[#FFC300] font-medium">{item.selectedVariant.name}</p>
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-extrabold text-white text-xs">
                      {formatPrice(item.totalPrice)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center bg-[#12141C] border border-white/15 rounded-lg overflow-hidden text-xs">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                        className="px-2 py-0.5 text-gray-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 font-bold text-white text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                        className="px-2 py-0.5 text-gray-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                  className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}

          {/* Interactive Abandoned Cart Reminder Simulation Box */}
          {cart.length > 0 && (
            <div className="mt-4 p-3.5 bg-gradient-to-br from-[#181B26] to-[#12141C] border border-[#FFC300]/30 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#FFC300]/20 flex items-center justify-center text-[#FFC300]">
                    <BellRing className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      Rappel Push Anti-Abandon
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    </h4>
                    <p className="text-[10px] text-gray-400">Alerte automatique si vous quittez sans valider</p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cartReminderEnabled}
                    onChange={(e) => {
                      setCartReminderEnabled(e.target.checked);
                      showToast(e.target.checked ? "Rappels push activés" : "Rappels push désactivés");
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#FFC300]"></div>
                </label>
              </div>

              <p className="text-[11px] text-gray-300 leading-relaxed">
                Si vous changez d'onglet ou quittez le site, nous vous envoyons une notification push <strong>« Vous avez oublié vos articles »</strong> avec le code spécial <strong className="text-[#FFC300]">RAPPEL5</strong> (-5%).
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => triggerCartReminder('manual_test')}
                  className="flex-1 py-1.5 px-2.5 bg-[#FFC300]/15 hover:bg-[#FFC300]/25 text-[#FFC300] border border-[#FFC300]/40 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <Send className="w-3 h-3" />
                  <span>Tester le Rappel Push</span>
                </button>

                {pushPermissionStatus !== 'granted' && (
                  <button
                    type="button"
                    onClick={requestPushNotificationPermission}
                    className="py-1.5 px-2.5 bg-white/10 hover:bg-white/15 text-gray-300 rounded-xl text-[11px] font-medium transition-colors"
                    title="Autoriser les notifications web du navigateur"
                  >
                    Activer Web Push
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions & Calculations */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-[#181B26] space-y-3 text-xs">
            
            {/* Package Insurance 2% Option */}
            <div className="flex items-center justify-between p-2.5 bg-[#12141C] rounded-xl border border-white/10">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={packageInsurance}
                  onChange={(e) => setPackageInsurance(e.target.checked)}
                  className="rounded border-white/20 text-[#FFC300] focus:ring-[#FFC300]"
                />
                <span className="text-gray-300">Assurance Colis Sérénité (2%)</span>
              </label>
              <span className="font-bold text-[#FFC300]">{formatPrice(packageInsuranceFee)}</span>
            </div>

            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 p-2 rounded-xl text-xs text-green-400">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Code promo <strong>{appliedCoupon.code}</strong> actif (-{appliedCoupon.discountValue}{appliedCoupon.discountType === 'percentage' ? '%' : ' F'})</span>
                  </div>
                  <button onClick={removeCoupon} className="text-gray-400 hover:text-white font-bold ml-2">×</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Code promo (ex: EMPIRE2026)"
                    className="flex-1 bg-[#12141C] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white uppercase placeholder-gray-500 focus:outline-none focus:border-[#FFC300]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#FFC300] text-black font-bold rounded-xl text-xs hover:bg-[#e6b000]"
                  >
                    Appliquer
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-400 mt-1">{couponError}</p>}
            </div>

            {/* Loyalty coins redemption */}
            {currentUser.gningueCoins > 0 && (
              <div className="p-2.5 bg-[#12141C] rounded-xl border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-[#FFC300]" /> Utiliser Gningue Coins ({currentUser.gningueCoins} dispo):
                  </span>
                  <span className="font-bold text-[#FFC300]">-{formatPrice(coinsDiscountAmount)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.min(currentUser.gningueCoins, Math.floor(cartSubtotal / 10))}
                  step="10"
                  value={coinsToUse}
                  onChange={(e) => setCoinsToUse(Number(e.target.value))}
                  className="w-full accent-[#FFC300]"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>0 pt</span>
                  <span>{coinsToUse} pts appliqués</span>
                </div>
              </div>
            )}

            {/* Breakdown */}
            <div className="space-y-1.5 pt-1 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Sous-total articles :</span>
                <span className="text-white font-medium">{formatPrice(cartSubtotal)}</span>
              </div>

              {couponDiscountAmount > 0 && (
                <div className="flex justify-between text-green-400 font-medium">
                  <span>Remise coupon :</span>
                  <span>-{formatPrice(couponDiscountAmount)}</span>
                </div>
              )}

              {coinsDiscountAmount > 0 && (
                <div className="flex justify-between text-green-400 font-medium">
                  <span>Remise Gningue Coins :</span>
                  <span>-{formatPrice(coinsDiscountAmount)}</span>
                </div>
              )}

              {packageInsurance && (
                <div className="flex justify-between">
                  <span>Assurance Colis (2%) :</span>
                  <span className="text-white">{formatPrice(packageInsuranceFee)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/10">
                <span>Total Net à Payer :</span>
                <span className="text-[#FFC300] font-heading text-lg">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-3 bg-[#FFC300] hover:bg-[#e6b000] text-black font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#FFC300]/20"
            >
              <span>Passer la Commande Sécurisée</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFC300]" />
              <span>Garantie Escrow 48h active sur cette commande</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
