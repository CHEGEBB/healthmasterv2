'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, useViewportScroll, useTransform, useSpring, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowUpCircle, Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import "../sass/landing.scss"
import Image from 'next/image';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  const horizontalScrollRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: horizontalScrollRef });
  const x = useSpring(useTransform(scrollXProgress, [0, 1], ["0%", "-75%"]), { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'services', 'doctors', 'about', 'features', 'testimonials', 'blog', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = ['Home', 'Services', 'Experts', 'About', 'Features', 'Testimonials', 'Blog', 'Contact'];

  return (
    <div className="min-h-screen text-white bg-slate-900 font-outfit">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container flex items-center justify-between px-6 py-4 mx-auto">
          <div className="flex items-center">
            <Image src="/assets/icons/new.jpg" width={40} height={40}
            alt="HealthMaster logo" className="w-10 h-10 mr-2" />
            <span className="text-xl font-bold font-kanit text-emerald-500">HealthMaster</span>
          </div>
          <div className="hidden space-x-6 md:flex">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`transition-colors hover:text-emerald-500 ${activeSection === item.toLowerCase() ? 'text-emerald-500' : ''}`}
              >
                {item}
              </a>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden px-6 py-2 text-white transition-colors rounded-full md:block bg-teal-700 hover:bg-emerald-600"
            onClick={() => window.location.href = '/signup'}
          >
          Sign up
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden px-6 py-2 text-white transition-colors rounded-full md:block bg-emerald-500 hover:bg-emerald-600"
            onClick={() => window.location.href = '/login'}
          >
            Login
          </motion.button>

          <button className="md:hidden text-emerald-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900/90 backdrop-blur-md"
            >
              {navItems.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className={`block px-6 py-2 hover:bg-emerald-500/20 ${activeSection === item.toLowerCase() ? 'text-emerald-500' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-2 text-left bg-emerald-500 hover:bg-emerald-600"
              >
                Login
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <header id="home" className="relative flex items-center min-h-screen px-6 pt-32 pb-16 overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <video 
            autoPlay 
            loop 
            muted 
            className="object-cover w-full h-full opacity-30"
          >
            <source src="/assets/mp4/vid.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="container relative z-10 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-6 text-6xl font-bold font-rubik text-emerald-500">HealthMaster</h1>
            <p className="max-w-2xl mx-auto mb-12 text-2xl font-raleway">Empower your health, one step at a time. Take control of your wellness journey today!</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-2xl">
              <input 
                type="text" 
                placeholder="Search for health information, medications, or services..." 
                className="w-full px-6 py-4 rounded-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white/80 backdrop-blur-sm"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute p-2 text-white transition-colors rounded-full right-2 top-2 bg-emerald-500 hover:bg-emerald-600"
              >
                Search
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      <section id="services" className="px-6 py-24 bg-gradient-to-r from-cyan-600 to-emerald-500">
        <div className="container mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center font-kanit">Our Services</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '/assets/images/land1.png', title: 'Medication Reminders', description: 'Never miss a dose with our smart reminder system.' },
              { icon: '/assets/images/body.png', title: 'Health Tracking', description: 'Monitor your vitals and symptoms in real-time.' },
              { icon: '/assets/images/report.png', title: 'Educational Resources', description: 'Access a wealth of information about your condition.' },
              { icon: '/assets/images/5.png', title: 'Virtual Consultations', description: 'Connect with healthcare professionals from home.' }
            ].map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="p-8 transition-all bg-white/20 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:-translate-y-2"
              >
                <img src={service.icon} alt={service.title} className="w-16 h-16 mb-6" />
                <h3 className="mb-4 text-2xl font-semibold font-rubik">{service.title}</h3>
                <p className="text-slate-200 font-raleway">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="experts" className="px-6 py-24 overflow-hidden bg-slate-800">
  <div className="container mx-auto mb-12">
    <h2 className="mb-16 text-4xl font-bold text-center font-kanit text-emerald-500">
      Your Personalized Care Team
    </h2>
    <p className="mb-10 text-lg text-center text-slate-300 max-w-2xl mx-auto">
      Our team of expert healthcare professionals is here to support your journey to better health. Connect with specialists who understand your unique needs and provide personalized care, all from the comfort of your home.
    </p>
  </div>

  <motion.div 
    ref={horizontalScrollRef}
    style={{ x }}
    className="flex space-x-8 cursor-grab active:cursor-grabbing"
    animate={{ x: [0, -1200] }} // The scroll distance, adjust as per your card width
    transition={{ repeat: Infinity, duration: 15, ease: "linear" }} // Smooth, infinite scrolling
  >
    {[ 
      { name: 'Dr. Don James', role: 'General Physician', image: '/assets/images/17.png' },
      { name: 'Dr. Michael Johnson', role: 'Pulmonology Specialist', image: '/assets/images/12.png' },
      { name: 'Dr. Sarah Thompson', role: 'Cardiac Care Expert', image: '/assets/images/13.png' },
      { name: 'Dr. David Lee', role: 'Chronic Illness Specialist', image: '/assets/images/14.png' },
      { name: 'Dr. Lisa Brown', role: 'Diabetes & Endocrinology', image: '/assets/images/15.png' },
      { name: 'Dr. James Wilson', role: 'Kidney Health Specialist', image: '/assets/images/16.png' },
    ].map((doctor, index) => (
      <motion.div
        key={doctor.name}
        className="flex-shrink-0 w-72 md:w-80 overflow-hidden transition-all bg-teal-600/30 backdrop-blur-md rounded-2xl hover:shadow-2xl"
        whileHover={{ scale: 1.05 }}
      >
        <img src={doctor.image} alt={doctor.name} className="object-cover w-full h-67" />
        <div className="p-6">
          <h3 className="mb-2 text-2xl font-semibold font-rubik text-white">{doctor.name}</h3>
          <p className="text-teal-200 font-raleway">{doctor.role}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 mt-4 text-white transition-colors rounded-full bg-emerald-500 hover:bg-emerald-600"
          >
            Connect Now
          </motion.button>
        </div>
      </motion.div>
    ))}
  </motion.div>
</section>


      <section id="about" className="px-6 py-24 bg-slate-900">
        <div className="container mx-auto">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-4xl font-bold font-kanit text-emerald-500">About HealthMaster</h2>
              <p className="mb-6 text-lg font-raleway">HealthMaster is a revolutionary platform designed to empower individuals living with chronic diseases such as HIV, tuberculosis, and hypertension. Our mission is to provide comprehensive support, from medication management to lifestyle guidance, all in one user-friendly application.</p>
              <p className="mb-6 text-lg font-raleway">Founded by a team of healthcare professionals and tech experts, HealthMaster combines medical expertise with cutting-edge technology to offer personalized care and support to our users.</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 text-white transition-colors rounded-full bg-emerald-500 hover:bg-emerald-600"
              >
                Learn More About Us
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image src="/assets/images/background-2.webp" width={500} height={500} alt="HealthMaster Team" className="rounded-lg shadow-2xl about-image" />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-24 bg-gradient-to-r from-cyan-600 to-emerald-500">
        <div className="container mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center font-kanit">Key Features</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '/assets/images/ai.png', title: 'AI-Powered Insights', description: 'Our advanced AI analyzes your health data to provide personalized recommendations and detect potential issues early.' },
              { icon: '/assets/images/apple.png', title: 'Wearable Integration', description: 'Seamlessly connect your favorite health devices for real-time monitoring of vital signs and activity levels.' },
              { icon: '/assets/images/c.png', title: 'Supportive Community', description: 'Connect with others on similar health journeys, share experiences, and find motivation in our moderated forums.' },
              { icon: '/assets/images/f.png', title: 'Personalized Nutrition', description: 'Receive tailored dietary advice and meal plans based on your specific health needs and preferences.' },
              { icon: '/assets/images/t.png', title: 'Telemedicine Services', description: 'Access virtual consultations with specialists from the comfort of your home, ensuring continuous care.' },
              { icon: '/assets/images/cl.png', title: 'Clinical Trial Matching', description: 'Stay informed about relevant clinical trials and research opportunities that match your health profile.' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="p-8 transition-all bg-white/20 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:-translate-y-2"
              >
                <img src={feature.icon} alt={feature.title} className="w-16 h-16 mb-6" />
                <h3 className="mb-4 text-2xl font-semibold font-rubik">{feature.title}</h3>
                <p className="text-slate-200 font-raleway">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="px-6 py-24 bg-slate-800">
        <div className="container mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center font-kanit text-emerald-500">What Our Users Say</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Sarah M.', condition: 'Living with HIV', testimonial: 'HealthMaster has been a game-changer for me. The medication reminders and virtual consultations have made managing my condition so much easier.', image: '/assets/images/89.jpg' },
              { name: 'John D.', condition: 'TB Survivor', testimonial: 'The support I received through HealthMaster during my TB treatment was invaluable. The community feature helped me stay positive throughout my journey.', image: '/assets/images/54.jpg' },
              { name: 'Emily L.', condition: 'Hypertension Management', testimonial: 'I love how HealthMaster integrates with my blood pressure monitor. The personalized insights have helped me make lifestyle changes that have significantly improved my health.', image: '/assets/images/36.jpg' },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="p-6 rounded-lg bg-cyan-600/20 backdrop-blur-sm"
              >
                <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 mx-auto mb-4 rounded-full" />
                <p className="mb-4 text-center font-raleway">"{testimonial.testimonial}"</p>
                <p className="font-semibold text-center text-emerald-400 font-rubik">{testimonial.name}</p>
                <p className="text-sm text-center text-emerald-300 font-raleway">{testimonial.condition}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="px-6 py-24 bg-slate-900">
        <div className="container mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center font-kanit text-emerald-500">Latest Health Insights</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Breakthrough in HIV Treatment', image: '/assets/images/lab.jpg', category: 'HIV Research', date: 'June 15, 2024' },
              { title: 'Managing Hypertension Through Diet', image: '/assets/images/hyp.jpg', category: 'Nutrition', date: 'June 10, 2024' },
              { title: 'The Future of TB Diagnostics', image: '/assets/images/tb.jpg', category: 'Tuberculosis', date: 'June 5, 2024' },
              { title: 'Mental Health and Chronic Diseases', image: '/path-to-mental-health-article.jpg', category: 'Mental Wellness', date: 'May 30, 2024' },
              { title: 'Advancements in Wearable Health Tech', image: '/path-to-wearable-article.jpg', category: 'Technology', date: 'May 25, 2024' },
              { title: 'Understanding Drug Interactions', image: '/path-to-drug-interaction-article.jpg', category: 'Medication', date: 'May 20, 2024' },
            ].map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="overflow-hidden transition-all rounded-lg bg-cyan-600/20 backdrop-blur-sm hover:shadow-lg"
              >
                <img src={article.image} alt={article.title} className="object-cover w-full h-48" />
                <div className="p-6">
                  <span className="text-sm font-semibold text-emerald-400 font-rubik">{article.category}</span>
                  <h3 className="mt-2 mb-4 text-xl font-bold font-rubik">{article.title}</h3>
                  <p className="text-sm text-slate-300 font-raleway">{article.date}</p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 transition-colors text-emerald-500 hover:text-emerald-400"
                  >
                    Read More →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 bg-gradient-to-r from-cyan-600 to-emerald-500">
        <div className="container mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center font-kanit">Get in Touch</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="mb-6 text-2xl font-semibold font-rubik">Contact Information</h3>
              <div className="space-y-4">
                <p className="flex items-center font-raleway"><Phone className="mr-2" /> +1 (555) 123-4567</p>
                <p className="flex items-center font-raleway"><Mail className="mr-2" /> support@healthmaster.com</p>
                <p className="flex items-center font-raleway"><MapPin className="mr-2" /> 123 Health Street, Wellness City, HC 12345</p>
              </div>
              <h3 className="mt-8 mb-6 text-2xl font-semibold font-rubik">Follow Us</h3>
              <div className="flex space-x-4">
                <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-white hover:text-slate-200"><Facebook /></motion.a>
                <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-white hover:text-slate-200"><Twitter /></motion.a>
                <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-white hover:text-slate-200"><Instagram /></motion.a>
                <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-white hover:text-slate-200"><Linkedin /></motion.a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-semibold font-rubik">Name</label>
                  <input type="text" id="name" className="w-full px-4 py-2 rounded-md bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold font-rubik">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-2 rounded-md bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-semibold font-rubik">Message</label>
                  <textarea id="message" rows="4" className="w-full px-4 py-2 rounded-md bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 font-semibold transition-colors bg-white rounded-full text-emerald-600 hover:bg-emerald-100"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="px-6 py-12 text-white bg-slate-900">
        <div className="container grid grid-cols-1 gap-8 mx-auto md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-bold font-kanit text-emerald-500">HealthMaster</h3>
            <p className="font-raleway">Empowering individuals to take control of their health journey through innovative technology and personalized care.</p>
          </div>
          <div>
            <h4 className="mb-4 text-xl font-semibold font-rubik text-emerald-500">Quick Links</h4>
            <ul className="space-y-2 font-raleway">
              {navItems.map((item) => (
                <li key={item}><a href={`#${item.toLowerCase()}`} className="transition-colors hover:text-emerald-400">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xl font-semibold font-rubik text-emerald-500">Legal</h4>
            <ul className="space-y-2 font-raleway">
              <li><a href="#" className="transition-colors hover:text-emerald-400">Terms of Service</a></li>
              <li><a href="#" className="transition-colors hover:text-emerald-400">Privacy Policy</a></li>
              <li><a href="#" className="transition-colors hover:text-emerald-400">Cookie Policy</a></li>
              <li><a href="#" className="transition-colors hover:text-emerald-400">HIPAA Compliance</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xl font-semibold font-rubik text-emerald-500">Newsletter</h4>
            <p className="mb-4 font-raleway">Stay updated with the latest health insights and HealthMaster news.</p>
            <form className="flex">
              <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l-md bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-white transition-colors rounded-r-md bg-emerald-500 hover:bg-emerald-600"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
        <div className="pt-8 mt-8 text-center border-t border-slate-700">
          <p className="font-raleway">&copy; 2024 HealthMaster. All rights reserved.</p>
        </div>
      </footer>

      <motion.button
        className="fixed z-50 p-2 transition-colors rounded-full bottom-8 right-8 bg-emerald-500 hover:bg-emerald-600"
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUpCircle className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
};

export default LandingPage;