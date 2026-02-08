import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Calendar, Camera, MapPin, ChevronRight, X, Clock } from 'lucide-react';

// All photos for gallery
const localPhotos = [
  '/IMG_20240914_145307_081.jpg',
  '/IMG_20241004_005327.jpg',
  '/IMG_20250927_235139.jpg',
  '/IMG_20251111_024649_972.jpg',
  '/IMG_8964.JPG',
  '/IMG_8970.JPG',
  '/IMG_8972.JPG',
  '/IMG_8973.JPG',
  '/IMG_8974.JPG',
  '/IMG_8975.JPG',
  '/IMG_8976.JPG',
  '/IMG_8977.JPG',
  '/IMG_8978.JPG',
  '/IMG_8979.JPG',
  '/IMG_8980.JPG',
  '/IMG_8981.JPG',
  '/IMG_8982.JPG',
  '/IMG_8983.JPG',
  '/IMG_8984.JPG',
  '/IMG_8985.JPG',
  '/IMG_8986.JPG',
  '/IMG_8988.JPG',
  '/IMG_8989.JPG',
  '/IMG_8991.JPG',
  '/IMG_8993.JPG',
  '/IMG_8994.JPG',
  '/IMG_8995.JPG',
  '/IMG_8997.JPG',
  '/IMG_8998.JPG',
  '/IMG_9001.JPG',
  '/IMG-20250928-WA0023.jpg',
  '/IMG-20260101-WA0017.jpg',
  '/IMG-20260101-WA0018.jpg',
  '/IMG-20260101-WA0019.jpg',
  '/IMG-20260101-WA0020.jpg',
  '/IMG-20260101-WA0021.jpg',
  '/Screenshot_2024_1126_012739.jpg',
  '/Screenshot_20241114_234113.jpg',
  '/Screenshot_20241128_092710.jpg',
  '/Screenshot_20241212_034139.jpg',
  '/Screenshot_20241220_160142.jpg',
  '/Screenshot_20251116_010400.jpg',
  '/Screenshot_20251116_010414.jpg',
  '/Screenshot_20251116_010530.jpg',
  '/Snapchat-1023667854.jpg',
  '/Snapchat-1065971354.jpg',
  '/Snapchat-1067327753.jpg',
  '/Snapchat-1168680884.jpg',
  '/Snapchat-1233533387.jpg',
  '/Snapchat-1278000740.jpg',
  '/Snapchat-129314661.jpg',
  '/Snapchat-1299698716.jpg',
  '/Snapchat-13024703.jpg',
  '/Snapchat-131344713.jpg',
  '/Snapchat-1320366887.jpg',
  '/Snapchat-135127213.jpg',
  '/Snapchat-1500076461.jpg',
  '/Snapchat-1559076387.jpg',
  '/Snapchat-1621140565.jpg',
  '/Snapchat-1687069145.jpg',
  '/Snapchat-1760055011.jpg',
  '/Snapchat-1783914300.jpg',
  '/Snapchat-1904558833.jpg',
  '/Snapchat-1910877959.jpg',
  '/Snapchat-1947421635.jpg',
  '/Snapchat-1958453054.jpg',
  '/Snapchat-2001403831.jpg',
  '/Snapchat-2014288782.jpg',
  '/Snapchat-2017656997.jpg',
  '/Snapchat-202941740.jpg',
  '/Snapchat-2039145760.jpg',
  '/Snapchat-2121670021.jpg',
  '/Snapchat-269292659.jpg',
  '/Snapchat-281064833.jpg',
  '/Snapchat-33512559.jpg',
  '/Snapchat-370105177.jpg',
  '/Snapchat-481170076.jpg',
  '/Snapchat-481915185.jpg',
  '/Snapchat-52517240.jpg',
  '/Snapchat-61710039.jpg',
  '/Snapchat-636939926.jpg',
  '/Snapchat-67586396.jpg',
  '/Snapchat-675880487.jpg',
  '/Snapchat-703623846.jpg',
  '/Snapchat-72827098.jpg',
  '/Snapchat-736293739.jpg',
  '/Snapchat-894252446.jpg',
  '/Snapchat-965614234.jpg',
  '/Snapchat-979184717.jpg'
];

