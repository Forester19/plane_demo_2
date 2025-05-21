import { Box, Container, Flex, VStack, Image, Heading, Text, Button, Link, HStack, Badge, SimpleGrid, Divider, Icon, useBreakpointValue, IconButton } from '@chakra-ui/react';
import {FiFileText, FiMessageCircle, FiShield, FiTarget, FiWifi, FiEye, FiFastForward, FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import { motion } from 'framer-motion';
import airblockLogo from '../../assets/airblock-logo.svg';
import { useState, useEffect } from 'react';
import { useLang } from './LangContext';
import { LanguageSwitch } from './LanguageSwitch';

// Import images directly
import picture1 from '../../assets/Picture_1.png';
import picture2 from '../../assets/Picture_2.jpg';
import picture3 from '../../assets/Picture_3.jpg';
import picture4 from '../../assets/Picture_4.png';
import picture5 from '../../assets/Picture_5.jpg';
import picture6 from '../../assets/Picture_6.png';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Define animation variants
const fadeInFromLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

const fadeInFromRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, delay: 0.3 }
  }
};

// Slideshow component
const ImageSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Images from assets folder
  const slides = [
    {
      url: picture1,
      alt: "AIRBLOCK Tactical Drone Image 1"
    },
    {
      url: picture2,
      alt: "AIRBLOCK Tactical Drone Image 2"
    },
    {
      url: picture3,
      alt: "AIRBLOCK Tactical Drone Image 3"
    },
    {
      url: picture4,
      alt: "AIRBLOCK Tactical Drone Image 4"
    },
    {
      url: picture5,
      alt: "AIRBLOCK Tactical Drone Image 5"
    },
    {
      url: picture6,
      alt: "AIRBLOCK Tactical Drone Image 6"
    }
  ];
  
  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [slides.length]);
  
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };
  
  return (
    <Box position="relative" height="100%" width="100%">
      {slides.map((slide, index) => (
        <Box
          key={index}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          opacity={index === currentSlide ? 1 : 0}
          transition="opacity 0.5s ease-in-out"
          zIndex={index === currentSlide ? 1 : 0}
        >
          <Image
            src={slide.url}
            alt={slide.alt}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
      ))}
      
      {/* Navigation arrows */}
      <IconButton
        aria-label="Previous slide"
        icon={<FiChevronLeft size="24px" />}
        position="absolute"
        left="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        bg="rgba(0,0,0,0.5)"
        color="white"
        borderRadius="full"
        onClick={prevSlide}
        _hover={{ bg: "rgba(0,0,0,0.7)" }}
      />
      
      <IconButton
        aria-label="Next slide"
        icon={<FiChevronRight size="24px" />}
        position="absolute"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        bg="rgba(0,0,0,0.5)"
        color="white"
        borderRadius="full"
        onClick={nextSlide}
        _hover={{ bg: "rgba(0,0,0,0.7)" }}
      />
      
      {/* Slide indicators */}
      <HStack
        spacing={2}
        position="absolute"
        bottom="15px"
        left="50%"
        transform="translateX(-50%)"
        zIndex="2"
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            w="8px"
            h="8px"
            borderRadius="full"
            bg={index === currentSlide ? "yellow.400" : "whiteAlpha.600"}
            cursor="pointer"
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </HStack>
    </Box>
  );
};

