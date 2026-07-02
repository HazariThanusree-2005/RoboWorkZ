import { 
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerStagger 
} from "@/components/ui/hero-video";
import { Button } from "@/components/ui/button";

const RobotVideoSection = () => {
  return (
    <ContainerScroll className="bg-dark-950 text-center text-white hero-grid">
      {/* Background elements to match the site's theme */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl mix-blend-screen" />
      </div>

      <ContainerStagger className="relative z-10">
        <ContainerAnimated animation="top">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-space font-bold mb-2">
            Witness the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-glow">Evolution</span>
          </h2>
        </ContainerAnimated>
        <ContainerAnimated animation="top">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-space font-bold text-gray-300">
            Of Robotics in Action.
          </h2>
        </ContainerAnimated>

        <ContainerAnimated animation="z" className="my-6">
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-inter leading-relaxed">
            Experience unparalleled precision, agility, and intelligence. 
            <br className="hidden md:block" />
            Our next-generation robots are built to transform industries.
          </p>
        </ContainerAnimated>
      </ContainerStagger>

      <ContainerInset 
        insetXRange={[15, 0]} 
        insetYRange={[0, 0]} 
        translateYRange={["0%", "0%"]}
        className="mx-4 md:mx-8 mt-12 mb-12 rounded-2xl overflow-hidden border border-white/10 shadow-glow-lg h-[60vh] md:h-[80vh]"
      >
        <video
          width="100%"
          height="100%"
          loop
          playsInline
          autoPlay
          muted
          className="relative z-10 block h-full w-full object-cover align-middle"
        >
          {/* Using the robot video provided from the demo */}
          <source
            src="https://videos.pexels.com/video-files/8084758/8084758-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </ContainerInset>
    </ContainerScroll>
  );
};

export default RobotVideoSection;
