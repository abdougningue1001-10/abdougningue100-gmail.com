import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  QrCode, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  Truck,
  Zap,
  Globe
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartTotal, 
    cartSubtotal,
    packageInsuranceFee,
    couponDiscountAmount,
    coinsDiscountAmount,
    formatPrice, 
    currentUser, 
    createOrder,
    setActiveOrderToTrack,
    setActiveView
  } = useApp();

  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  
  // Address & Geolocation State
  const [street, setStreet] = useState('Almadies Zone 2, Immeuble Horizon');
  const [city, setCity] = useState('Dakar');
  const [country, setCountry] = useState('Sénégal');
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 14.7431, lng: -17.5144 });
  const [notes, setNotes] = useState('');
  const [shippingFee, setShippingFee] = useState(2000);
  const [distanceKm, setDistanceKm] = useState(5.4);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'wave' | 'orange_money' | 'mtn_momo' | 'stripe_card' | 'paypal' | 'crypto_usdt'>('wave');
  const [buyerPhone, setBuyerPhone] = useState(currentUser.phone || '+221 77 000 00 00');
  const [buyerName, setBuyerName] = useState(currentUser.name);
  const [buyerEmail, setBuyerEmail] = useState(currentUser.email);
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');
  const [createdOrderObj, setCreatedOrderObj] = useState<any>(null);

  // Check if cart has physical goods
  const hasPhysicalGoods = cart.some(i => i.product.category === 'physique');

  // Auto-calculate shipping fee based on distance
  const calculateShipping = async (lat: number, lng: number) => {
    setIsCalculatingShipping(true);
    try {
      const res = await fetch('/api/delivery/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userLat: lat,
          userLng: lng,
          weightKg: cart.reduce((w, i) => w + (i.product.weightKg || 0.5) * i.quantity, 0),
          isExpress: false
        })
      });
      const data = await res.json();
      setShippingFee(hasPhysicalGoods ? data.shippingFee : 0);
      setDistanceKm(data.distanceKm);
    } catch {
      setShippingFee(hasPhysicalGoods ? 2500 : 0);
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCoords({ lat, lng });
          calculateShipping(lat, lng);
        },
        () => {
          // Default fallback to Dakar coordinates
          setCoords({ lat: 14.7167, lng: -17.4677 });
          calculateShipping(14.7167, -17.4677);
        }
      );
    }
  };

  useEffect(() => {
    if (isCheckoutOpen && hasPhysicalGoods) {
      calculateShipping(coords.lat, coords.lng);
    }
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const finalTotalAmount = cartTotal + (hasPhysicalGoods ? shippingFee : 0);

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = createOrder({
        buyerName,
        buyerEmail,
        buyerPhone,
        shippingFee: hasPhysicalGoods ? shippingFee : 0,
        totalAmount: finalTotalAmount,
        paymentMethod,
        deliveryAddress: {
          street,
          city,
          country,
          latitude: coords.lat,
          longitude: coords.lng,
          notes
        }
      });
      setCreatedOrderNumber(order.orderNumber);
      setCreatedOrderObj(order);
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl bg-[#12141C] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#181B26]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#FFC300]" />
            <h3 className="font-bold text-white text-base">
              {step === 'address' ? '1. Adresse & Livraison Géolocalisée' : step === 'payment' ? '2. Paiement Sécurisé & Escrow' : '3. Commande Confirmée 🚀'}
            </h3>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* STEP 1: ADDRESS & GEOLOCATION */}
          {step === 'address' && (
            <div className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Nom complet</label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full bg-[#181B26] border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFC300]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Téléphone (avec WhatsApp)</label>
                  <input
                    type="text"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full bg-[#181B26] border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFC300]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Email (Pour confirmation & codes)</label>
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full bg-[#181B26] border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFC300]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Ville & Pays</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-1/2 bg-[#181B26] border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFC300]"
                    />
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-1/2 bg-[#181B26] border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFC300]"
                    />
                  </div>
                </div>
              </div>

              {/* Physical Goods GPS Locator Simulation */}
              {hasPhysicalGoods ? (
                <div className="bg-[#181B26] p-4 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <MapPin className="w-4 h-4 text-[#FFC300]" />
                      <span>Point de Livraison Exact sur Carte (GPS)</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      className="px-3 py-1.5 bg-[#FFC300]/15 hover:bg-[#FFC300]/25 text-[#FFC300] font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Me géolocaliser</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 font-semibold mb-1">Adresse précise / Repère</label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Ex: Sacré Cœur 3, à côté de la boulangerie..."
                      className="w-full bg-[#12141C] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC300]"
                    />
                  </div>

                  {/* Simulated Interactive Map Display */}
                  <div className="relative h-32 rounded-xl overflow-hidden border border-white/10 bg-[#0c0e14] flex items-center justify-center">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#FFC300_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative z-10 flex items-center gap-3 bg-[#181B26]/90 px-4 py-2 rounded-xl border border-[#FFC300]/30 text-xs">
                      <div className="w-3 h-3 rounded-full bg-[#FFC300] animate-ping" />
                      <div>
                        <p className="font-bold text-white">Point GPS : {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</p>
                        <p className="text-[10px] text-gray-400">Distance Hub Gningue : {distanceKm} km • Frais auto calculés : {formatPrice(shippingFee)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-2xl text-xs space-y-1 text-green-300">
                  <p className="font-bold flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> Panier 100% Digital / Service
                  </p>
                  <p className="text-gray-300">
                    Aucun frais de port physique requis. Les codes d’activation seront envoyés instantanément par SMS et affichés à l'écran.
                  </p>
                </div>
              )}

              {/* Step 1 Actions */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="px-6 py-3 bg-[#FFC300] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#FFC300]/20"
                >
                  <span>Continuer vers le Paiement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: MULTI-PAYMENT METHODS */}
          {step === 'payment' && (
            <div className="space-y-5">
              
              <div className="text-xs text-gray-300">
                Sélectionnez votre moyen de paiement sécurisé pour valider votre commande et enclencher la <strong className="text-[#FFC300]">Garantie Escrow 48h</strong> :
              </div>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* 1. Wave Mobile Money */}
                <div
                  onClick={() => setPaymentMethod('wave')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'wave'
                      ? 'bg-[#1CA8FF]/15 border-[#1CA8FF] text-white shadow-lg shadow-[#1CA8FF]/10'
                      : 'bg-[#181B26] border-white/10 hover:border-white/20 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1CA8FF] flex items-center justify-center text-white font-black text-lg">
                      〰
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Wave Mobile Money</h4>
                      <p className="text-[11px] text-gray-400">0% de frais • Instantané (Sénégal / CI)</p>
                    </div>
                  </div>
                  {paymentMethod === 'wave' && <CheckCircle2 className="w-5 h-5 text-[#1CA8FF]" />}
                </div>

                {/* 2. Orange Money */}
                <div
                  onClick={() => setPaymentMethod('orange_money')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'orange_money'
                      ? 'bg-[#FF6600]/15 border-[#FF6600] text-white shadow-lg shadow-[#FF6600]/10'
                      : 'bg-[#181B26] border-white/10 hover:border-white/20 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6600] flex items-center justify-center text-white font-bold text-xs">
                      OM
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Orange Money</h4>
                      <p className="text-[11px] text-gray-400">Paiement OTP direct</p>
                    </div>
                  </div>
                  {paymentMethod === 'orange_money' && <CheckCircle2 className="w-5 h-5 text-[#FF6600]" />}
                </div>

                {/* 3. MTN MoMo */}
                <div
                  onClick={() => setPaymentMethod('mtn_momo')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'mtn_momo'
                      ? 'bg-[#FFCC00]/15 border-[#FFCC00] text-white shadow-lg shadow-[#FFCC00]/10'
                      : 'bg-[#181B26] border-white/10 hover:border-white/20 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFCC00] text-black flex items-center justify-center font-black text-xs">
                      MTN
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">MTN Mobile Money</h4>
                      <p className="text-[11px] text-gray-400">Bénin, Cameroun, CI, Ghana</p>
                    </div>
                  </div>
                  {paymentMethod === 'mtn_momo' && <CheckCircle2 className="w-5 h-5 text-[#FFCC00]" />}
                </div>

                {/* 4. Carte Bancaire / Stripe */}
                <div
                  onClick={() => setPaymentMethod('stripe_card')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'stripe_card'
                      ? 'bg-purple-600/15 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                      : 'bg-[#181B26] border-white/10 hover:border-white/20 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Carte Visa / Mastercard</h4>
                      <p className="text-[11px] text-gray-400">Stripe 3D Secure mondial</p>
                    </div>
                  </div>
                  {paymentMethod === 'stripe_card' && <CheckCircle2 className="w-5 h-5 text-purple-400" />}
                </div>

                {/* 5. Crypto USDT */}
                <div
                  onClick={() => setPaymentMethod('crypto_usdt')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'crypto_usdt'
                      ? 'bg-emerald-600/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                      : 'bg-[#181B26] border-white/10 hover:border-white/20 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                      ₮
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Crypto USDT (TRC20 / BEP20)</h4>
                      <p className="text-[11px] text-gray-400">Paiement Web3 international</p>
                    </div>
                  </div>
                  {paymentMethod === 'crypto_usdt' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </div>

                {/* 6. PayPal */}
                <div
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'paypal'
                      ? 'bg-[#0079C1]/15 border-[#0079C1] text-white shadow-lg shadow-[#0079C1]/10'
                      : 'bg-[#181B26] border-white/10 hover:border-white/20 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0079C1] flex items-center justify-center text-white font-bold text-xs">
                      PP
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">PayPal</h4>
                      <p className="text-[11px] text-gray-400">Paiement international garanti</p>
                    </div>
                  </div>
                  {paymentMethod === 'paypal' && <CheckCircle2 className="w-5 h-5 text-[#0079C1]" />}
                </div>

              </div>

              {/* Order Recap summary before payment */}
              <div className="p-4 bg-[#181B26] rounded-2xl border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Sous-total articles :</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                {hasPhysicalGoods && (
                  <div className="flex justify-between text-gray-300">
                    <span>Frais de livraison ({distanceKm} km) :</span>
                    <span>{formatPrice(shippingFee)}</span>
                  </div>
                )}
                {packageInsuranceFee > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Assurance Sérénité (2%) :</span>
                    <span>{formatPrice(packageInsuranceFee)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                  <span>Total à Débiter :</span>
                  <span className="text-[#FFC300] font-heading">{formatPrice(finalTotalAmount)}</span>
                </div>
              </div>

              {/* Step 2 Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className="px-4 py-2.5 text-xs text-gray-400 hover:text-white"
                >
                  ← Retour à l'adresse
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleConfirmOrder}
                  className="px-6 py-3.5 bg-[#FFC300] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#FFC300]/20 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isProcessing ? 'Validation en cours...' : `Payer ${formatPrice(finalTotalAmount)}`}</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: SUCCESS & ESCROW CONFIRMATION */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-6">
              
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black font-heading text-white">Commande Validée avec Succès !</h3>
                <p className="text-xs text-gray-400">
                  Numéro de commande : <strong className="text-[#FFC300]">{createdOrderNumber}</strong>
                </p>
              </div>

              {/* Escrow Guarantee Box */}
              <div className="p-4 bg-[#181B26] rounded-2xl border border-[#FFC300]/30 text-left max-w-lg mx-auto space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#FFC300] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Garantie Gningue Escrow 48h Activée</span>
                </div>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  L'argent de votre commande reste sécurisé par Gningue Empire. Le vendeur ne sera crédité que 48h après la réception effective de vos articles. En cas de problème, ouvrez un litige en 1-clic pour un remboursement immédiat.
                </p>
              </div>

              {/* Instant Digital codes preview if any */}
              {createdOrderObj && createdOrderObj.items.some((i: any) => i.category === 'digital') && (
                <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/30 text-left max-w-lg mx-auto space-y-2 text-xs">
                  <p className="font-bold text-green-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> Vos Codes Digitaux Instantanés :
                  </p>
                  {createdOrderObj.items.filter((i: any) => i.category === 'digital').map((item: any, idx: number) => (
                    <div key={idx} className="bg-black/60 p-2.5 rounded-xl border border-white/10 font-mono text-[11px] text-green-300">
                      <p className="font-bold">{item.productTitle}</p>
                      <p className="text-[#FFC300] mt-1 select-all">{item.digitalCodes?.[0] || 'GNINGUE-AUTO-KEY-89410'}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    if (createdOrderObj) {
                      setActiveOrderToTrack(createdOrderObj);
                    }
                    setActiveView('orders');
                  }}
                  className="px-6 py-3 bg-[#FFC300] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-[#FFC300]/20"
                >
                  <Truck className="w-4 h-4" />
                  <span>Suivre ma Livraison en Temps Réel (GPS)</span>
                </button>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setActiveView('home');
                  }}
                  className="px-5 py-3 bg-[#181B26] hover:bg-[#222636] text-white font-bold text-xs rounded-xl border border-white/15"
                >
                  Retourner au Catalogue
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
