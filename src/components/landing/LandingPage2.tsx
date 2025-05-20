import { Box, Container, VStack, Image, Heading, Text, Button, HStack, Link, Grid, GridItem, Icon, Card, CardBody } from '@chakra-ui/react';
import { FiFileText, FiMessageCircle, FiTarget, FiCpu, FiWifi } from 'react-icons/fi';
import { motion } from 'framer-motion';
import airblockLogo from '../../assets/airblock-logo.svg';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export const LandingPage2 = () => {
  const features = [
    { 
      icon: FiTarget, 
      title: "Precision Targeting", 
      description: "Advanced guidance systems for pinpoint accuracy in all conditions."
    },
    { 
      icon: FiCpu, 
      title: "Autonomous Operation", 
      description: "AI-powered flight controls with mission planning capabilities."
    },
    { 
      icon: FiWifi, 
      title: "Secure Communications", 
      description: "Encrypted data transmission with anti-jamming technology."
    }
  ];

  return (
    <Box 
      minH="100vh" 
      bgGradient="linear(to-br, #050A15, #0A1428)" 
      py={10}
    >
      <Container maxW="container.xl" centerContent>
        {/* Hero Section */}
        <VStack spacing={6} textAlign="center" mb={16}>
          <MotionBox
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: "0.7" }}
          >
            <Image 
              src={airblockLogo}
              alt="UA AIRBLOCK Logo" 
              w={{ base: "180px", md: "250px" }}
              mb={6}
            />
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: "1", delay: 0.3 }}
          >
            <Heading 
              as="h1" 
              size="3xl" 
              mb={4}
              bgGradient="linear(to-r, #FFC107, #FFD54F)"
              bgClip="text"
              letterSpacing="wider"
            >
              UKRAINE AIRBLOCK
            </Heading>
            
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              maxW="700px" 
              color="gray.300"
              mb={8}
            >
              Next-generation unmanned aerial system combining fixed-wing efficiency with multi-rotor versatility. Designed for tactical reconnaissance and precision operations.
            </Text>
          </MotionBox>

          <HStack spacing={6} wrap="wrap" justify="center">
            <Button
              as={Link}
              href="https://docs.google.com/document/d/specifications"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              colorScheme="yellow"
              leftIcon={<FiFileText />}
              _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              px={8}
            >
              Technical Documents
            </Button>
            
            <Button
              as={Link}
              href="https://docs.google.com/forms/d/contact"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="outline"
              colorScheme="blue"
              leftIcon={<FiMessageCircle />}
              _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              px={8}
            >
              Request Information
            </Button>
          </HStack>
        </VStack>

        {/* Main Image */}
        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: "0.8", delay: 0.5 }}
          mb={16}
          w="100%"
          maxW="900px"
        >
          <Image 
            src="https://placehold.co/1200x600/0D1C36/FFC107?text=AIRBLOCK+ADVANCED+DRONE"
            alt="AIRBLOCK Drone"
            borderRadius="xl"
            boxShadow="dark-lg"
            width="100%"
          />
        </MotionBox>

        {/* Features */}
        <Grid 
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={8}
          w="100%"
          mb={16}
        >
          {features.map((feature, index) => (
            <GridItem key={index}>
              <MotionCard
                bg="rgba(13, 25, 48, 0.7)"
                backdropFilter="blur(10px)"
                borderWidth="1px"
                borderColor="rgba(74, 144, 226, 0.3)"
                borderRadius="xl"
                overflow="hidden"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.25)"
                height="100%"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: "0.5", delay: Number(`${0.7 + index * 0.2}`)}}
                _hover={{ 
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 30px rgba(74, 144, 226, 0.3)"
                }}
              >
                <CardBody>
                  <VStack spacing={4} align="center" textAlign="center">
                    <Icon as={feature.icon} boxSize={10} color="yellow.400" />
                    <Heading size="md" color="white">{feature.title}</Heading>
                    <Text color="gray.300">{feature.description}</Text>
                  </VStack>
                </CardBody>
              </MotionCard>
            </GridItem>
          ))}
        </Grid>

        {/* Contact Information */}
        <Box 
          py={8} 
          px={10} 
          bg="rgba(13, 25, 48, 0.5)"
          backdropFilter="blur(10px)"
          borderWidth="1px"
          borderColor="rgba(74, 144, 226, 0.2)"
          borderRadius="xl"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.2)"
          textAlign="center"
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: "0.5", delay: "1.2" }}
        >
          <Heading size="md" color="yellow.400" mb={4}>Contact Information</Heading>
          <Text color="gray.200">Email: info@airblock-ua.com</Text>
          <Text color="gray.200">Phone: +380 44 123 4567</Text>
          <Text color="gray.200">Address: Kyiv, Ukraine</Text>
        </Box>
      </Container>
    </Box>
  );
}; 