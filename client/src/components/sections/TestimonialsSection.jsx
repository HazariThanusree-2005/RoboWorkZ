import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi';

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Event Manager, Sparkle Events',
<<<<<<< HEAD
    text: 'RoboWorkZ robots completely transformed our corporate event. The guests were amazed by the interactive experience. Absolutely recommend for any large-scale event!',
=======
    text: 'RoboWorkz robots completely transformed our corporate event. The guests were amazed by the interactive experience. Absolutely recommend for any large-scale event!',
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
    rating: 5,
    type: 'Event Organizer',
  },
  {
    name: 'Priya Sharma',
    role: 'B.Tech Student, IIT Hyderabad',
    text: 'Their student project support was incredible. The team helped me build a fully functional robot for my final year project. Got the highest grade in my batch!',
    rating: 5,
    type: 'Student',
  },
  {
    name: 'Vikram Patel',
    role: 'CEO, QuickMart Retail',
    text: 'The PromoBot increased our store footfall by 40%. Customers love interacting with it. Best marketing investment we\'ve made this year.',
    rating: 5,
    type: 'Business',
  },
  {
    name: 'Sneha Reddy',
    role: 'College Festival Coordinator',
<<<<<<< HEAD
    text: 'We rented robots for our tech fest and it was the highlight of the entire event. The RoboWorkZ team was professional, punctual, and supportive throughout.',
=======
    text: 'We rented robots for our tech fest and it was the highlight of the entire event. The RoboWorkz team was professional, punctual, and supportive throughout.',
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
    rating: 5,
    type: 'Student',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Director, NexGen Technologies',
<<<<<<< HEAD
    text: 'Custom robotics solution from RoboWorkZ streamlined our warehouse operations. Their engineering team truly understands business needs.',
=======
    text: 'Custom robotics solution from RoboWorkz streamlined our warehouse operations. Their engineering team truly understands business needs.',
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
    rating: 5,
    type: 'Business',
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      if (newDirection === 1) return prev === testimonials.length - 1 ? 0 : prev + 1;
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  }, []);

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative">
        <SectionHeading 
          title="What People Say" 
<<<<<<< HEAD
          subtitle="Hear from students, event organizers, and businesses who've experienced the RoboWorkZ difference."
=======
          subtitle="Hear from students, event organizers, and businesses who've experienced the RoboWorkz difference."
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
        />

        <div className="relative min-h-[280px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="glass rounded-2xl p-8 md:p-12 text-center"
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <HiStar key={i} className="text-amber-400" size={20} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg md:text-xl text-gray-300 font-inter leading-relaxed mb-8 italic">
                "{testimonials[current].text}"
              </p>

              {/* Author */}
              <div>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-manrope font-bold text-lg">
                  {testimonials[current].name.charAt(0)}
                </div>
                <h4 className="font-manrope font-semibold text-white text-lg">
                  {testimonials[current].name}
                </h4>
                <p className="text-gray-500 text-sm font-inter">
                  {testimonials[current].role}
                </p>
                <span className="inline-block mt-2 px-3 py-1 text-xs font-cabin font-semibold text-primary-400 bg-primary-500/10 rounded-full">
                  {testimonials[current].type}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <HiChevronLeft size={20} />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setDirection(index > current ? 1 : -1); setCurrent(index); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current ? 'bg-primary-500 w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <HiChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
