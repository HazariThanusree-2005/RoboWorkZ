import { useEffect } from 'react';
import HeroSection from '../components/hero/HeroSection';
import RobotVideoSection from '../components/sections/RobotVideoSection';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import RentalsSection from '../components/sections/RentalsSection';
import { HomeVideoDemo } from '../components/sections/HomeVideoDemo';

const HOME_DEMO_VIDEOS = [
  {
    src: `${import.meta.env.BASE_URL}dog_video.mp4`,
    title: 'Robot Dog — Field Navigation',
    label: 'Autonomous Navigation',
    description: 'Our quadruped robot dog autonomously navigates complex terrains with real-time object detection — perfect for exhibitions and live demos.',
  },
  {
    src: `${import.meta.env.BASE_URL}hand_video.mp4`,
    title: 'Robotic Arm — Precision Handling',
    label: 'Industrial Demo',
    description: 'Watch our robotic arm perform delicate pick-and-place operations for industrial automation and public demonstrations.',
  },
  {
    src: `${import.meta.env.BASE_URL}picker_video.mp4`,
    title: 'Smart Picker — Product Showcase',
    label: 'Interactive Experience',
    description: 'Our smart picker robot identifies and retrieves objects effortlessly — ideal for retail displays, trade shows, and brand activations.',
  },
];

const HomePage = () => {
  // Scroll lock during initial load for premium feel
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      document.body.style.overflow = '';
    }, 1500);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative w-full">
      <HeroSection />
      <RobotVideoSection />
      <FeaturedProducts />
      <RentalsSection />
      <HomeVideoDemo videos={HOME_DEMO_VIDEOS} />
    </div>
  );
};

export default HomePage;
