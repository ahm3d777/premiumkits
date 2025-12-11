import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Button, Badge, Reveal } from '../components/UI';
import { CURRENCY_SYMBOL, AVAILABLE_SIZES, FONT_STYLES } from '../constants';
import { Check, Star, Truck, Shield, AlertCircle, Ruler, Info, Share2, ImageOff, Heart } from 'lucide-react';

export const ProductDetail = () => {
  const { currentProduct, addToCart, navigateTo, toggleWishlist, wishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [customization, setCustomization] = useState<{name: string, number: string, font: string}>({
    name: '',
    number: '',
    font: FONT_STYLES[0]
  });
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    setImageError(false);
  }, [currentProduct]);

  if (!currentProduct) {
    navigateTo('home');
    return null;
  }

  const isWishlisted = wishlist.includes(currentProduct.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart(
      currentProduct, 
      selectedSize, 
      isCustomizing ? customization : undefined
    );
  };

  const totalPrice = isCustomizing ? currentProduct.price + 800 : currentProduct.price;
  
  // Use gallery if available, otherwise array of same image
  const gallery = currentProduct.gallery && currentProduct.gallery.length > 0 
    ? currentProduct.gallery 
    : [currentProduct.image, currentProduct.image, currentProduct.image, currentProduct.image];

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
    }
  };

  // Safe image source determination
  const getSafeImage = (src: string) => {
    if (imageError && activeImageIndex === 0) {
      // Fallback for main image if it fails
      const bg = currentProduct.color || '1e293b';
      const text = ['F7B5CD', 'FCD116', 'FFFFFF'].includes(bg) ? '000000' : 'FFFFFF';
      return `https://placehold.co/800x1000/${bg}/${text}?text=${encodeURIComponent(currentProduct.team)}&font=oswald`;
    }
    return src;
  };

  return (
    <div className="bg-white min-h-screen pb-20 pt-8 animate-fade-in">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
         <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-2">
            <span className="cursor-pointer hover:text-brand-dark transition-colors" onClick={() => navigateTo('home')}>Home</span> 
            <span className="text-gray-300">/</span>
            <span className="cursor-pointer hover:text-brand-dark transition-colors" onClick={() => navigateTo('shop')}> {currentProduct.league}</span> 
            <span className="text-gray-300">/</span>
            <span className="text-brand-dark border-b-2 border-brand-crimson pb-0.5"> {currentProduct.name}</span>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left: Images */}
          <div className="lg:col-span-7 space-y-6 animate-slide-up">
            <div className="aspect-[4/5] bg-gray-50 relative group overflow-hidden shadow-2xl shadow-gray-200/50 rounded-lg">
               <img 
                src={getSafeImage(gallery[activeImageIndex])} 
                alt={currentProduct.name} 
                onError={handleImageError}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
               />
               
               {/* Customization Preview Overlay */}
               {isCustomizing && customization.number && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all animate-fade-in z-20">
                    <div className="bg-white shadow-2xl p-8 text-center min-w-[240px] transform scale-100 animate-slide-up rounded-sm">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">Back Preview</p>
                      <div className="font-sport font-bold text-8xl text-brand-dark mb-2 tracking-tighter">{customization.number}</div>
                      <div className="font-heading font-bold text-2xl uppercase text-brand-dark tracking-widest">{customization.name}</div>
                    </div>
                 </div>
               )}

               <div className="absolute top-4 left-4 z-10">
                 {currentProduct.isPlayerEdition && <Badge type="player">Player Edition</Badge>}
               </div>
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {gallery.map((img, i) => (
                <div 
                    key={i} 
                    className={`aspect-square bg-gray-50 cursor-pointer overflow-hidden border-2 rounded-lg transition-all duration-300 ${activeImageIndex === i ? 'border-brand-dark opacity-100 ring-2 ring-brand-dark/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    onClick={() => {
                        setActiveImageIndex(i);
                        setImageError(false); // Reset error state when switching images
                    }}
                >
                  <img 
                    src={getSafeImage(img)} 
                    alt={`View ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        // Silent fail for thumbnails to placeholder
                        const target = e.target as HTMLImageElement;
                        target.src = `https://placehold.co/200x200/f1f5f9/cbd5e1?text=View+${i+1}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5 sticky top-28 self-start animate-slide-up-delayed">
            <div className="mb-8">
               <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xs font-bold text-brand-crimson uppercase tracking-[0.2em]">{currentProduct.team} • {currentProduct.season}</h2>
                  <button className="text-gray-400 hover:text-brand-dark transition-colors p-2 hover:bg-gray-100 rounded-full"><Share2 size={18} /></button>
               </div>
               <h1 className="text-4xl md:text-5xl font-heading font-black text-brand-dark leading-none tracking-tight mb-4">{currentProduct.name}</h1>
              
               <div className="flex items-center gap-4">
                <div className="flex items-center text-brand-gold text-sm gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(currentProduct.rating) ? "currentColor" : "none"} className={i < Math.floor(currentProduct.rating) ? "" : "text-gray-200"} />
                  ))}
                </div>
                <span className="text-gray-400 text-xs font-medium border-l border-gray-200 pl-4">{currentProduct.reviews} Verified Reviews</span>
               </div>
            </div>

            <div className="flex items-baseline gap-4 mb-8 border-b border-gray-100 pb-8">
              <span className="text-4xl font-sport font-bold text-brand-dark">{CURRENCY_SYMBOL}{totalPrice.toLocaleString()}</span>
              {currentProduct.originalPrice && (
                <span className="text-xl text-gray-400 line-through decoration-gray-300 font-sport">{CURRENCY_SYMBOL}{currentProduct.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-10 text-sm">
              {currentProduct.description}
            </p>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-dark">Select Size</span>
                <button className="flex items-center gap-1 text-gray-500 text-xs hover:text-brand-dark transition-colors border-b border-gray-300 hover:border-brand-dark pb-0.5">
                  <Ruler size={14} /> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {AVAILABLE_SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 border transition-all duration-300 text-sm font-bold rounded-[2px]
                      ${selectedSize === size 
                        ? 'border-brand-dark bg-brand-dark text-white shadow-lg transform scale-105' 
                        : 'border-gray-200 text-gray-600 hover:border-brand-dark hover:text-brand-dark'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization Toggle */}
            <div className={`bg-white p-6 mb-10 border transition-all duration-300 rounded-sm ${isCustomizing ? 'border-brand-dark shadow-xl ring-1 ring-brand-dark/5' : 'border-gray-200 hover:border-gray-300'}`}>
              <div 
                className="flex items-center justify-between cursor-pointer group" 
                onClick={() => setIsCustomizing(!isCustomizing)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 border transition-all duration-300 flex items-center justify-center rounded-[2px] ${isCustomizing ? 'bg-brand-dark border-brand-dark text-white' : 'border-gray-300 bg-white group-hover:border-brand-dark'}`}>
                    {isCustomizing && <Check size={14} />}
                  </div>
                  <div>
                      <span className="block font-heading font-bold text-sm uppercase tracking-wider text-brand-dark">Personalize Kit</span>
                      <span className="text-[10px] text-gray-400">Official League Fonts Available</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-brand-dark font-sport">+৳800</span>
              </div>

              <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${isCustomizing ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-gray-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="min-h-0 space-y-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Name on Back</label>
                    <input 
                      type="text" 
                      maxLength={12}
                      placeholder="YOUR NAME"
                      value={customization.name}
                      onChange={e => setCustomization({...customization, name: e.target.value.toUpperCase()})}
                      className="w-full bg-gray-50 border-none p-4 text-sm uppercase font-heading focus:ring-1 focus:ring-brand-dark outline-none transition-all placeholder:text-gray-300 tracking-widest rounded-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Number</label>
                      <input 
                        type="number" 
                        max={99}
                        placeholder="10"
                        value={customization.number}
                        onChange={e => setCustomization({...customization, number: e.target.value})}
                        className="w-full bg-gray-50 border-none p-4 text-sm font-sport focus:ring-1 focus:ring-brand-dark outline-none transition-all placeholder:text-gray-300 text-center text-lg font-bold rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Font Style</label>
                      <div className="relative">
                        <select 
                            value={customization.font}
                            onChange={e => setCustomization({...customization, font: e.target.value})}
                            className="w-full bg-gray-50 border-none p-4 text-sm appearance-none focus:ring-1 focus:ring-brand-dark outline-none cursor-pointer font-bold text-gray-700 rounded-sm"
                        >
                            {FONT_STYLES.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                        <div className="absolute right-4 top-4 pointer-events-none text-gray-400 text-xs">▼</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-10">
              <Button onClick={handleAddToCart} fullWidth variant="primary" className="h-16 text-lg flex-1">
                Add to Cart — {CURRENCY_SYMBOL}{totalPrice.toLocaleString()}
              </Button>
              <button 
                onClick={() => toggleWishlist(currentProduct.id)}
                className={`h-16 w-16 flex items-center justify-center border rounded-full transition-all duration-300 ${isWishlisted ? 'bg-red-50 border-brand-crimson text-brand-crimson' : 'border-gray-200 text-gray-400 hover:border-brand-dark hover:text-brand-dark'}`}
              >
                <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Features Accordion (Static) */}
            <Reveal>
              <div className="space-y-4 bg-gray-50 p-6 rounded-sm">
                 <div className="flex items-start gap-4 text-sm text-gray-600">
                   <Shield className="text-brand-dark flex-shrink-0 mt-0.5" size={20} />
                   <div>
                      <h4 className="font-bold text-brand-dark mb-1">Authenticity Guaranteed</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Sourced directly from official manufacturers. 100% original player version quality.</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4 text-sm text-gray-600">
                   <Truck className="text-brand-dark flex-shrink-0 mt-0.5" size={20} />
                   <div>
                      <h4 className="font-bold text-brand-dark mb-1">Fast Delivery</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Dhaka: 24-48 hours. Nationwide: 3-5 days. Tracking included.</p>
                   </div>
                 </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </div>
  );
};