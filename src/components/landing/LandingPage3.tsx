import { Box, Container, Flex, VStack, Image, Heading, Text, Button, Link, HStack, Badge, SimpleGrid, Divider, Icon, useBreakpointValue } from '@chakra-ui/react';
import { FiFileText, FiMessageCircle, FiShield, FiTarget, FiWifi, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';
import airblockLogo from '../../assets/airblock-logo.svg';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export const LandingPage3 = () => {
  const logoSize = useBreakpointValue({ base: '150px', md: '200px' });
  
  return (
    <Box 
      minH="100vh" 
      bg="#040D18" 
      color="gray.100" 
      position="relative"
      overflow="auto"
      h="100%"
    >
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: "0.5" }}
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
                <Text color="yellow.400" fontWeight="bold" fontSize="sm">MODEL:</Text>
                <Text fontFamily="mono" fontSize="xl" fontWeight="bold">UA-AIRBLOCK-MK3</Text>
                <Badge colorScheme="blue" mt={1}>MILITARY GRADE</Badge>
              </VStack>
              
              <Box w="full">
                <Text color="yellow.400" fontWeight="bold" fontSize="sm" mb={2}>MISSION STATUS:</Text>
                <Flex align="center" justify="space-between">
                  <Text>OPERATIONAL</Text>
                  <Box w="12px" h="12px" borderRadius="full" bg="green.400" />
                </Flex>
              </Box>
              
              <Divider borderColor="rgba(74, 144, 226, 0.3)" />
              
              <VStack spacing={4} w="full">
                <Text color="yellow.400" fontWeight="bold" fontSize="sm" alignSelf="flex-start">CONTACT COMMAND:</Text>
                <Button 
                  as={Link}
                  href="https://docs.google.com/forms/d/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FiMessageCircle />}
                  w="full" 
                  colorScheme="yellow"
                  _hover={{ transform: 'translateY(-2px)' }}
                >
                  SECURE CHANNEL
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
                >
                  TECHNICAL DOCS
                </Button>
              </VStack>
              
              <Divider borderColor="rgba(74, 144, 226, 0.3)" />
              
              <Box w="full">
                <Text color="yellow.400" fontWeight="bold" fontSize="sm" mb={3}>COMMAND CENTER:</Text>
                <Text fontSize="sm">LOCATION: Kyiv, Ukraine</Text>
                <Text fontSize="sm">COMM: +380 44 123 4567</Text>
                <Text fontSize="sm">CHANNEL: airblock@ua-defense.gov</Text>
              </Box>
            </VStack>
          </MotionBox>
          
          {/* Main Content Area */}
          <MotionFlex 
            flex={1} 
            direction="column" 
            ml={{ base: 0, lg: 8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: "0.7", delay: "0.3" }}
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
                UKRAINE AIRBLOCK
              </Heading>
              <Text fontSize="lg">
                Advanced tactical plane-drone system with multi-mission capability. Developed for defense operations with state-of-the-art technology ensuring battlefield dominance.
              </Text>
            </Box>
            
            {/* Main drone image */}
            <Box 
              position="relative" 
              mb={6}
              borderRadius="md"
              overflow="hidden"
              border="1px solid"
              borderColor="rgba(74, 144, 226, 0.3)"
            >
              <Image 
                src="https://placehold.co/1200x500/0A1428/FFC107?text=AIRBLOCK+TACTICAL+DRONE"
                alt="AIRBLOCK Tactical Drone" 
                w="100%"
              />
              
              {/* HUD-like overlay elements */}
              <Box 
                position="absolute" 
                top={0} 
                left={0} 
                right={0} 
                bottom={0}
                bgGradient="linear(to-b, rgba(4,13,24,0.3), rgba(4,13,24,0))"
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
              >
                <Text fontFamily="mono" fontSize="sm">TARGET ACQUISITION SYSTEM</Text>
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
              >
                <Text fontFamily="mono" fontSize="sm">SYSTEM READY</Text>
              </Box>
            </Box>
            
            {/* Specs grid */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
              {[
                { icon: FiShield, title: "ARMORED CHASSIS", description: "Reinforced composite construction with ballistic protection" },
                { icon: FiEye, title: "ADVANCED OPTICS", description: "Multi-spectrum imaging with thermal and night vision" },
                { icon: FiWifi, title: "SECURE COMMS", description: "Encrypted communication with anti-jamming protection" },
                { icon: FiTarget, title: "PRECISION SYSTEMS", description: "Sub-meter targeting accuracy with GPS-denied capability" }
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
                  transition={{ duration: "0.5", delay: `${0.5 + (i * 0.1)}` }}
                >
                  <HStack spacing={4}>
                    <Icon as={spec.icon} boxSize={6} color="yellow.400" />
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold">{spec.title}</Text>
                      <Text fontSize="sm" color="gray.300">{spec.description}</Text>
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