// --- Constants & Mock Data ---
const BIRTHDAY_DATE = new Date('2026-02-09T00:00:00');
const ACCENT_COLOR = "#e5c100";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [letterOpen, setLetterOpen] = useState(false);
  const [secondLetterOpen, setSecondLetterOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  // Check if love letters should be unlocked (Feb 9, 2026 or later)
  const isBirthdayUnlocked = () => {
    const now = new Date();
    const birthday = new Date('2026-02-09T00:00:00');
    return now >= birthday;
  };


  // --- Countdown Logic ---
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = BIRTHDAY_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    // Simulate initial loading with confetti effect
    setTimeout(() => {
      setLoading(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Setup audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.loop = true;

      const handleCanPlay = () => {
        setAudioLoaded(true);
      };

      const handleLoadedData = () => {
        console.log('Audio loaded successfully');
      };

      const handleError = (e) => {
        console.log('Audio loading error:', e);
        setAudioLoaded(false);
      };

      const handleEnded = () => {
        setIsPlaying(false);
      };

      audioRef.current.addEventListener('canplay', handleCanPlay);
      audioRef.current.addEventListener('loadeddata', handleLoadedData);
      audioRef.current.addEventListener('error', handleError);
      audioRef.current.addEventListener('ended', handleEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplay', handleCanPlay);
          audioRef.current.removeEventListener('loadeddata', handleLoadedData);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, []);

  // --- Parallax Effects ---
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scrollProgressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-yellow-500/30 relative overflow-hidden">
      <GrainOverlay />

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-[9998]">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                  scale: 0
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: Math.random() * 360,
                  scale: Math.random() * 0.8 + 0.2
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  ease: "easeOut",
                  delay: Math.random() * 0.5
                }}
                className={`absolute w-2 h-2 ${
                  i % 5 === 0 ? 'bg-yellow-400' :
                  i % 5 === 1 ? 'bg-pink-400' :
                  i % 5 === 2 ? 'bg-purple-400' :
                  i % 5 === 3 ? 'bg-blue-400' : 'bg-green-400'
                } rounded-full opacity-80`}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Subtle Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/3 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/2 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference">
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-yellow-500/30"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />

        <div className="p-6 md:p-10 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          className="text-[10px] tracking-[0.5em] font-bold uppercase cursor-pointer group"
        >
          <span className="group-hover:text-yellow-400 transition-colors">Anne & Kittu</span>
          <motion.div
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-[1px] bg-yellow-400/50 mt-1"
          />
          <span className="text-yellow-400/70">// 02.09.26</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-6 text-[10px] tracking-[0.3em] uppercase"
        >
          {[
            { href: "#gallery", label: "Gallery" },
            { href: "#story", label: "Letter" }
          ].map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgba(229, 193, 0, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              className="hover:text-yellow-500 transition-all duration-300 relative group"
            >
              {item.label}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-yellow-500 origin-left"
              />
            </motion.a>
          ))}
        </motion.div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: scaleProgress, opacity: opacityProgress }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/photobin/IMG_8970.JPG"
            className="w-full h-full object-cover opacity-40 grayscale"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />

          {/* Simple corner accents */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400/30 rounded-full" />
          <div className="absolute bottom-10 right-10 w-3 h-3 bg-pink-400/20 rounded-full" />
        </motion.div>

        <div className="relative z-10 text-center space-y-4 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-3 text-yellow-500 mb-6"
          >
            <div className="w-12 h-[1px] bg-yellow-500/50" />
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold">The Countdown Begins</span>
            <div className="w-12 h-[1px] bg-yellow-500/50" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[12rem] font-serif font-black leading-none tracking-tighter"
          >
            KITTU<span className="text-yellow-500">.</span>
          </motion.h1>

          {/* Enhanced Countdown Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex gap-4 md:gap-10 justify-center mt-12"
          >
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.mins },
              { label: "Secs", value: timeLeft.secs }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.2 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <motion.div
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(229, 193, 0, 0.3)",
                      "0 0 20px rgba(229, 193, 0, 0.6)",
                      "0 0 10px rgba(229, 193, 0, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-3xl md:text-5xl font-light tabular-nums mb-1 text-yellow-400"
                >
                  {item.value.toString().padStart(2, '0')}
                </motion.div>
                <motion.div
                  animate={{
                    color: ["rgba(229, 193, 0, 0.6)", "rgba(229, 193, 0, 0.9)", "rgba(229, 193, 0, 0.6)"]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[8px] uppercase tracking-[0.3em] font-bold group-hover:text-yellow-300 transition-colors"
                >
                  {item.label}
                </motion.div>

                {/* Animated underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                  className="w-8 h-[1px] bg-yellow-500/50 mt-2 origin-center"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute bottom-10 flex flex-col items-center opacity-60 group cursor-pointer"
        >
          <motion.span
            animate={{
              opacity: [0.6, 1, 0.6],
              textShadow: [
                "0 0 5px rgba(229, 193, 0, 0.3)",
                "0 0 10px rgba(229, 193, 0, 0.6)",
                "0 0 5px rgba(229, 193, 0, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[8px] uppercase tracking-[0.4em] mb-4 group-hover:text-yellow-400 transition-colors"
          >
            Scroll to discover
          </motion.span>

          <motion.div
            animate={{
              height: [48, 60, 48],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] bg-gradient-to-b from-white via-yellow-400 to-white group-hover:from-yellow-400 group-hover:via-white group-hover:to-yellow-400 transition-all duration-500"
          />

          {/* Animated dots */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-1 h-1 bg-yellow-400 rounded-full mt-2 opacity-60"
          />
        </motion.div>
      </section>

      {/* Intro Section */}
      <section id="story" className="py-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2 space-y-8"
        >
          <h2 className="text-5xl md:text-7xl font-serif italic">Every version of you is my <span className="text-yellow-500">favorite.</span></h2>
          <p className="text-neutral-400 text-lg leading-relaxed font-light max-w-xl">
            They say the world is full of wonders, but for me, they all reside in your smile. This archive is a tribute to the thousands of moments that made 2024-2026 the best years of my life. 
          </p>
          <div className="flex gap-10 items-center py-4 border-y border-white/5">
             <Stat label="Memories" value="75" />
             <Stat label="Days" value="730" />
             <Stat label="Love" value="∞" />
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:w-1/2 relative group"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-sm ring-1 ring-white/10">
            <img
              src="/photobin/IMG_8972.JPG"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Relationship"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-black p-6 md:p-8">
            <Heart size={32} fill="currentColor" />
          </div>
        </motion.div>
      </section>

      {/* Enhanced Gallery - Masonry Style */}
      <section id="gallery" className="py-20 px-4 relative">
        {/* Section background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent" />

        <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3
              animate={{
                textShadow: [
                  "0 0 8px rgba(229, 193, 0, 0.4)",
                  "0 0 12px rgba(229, 193, 0, 0.7)",
                  "0 0 8px rgba(229, 193, 0, 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-xs font-bold tracking-[0.8em] uppercase text-yellow-500/60 mb-4"
            >
              Photographic History
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl font-serif italic bg-gradient-to-r from-white via-yellow-400/80 to-white bg-clip-text text-transparent"
            >
              The Visual Letters
            </motion.p>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-24 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-6"
            />
          </motion.div>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 max-w-[1600px] mx-auto">
          {localPhotos.map((photo, i) => (
            <GalleryItem
              key={i}
              index={i}
              photo={photo}
              onClick={() => setSelectedImg(photo)}
            />
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-40 bg-white text-black text-center px-4 overflow-hidden">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <span className="text-7xl font-serif italic opacity-20 block mb-4">"</span>
          <h2 className="text-4xl md:text-7xl font-serif italic max-w-5xl mx-auto leading-tight">
            If I could give you one thing in life, I would give you the ability to see yourself through my eyes.
          </h2>
          <div className="w-16 h-[2px] bg-black mx-auto mt-12 mb-6" />
          <p className="uppercase tracking-[0.5em] text-[10px] font-bold">Forever yours, Anne</p>
        </motion.div>
      </section>

      {/* Love Letter Section */}
      <section className="py-32 px-4 relative overflow-hidden bg-gradient-to-b from-black via-gray-900/20 to-black">
        {/* Subtle background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner decorative elements */}
          <div className="absolute top-20 left-10 text-yellow-500/10 text-6xl">❦</div>
          <div className="absolute bottom-20 right-10 text-pink-500/10 text-6xl">❦</div>
          <div className="absolute top-1/2 left-5 text-purple-500/10 text-4xl">✦</div>
          <div className="absolute top-1/2 right-5 text-purple-500/10 text-4xl">✦</div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`${isBirthdayUnlocked() ? 'cursor-pointer' : 'cursor-not-allowed'} group mb-12`}
            onClick={() => {
              if (isBirthdayUnlocked()) {
                setLetterOpen(!letterOpen);
              }
            }}
          >
            <motion.div
              whileHover={isBirthdayUnlocked() ? { scale: 1.02 } : {}}
              transition={{ duration: 0.2 }}
              className={`inline-flex flex-col items-center gap-4 p-6 rounded-xl backdrop-blur-md border transition-all duration-300 ${
                isBirthdayUnlocked()
                  ? 'bg-black/30 border-yellow-500/30 shadow-lg shadow-yellow-500/10'
                  : 'bg-gray-900/30 border-gray-600/20'
              }`}
            >
              {/* Animated rings */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-2xl border-2 border-yellow-500/30"
              />
              <motion.div
                animate={{
                  scale: [1.1, 1.3, 1.1],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                  ease: "easeInOut"
                }}
                className="absolute inset-2 rounded-xl border border-pink-500/20"
              />

              <motion.div
                whileHover={isBirthdayUnlocked() ? { scale: 1.1 } : {}}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                {isBirthdayUnlocked() ? (
                  <Heart
                    size={40}
                    className="text-yellow-400 drop-shadow-md"
                    fill={letterOpen ? "currentColor" : "none"}
                  />
                ) : (
                  <div className="relative">
                    <Heart
                      size={40}
                      className="text-gray-500"
                      fill="none"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl">🔒</span>
                    </div>
                  </div>
                )}
              </motion.div>

              <div className="space-y-3">
                <span className={`text-sm uppercase tracking-[0.2em] font-medium transition-colors ${
                  isBirthdayUnlocked()
                    ? 'text-yellow-400 group-hover:text-yellow-300'
                    : 'text-gray-500'
                }`}>
                  {isBirthdayUnlocked()
                    ? (letterOpen ? "Close Letters" : "Open Letters")
                    : "Letters Unlock February 9, 2026"
                  }
                </span>

                {isBirthdayUnlocked() && (
                  <div className="w-12 h-[1px] bg-yellow-500/60 mx-auto transition-all duration-300 group-hover:bg-yellow-400" />
                )}

                {!isBirthdayUnlocked() && (
                  <div className="mt-3 text-center">
                    <p className="text-xs text-gray-400">
                      Love letters will be revealed on your birthday
                    </p>
                    <div className="mt-2 text-lg opacity-60">💌⏰</div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {letterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.2
                  }
                }}
                exit={{
                  opacity: 0,
                  y: 40,
                  transition: { duration: 0.4, ease: "easeIn" }
                }}
                className="relative mb-8"
              >


                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative bg-black/80 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-8 md:p-10 shadow-xl"
                >

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
                    className="relative z-10"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl md:text-4xl font-serif italic text-yellow-400 mb-4">
                        My Dearest Kittu,
                      </h3>
                      <div className="w-16 h-[1px] bg-yellow-500/50 mx-auto" />
                    </div>

                    <div className="space-y-6 text-left max-w-3xl mx-auto">
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-lg leading-relaxed text-neutral-200 font-light"
                      >
                        Today marks another beautiful year of your extraordinary life, and I find myself overwhelmed with joy and gratitude.
                        For the past thirteen days, we've shared the same age, walked the same path, and created memories that will forever warm my heart.
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-lg leading-relaxed text-neutral-200 font-light"
                      >
                        You are, without question, the most important person in my world—the one I love most deeply, the most beautiful soul I've ever known,
                        and the most captivating presence in my life. Every moment with you feels like a precious gift, every smile you share lights up my entire universe.
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="text-lg leading-relaxed text-neutral-200 font-light"
                      >
                        Happy 20th birthday to my beloved, my everything, my Kittu. May this year bring you all the happiness, love, and success you so richly deserve.
                        I love you more than words can express, and I will continue to love you with every beat of my heart.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="pt-8 border-t border-yellow-500/30 text-center"
                      >
                        <p className="text-yellow-400 font-serif italic text-lg">
                          Forever yours, with all my love,<br />
                          <span className="text-xl font-semibold">Anne</span>
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Second Letter Trigger Button */}
          <AnimatePresence>
            {letterOpen && !secondLetterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    delay: 2.5,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 120
                  }
                }}
                exit={{
                  opacity: 0,
                  y: 30,
                  scale: 0.8,
                  transition: { duration: 0.3 }
                }}
                className="mt-6 text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSecondLetterOpen(true)}
                  className="px-6 py-3 bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30 rounded-lg text-yellow-400 font-medium text-sm transition-all duration-200 hover:bg-yellow-500/30"
                >
                  <span className="flex items-center gap-2">
                    <span>💌</span>
                    <span>Open Special Surprise</span>
                    <span>→</span>
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Second Letter - Surprise Hint */}
          <AnimatePresence>
            {secondLetterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.1
                  }
                }}
                exit={{
                  opacity: 0,
                  y: 30,
                  transition: { duration: 0.3, ease: "easeIn" }
                }}
                className="mt-8"
              >
                <motion.div
                  className="relative cursor-pointer group"
                  onClick={() => {
                    // Simple bounce interaction
                    const element = document.querySelector('.surprise-letter');
                    if (element) {
                      element.style.animation = 'bounce 0.6s ease-in-out';
                      setTimeout(() => {
                        element.style.animation = '';
                      }, 600);
                    }
                  }}
                >
                  {/* Simple background glow */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(229, 193, 0, 0.2)",
                        "0 0 40px rgba(236, 72, 153, 0.3)",
                        "0 0 30px rgba(229, 193, 0, 0.2)"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-xl"
                  />

                  <motion.div
                    className="relative z-10 bg-black/80 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6 md:p-8 surprise-letter"
                  >
                    {/* Inner glow */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          "inset 0 0 30px rgba(229, 193, 0, 0.1)",
                          "inset 0 0 50px rgba(229, 193, 0, 0.2)",
                          "inset 0 0 30px rgba(229, 193, 0, 0.1)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-2xl"
                    />

                    <div className="text-center mb-4 relative z-10">
                      <span className="text-3xl block mb-1">💌</span>
                      <p className="text-sm uppercase tracking-wide font-medium text-yellow-400/80">
                        Special Surprise
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { delay: 0.3, duration: 0.6, type: "spring", stiffness: 100 }
                      }}
                      className="text-center space-y-6 relative z-10"
                    >
                      <h4 className="text-lg font-serif italic text-pink-400">
                        P.S. My Love...
                      </h4>

                      <div className="space-y-3">
                        <p className="text-base text-neutral-200 font-light leading-relaxed">
                          Dear Kittu, go upstairs...<br />
                          <span className="text-lg font-medium text-yellow-400 mt-2 block">
                            there's a surprise waiting for you in Harshita's Room! 🎁✨
                          </span>
                        </p>

                        <div className="pt-3">
                          <span className="text-3xl">😘💕</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:text-yellow-500 transition-colors">
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              src={selectedImg} 
              className="max-h-[85vh] max-w-full rounded-sm shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Footer */}
      <footer className="py-20 border-t border-white/5 text-center relative overflow-hidden">
        {/* Footer background effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <motion.p
              animate={{
                textShadow: [
                  "0 0 20px rgba(229, 193, 0, 0.2)",
                  "0 0 40px rgba(229, 193, 0, 0.4)",
                  "0 0 20px rgba(229, 193, 0, 0.2)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-7xl md:text-9xl font-serif italic opacity-10 hover:opacity-20 transition-opacity duration-500 cursor-pointer"
            >
              Kittu.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center gap-8 text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8"
          >
            <motion.span
              whileHover={{ scale: 1.05, color: "#fbbf24" }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer"
            >
              Feb 09, 2026
            </motion.span>
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              •
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05, color: "#ec4899" }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer"
            >
              Made with Love
            </motion.span>
          </motion.div>

          {/* Interactive signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{
                textShadow: [
                  "0 0 10px rgba(236, 72, 153, 0.3)",
                  "0 0 20px rgba(236, 72, 153, 0.6)",
                  "0 0 10px rgba(236, 72, 153, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-lg font-serif italic text-pink-400/70 hover:text-pink-400 transition-colors duration-300 cursor-pointer"
            >
              Forever in Love 💕
            </motion.div>

          </motion.div>
        </div>
      </footer>

      {/* Floating Action Button - Scroll to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, type: "spring", stiffness: 200 }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 25px rgba(229, 193, 0, 0.6)"
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer group"
      >
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-black text-lg group-hover:text-white transition-colors"
        >
          ↑
        </motion.span>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-14 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Back to top
        </motion.div>
      </motion.button>

      {/* Background Music Control */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.5, type: "spring", stiffness: 200 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 20px rgba(229, 193, 0, 0.5)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={async () => {
          if (audioRef.current && audioLoaded) {
            try {
              if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
              } else {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                  await playPromise;
                  setIsPlaying(true);
                }
              }
            } catch (error) {
              console.log('Audio play failed:', error);
              setIsPlaying(false);
            }
          } else {
            console.log('Audio not ready yet');
          }
        }}
        className={`fixed bottom-8 left-8 z-50 w-12 h-12 bg-black/80 backdrop-blur-lg border rounded-full flex items-center justify-center shadow-lg cursor-pointer group ${
          audioLoaded ? 'border-yellow-500/30' : 'border-gray-500/30'
        }`}
        disabled={!audioLoaded}
      >
        <span className={`text-lg transition-colors ${
          audioLoaded
            ? 'text-yellow-400 group-hover:text-yellow-300'
            : 'text-gray-500'
        }`}>
          {isPlaying ? '⏸️' : '🎵'}
        </span>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute left-14 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {!audioLoaded ? 'Loading music...' : (isPlaying ? 'Pause music' : 'Play music')}
        </motion.div>
      </motion.button>

      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="/her.mp3"
        preload="metadata"
        loop
        onCanPlay={() => setAudioLoaded(true)}
        onLoadedData={() => console.log('Audio loaded')}
        onError={(e) => console.log('Audio error:', e)}
      />
    </div>
  );
};