export const LandingPage3 = () => {
  const logoSize = useBreakpointValue({ base: '150px', md: '200px' });
  const { t } = useLang();
  
  return (
    <Box 
      minH="100vh" 
      bg="#040D18" 
      color="gray.100" 
      position="relative"
      overflow="auto"
      h="100%"
    >
      {/* Language Switch */}
      <LanguageSwitch />
      
      {/* Radial gradient overlay */}
      <Box
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        bgGradient="radial(circle at 70% 30%, rgba(21, 41, 82, 0.7), transparent 70%)"
        pointerEvents="none"
        zIndex="0"
      />
      
      {/* Grid pattern */}
      <Box
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        opacity="0.15"
        backgroundImage="linear-gradient(rgba(74, 144, 226, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 144, 226, 0.3) 1px, transparent 1px)"
        backgroundSize="50px 50px"
        pointerEvents="none"
        zIndex="0"
      />
      
      <Container maxW="1400px" py={{ base: 10, md: 20 }} position="relative" zIndex="1">
        <Flex 
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          align="stretch"
          gap={{ base: 10, lg: 0 }}
        >
          {/* Left Panel - Military-style sidebar */}
          <MotionBox
            w={{ base: "100%", lg: "300px" }}
            bg="rgba(4, 13, 24, 0.8)"
            border="1px solid"
            borderColor="rgba(74, 144, 226, 0.3)"
            borderRadius="md"
            p={6}
            variants={fadeInFromLeft}
            initial="hidden"
            animate="visible"
            mb={{ base: 6, lg: 0 }}
            position={{ base: "relative", lg: "sticky" }}
            top={{ lg: "20px" }}
            alignSelf={{ lg: "flex-start" }}
            h={{ lg: "fit-content" }}
          >
            <VStack spacing={8} align="start">
              <Image 
                src={airblockLogo} 
                alt="UA AIRBLOCK Logo" 
                w={logoSize}
                alignSelf="center"
                mb={2}
              />
              
              <VStack align="start" spacing={1} w="full">
                <Text color="yellow.400" fontWeight="bold" fontSize="sm">{t('sidebar.models')}</Text>
                <Text fontFamily="mono" fontSize="xl" fontWeight="bold">"КОРТИК" <br/> "АКІНАК Uj-52" "АКІНАК Uj-52-FT"</Text>
                <Badge colorScheme="blue" mt={1}>{t('sidebar.militaryGrade')}</Badge>
              </VStack>
              
              <Box w="full">
                <Text color="yellow.400" fontWeight="bold" fontSize="sm" mb={2}>{t('sidebar.missionStatus')}</Text>
                <Flex align="center" justify="space-between">
                  <Text>{t('sidebar.operational')}</Text>
                  <Box w="12px" h="12px" borderRadius="full" bg="green.400" />
                </Flex>
              </Box>
              
              <Divider borderColor="rgba(74, 144, 226, 0.3)" />
              
              <VStack spacing={4} w="full">
                <Text color="yellow.400" fontWeight="bold" fontSize="sm" alignSelf="flex-start">{t('sidebar.documentation')}</Text>
                <Button
                    as={Link}
                    href="https://docs.google.com/document/d/specifications"
                    target="_blank"
                    rel="noopener noreferrer"
                    leftIcon={<FiFileText />}
                    w="full"
                    colorScheme="blue"
                    variant="outline"
                    _hover={{ transform: 'translateY(-2px)' }}
                    justifyContent="flex-start"
                >
                  {t('sidebar.kortyDocs')}
                </Button>
                
                <Button 
                  as={Link}
                  href="https://docs.google.com/document/d/specifications"
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FiFileText />}
                  w="full" 
                  colorScheme="blue"
                  variant="outline"
                  _hover={{ transform: 'translateY(-2px)' }}
                  justifyContent="flex-start"
                >
                  {t('sidebar.akinakDocs')}
                </Button>
              </VStack>
              
              <Divider borderColor="rgba(74, 144, 226, 0.3)" />
              
              <Box w="full">
                <Text color="yellow.400" fontWeight="bold" fontSize="sm" mb={3}>{t('sidebar.commandCenter')}</Text>
                <Text fontSize="sm">{t('sidebar.location')} <br/> {t('sidebar.locationValue')}</Text>
                <Text fontSize="sm">{t('sidebar.communication')} <br/> +380 (97) 329-54-57 <br/> +380 (73) 345-88-50</Text>
                <Text fontSize="sm">{t('sidebar.channel')} airblock345@gmail.com</Text>
              </Box>
            </VStack>
          </MotionBox>
          
          {/* Main Content Area */}
          <MotionFlex 
            flex={1} 
            direction="column" 
            ml={{ base: 0, lg: 8 }}
            variants={fadeInFromRight}
            initial="hidden"
            animate="visible"
          >
            {/* Top banner */}
            <Box 
              bg="rgba(4, 13, 24, 0.6)" 
              p={6} 
              borderRadius="md"
              border="1px solid"
              borderColor="rgba(74, 144, 226, 0.3)"
              mb={6}
            >
              <Heading 
                size="xl" 
                mb={4}
                color="yellow.400"
                letterSpacing="wider"
                textTransform="uppercase"
              >
                {t('header.title')}
              </Heading>
              <Text fontSize="lg">
                {t('header.description')}
              </Text>
            </Box>
            
            {/* Main drone slideshow */}
            <Box 
              position="relative" 
              mb={6}
              borderRadius="md"
              overflow="hidden"
              border="1px solid"
              borderColor="rgba(74, 144, 226, 0.3)"
              height={{ base: "250px", md: "400px" }}
            >
              <ImageSlideshow />
              
              {/* HUD-like overlay elements */}
              <Box 
                position="absolute" 
                top={0} 
                left={0} 
                right={0} 
                bottom={0}
                bgGradient="linear(to-b, rgba(4,13,24,0.3), rgba(4,13,24,0))"
                pointerEvents="none"
                zIndex="2"
              />
              <Box 
                position="absolute" 
                top={4} 
                left={4}
                px={3}
                py={1}
                bg="rgba(4, 13, 24, 0.7)"
                borderRadius="md"
                borderLeft="2px solid"
                borderColor="yellow.400"
                zIndex="3"
              >
                <Text fontFamily="mono" fontSize="sm">{t('hud.targetAcquisition')}</Text>
              </Box>
              <Box 
                position="absolute" 
                bottom={4} 
                right={4}
                px={3}
                py={1}
                bg="rgba(4, 13, 24, 0.7)"
                borderRadius="md"
                borderRight="2px solid"
                borderColor="yellow.400"
                zIndex="3"
              >
                <Text fontFamily="mono" fontSize="sm">{t('hud.systemReady')}</Text>
              </Box>
            </Box>
            
            {/* Specs grid */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
              {[
                { icon: FiFastForward, title: 'feature.longRange', description: 'feature.longRangeDesc' },
                { icon: FiEye, title: 'feature.optics', description: 'feature.opticsDesc' },
                { icon: FiWifi, title: 'feature.comms', description: 'feature.commsDesc' },
                { icon: FiTarget, title: 'feature.precision', description: 'feature.precisionDesc' }
              ].map((spec, i) => (
                <Box 
                  key={i}
                  bg="rgba(4, 13, 24, 0.6)"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="rgba(74, 144, 226, 0.3)"
                  p={4}
                  as={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: '0.5', delay: `${0.5 + (i * 0.1)}` }}
                >
                  <HStack spacing={4}>
                    <Icon as={spec.icon} boxSize={6} color="yellow.400" />
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold">{t(spec.title)}</Text>
                      <Text fontSize="sm" color="gray.300">{t(spec.description)}</Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          </MotionFlex>
        </Flex>
      </Container>
    </Box>
  );
}; 