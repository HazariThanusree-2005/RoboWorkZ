import { HiCalendar, HiTruck, HiClock } from 'react-icons/hi';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';
import BrandText from '../ui/BrandText';
import MagicBento from '../ui/MagicBento';

const RentalsSection = () => {
  return (
    <section id="rentals-preview" className="pt-32 pb-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary-600/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative px-6 md:px-8">
        {/* Main layout: centered heading + cards */}
        <div className="w-full">
          {/* Heading Centered */}
          <div className="flex flex-col items-center text-center mb-12">
            <ScrollReveal direction="up">
              <SectionHeading
                title="Robot Rentals"
                align="center"
                subtitle={<>Bring tomorrow’s tech to your events, exhibitions, or business promotions with <BrandText className="text-base font-normal leading-none" />.</>}
              />
            </ScrollReveal>
          </div>

          {/* MagicBento feature cards */}
          <div className="w-full max-w-6xl mx-auto">
            <MagicBento
              textAutoHide={false}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={false}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={280}
              particleCount={8}
              glowColor="139, 92, 246"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalsSection;
