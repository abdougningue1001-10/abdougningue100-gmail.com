import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, products, setActiveView } = useApp();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-white flex items-center gap-2">
            <Heart className="w-7 h-7 text-red-500 fill-red-500" />
            <span>Mes Favoris ({wishlistedProducts.length})</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Retrouvez tous les produits physiques, codes digitaux et services que vous avez sauvegardés.
          </p>
        </div>

        <button
          onClick={() => setActiveView('home')}
          className="px-4 py-2 bg-[#181B26] hover:bg-[#222636] text-white text-xs font-bold rounded-xl border border-white/10 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continuer mes Achats</span>
        </button>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#12141C] rounded-3xl border border-white/10 space-y-4">
          <Heart className="w-16 h-16 text-gray-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">Votre liste de favoris est vide.</h3>
          <p className="text-xs text-gray-400">Cliquez sur le cœur d'un produit pour le retrouver ici facilement.</p>
          <button
            onClick={() => setActiveView('home')}
            className="px-6 py-2.5 bg-[#FFC300] text-black font-extrabold text-xs rounded-xl"
          >
            Explorer le Marché
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
