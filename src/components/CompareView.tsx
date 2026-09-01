import React from 'react';
import { useApp } from '../context/AppContext';
import { Layers, X, ShoppingBag, ArrowLeft, CheckCircle2, Zap, Store } from 'lucide-react';

export const CompareView: React.FC = () => {
  const { compareList, toggleCompare, addToCart, formatPrice, setActiveView } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-white flex items-center gap-2">
            <Layers className="w-7 h-7 text-[#FFC300]" />
            <span>Comparateur Technique de Produits ({compareList.length}/4)</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Comparez les caractéristiques, tarifs B2B de gros, avis clients et garanties côte à côte.
          </p>
        </div>

        <button
          onClick={() => setActiveView('home')}
          className="px-4 py-2 bg-[#181B26] hover:bg-[#222636] text-white text-xs font-bold rounded-xl border border-white/10 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au Marché</span>
        </button>
      </div>

      {compareList.length === 0 ? (
        <div className="text-center py-20 bg-[#12141C] rounded-3xl border border-white/10 space-y-4">
          <Layers className="w-16 h-16 text-gray-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">Aucun produit sélectionné pour comparaison.</h3>
          <p className="text-xs text-gray-400">Cliquez sur l'icône de superposition sur les cartes produits pour les comparer.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[700px] grid grid-cols-5 gap-4 bg-[#12141C] p-6 rounded-3xl border border-white/10">
            
            {/* Criteria Column */}
            <div className="space-y-6 text-xs text-gray-400 font-bold border-r border-white/10 pr-4 flex flex-col justify-between">
              <div className="h-44 flex items-center">Article</div>
              <div className="py-2 border-t border-white/5">Catégorie</div>
              <div className="py-2 border-t border-white/5">Prix au Détail</div>
              <div className="py-2 border-t border-white/5">Tarif B2B Gros</div>
              <div className="py-2 border-t border-white/5">Disponibilité / Stock</div>
              <div className="py-2 border-t border-white/5">Vendeur Certifié</div>
              <div className="py-2 border-t border-white/5">Garantie & Escrow</div>
              <div className="py-2 border-t border-white/5">Action</div>
            </div>

            {/* Compared Products Columns */}
            {compareList.map((product) => (
              <div key={product.id} className="space-y-6 text-xs text-center relative flex flex-col justify-between">
                
                {/* Remove button */}
                <button
                  onClick={() => toggleCompare(product)}
                  className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full z-10 hover:bg-red-500"
                  title="Retirer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Product image & title */}
                <div className="h-44 flex flex-col items-center justify-center space-y-2">
                  <img src={product.images[0]} alt={product.title} className="w-24 h-24 rounded-2xl object-cover bg-black" />
                  <h4 className="font-bold text-white text-xs line-clamp-2">{product.title}</h4>
                </div>

                {/* Category */}
                <div className="py-2 border-t border-white/5 font-semibold text-[#FFC300]">
                  {product.category === 'physique' ? '📦 Physique' : product.category === 'digital' ? '⚡ Digital' : '🚀 Service'}
                </div>

                {/* Retail price */}
                <div className="py-2 border-t border-white/5 font-black text-white text-sm">
                  {formatPrice(product.retailPrice)}
                </div>

                {/* Wholesale price */}
                <div className="py-2 border-t border-white/5 text-gray-300">
                  {product.b2bAvailable && product.bulkPricing?.[0] ? (
                    <span className="text-green-400 font-bold">{formatPrice(product.bulkPricing[product.bulkPricing.length - 1].unitPrice)}/u</span>
                  ) : (
                    <span className="text-gray-500">Non dispo en gros</span>
                  )}
                </div>

                {/* Stock */}
                <div className="py-2 border-t border-white/5">
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${product.stock > 5 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {product.stock} unités
                  </span>
                </div>

                {/* Vendor */}
                <div className="py-2 border-t border-white/5 text-white font-medium flex items-center justify-center gap-1">
                  <span>{product.vendorName}</span>
                  {product.vendorVerified && <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC300]" />}
                </div>

                {/* Escrow */}
                <div className="py-2 border-t border-white/5 text-green-400 font-semibold">
                  ✓ Escrow 48h Garanti
                </div>

                {/* Action */}
                <div className="py-2 border-t border-white/5">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-full py-2 bg-[#FFC300] hover:bg-[#e6b000] text-black font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Ajouter</span>
                  </button>
                </div>

              </div>
            ))}

            {/* Empty slots placeholders */}
            {Array.from({ length: 4 - compareList.length }).map((_, i) => (
              <div key={i} className="border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center p-6 text-center text-gray-600 text-xs">
                + Ajouter un autre article pour comparer
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  );
};