// --- Subcomponents ---

const CountdownItem = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <div className="text-3xl md:text-5xl font-light tabular-nums mb-1">
      {value.toString().padStart(2, '0')}
    </div>
    <div className="text-[8px] uppercase tracking-[0.3em] text-yellow-500/60 font-bold">
      {label}
    </div>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="text-center md:text-left">
    <div className="text-2xl font-serif italic text-yellow-500">{value}</div>
    <div className="text-[9px] uppercase tracking-widest text-neutral-500">{label}</div>
  </div>
);

const GalleryItem = ({ index, photo, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: (index % 8) * 0.08,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        scale: 1.02,
        y: -3,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
      onClick={onClick}
    >
      {/* Image container with optimized loading */}
      <div className="relative overflow-hidden rounded-lg bg-gray-900">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
            <Camera className="text-gray-600" size={24} />
          </div>
        )}
        <img
          src={photo}
          alt={`Memory ${index}`}
          className={`w-full h-auto transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'grayscale group-hover:grayscale-0' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Simple overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/20 flex items-center justify-center"
        >
          <Camera className="text-white opacity-70" size={20} />
        </motion.div>

        {/* Simple corner accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute top-2 right-2 w-6 h-6 bg-yellow-500/80 rounded-full flex items-center justify-center"
        >
          <span className="text-black text-xs font-bold">+</span>
        </motion.div>
      </div>

      {/* Simple hover info */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"
      >
        <p className="text-white text-xs font-medium">Memory #{index + 1}</p>
      </motion.div>
    </motion.div>
  );
};

const LoadingScreen = () => (
  <div className="h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <div className="text-yellow-500 mb-4 flex justify-center">
        <Heart size={40} fill="currentColor" className="animate-pulse" />
      </div>
      <div className="text-[10px] tracking-[1em] uppercase text-neutral-500">Loading Memories</div>
    </motion.div>
  </div>
);

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] overflow-hidden">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-[2]">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);


export default App;