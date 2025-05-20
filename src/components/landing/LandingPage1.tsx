import { Box, Container, Flex, VStack, Image, Heading, Text, Button, HStack, Link } from '@chakra-ui/react';
import { FiFileText, FiMessageCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import airblockLogo from '../../assets/airblock-logo.svg';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

// Define animation variants to avoid inline transition objects
const fadeInFromTop = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const fadeInFromBottom = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay: 0.2 }
  }
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.7, delay: 0.3 }
  }
};

const fadeInDelayed = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay: 0.6 }
  }
};

export const LandingPage1 = () => {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, brand.primary, #000)"
      position="relative"
      overflow="hidden"
    >
      {/* Background stars effect */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        sx={{
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(1px 1px at 50% 50%, #fff, rgba(0, 0, 0, 0))',
            backgroundSize: '200px 200px',
            opacity: 0.3,
          }
        }}
      />

      <Container maxW="container.xl" pt={20} pb={10}>
        <Flex 
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          gap={10}
        >
          {/* Left side - Logo and info */}
          <VStack 
            spacing={8} 
            align={{ base: 'center', lg: 'flex-start' }}
            flex={1}
          >
            <MotionImage
              src={airblockLogo}
              alt="UA AIRBLOCK Logo"
              w={{ base: '200px', md: '300px' }}
              variants={fadeInFromTop}
              initial="hidden"
              animate="visible"
            />
            
            <MotionBox
              variants={fadeInFromBottom}
              initial="hidden"
              animate="visible"
            >
              <Heading 
                size="2xl" 
                bgGradient="linear(to-r, yellow.400, yellow.600)" 
                bgClip="text"
                mb={4}
              >
                UKRAINE AIRBLOCK
              </Heading>
              
              <Text fontSize="xl" color="gray.300" maxW="540px" mb={6}>
                State-of-the-art plane-drone technology designed for precision, reliability, and versatility in various tactical operations and environments.
              </Text>
              
              <HStack spacing={5} flexWrap="wrap">
                <Link
                  href="https://docs.google.com/document/d/specifications"
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box
                    as={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      leftIcon={<FiFileText />}
                      colorScheme="blue"
                      size="lg"
                    >
                      Technical Specifications
                    </Button>
                  </Box>
                </Link>
                
                <Link
                  href="https://docs.google.com/forms/d/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box
                    as={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      leftIcon={<FiMessageCircle />}
                      colorScheme="yellow"
                      size="lg"
                      variant="outline"
                    >
                      Contact Us
                    </Button>
                  </Box>
                </Link>
              </HStack>
            </MotionBox>
          </VStack>
          
          {/* Right side - Drone image */}
          <MotionBox
            flex={1}
            display="flex"
            justifyContent="center"
            variants={fadeInScale}
            initial="hidden"
            animate="visible"
          >
            <Image 
              src="https://placehold.co/600x400/1E2A3B/FFC107?text=AIRBLOCK+DRONE"
              alt="AIRBLOCK Drone"
              borderRadius="lg"
              boxShadow="lg"
              maxW="100%"
            />
          </MotionBox>
        </Flex>
        
        {/* Contact Information */}
        <MotionBox
          mt={20}
          variants={fadeInDelayed}
          initial="hidden"
          animate="visible"
        >
          <VStack spacing={3}>
            <Heading size="md" color="yellow.400">Connect With Us</Heading>
            <Text color="gray.300">Email: contact@airblock-ua.com</Text>
            <Text color="gray.300">Phone: +380 44 123 4567</Text>
            <Text color="gray.300">Location: Kyiv, Ukraine</Text>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}; 