import { motion } from 'motion/react';
import { Trophy, Users, Calendar } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Floating Sports Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 text-blue-200 opacity-40"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Trophy size={48} />
          </motion.div>
          <motion.div
            className="absolute top-40 right-16 text-green-200 opacity-40"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <Users size={40} />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-16 text-blue-300 opacity-40"
            animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          >
            <Calendar size={36} />
          </motion.div>
        </div>

        {/* Logo and App Name */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-blue-500 to-green-500 w-28 h-28 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-200">
            <Trophy className="text-white" size={56} strokeWidth={2} />
          </div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
          >
            PlayPal
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-600 text-lg"
          >
            Book Your Game, Play Your Way
          </motion.p>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <div className="flex gap-2 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
