import { VStack, Button, Icon, Link, Text } from '@chakra-ui/react';
import { FiVideo, FiFileText, FiBook, FiMonitor, FiTarget, FiBriefcase, FiMessageCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const navigationItems = [
  { 
    icon: FiVideo, 
    text: 'OUR AWESOME PLANE battlefield video',
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Astley - Never Gonna Give You Up
  },
  { 
    icon: FiFileText, 
    text: 'OUR AWESOME PLANE product description',
    href: 'https://www.youtube.com/watch?v=9bZkp7q19f0', // PSY - GANGNAM STYLE
  },
  { 
    icon: FiBook, 
    text: 'OUR AWESOME PLANE installation guide',
    href: 'https://www.youtube.com/watch?v=ZZ5LpwO-An4', // HEYYEYAAEYAAAEYAEYAA
  },
  { 
    icon: FiMonitor, 
    text: 'OUR AWESOME PLANE OSD menu video guide',
    href: 'https://www.youtube.com/watch?v=y6120QOlsfU', // Darude - Sandstorm
  },
  { 
    icon: FiTarget, 
    text: 'PERSPECTIVE, MULTIFUNCTIONAL AUTONOMOUS STRIKE PLATFORM',
    href: 'https://www.youtube.com/watch?v=feA64wXhbjo', // Shooting Stars
  },
  { 
    icon: FiBriefcase, 
    text: 'COMPANY PRESENTATION',
    href: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', // Despacito
  },
  { 
    icon: FiMessageCircle, 
    text: 'WhatsApp',
    href: 'https://www.youtube.com/watch?v=L_jWHffIx5E', // All Star - Smash Mouth
  },
];

export const NavigationButtons = () => {
  return (
    <VStack spacing={{ base: 2, md: 4 }} w="full">
      {navigationItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          width="full"
          textDecoration="none"
          _hover={{ textDecoration: 'none' }}
        >
          <MotionButton
            width="full"
            size={{ base: 'md', md: 'lg' }}
            height={{ base: '40px', md: '48px' }}
            px={{ base: 3, md: 4 }}
            variant="solid"
            leftIcon={<Icon as={item.icon} boxSize={{ base: 4, md: 5 }} />}
            justifyContent="flex-start"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => {
              console.log('🚀 Launching awesome content!');
            }}
          >
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              noOfLines={2}
              textAlign="left"
              wordBreak="break-word"
            >
              {item.text}
            </Text>
          </MotionButton>
        </Link>
      ))}
    </VStack>
  );
}; 