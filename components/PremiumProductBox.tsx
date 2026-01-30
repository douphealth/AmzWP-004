/**
 * ============================================================================
 * PremiumProductBox | ULTRA-LUXE DESIGN v1.0
 * ============================================================================
 * State-of-the-Art Product Box with:
 * - Glass Morphism + Aurora Gradient Effects
 * - Animated Micro-Interactions
 * - Premium Typography & Spacing
 * - Luxury Trust Signals
 * - Dual Modes: LUXE_CARD / MINIMAL_FLOAT
 * ============================================================================
 */

import React, { useState } from 'react';
import { ProductDetails, DeploymentMode, FAQItem } from '../types';

interface PremiumProductBoxProps {
  product: ProductDetails;
  affiliateTag?: string;
  mode?: DeploymentMode;
  variant?: 'LUXE_CARD' | 'MINIMAL_FLOAT';
}

const DEFAULT_BULLETS = [
  "Precision-engineered for exceptional performance",
  "Industry-leading build quality and materials",
  "Comprehensive warranty protection included",
  "Trusted by 50,000+ verified customers"
];

const DEFAULT_FAQS: FAQItem[] = [
  { question: "What warranty coverage is included?", answer: "Full manufacturer warranty with extended protection options available." },
  { question: "How fast is delivery?", answer: "Prime-eligible for next-day delivery in most areas." },
  { question: "Is customer support available?", answer: "24/7 dedicated support via phone, chat, and email." }
];

