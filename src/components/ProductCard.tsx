import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Heart, 
  Layers, 
  Zap, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Star,
  Store,
  Clock,
  Eye,
  Play,
  Volume2,
  VolumeX,
  Video
} from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { 
    formatPrice, 
    addToCart, 
    setSelectedProductForDetail, 
    wishlist, 
    toggleWishlist, 
    compareList, 
    toggleCompare 
  } = useApp();

  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.some(p => p.id === product.id);

  // Lowest B2B tier price
  const lowestBulkPrice = product.bulkPricing && product.bulkPricing.length > 0 
    ? product.bulkPricing[product.bulkPricing.length - 1].unitPrice 
    : null;

  // Determine video URL: explicit videoPreviewUrl or review video
  const videoSource = product.videoPreviewUrl || 
    (product.reviews && product.reviews.find(r => r.videoUrl)?.videoUrl) || 
    null;

  // Play / Pause video on hover
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isHovered && videoSource && videoRef.current) {
      // Small debounce to avoid flashing during quick mouse movement
      timeoutId = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => setIsVideoPlaying(true))
              .catch(() => {
                // Autoplay policy fallback: ensure muted
                if (videoRef.current) {
                  videoRef.current.muted = true;
                  videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(() => {});
                }
              });
          }
        }
      }, 150);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsVideoPlaying(false);
      setVideoProgress(0);
    }

    return () => clearTimeout(timeoutId);
  }, [isHovered, videoSource]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#111111] rounded-2xl border border-gray-800 hover:border-[#FFC300]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#FFC300]/10"
    >
      
      {/* Top Badges & Media Overlay (Image + Video on hover) */}
      <div className="relative aspect-square w-full bg-[#1A1A1A] overflow-hidden">
        
        {/* Main Product Image */}
        <img
          src={product.images[0]}
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isVideoPlaying ? 'opacity-0 scale-105' : 'opacity-100 group-hover:scale-105'
          }`}
          loading="lazy"
        />

        {/* Video Auto-play on Hover */}
        {videoSource && (
          <div className={`absolute inset-0 transition-opacity duration-300 ${isVideoPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <video
              ref={videoRef}
              src={videoSource}
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover"
            />

            {/* Video Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-black/40 z-20">
              <div 
                className="h-full bg-[#FFC300] transition-all duration-100 ease-linear shadow-sm"
                style={{ width: `${videoProgress}%` }}
              />
            </div>

            {/* Audio Toggle Button */}
            <button
              onClick={toggleSound}
              className="absolute bottom-10 right-2.5 z-20 p-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-transform active:scale-90 border border-white/10"
              title={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#FFC300]" />}
            </button>
          </div>
        )}

        {/* Video Availability Indicator Badge (when not playing) */}
        {videoSource && !isVideoPlaying && (
          <div className="absolute bottom-8 right-2.5 z-10 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[10px] text-gray-300 group-hover:opacity-0 transition-opacity">
            <Video className="w-3 h-3 text-[#FFC300]" />
            <span>Vidéo</span>
          </div>
        )}

        {/* Category & Feature Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.category === 'digital' && (
            <span className="bg-green-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <Zap className="w-3 h-3 fill-black" /> Auto Instant ⚡
            </span>
          )}

          {product.b2bAvailable && (
            <span className="bg-[#FFC300] text-black text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <Store className="w-3 h-3" /> Tarifs B2B Gros
            </span>
          )}

          {product.category === 'service' && (
            <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <Clock className="w-3 h-3" /> Clé en Main ({product.serviceTurnaroundDays || 2}j)
            </span>
          )}

          {/* Urgent Stock Badge */}
          {product.stock <= 4 && product.stock > 0 && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1 shadow-md">
              <AlertTriangle className="w-3 h-3" /> Plus que {product.stock} articles !
            </span>
          )}

          {product.stock === 0 && (
            <span className="bg-gray-800 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
              Mode Précommande
            </span>
          )}
        </div>

        {/* Action icons (Wishlist, Compare, Quick Preview) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isWishlisted ? 'bg-red-500 text-white' : 'bg-black/60 text-gray-300 hover:text-white hover:bg-black/80'
            }`}
            title="Ajouter aux favoris"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); toggleCompare(product); }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isCompared ? 'bg-[#FFC300] text-black' : 'bg-black/60 text-gray-300 hover:text-white hover:bg-black/80'
            }`}
            title="Comparer"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setSelectedProductForDetail(product); }}
            className="p-2 rounded-full bg-black/60 text-gray-300 hover:text-white hover:bg-black/80 backdrop-blur-md transition-colors"
            title="Aperçu rapide"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Vendor banner at bottom of image */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5 flex items-center justify-between text-[11px] text-gray-300 z-10">
          <span className="font-semibold truncate max-w-[150px]">{product.vendorName}</span>
          {product.vendorVerified && (
            <span className="flex items-center gap-1 text-[#FFC300] font-bold text-[10px]">
              <CheckCircle2 className="w-3 h-3" /> Vérifié
            </span>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        
        <div>
          {/* Rating & Sales */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-white text-xs">{product.rating}</span>
              <span className="text-gray-400 text-[11px]">({product.reviewCount})</span>
            </div>
            <span className="text-[11px] text-gray-400">{product.salesCount}+ vendus</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setSelectedProductForDetail(product)}
            className="font-bold text-white text-sm line-clamp-2 hover:text-[#FFC300] cursor-pointer transition-colors leading-snug"
          >
            {product.title}
          </h3>

          {/* Key Feature bullet preview */}
          {product.features && product.features[0] && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-1">
              • {product.features[0]}
            </p>
          )}
        </div>

        {/* Pricing & B2B Tiers */}
        <div className="pt-2 border-t border-gray-800/80 space-y-2">
          
          {/* Retail & Original Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-white font-heading">
              {formatPrice(product.retailPrice)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* B2B Wholesale Tier Preview (Alibaba style) */}
          {product.b2bAvailable && lowestBulkPrice && (
            <div className="bg-[#1A1A1A] px-2.5 py-1 rounded-lg border border-[#FFC300]/20 flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Prix de gros B2B dès 20+ pcs :</span>
              <span className="font-bold text-[#FFC300]">{formatPrice(lowestBulkPrice)}/u</span>
            </div>
          )}

          {/* Action Button: Quick Add or Configure */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2.5 px-3 rounded-xl bg-[#FFC300] hover:bg-[#e6b000] text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#FFC300]/15"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ajouter au Panier</span>
          </button>

        </div>

      </div>

    </div>
  );
};

