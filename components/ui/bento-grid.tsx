import { Users, Folder, Brain, Search, ArrowRight, MessageCircle, Lock, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useState } from "react";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

// Feature data for modals
const featureData = [
  {
    id: "messaging",
    title: "Instant Talk",
    description: "Connect with your audience instantly through our real-time messaging platform. Share updates, respond to queries, and build relationships with your community.",
    icon: MessageCircle,
    color: "#E23E6B"
  },
  {
    id: "magic-pots",
    title: "Fine Details",
    description: "Capture the essence of your product with fine-tuned details. Our magic pots feature helps you highlight what makes your offering special and showcase its unique qualities.",
    icon: null, // Custom star icon
    color: "#E23E6B"
  },
  {
    id: "security",
    title: "Encrypted Approach",
    description: "Keep your data and communications secure with our end-to-end encryption. Our top-notch security ensures that your sensitive information remains protected at all times.",
    icon: Lock,
    color: "#E23E6B"
  },
  {
    id: "explorer",
    title: "Explore Features",
    description: "Discover all the powerful tools and capabilities our platform offers. Navigate through a comprehensive suite of features designed to help you scale your product's reach effectively.",
    icon: ChevronRight,
    color: "#E23E6B"
  },
  {
    id: "community",
    title: "Share here, there, and everywhere",
    description: "Extend your reach across multiple platforms and communities. Our tools make it easy to share content widely and engage with diverse audiences wherever they are.",
    icon: ArrowRight,
    color: "#E23E6B"
  }
];

