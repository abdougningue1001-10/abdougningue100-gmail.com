import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Zap, 
  Store, 
  Truck, 
  Clock, 
  CheckCircle2, 
  Star, 
  MessageSquare, 
  ExternalLink,
  Layers,
  AlertCircle,
  Share2,
  Lock,
  Play,
  Video
} from 'lucide-react';
import { ProductVariant } from '../types';
import { VideoReviewSection } from './VideoReviewSection';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductForDetail, 
    setSelectedProductForDetail, 
    formatPrice, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    currency,
    showToast
  } = useApp();

  const product = selectedProductForDetail;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [activeTab, setActiveTab] = useState<'details' | 'b2b_calculator' | 'reviews'>('details');

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);

  // Calculate current unit price based on quantity & wholesale tier
  let calculatedUnitPrice = product.retailPrice;
  let activeTierLabel = 'Prix au détail';

  if (product.b2bAvailable && product.bulkPricing) {
    for (const tier of product.bulkPricing) {
      if (quantity >= tier.minQty && (!tier.maxQty || quantity <= tier.maxQty)) {
        calculatedUnitPrice = tier.unitPrice;
        activeTierLabel = `Palier de Gros (${tier.minQty}${tier.maxQty ? `-${tier.maxQty}` : '+'} pcs)`;
      }
    }
  }

  if (selectedVariant?.priceModifier) {
    calculatedUnitPrice += selectedVariant.priceModifier;
  }

  const totalPrice = calculatedUnitPrice * quantity;
  const retailTotalWithoutDiscount = (product.retailPrice + (selectedVariant?.priceModifier || 0)) * quantity;
  const totalSavings = Math.max(0, retailTotalWithoutDiscount - totalPrice);

  // WhatsApp pre-filled link
  const whatsappMessage = encodeURIComponent(
    `Bonjour GNINGUE EMPIRE ! Je souhaite commander : "${product.title}" (${quantity} pièce(s)) au prix de ${formatPrice(totalPrice)}. Mon lien produit : ${window.location.origin}?prod=${product.id}`
  );
  const whatsappUrl = `https://wa.me/221770000000?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-5xl bg-[#12141C] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#181B26]">
          <div className="flex items-center gap-2">
            <span className="bg-[#FFC300]/20 text-[#FFC300] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {product.category === 'physique' ? '📦 Physique (Gros & Détail)' : product.category === 'digital' ? '⚡ Digital & Abonnement' : '🚀 Service Clé en Main'}
            </span>
            <span className="text-xs text-gray-400">Réf: {product.id}</span>
          </div>

          <button
            onClick={() => setSelectedProductForDetail(null)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Media Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full bg-[#181B26] rounded-2xl overflow-hidden border border-white/10">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {/* Verified Escrow Floating Badge */}
              <div className="absolute bottom-3 left-3 bg-[#090A0F]/90 backdrop-blur-md border border-[#FFC300]/40 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#FFC300]" />
                <span className="font-semibold text-gray-200">Garantie Escrow Gningue 48h</span>
              </div>
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === idx ? 'border-[#FFC300] scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Video Review Sample if exists */}
            {product.reviews.some(r => r.videoUrl) && (
              <button
                onClick={() => setActiveTab('reviews')}
                className="w-full p-3 bg-gradient-to-r from-[#FFC300]/10 to-[#181B26] hover:from-[#FFC300]/20 hover:to-[#222634] rounded-xl border border-[#FFC300]/30 flex items-center justify-between text-xs transition-all text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#FFC300] text-black flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-black translate-x-0.5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Preuves Vidéos Clients Disponibles</span>
                    <span className="text-[10px] text-gray-400">Déballage & test en direct</span>
                  </div>
                </div>
                <span className="text-[#FFC300] font-bold text-[11px] bg-black/40 px-2 py-0.5 rounded-md border border-[#FFC300]/20">
                  Voir ({product.reviews.filter(r => r.videoUrl).length}) ↗
                </span>
              </button>
            )}

            {/* Vendor card info */}
            <div className="bg-[#181B26] p-4 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Vendu & Expédié par</p>
                <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                  <span>{product.vendorName}</span>
                  {product.vendorVerified && <CheckCircle2 className="w-4 h-4 text-[#FFC300]" />}
                </h4>
                <p className="text-xs text-gray-400">{product.vendorCountry} • {product.vendorRating} ★ Note Marchand</p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Vendeur</span>
              </a>
            </div>

          </div>

          {/* Right Column: Title, Config, Pricing, Tabs */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              {/* Reviews count & Sales */}
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span>({product.reviewCount} avis certifiés)</span>
                </div>
                <span>•</span>
                <span>{product.salesCount}+ commandes expédiées</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black font-heading text-white leading-snug">
                {product.title}
              </h2>
            </div>

            {/* Tab navigation: Details vs B2B Calculator vs Reviews */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  activeTab === 'details' ? 'bg-[#FFC300] text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                Détails & Variantes
              </button>

              {product.b2bAvailable && (
                <button
                  onClick={() => setActiveTab('b2b_calculator')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1 ${
                    activeTab === 'b2b_calculator' ? 'bg-[#FFC300] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Calculateur B2B Gros</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'reviews' ? 'bg-[#FFC300] text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Avis & Preuves Vidéos ({product.reviews.length || product.reviewCount})</span>
                {product.reviews.some(r => r.videoUrl) && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>
            </div>

            {/* TAB 1: DETAILS */}
            {activeTab === 'details' && (
              <div className="space-y-5">
                
                {/* Description */}
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Digital / Service specifics */}
                {product.category === 'digital' && (
                  <div className="bg-green-500/10 border border-green-500/30 p-3.5 rounded-2xl space-y-1 text-xs">
                    <p className="font-bold text-green-400 flex items-center gap-1.5">
                      <Zap className="w-4 h-4" /> Mode Livraison Instantanée
                    </p>
                    <p className="text-gray-300">
                      Les codes d’activation, identifiants ou liens d’accès seront immédiatement délivrés sur votre écran et par SMS dès la confirmation du paiement.
                    </p>
                  </div>
                )}

                {product.category === 'service' && product.demoUrl && (
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3.5 rounded-2xl space-y-2 text-xs">
                    <p className="font-bold text-blue-400 flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4" /> Démo Interactive en Ligne
                    </p>
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                    >
                      Voir la Démo du Site / Portfolio ↗
                    </a>
                  </div>
                )}

                {/* Bullet features */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Points Forts :</h4>
                  <ul className="space-y-1.5 text-xs text-gray-200">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#FFC300] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Variants selector if available */}
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Variante sélectionnée :</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                            selectedVariant?.id === v.id
                              ? 'bg-[#FFC300] text-black border-[#FFC300] shadow-md shadow-[#FFC300]/20'
                              : 'bg-[#181B26] text-gray-300 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {v.name}
                          {v.priceModifier ? ` (+${formatPrice(v.priceModifier)})` : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 2: B2B WHOLESALE CALCULATOR (ALIBABA STYLE) */}
            {activeTab === 'b2b_calculator' && product.bulkPricing && (
              <div className="space-y-4 bg-[#181B26] p-4 rounded-2xl border border-[#FFC300]/30">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm flex items-center gap-1.5 text-[#FFC300]">
                    <Store className="w-4 h-4" /> Grille Tarifaire Grossiste B2B
                  </h4>
                  <span className="text-[10px] text-gray-400">Remise automatique par volume</span>
                </div>

                {/* Tiers Table */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {product.bulkPricing.map((tier, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border transition-all ${
                        quantity >= tier.minQty && (!tier.maxQty || quantity <= tier.maxQty)
                          ? 'bg-[#FFC300]/20 border-[#FFC300] text-[#FFC300] font-bold'
                          : 'bg-[#12141C] border-white/10 text-gray-400'
                      }`}
                    >
                      <p className="text-[11px]">
                        {tier.minQty}{tier.maxQty ? ` à ${tier.maxQty}` : '+'} pièces
                      </p>
                      <p className="text-sm font-black text-white mt-1">
                        {formatPrice(tier.unitPrice)}
                      </p>
                      <p className="text-[9px] text-[#FFC300]">/ unité</p>
                    </div>
                  ))}
                </div>

                {/* Volume discount summary */}
                {totalSavings > 0 && (
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center justify-between text-xs text-green-400">
                    <span>Économie B2B réalisée :</span>
                    <span className="font-black text-sm">{formatPrice(totalSavings)}</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: VERIFIED REVIEWS & VIDEO REVIEWS SECTION */}
            {activeTab === 'reviews' && (
              <div className="pt-1">
                <VideoReviewSection product={product} />
              </div>
            )}

            {/* Sticky Action Footer inside modal */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              
              {/* Quantity selector & Live Price calculation */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Prix total ({activeTierLabel}) :</p>
                  <p className="text-2xl font-black text-white font-heading">
                    {formatPrice(totalPrice)}
                  </p>
                </div>

                <div className="flex items-center bg-[#181B26] border border-white/15 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-gray-300 hover:text-white font-bold text-sm hover:bg-white/5"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-white font-bold text-xs">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-gray-300 hover:text-white font-bold text-sm hover:bg-white/5"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    addToCart(product, quantity, selectedVariant);
                    setSelectedProductForDetail(null);
                  }}
                  className="py-3 px-4 rounded-xl bg-[#FFC300] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#FFC300]/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au Panier ({quantity})</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Commander par WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
