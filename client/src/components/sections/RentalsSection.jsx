import { Link } from 'react-router-dom';
import { HiArrowRight, HiCalendar, HiTruck, HiClock } from 'react-icons/hi';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import MagneticButton from '../ui/MagneticButton';
import BrandText from '../ui/BrandText';

const RentalsSection = () => {
  return (
    <section id="rentals-preview" className="pt-32 pb-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary-600/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative px-6 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Tall Card - Robot Image */}
          <div className="lg:col-span-5 h-full">
            <ScrollReveal direction="up" delay={0.1} className="h-full">
              <div className="bg-[#0e0e11] border border-white/5 rounded-3xl overflow-hidden flex flex-col group h-full hover:border-primary-500/30 transition-colors duration-500 p-6 md:p-8 relative min-h-[500px] lg:min-h-full">
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary-500/20 transition-colors duration-700" />
                
                <div className="relative z-10 flex flex-col h-full w-full">
                  <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 border border-white/5 w-max">
                    <HiTruck size={14} className="text-primary-400" />
                    <span className="text-[11px] font-manrope font-semibold text-primary-300 tracking-wider uppercase">On-Demand Deployment</span>
                  </div>

                  <h3 className="font-space text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    Bring Tomorrow's Tech to <span className="text-gradient">Your Event</span>
                  </h3>

                  <p className="text-gray-400 font-inter text-sm md:text-base leading-relaxed mb-6">
                    Create unforgettable experiences and massive engagement at your next exhibition, corporate meet, or campaign.
                  </p>

                  <div className="mt-auto pt-2 z-20">
                    <MagneticButton>
                      <Link
                        to="/rentals"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-manrope font-semibold text-white bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:bg-primary-500 hover:border-primary-400 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] group-button"
                      >
                        Explore Rental Fleet
                        <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </MagneticButton>
                  </div>
                  
                  {/* Robot Image Overlay (Takes up bottom space) */}
                  <div className="absolute left-[-30%] right-[-30%] bottom-[-5%] top-[100px] pointer-events-none flex items-end justify-center">
                    <img 
                      src="/robot (2).png" 
                      alt="Rental Robot" 
                      className="w-full h-[160%] object-contain object-bottom translate-y-0 group-hover:-translate-y-4 transition-transform duration-700 opacity-100"
                      style={{ filter: 'drop-shadow(0 15px 35px rgba(139,92,246,0.4))' }}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Heading and Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            
            {/* Heading Right Aligned */}
            <div className="flex flex-col items-end text-right mt-4 lg:mt-0">
              <ScrollReveal direction="up">
                <SectionHeading
                  title="Robot Rentals"
                  align="right"
                  subtitle={<>Bring tomorrow's tech to your events, exhibitions, or business promotions with <BrandText className="text-base font-normal leading-none" />.</>}
                />
              </ScrollReveal>
            </div>

            {/* Sub-grid for features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full flex-1">
              
              {/* Flexible Plans */}
              <ScrollReveal direction="up" delay={0.2} className="h-full">
                <div className="bg-[#0e0e11] border border-white/5 rounded-3xl overflow-hidden flex flex-col group h-full hover:border-violet-500/30 transition-colors duration-500">
                  <div className="h-40 w-full bg-[#131318] relative flex items-center justify-center border-b border-white/5 overflow-hidden">
                    <div className="w-16 h-16 bg-[#1a1a24] rounded-2xl border border-white/5 flex flex-col items-center justify-center group-hover:-translate-y-2 transition-transform duration-500 shadow-xl relative">
                       <div className="absolute top-0 left-0 right-0 h-4 bg-violet-500/20 border-b border-white/5 rounded-t-2xl" />
                       <HiCalendar size={24} className="text-violet-400 mt-2" />
                       <div className="w-5 h-1 bg-white/10 rounded-full mt-2" />
                    </div>
                    <div className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6 flex flex-col justify-center flex-1">
                    <h4 className="text-white font-bold text-lg mb-2">Flexible Plans</h4>
                    <p className="text-gray-400 text-[13px] leading-relaxed font-inter">
                      Daily, weekly, or event-based rental options customized to your specific requirements.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Turnkey Delivery */}
              <ScrollReveal direction="up" delay={0.3} className="h-full">
                <div className="bg-[#0e0e11] border border-white/5 rounded-3xl overflow-hidden flex flex-col group h-full hover:border-blue-500/30 transition-colors duration-500">
                  <div className="h-40 w-full bg-[#131318] relative flex items-center justify-center border-b border-white/5 overflow-hidden">
                    <div className="relative w-32 h-16 flex items-center justify-between group-hover:scale-105 transition-transform duration-700">
                       <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 border-dashed border-t border-white/20" />
                       <div className="w-8 h-8 rounded-full bg-[#1a1a24] border border-blue-500/30 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                         <div className="w-2 h-2 rounded-full bg-blue-400" />
                       </div>
                       <div className="w-8 h-8 rounded-full bg-[#1a1a24] border border-white/10 flex items-center justify-center z-10">
                         <HiTruck size={16} className="text-gray-400" />
                       </div>
                       <div className="w-8 h-8 rounded-full bg-[#1a1a24] border border-white/10 flex items-center justify-center z-10">
                         <div className="w-2 h-2 rounded-full bg-white/20" />
                       </div>
                    </div>
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6 flex flex-col justify-center flex-1">
                    <h4 className="text-white font-bold text-lg mb-2">Turnkey Delivery</h4>
                    <p className="text-gray-400 text-[13px] leading-relaxed font-inter">
                      Complete logistics, on-site installation, precision calibration, and deployment support.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* Bottom Wide Card - 24/7 Expert Backup */}
            <ScrollReveal direction="up" delay={0.4} className="w-full">
              <div className="bg-[#0e0e11] border border-white/5 rounded-3xl overflow-hidden flex flex-col sm:flex-row group hover:border-emerald-500/30 transition-colors duration-500">
                <div className="h-40 sm:h-auto sm:w-1/3 bg-[#131318] relative flex items-center justify-center border-b sm:border-b-0 sm:border-r border-white/5 p-6 overflow-hidden">
                   <div className="w-full max-w-[160px] bg-[#09090b] rounded-xl border border-white/10 p-3 flex flex-col relative group-hover:border-emerald-500/30 transition-colors duration-500 shadow-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-mono text-gray-500">SYSTEM</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-mono text-emerald-400">ONLINE</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <HiClock size={16} className="text-gray-600" />
                         <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500/50 w-full" />
                         </div>
                      </div>
                   </div>
                   <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                  <h4 className="text-white font-bold text-xl mb-2">24/7 Expert Backup</h4>
                  <p className="text-gray-400 text-sm leading-relaxed font-inter">
                    End-to-end operational support and highly-trained on-site engineering backup. We guarantee maximum uptime and seamless performance for your critical events.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalsSection;