const getCurrentDate = (): string => {
  return new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const PremiumProductBox: React.FC<PremiumProductBoxProps> = ({
  product,
  affiliateTag = 'amzwp-20',
  mode = 'ELITE_BENTO',
  variant = 'LUXE_CARD'
}) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const amazonLink = `https://www.amazon.com/dp/${product.asin}?tag=${affiliateTag}`;
  const imageSrc = imageError 
    ? `https://via.placeholder.com/400x400/f8fafc/64748b?text=${encodeURIComponent(product.title.substring(0, 20))}` 
    : product.imageUrl;
  const stars = Math.min(5, Math.max(0, Math.round(product.rating || 4.5)));
  const verdict = product.verdict || product.description || `Experience premium quality with the ${product.title}. Engineered for excellence and trusted by professionals worldwide.`;
  const bullets = product.pros?.length ? product.pros.slice(0, 4) : DEFAULT_BULLETS;
  const faqs = product.faqs?.length ? product.faqs.slice(0, 3) : DEFAULT_FAQS;
  const currentDate = getCurrentDate();

  if (mode === 'TACTICAL_LINK' || variant === 'MINIMAL_FLOAT') {
    return <MinimalFloat 
      product={product} 
      amazonLink={amazonLink} 
      imageSrc={imageSrc} 
      stars={stars}
      verdict={verdict}
      onImageError={() => setImageError(true)}
    />;
  }

  return (
    <div 
      className="w-full max-w-[1200px] mx-auto my-20 font-sans antialiased px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Container with Aurora Background */}
      <div className="relative">
        {/* Animated Aurora Background */}
        <div className="absolute -inset-4 rounded-[60px] overflow-hidden opacity-60 blur-3xl pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-r from-violet-600/30 via-fuchsia-500/20 to-amber-400/30 transition-all duration-1000 ${isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-60'}`} />
          <div className={`absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-rose-400/20 transition-all duration-1000 delay-100 ${isHovered ? 'opacity-80' : 'opacity-40'}`} />
        </div>

        {/* Glass Card */}
        <div className="relative bg-white/90 backdrop-blur-2xl rounded-[48px] border border-white/60 shadow-[0_60px_140px_-30px_rgba(0,0,0,0.12)] overflow-hidden">
          
          {/* Floating Premium Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-40">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 blur-lg opacity-60" />
              <div className="relative flex items-center gap-3 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-8 py-3 rounded-full shadow-2xl border border-white/10">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <i className="fa-solid fa-crown text-white text-[10px]" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[4px] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200">
                  Premium Selection
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row">
            
            {/* LEFT: Visual Showcase */}
            <div className="xl:w-[45%] relative bg-gradient-to-br from-slate-50/80 via-white to-slate-100/50 p-12 xl:p-16 flex flex-col items-center justify-center border-b xl:border-b-0 xl:border-r border-slate-200/50">
              
              {/* Floating Rating Orb */}
              <div className="absolute top-8 left-8 z-20">
                <div className="relative group/rating">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl blur-lg opacity-40 group-hover/rating:opacity-60 transition-opacity" />
                  <div className="relative bg-white/95 backdrop-blur-xl px-5 py-4 rounded-3xl shadow-xl border border-white/60">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fa-solid fa-star text-sm ${i < stars ? 'text-amber-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-2xl font-black text-slate-900">{product.rating?.toFixed(1) || '4.8'}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">/ 5.0</span>
                    </div>
                    <p className="text-[10px] font-medium text-slate-500 mt-1">
                      {product.reviewCount?.toLocaleString() || '2,400'}+ reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* Prime Badge */}
              {product.prime && (
                <div className="absolute top-8 right-8 z-20">
                  <div className="bg-[#232F3E] text-white px-4 py-2 rounded-xl text-[11px] font-bold flex items-center gap-2 shadow-xl">
                    <i className="fa-brands fa-amazon" />
                    <span className="tracking-wider">Prime</span>
                  </div>
                </div>
              )}

              {/* Product Image with Luxury Effects */}
              <a 
                href={amazonLink}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="relative group/img w-full flex items-center justify-center py-12"
              >
                {/* Glowing Ring */}
                <div className={`absolute inset-[10%] rounded-full border-2 border-dashed transition-all duration-700 ${isHovered ? 'border-violet-300/60 scale-105 rotate-180' : 'border-slate-200/40 scale-100 rotate-0'}`} />
                
                {/* Soft Glow */}
                <div className={`absolute inset-[5%] bg-gradient-to-br from-violet-400/10 via-fuchsia-300/5 to-amber-400/10 rounded-full blur-3xl transition-all duration-700 ${isHovered ? 'scale-125 opacity-100' : 'scale-100 opacity-60'}`} />
                
                <img 
                  src={imageSrc}
                  alt={product.title}
                  onError={() => setImageError(true)}
                  loading="lazy"
                  className={`relative z-10 max-h-[320px] xl:max-h-[400px] w-auto object-contain drop-shadow-2xl transition-all duration-700 ${isHovered ? 'scale-110 -rotate-2' : 'scale-100 rotate-0'}`}
                />
              </a>

              {/* Brand Signature */}
              <div className="flex items-center gap-4 mt-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                <span className="text-[10px] font-black uppercase tracking-[6px] text-slate-400">
                  {product.brand || 'Premium Brand'}
                </span>
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              </div>
            </div>

            {/* RIGHT: Intelligence Core */}
            <div className="xl:w-[55%] p-12 xl:p-16 flex flex-col justify-between bg-white">
              
              <div className="space-y-8">
                
                {/* Category + Badges */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-50 to-fuchsia-50 px-5 py-2.5 rounded-full border border-violet-100/80">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[3px] text-violet-700">
                      {product.category || 'Premium'}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                    <i className="fa-solid fa-shield-check text-emerald-500 text-xs" />
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Verified</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl xl:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
                  {product.title}
                </h2>

                {/* Premium Verdict Box */}
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 via-fuchsia-500 to-amber-500 rounded-full" />
                  <div className="pl-8 pr-4 py-6 bg-gradient-to-r from-slate-50/80 to-transparent rounded-r-3xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                        <i className="fa-solid fa-sparkles text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-[2px] text-slate-900">Expert Analysis</span>
                        <p className="text-[10px] text-slate-400">Updated {currentDate}</p>
                      </div>
                    </div>
                    <p className="text-base xl:text-lg font-medium text-slate-600 leading-relaxed">
                      {verdict}
                    </p>
                  </div>
                </div>

                {/* Premium Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bullets.map((bullet, idx) => (
                    <div 
                      key={idx}
                      className="group/benefit flex items-start gap-4 p-5 bg-gradient-to-br from-white to-slate-50/50 rounded-3xl border border-slate-100 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-500"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/25 group-hover/benefit:scale-110 group-hover/benefit:rotate-3 transition-all duration-300">
                        <i className="fa-solid fa-check text-white text-sm" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 leading-relaxed pt-2">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="mt-12 pt-10 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                  
                  {/* Price Display */}
                  <div className="text-center sm:text-left">
                    <div className="flex items-center gap-3 justify-center sm:justify-start mb-3">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-[4px]">Today's Price</span>
                      {product.prime && (
                        <span className="text-[9px] font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 rounded-full shadow-lg">
                          Prime Deal
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-6xl xl:text-7xl font-black text-slate-900 tracking-tighter">
                        {product.price}
                      </span>
                    </div>
                  </div>

                  {/* Ultra-Premium CTA */}
                  <a 
                    href={amazonLink}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="group/cta relative w-full sm:w-auto"
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 rounded-3xl blur-lg opacity-60 group-hover/cta:opacity-100 transition-opacity duration-300" />
                    
                    {/* Button */}
                    <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white px-14 py-7 rounded-3xl font-black text-sm uppercase tracking-[4px] shadow-2xl flex items-center justify-center gap-5 group-hover/cta:scale-[1.02] transition-all duration-300">
                      <span>View on Amazon</span>
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/cta:bg-white/20 transition-colors">
                        <i className="fa-solid fa-arrow-right text-lg group-hover/cta:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-3xl overflow-hidden" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <div className="bg-gradient-to-b from-slate-50/50 to-slate-100/30 border-t border-slate-200/50 p-10 xl:p-14">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-xl shadow-violet-500/25">
                  <i className="fa-solid fa-messages-question text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Frequently Asked</h3>
                  <p className="text-sm text-slate-500">Quick answers to common questions</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className={`bg-white rounded-3xl border cursor-pointer transition-all duration-300 overflow-hidden ${
                      expandedFaq === idx 
                        ? 'border-violet-200 shadow-xl shadow-violet-500/10' 
                        : 'border-slate-100 hover:border-slate-200 hover:shadow-lg'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                          expandedFaq === idx
                            ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg'
                            : 'bg-slate-100'
                        }`}>
                          <span className={`text-xs font-black ${expandedFaq === idx ? 'text-white' : 'text-slate-500'}`}>
                            {idx + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 text-sm leading-snug">{faq.question}</h4>
                          <div className={`overflow-hidden transition-all duration-300 ${
                            expandedFaq === idx ? 'max-h-32 opacity-100 mt-4' : 'max-h-0 opacity-0'
                          }`}>
                            <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                        <i className={`fa-solid fa-chevron-down text-slate-400 text-sm transition-transform ${
                          expandedFaq === idx ? 'rotate-180' : ''
                        }`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust Footer */}
          <div className="bg-slate-950 px-10 py-8">
            <div className="flex flex-wrap justify-center items-center gap-8 xl:gap-16">
              {[
                { icon: 'fa-amazon', text: 'Amazon Verified', brand: true },
                { icon: 'fa-shield-halved', text: 'Secure Checkout', brand: false },
                { icon: 'fa-rotate-left', text: '30-Day Returns', brand: false },
                { icon: 'fa-truck-fast', text: 'Fast Prime Shipping', brand: false },
                { icon: 'fa-headset', text: '24/7 Support', brand: false }
              ].map((signal, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group/trust">
                  <i className={`fa-${signal.brand ? 'brands' : 'solid'} ${signal.icon} group-hover/trust:scale-110 transition-transform`} />
                  <span className="text-[10px] font-bold uppercase tracking-[2px]">{signal.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MINIMAL FLOAT VARIANT - Ultra-Clean Horizontal Card
// ============================================================================

interface MinimalFloatProps {
  product: ProductDetails;
  amazonLink: string;
  imageSrc: string;
  stars: number;
  verdict: string;
  onImageError: () => void;
}

const MinimalFloat: React.FC<MinimalFloatProps> = ({
  product,
  amazonLink,
  imageSrc,
  stars,
  verdict,
  onImageError
}) => {
  const currentDate = getCurrentDate();

  return (
    <div className="w-full max-w-[1000px] mx-auto my-12 px-4">
      <div className="group relative">
        {/* Aurora Glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/10 to-amber-500/20 rounded-[36px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Card */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-[32px] border border-slate-200/80 p-6 md:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_100px_-25px_rgba(0,0,0,0.15)] transition-all duration-500 flex flex-col md:flex-row items-center gap-8">
          
          {/* Left Accent */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-violet-500 via-fuchsia-500 to-amber-500 rounded-l-[32px]" />
          
          {/* Premium Badge */}
          <div className="absolute -top-2 right-6 bg-gradient-to-r from-slate-950 to-slate-900 text-white text-[9px] font-black uppercase tracking-[3px] py-2 px-5 rounded-full shadow-xl flex items-center gap-2">
            <i className="fa-solid fa-gem text-amber-400 text-[8px]" />
            Top Pick
          </div>

          {/* Image */}
          <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-slate-50 to-white rounded-3xl flex items-center justify-center flex-shrink-0 border border-slate-100 p-4 shadow-inner group-hover:scale-105 transition-transform duration-500">
            <img 
              src={imageSrc}
              alt={product.title}
              onError={onImageError}
              loading="lazy"
              className="max-h-full max-w-full object-contain drop-shadow-lg"
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left min-w-0 space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
              <span className="text-[9px] font-black uppercase tracking-[2px] text-violet-600 bg-violet-50 px-4 py-1.5 rounded-full border border-violet-100">
                {currentDate} Pick
              </span>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-solid fa-star text-xs ${i < stars ? 'text-amber-400' : 'text-slate-200'}`} />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-400">
                  ({product.reviewCount?.toLocaleString() || '2.4k'})
                </span>
              </div>
            </div>
            
            <h3 className="font-black text-slate-900 text-xl md:text-2xl leading-tight line-clamp-2">
              {product.title}
            </h3>
            
            <p className="text-slate-500 text-sm line-clamp-2 hidden md:block leading-relaxed">
              {verdict}
            </p>
          </div>

          {/* Price & CTA */}
          <div className="flex flex-col items-center gap-4 flex-shrink-0 w-full md:w-auto">
            <div className="text-center">
              <span className="text-[9px] text-slate-400 uppercase tracking-[2px] font-bold block mb-1">Best Price</span>
              <span className="text-4xl font-black text-slate-900 tracking-tight">{product.price}</span>
            </div>
            
            <a
              href={amazonLink}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="group/btn relative w-full md:w-auto"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl blur opacity-40 group-hover/btn:opacity-80 transition-opacity" />
              <div className="relative px-10 py-5 bg-gradient-to-r from-slate-950 to-slate-900 text-white text-xs font-black uppercase tracking-[3px] rounded-2xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl">
                View Deal
                <i className="fa-solid fa-arrow-right group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumProductBox;
