import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { CURRENCY_SYMBOL } from '../constants';
import { Badge } from './UI';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag, ImageOff } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, toggleWishlist, wishlist } = useStore();
  const isLiked = wishlist.includes(product.id);
  const [imgSrc, setImgSrc] = useState(product.image);
  const [hasError, setHasError] = useState(false);

  // Update image if product changes
  useEffect(() => {
    setImgSrc(product.image);
    setHasError(false);
  }, [product.image]);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback to a colored placeholder with the team name
      const bg = product.color || '1e293b';
      // Determine text color based on background luminance roughly, or default to white/black
      const text = ['F7B5CD', 'FCD116', 'FFFFFF'].includes(bg) ? '000000' : 'FFFFFF';
      setImgSrc(`https://placehold.co/600x800/${bg}/${text}?text=${encodeURIComponent(product.team)}`);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      className="group relative bg-white cursor-pointer rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 overflow-hidden"
      onClick={() => navigateTo('product', product)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        
        {/* Badges */}
        <div className="absolute top-0 left-0 z-20 flex flex-col gap-2 p-3">
          {product.isPlayerEdition && <Badge type="player">Player Edition</Badge>}
          {product.status === 'pre-order' && <Badge type="preorder">Pre-Order</Badge>}
          {product.originalPrice && <Badge type="sale">Save {(100 - (product.price / product.originalPrice * 100)).toFixed(0)}%</Badge>}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg transition-all duration-300 hover:bg-brand-crimson hover:border-brand-crimson hover:scale-110 active:scale-90 group-hover:bg-white group-hover:text-brand-crimson group-hover:border-white"
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} strokeWidth={2} className={isLiked ? "text-brand-crimson fill-brand-crimson" : ""} />
        </button>

        {/* Image Display */}
        <div className="w-full h-full overflow-hidden bg-gray-200">
            <img 
              src={imgSrc} 
              alt={product.name} 
              onError={handleImageError}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
            />
            
            {/* Dark Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Quick View Button */}
        {product.status !== 'out-of-stock' && (
           <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
             <button className="w-full py-3 bg-brand-dark/95 backdrop-blur text-white font-heading font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-brand-crimson transition-colors flex items-center justify-center gap-2 rounded-sm">
                <Eye size={14} /> View Details
             </button>
           </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col space-y-2 p-5 bg-white">
        <div className="flex justify-between items-start">
            <div className="text-[10px] font-bold tracking-widest text-brand-gold uppercase bg-brand-dark/5 px-2 py-0.5 rounded-sm inline-block">
                {product.team}
            </div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.season || '25/26'}</div>
        </div>
        
        <h3 className="font-heading font-bold text-brand-dark text-base leading-snug group-hover:text-brand-crimson transition-colors duration-300 line-clamp-1 min-h-[1.5em]">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold font-sport text-brand-dark">
                {CURRENCY_SYMBOL}{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through font-sport opacity-70">
                {CURRENCY_SYMBOL}{product.originalPrice.toLocaleString()}
                </span>
            )}
          </div>
          {/* Subtle Add hint */}
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-dark group-hover:text-white transition-colors duration-300">
             <ShoppingBag size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};