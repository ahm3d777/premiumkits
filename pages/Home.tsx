import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button, Reveal } from '../components/UI';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { ArrowRight, ShieldCheck, Truck, Clock, Flame, Star, ChevronRight, Users, CheckCircle, Sparkles } from 'lucide-react';

export const Home = () => {
  const { navigateTo } = useStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="animate-fade-in overflow-hidden">
      
      {/* Cinematic Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-brand-dark">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=2831&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover animate-zoom-in-slow opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent"></div>
          <div className="absolute inset-0 bg-brand-dark/30 mix-blend-multiply"></div>
        </div>
        
        {/* Content */}
        <div className={`relative z-20 text-center max-w-6xl px-4 flex flex-col items-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          <div className="mb-8 animate-float">
             <span className="inline-flex items-center gap-3 py-2 px-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-xl text-white text-xs font-bold uppercase tracking-[0.25em] shadow-2xl hover:bg-white/10 transition-colors cursor-default ring-1 ring-white/10">
                <Star size={12} className="text-brand-gold fill-brand-gold" />
                <span>Official 2025/26 Season</span>
                <Star size={12} className="text-brand-gold fill-brand-gold" />
             </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-white mb-6 tracking-tighter leading-[0.9]">
            <span className="block text-outline opacity-40 select-none">WE ARE</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-2xl">
              FOOTBALL
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-slide-up-delayed">
            Authentic player edition jerseys. Sourced directly from Europe's top clubs. Experience the game in high definition.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up-delayed" style={{ animationDelay: '0.4s' }}>
            <Button onClick={() => navigateTo('shop')} variant="primary" className="min-w-[200px] border-none shadow-[0_0_40px_-10px_rgba(212,13,54,0.5)]">
              Shop New Arrivals
            </Button>
            <Button onClick={() => navigateTo('shop')} variant="outline" className="min-w-[200px] text-white border-white/20 hover:bg-white hover:text-brand-dark hover:border-white backdrop-blur-sm">
              Explore Collections
            </Button>
          </div>

          {/* Social Proof Floating Element */}
          <div className="absolute -right-4 top-1/2 hidden lg:flex flex-col gap-3 animate-slide-up-delayed" style={{ animationDelay: '0.8s' }}>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4 max-w-xs text-left transform rotate-2 hover:rotate-0 transition-transform duration-300 shadow-2xl">
                  <div className="bg-brand-crimson rounded-full p-2 shadow-lg shadow-brand-crimson/40">
                    <Users size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white font-sport">15k+</div>
                    <div className="text-[10px] text-gray-300 uppercase tracking-wider">Happy Fans</div>
                  </div>
              </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
           <span className="text-[10px] text-white uppercase tracking-widest">Scroll</span>
           <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="bg-brand-crimson text-white overflow-hidden py-4 relative z-20 shadow-2xl rotate-0 md:-rotate-1 scale-105 border-y-4 border-brand-dark">
        <div className="animate-marquee whitespace-nowrap flex gap-16 font-heading font-bold text-sm uppercase tracking-widest items-center">
            {[...Array(10)].map((_, i) => (
                <React.Fragment key={i}>
                    <span className="flex items-center gap-4">
                        <Flame size={16} className="animate-pulse" />
                        Free Shipping Over ৳5,000
                    </span>
                    <span className="text-brand-dark opacity-40">•</span>
                    <span className="flex items-center gap-4">
                        <ShieldCheck size={16} />
                        Authentic Jersey Guarantee
                    </span>
                    <span className="text-brand-dark opacity-40">•</span>
                    <span className="flex items-center gap-4">
                        <Star size={16} fill="currentColor" />
                        New 2025/26 Kits Available
                    </span>
                    <span className="text-brand-dark opacity-40">•</span>
                </React.Fragment>
            ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
            width: max-content;
          }
        `}</style>
      </div>

      {/* Features Section - Dark Mode for Premium Contrast */}
      <section className="py-24 bg-brand-dark relative">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Why Choose Premium?</h2>
              <div className="w-24 h-1 bg-brand-crimson mx-auto"></div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { icon: ShieldCheck, title: "100% Authentic", desc: "Verified serial numbers and official manufacturer tags on every product." },
                { icon: Truck, title: "Express Delivery", desc: "Same day dispatch for Dhaka. Fast 48h nationwide delivery network." },
                { icon: Flame, title: "Player Edition", desc: "Wear what the pros wear. Engineered with Dri-FIT ADV technology." }
            ].map((feature, i) => (
                <Reveal key={i} delay={i * 0.2}>
                  <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-crimson/50 transition-all duration-500 relative overflow-hidden h-full">
                      <div className="absolute -right-10 -top-10 bg-brand-crimson/20 w-32 h-32 rounded-full blur-3xl group-hover:bg-brand-crimson/30 transition-all duration-700"></div>
                      
                      <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:text-brand-crimson transition-all duration-300 shadow-xl">
                          <feature.icon size={28} strokeWidth={1.5} />
                      </div>
                      
                      <h3 className="font-heading font-bold text-xl uppercase tracking-wider text-white mb-3 group-hover:text-brand-crimson transition-colors">{feature.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">{feature.desc}</p>
                  </div>
                </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-brand-offWhite relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="absolute -left-40 top-20 w-96 h-96 bg-brand-crimson/5 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute -right-40 bottom-20 w-[30rem] h-[30rem] bg-brand-royal/5 rounded-full blur-3xl mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <span className="flex items-center gap-2 text-brand-crimson font-bold text-xs uppercase tracking-[0.2em] mb-3">
                   <div className="w-8 h-[2px] bg-brand-crimson"></div>
                   Weekly Drop
                </span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark">Trending Now</h2>
              </div>
              <Button onClick={() => navigateTo('shop')} variant="ghost" className="group hover:bg-white border border-transparent hover:border-gray-200">
                View All Jerseys <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {featuredProducts.map((product, idx) => (
              <Reveal key={product.id} delay={idx * 0.1}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Immersion Section */}
      <section className="py-6 bg-brand-dark text-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative h-[600px] w-full group overflow-hidden">
             <img 
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2670&auto=format&fit=crop" 
                alt="Player Edition Background" 
                className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110 opacity-60 group-hover:opacity-30" 
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
             
             <div className="absolute inset-0 flex items-center">
               <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8 relative z-10">
                      <Reveal>
                        <div className="inline-block px-4 py-1 border border-brand-gold/50 text-brand-gold text-xs font-bold uppercase tracking-[0.3em] bg-black/50 backdrop-blur-md">
                            Premium Tier
                        </div>
                      </Reveal>
                      
                      <Reveal delay={0.2}>
                        <h2 className="text-5xl md:text-7xl font-heading font-black leading-none drop-shadow-2xl">
                            PLAYER <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">EDITION</span>
                        </h2>
                      </Reveal>

                      <Reveal delay={0.4}>
                        <p className="text-gray-300 text-lg max-w-md leading-relaxed font-light">
                            Engineered for the world's best athletes. Now available for you. 
                            Featuring lightweight fabric, streamlined fit, and heat-applied details.
                        </p>
                      </Reveal>

                      <Reveal delay={0.6}>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          {/* Upgraded Button Style */}
                          <Button 
                            onClick={() => navigateTo('shop')} 
                            variant="primary" 
                            className="bg-brand-gold text-brand-dark hover:bg-white hover:text-brand-crimson border-none shadow-[0_0_20px_rgba(207,162,56,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                          >
                              Shop Player Edition
                          </Button>
                          <div className="flex items-center gap-3 text-sm font-bold text-gray-400 px-4">
                              <CheckCircle size={16} className="text-brand-gold" /> Official Licensed
                          </div>
                        </div>
                      </Reveal>
                  </div>
                  
                  {/* Floating Kit Visual - SUPER PREMIUM COLLECTOR'S CARD */}
                  <div className="hidden md:flex relative h-[600px] w-full items-center justify-center">
                      {/* Dynamic Atmosphere */}
                      <div className="absolute w-[600px] h-[600px] bg-gradient-to-b from-brand-crimson/10 via-purple-900/10 to-transparent blur-[120px] rounded-full animate-pulse-slow"></div>
                      
                      {/* The Floating Artifact */}
                      <div className="animate-float z-10 relative group cursor-pointer perspective-[1200px]">
                          
                          {/* Card Glow / Halo */}
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-gold via-brand-crimson to-brand-gold rounded-[2.5rem] blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>

                          {/* Main Card Chassis */}
                          <div 
                              className="relative w-[340px] h-[480px] rounded-[2.2rem] bg-[#0F0F13] border border-white/10 shadow-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] [transform:rotateY(-12deg)_rotateX(6deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)_scale(1.05)]"
                          >
                              {/* Shimmer / Gloss Effect */}
                              <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>

                              {/* Background Texture */}
                              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                              {/* Jersey Image (Parallax-like scale) */}
                              <div className="absolute inset-0 z-0">
                                  <img 
                                      src="https://images.unsplash.com/photo-1596205862788-294c77647225?q=80&w=800&auto=format&fit=crop"
                                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                      alt="Collector Jersey"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                                  {/* Watermark Crest */}
                                  <img 
                                    src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" 
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.15] mix-blend-overlay pointer-events-none grayscale"
                                    alt="Watermark"
                                  />
                              </div>

                              {/* Visible Crest in Corner */}
                              <div className="absolute top-6 left-6 z-30">
                                <img 
                                  src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" 
                                  className="w-12 h-12 drop-shadow-xl" 
                                  alt="FC Barcelona" 
                                />
                              </div>

                              {/* Holographic Badge */}
                              <div className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-200 shadow-lg flex items-center justify-center animate-pulse-slow">
                                  <Sparkles size={20} className="text-black/80" />
                              </div>

                              {/* Content Overlay */}
                              <div className="absolute bottom-0 left-0 w-full p-8 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                  <div className="flex items-center gap-3 mb-3">
                                      <span className="px-3 py-1 rounded-full bg-brand-crimson text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-brand-crimson/50">
                                          Rare Find
                                      </span>
                                      <span className="text-brand-gold text-xs font-bold flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-md">
                                          <Star size={10} fill="currentColor" /> 9.9 Rating
                                      </span>
                                  </div>
                                  <h3 className="text-4xl font-heading font-black text-white mb-1 tracking-tight leading-none drop-shadow-lg">
                                      BARCA <span className="text-brand-crimson">25/26</span>
                                  </h3>
                                  <div className="h-0.5 w-12 bg-white/30 my-3 group-hover:w-full transition-all duration-700"></div>
                                  <p className="text-gray-300 text-xs font-medium tracking-wide flex justify-between items-center">
                                      <span>Authentic Match Kit</span>
                                      <span className="text-white font-bold bg-white/10 px-2 py-1 rounded">#10 Lamine</span>
                                  </p>
                              </div>
                          </div>

                          {/* Floating Elements (Particles) */}
                          <div className="absolute -top-6 -left-6 w-16 h-16 bg-brand-gold/10 blur-xl rounded-full animate-float-delayed"></div>
                          <div className="absolute bottom-20 -right-8 w-12 h-12 bg-brand-crimson/20 blur-xl rounded-full animate-float"></div>
                      </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};