// Feature Modal Component
const FeatureModal = ({ feature, isOpen, onClose }: { 
  feature: typeof featureData[0] | null, 
  isOpen: boolean,
  onClose: () => void 
}) => {
  if (!feature) return null;
  
  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.6,
      y: 20,
      rotateX: -10
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 300,
        duration: 0.7
      }
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      y: -10,
      rotateX: 5,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 200,
        duration: 0.5
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  // Function to handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only trigger if clicking the actual backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          key="modal-backdrop"
          className="fixed inset-0 z-40 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
          />
          <motion.div 
            key="modal-content"
            className="relative bg-black/25 backdrop-blur-xl border border-white/20 rounded-3xl p-8 z-50 w-11/12 max-w-lg mx-auto shadow-[0_10px_50px_rgba(226,62,107,0.3)] overflow-hidden"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glassmorphic effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            </button>
            
            <div className="relative z-10">  
              <div className="mb-6 flex items-center justify-center">
                {feature.icon && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15,
                      delay: 0.1 
                    }}
                  >
                    <feature.icon className="w-16 h-16 text-pink-500" strokeWidth={1.5} />
                  </motion.div>
                )}
                {!feature.icon && feature.id === "magic-pots" && (
                  <motion.div 
                    className="relative w-16 h-16 flex items-center justify-center"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15,
                      delay: 0.1 
                    }}
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="absolute">
                      <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill="#E23E6B" stroke="none"/>
                    </svg>
                  </motion.div>
                )}
              </div>
              
              <motion.h2 
                className={cn("text-3xl md:text-4xl text-center font-thin mb-4 text-transparent bg-clip-text bg-gradient-to-t from-white to-[#E23E6B]", poppins.className)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15,
                  delay: 0.2 
                }}
              >
                {feature.title}
              </motion.h2>
              
              <motion.p 
                className={cn("text-white/90 text-center mb-6", poppins.className)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15,
                  delay: 0.3 
                }}
              >
                {feature.description}
              </motion.p>
              
              <motion.div 
                className="flex justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15,
                  delay: 0.4 
                }}
              >
                <motion.button
                  className="bg-gradient-to-r from-white/10 to-pink-500/30 hover:from-white/20 hover:to-pink-500/40 border border-white/20 px-6 py-2 rounded-full text-white transition-colors shadow-[0_0_15px_rgba(226,62,107,0.3)]"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(226,62,107,0.5)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function BentoGrid() {
  const [activeFeature, setActiveFeature] = useState<typeof featureData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Animation variants
  const cardVariants = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: (index: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 * index,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: { 
      y: -5,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    initial: { 
      scale: 0.8,
      opacity: 0.5
    },
    animate: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const arrowVariants = {
    initial: { x: -5 },
    hover: { 
      x: 5,
      transition: { 
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 0.8
      }
    }
  };

  const openModal = (featureId: string) => {
    const feature = featureData.find(f => f.id === featureId);
    if (feature) {
      setActiveFeature(feature);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Delay clearing the feature data until after animation completes
    setTimeout(() => {
      setActiveFeature(null);
    }, 300);
  };

  return (
    <div className={cn("relative text-white py-10 px-4 md:px-6 z-10 font-thin", poppins.className)}>
      {/* SVG Gradients for icons */}
      <svg width="0" height="0" className="absolute">
        <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#E23E6B" />
        </linearGradient>
        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#E23E6B" />
        </linearGradient>
        <linearGradient id="lock-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#E23E6B" />
        </linearGradient>
        <linearGradient id="chevron-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#E23E6B" />
        </linearGradient>
      </svg>
      
      {/* Glassmorphic background */}
      
      
      <div className="max-w-5xl mx-auto relative backdrop-blur-sm "/>
        {/* Heading */}
        <motion.h1 
          className={cn("text-3xl md:text-4xl lg:text-5xl font-thin text-center mb-8", poppins.className)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <AuroraText colors={[ "#cc4368", "#e6295c", "#ffffff", "#E23E6B"]}>
            <span className="text-transparent">Everything You Need</span> 
            
          </AuroraText>
          <br />
          to Scale Your Product's Reach
        </motion.h1>
        
        {/* Main feature banner */}
        <motion.div 
          className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 relative mb-4 group cursor-pointer shadow-lg"
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={cardVariants}
          custom={0}
          onClick={() => openModal("community")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-[#E23E6B] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
          <div className="relative z-10 p-8 flex items-center justify-between">
            <div>
              <p className={cn("text-xs uppercase text-gray-300 mb-2 font-thin group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-[#E23E6B]", poppins.className)}>COMMUNITY</p>
              <h2 className={cn("text-4xl font-thin mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-[#E23E6B]", poppins.className)}>Share here, there,<br />and everywhere.</h2>
            </div>
            <motion.div variants={arrowVariants}>
              <ArrowRight className="text-pink-500 w-8 h-8 group-hover:text-transparent group-hover:fill-[url(#arrow-gradient)]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Grid layout */}
        <div className="grid grid-cols-12 gap-4">
          {/* Feature 1 - Messaging - Spans 4 columns */}
          <motion.div 
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col col-span-4 md:col-span-4 row-span-2 relative group overflow-hidden cursor-pointer shadow-lg"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={cardVariants}
            custom={1}
            onClick={() => openModal("messaging")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-[#E23E6B] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
            <div className="relative z-10 flex flex-col h-full">
              <p className={cn("text-xs uppercase text-gray-300 mb-4 font-thin group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-[#E23E6B]", poppins.className)}>MESSAGING</p>
              <div className="flex-grow flex items-center justify-center mb-12">
                <motion.div
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <MessageCircle className="w-28 h-28 text-pink-500 group-hover:text-transparent group-hover:fill-[url(#icon-gradient)]" strokeWidth={1.5} />
                </motion.div>
              </div>
              <div className="flex justify-between items-end mt-auto">
                <h3 className={cn("text-3xl font-thin group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-[#E23E6B]", poppins.className)}>Instant<br />Talk</h3>
                <motion.div variants={arrowVariants}>
                  <ChevronRight className="text-pink-500 w-8 h-8 group-hover:text-transparent group-hover:fill-[url(#chevron-gradient)]" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2 - Magic Pots - Spans 4 columns */}
          <motion.div 
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col col-span-8 md:col-span-4 relative group overflow-hidden cursor-pointer shadow-lg"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={cardVariants}
            custom={2}
            onClick={() => openModal("magic-pots")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#E23E6B] to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
            <div className="relative z-10 flex flex-col h-full">
              <p className={cn("text-xs uppercase text-gray-300 mb-4 font-thin group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-[#E23E6B]", poppins.className)}>MAGIC POTS</p>
              <motion.div 
                className="flex justify-start"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3, 
                  ease: "easeInOut" 
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <motion.div 
                      className="absolute top-1 right-1"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 2,
                        delay: 0.5
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill="#E23E6B" stroke="none"/>
                      </svg>
                    </motion.div>
                    <motion.div 
                      className="absolute -top-2 -left-2"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 2
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill="#E23E6B" stroke="none"/>
                      </svg>
                    </motion.div>
                    <motion.div 
                      className="absolute bottom-0 right-0"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 2,
                        delay: 1
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill="#E23E6B" stroke="none"/>
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              <h3 className={cn("text-3xl font-thin mt-6 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-[#E23E6B]", poppins.className)}>Fine<br />Details</h3>
              <p className={cn("text-gray-300 text-sm mb-4 font-thin group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-[#E23E6B]", poppins.className)}>Features cards section<br />concept details by design</p>
              <div className="flex justify-end mt-auto">
                <motion.div 
                  className="bg-gradient-to-r from-white to-[#E23E6B] w-12 h-12 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ChevronRight className="text-black w-6 h-6" />
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Feature 3 - Security - Spans 4 columns */}
          <motion.div 
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col col-span-8 md:col-span-4 relative group overflow-hidden cursor-pointer shadow-lg"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={cardVariants}
            custom={3}
            onClick={() => openModal("security")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-[#E23E6B] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
            <div className="relative z-10 flex flex-col h-full">
              <p className={cn("text-xs uppercase text-gray-300 mb-4 font-thin group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-[#E23E6B]", poppins.className)}>TOP NOTCH SHOTS</p>
              <div className="flex-grow flex items-center justify-center">
                <motion.div
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <Lock className="w-24 h-24 text-pink-500 group-hover:text-transparent group-hover:fill-[url(#lock-gradient)]" strokeWidth={1} />
                </motion.div>
              </div>
              <div className="flex justify-between items-end">
                <h3 className={cn("text-3xl font-thin group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-[#E23E6B]", poppins.className)}>Encrypted<br />Approach</h3>
                <motion.div variants={arrowVariants}>
                  <ChevronRight className="text-pink-500 w-8 h-8 group-hover:text-transparent group-hover:fill-[url(#chevron-gradient)]" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Feature 4 - Feature Explorer - Spans full width */}
          <motion.div 
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col col-span-12 md:col-span-8 relative group overflow-hidden cursor-pointer shadow-lg"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={cardVariants}
            custom={4}
            onClick={() => openModal("explorer")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#E23E6B] to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
            <div className="relative z-10 flex justify-between items-center h-full">
              <h3 className={cn("text-4xl font-thin group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-[#E23E6B]", poppins.className)}>Explore<br />Features</h3>
              <motion.div variants={arrowVariants}>
                <ChevronRight className="text-pink-500 w-10 h-10 group-hover:text-transparent group-hover:fill-[url(#chevron-gradient)]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Feature Detail Modal */}
        <FeatureModal 
          feature={activeFeature} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      </div>
    
  )
}

