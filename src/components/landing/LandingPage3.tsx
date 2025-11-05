import { Box, Container, Flex, VStack, Image, Heading, Text, Button, Link, HStack, Badge, SimpleGrid, Divider, Icon, useBreakpointValue, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { keyframes } from '@chakra-ui/system';
import {FiFileText, FiTarget, FiWifi, FiEye, FiFastForward, FiChevronDown, FiImage, FiVideo, FiCompass, FiCrosshair, FiNavigation2} from 'react-icons/fi';
import { motion } from 'framer-motion';
import airblockLogo from '../../assets/airblock-logo.svg';
import { useLang } from './LangContext';
import { LanguageSwitch } from './LanguageSwitch';

// Import background image
import picture4 from '../../assets/Picture_4.jpg';

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

const gradientMove = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 100px 100px; }
`;

const gradientAnimation = `${gradientMove} 8s linear infinite`;

export const LandingPage3 = () => {
  const logoSize = useBreakpointValue({ base: '180px', md: '200px' });
  const { t } = useLang();
  
  return (
    <Box 
      bg="#040D18" 
      color="gray.100" 
      position="relative"
      minH="100vh"
      overflowY="auto"
      overflowX="hidden"
    >
      {/* Main Navigation Header */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg="rgba(4, 13, 24, 0.9)"
        borderBottom="1px solid"
        borderColor="rgba(74, 144, 226, 0.3)"
        backdropFilter="blur(5px)"
        zIndex={100}
      >
        <Flex
          justify="space-between"
          align="center"
          px={{ base: "10px", md: 8 }}
          py={4}
          maxW="1400px"
          mx="auto"
          height={70}
        >
          <Flex align="center" gap={4}>
            <Image 
              src={airblockLogo} 
              alt="UA AIRBLOCK Logo" 
              height="150px"
              scale={2}
              mt="-8px"
              mb="-8px"
            />
            <Text
              fontFamily="mono"
              fontSize="xl"
              fontWeight="bold"
              color="yellow.400"
              letterSpacing="wider"
	      lineHeight="normal"
            >
              AIRBLOCK TECHNICAL CENTER
            </Text>
          </Flex>

          <Box>
            <LanguageSwitch />
          </Box>
        </Flex>
      </Box>

      {/* Main background */}
      <Box
        position="fixed"
        top="0"
        right="0"
        bottom="0"
        left="0"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundAttachment="fixed"
        opacity={0.2}
        zIndex="0"
      />

      {/* Dark overlay with tech pattern */}
      <Box
        position="fixed"
        top="0"
        right="0"
        bottom="0"
        left="0"
        bg="rgba(4, 13, 24, 0.95)"
        zIndex="0"
        _after={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "linear-gradient(0deg, rgba(74, 144, 226, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 144, 226, 0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          opacity: 0.5
        }}
      />

      {/* Subtle radial gradient */}
      <Box
        position="fixed"
        top="0"
        right="0"
        bottom="0"
        left="0"
        bgGradient="radial(circle at 70% 30%, rgba(74, 144, 226, 0.05), transparent 60%)"
        pointerEvents="none"
        zIndex="0"
      />

      {/* Animated subtle waves */}
      <Box
        position="fixed"
        top="0"
        right="0"
        bottom="0"
        left="0"
        opacity="0.02"
        backgroundImage="repeating-linear-gradient(45deg, rgba(74, 144, 226, 0.1) 0%, transparent 2%, transparent 4%, rgba(74, 144, 226, 0.1) 6%), repeating-linear-gradient(-45deg, rgba(74, 144, 226, 0.1) 0%, transparent 2%, transparent 4%, rgba(74, 144, 226, 0.1) 6%)"
        backgroundSize="400px 400px"
        pointerEvents="none"
        zIndex="0"
        _after={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "repeating-linear-gradient(90deg, rgba(74, 144, 226, 0.03) 0px, transparent 4px, transparent 40px)",
          backgroundSize: "200px 200px",
          animation: gradientAnimation
        }}
      />

      {/* Modern dot matrix */}
      <Box
        position="fixed"
        top="0"
        right="0"
        bottom="0"
        left="0"
        opacity="0.015"
        backgroundImage="radial-gradient(circle at center, rgba(74, 144, 226, 0.2) 0%, transparent 1px)"
        backgroundSize="40px 40px"
        backgroundPosition="center center"
        pointerEvents="none"
        zIndex="0"
        _after={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(74, 144, 226, 0.05) 0%, transparent 100%)",
          backgroundSize: "200% 200%",
          animation: `${gradientMove} 15s ease infinite`
        }}
      />

      <Container 
        maxW="100%" 
        p={0}
        position="relative" 
        zIndex="1"
        pt="70px" // Add padding top to account for fixed header
	pb={{ base: "30px", md: 0 }} // Add padding bottom for mobile
      >
        <Flex 
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          align="stretch"
          gap={{ base: 10, lg: 8 }}
        >
          {/* Left Panel - Military-style sidebar */}
{/*           <MotionBox
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
            h="fit-content"
            mx={{ base: 4, lg: 8 }}
          >
            <VStack spacing={8} align="start">
              <Divider borderColor="rgba(74, 144, 226, 0.3)" />
              
              <VStack spacing={4} w="full">
                <Menu>
                  <MenuButton
                    as={Button}
                    w="full"
                    colorScheme="blue"
                    variant="outline"
                    rightIcon={<FiChevronDown />}
                    leftIcon={<FiFileText />}
                    _hover={{ transform: 'translateY(-2px)' }}
                  >
                    {t('sidebar.krokDocs')}
                  </MenuButton>
                  <MenuList bg="rgba(4, 13, 24, 0.9)" borderColor="rgba(74, 144, 226, 0.3)">
                    <MenuItem 
                      as={Link} 
                      href="https://docs.google.com/document/d/specifications"
                      icon={<FiFileText />}
                      bg="rgba(4, 13, 24, 0.9)"
                      _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                    >
                      {t('menu.techDocs')}
                    </MenuItem>
                    <MenuItem 
                      as={Link} 
                      href="#photos"
                      icon={<FiImage />}
                      bg="rgba(4, 13, 24, 0.9)"
                      _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                    >
                      {t('menu.photos')}
                    </MenuItem>
                    <MenuItem 
                      as={Link} 
                      href="#videos"
                      icon={<FiVideo />}
                      bg="rgba(4, 13, 24, 0.9)"
                      _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                    >
                      {t('menu.videos')}
                    </MenuItem>
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton
                    as={Button}
                    w="full"
                    colorScheme="blue"
                    variant="outline"
                    rightIcon={<FiChevronDown />}
                    leftIcon={<FiFileText />}
                    _hover={{ transform: 'translateY(-2px)' }}
                  >
                    {t('sidebar.kortyDocs')}
                  </MenuButton>
                  <MenuList bg="rgba(4, 13, 24, 0.9)" borderColor="rgba(74, 144, 226, 0.3)">
                    <MenuItem 
                      as={Link} 
                      href="https://docs.google.com/document/d/specifications"
                      icon={<FiFileText />}
                      bg="rgba(4, 13, 24, 0.9)"
                      _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                    >
                      {t('menu.techDocs')}
                    </MenuItem>
                    <MenuItem 
                      as={Link} 
                      href="#photos"
                      icon={<FiImage />}
                      bg="rgba(4, 13, 24, 0.9)"
                      _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                    >
                      {t('menu.photos')}
                    </MenuItem>
                    <MenuItem 
                      as={Link} 
                      href="#videos"
                      icon={<FiVideo />}
                      bg="rgba(4, 13, 24, 0.9)"
                      _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                    >
                      {t('menu.videos')}
                    </MenuItem>
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton
                    as={Button}
                    w="full"
                    colorScheme="blue"
                    variant="outline"
                    rightIcon={<FiChevronDown />}
                    leftIcon={<FiFileText />}
                    _hover={{ transform: 'translateY(-2px)' }}
                  >
                    {t('sidebar.barbosDocs')}
                  </MenuButton>
                  <MenuList bg="rgba(4, 13, 24, 0.9)" borderColor="rgba(74, 144, 226, 0.3)">
                    <MenuItem 
                      as={Link} 
                      href="https://docs.google.com/document/d/specifications"
                      icon={<FiFileText />}
                      bg="rgba(4, 13, 24, 0.9)"
                      _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                    >
                      {t('menu.techDocs')}
                    </MenuItem>
                    <MenuItem 
                      as={Link} 
                      href="#photos"
                      icon={<FiImage />}
                      bg="rgba(4, 13, 24, 0.9)"
                      _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                    >
                      {t('menu.photos')}
                    </MenuItem>
                    <MenuItem 
                      as={Link} 
                      href="#videos"
                      icon={<FiVideo />}
                      bg="rgba(4, 13, 24, 0.9)"
                      _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                    >
                      {t('menu.videos')}
                    </MenuItem>
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton
                    as={Button}
                    w="full"
                    colorScheme="blue"
                    variant="outline"
                    rightIcon={<FiChevronDown />}
                    leftIcon={<FiFileText />}
                    _hover={{ transform: 'translateY(-2px)' }}
                  >
                    {t('sidebar.kibecDocs')}
                  </MenuButton>
                  <MenuList bg="rgba(4, 13, 24, 0.9)" borderColor="rgba(74, 144, 226, 0.3)">
                    <MenuItem 
                      as={Link} 
                      href="https://docs.google.com/document/d/specifications"
                      icon={<FiFileText />}
                      bg="rgba(4, 13, 24, 0.9)"
                      _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                    >
                      {t('menu.techDocs')}
                    </MenuItem>
                    <MenuItem 
                      as={Link} 
                      href="#photos"
                      icon={<FiImage />}
                      bg="rgba(4, 13, 24, 0.9)"
                      _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                    >
                      {t('menu.photos')}
                    </MenuItem>
                    <MenuItem 
                      as={Link} 
                      href="#videos"
                      icon={<FiVideo />}
                      bg="rgba(4, 13, 24, 0.9)"
                      _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                    >
                      {t('menu.videos')}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </VStack>
              
              <Divider borderColor="rgba(74, 144, 226, 0.3)" />
              
              <Box w="full">
                <Text color="yellow.400" fontWeight="bold" fontSize="sm" mb={3}>{t('sidebar.commandCenter')}</Text>
                <Text fontSize="sm">{t('sidebar.locationValue')}</Text>
                <Text fontSize="sm">+380 (73) 345-88-50 <br/> +380 (97) 329-54-57 </Text>
                <Text fontSize="sm">airblock345@gmail.com</Text>
              </Box>
            </VStack>
          </MotionBox> */}
          
          {/* Main Content Area */}
          <MotionFlex 
            flex={1} 
            direction="column" 
            variants={fadeInFromRight}
            initial="hidden"
            animate="visible"
            // mr={{ base: 4, lg: 8 }}
          >
            {/* Top banner */}
            <Box 
              position="relative"
              width="100vw"
              height="70vh"
              left="50%"
              right="50%"
              marginLeft="-50vw"
              marginRight="-50vw"
              overflow="hidden"
              display="flex"
              alignItems="start"
              justifyContent="center"
              mb={6}
            >
              {/* Background Image with Overlay */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                backgroundImage={`url(${picture4})`}
                backgroundSize="cover"
                backgroundPosition="center"
                _before={{
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  background: "linear-gradient(to bottom, rgba(4, 13, 24, 0) 0%, rgba(4, 13, 24, 0.95) 100%)",
                  zIndex: 0
                }}
                _after={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bg: "rgba(0, 0, 0, 0.2)",
                }}
              />

              {/* Content */}
              <VStack
                spacing={8}
                maxW="1200px"
                px={4}
                position="relative"
                zIndex={1}
                textAlign="center"
                pt="100px"
              >
                <Heading 
                  fontSize={{ base: "28px", sm: "32px", md: "45px" }}
                  color="white"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  fontFamily="mono"
                  lineHeight="1.2"
                  opacity={0.7}
                  maxW={{ base: "90%", md: "100%" }}
                  mx="auto"
                >
                  {t('header.description')}
                </Heading>
              </VStack>
            </Box>

            {/* Menu Buttons Section */}
            <Flex 
              direction={{ base: "column", md: "row" }}
              gap={6}
              mb={8}
              mx="auto"
              maxW="1200px"
              px={4}
              justify="center"
              align="stretch"
            >
              <Menu>
                <MenuButton
                  as={Button}
                  w={{ base: "full", md: "250px" }}
                  bg="rgb(0 0 0 / 60%)"
                  border="1px solid"
                  borderColor="rgba(74, 144, 226, 0.3)"
                  borderRadius="md"
                  rightIcon={<Icon as={FiChevronDown} color="yellow.400" />}
                  leftIcon={<Icon as={FiCompass} color="yellow.400" />}
                  _hover={{ 
                    transform: 'translateY(-2px)',
                    bg: "rgba(4, 13, 24, 0.8)"
                  }}
                  size="lg"
                  py={6}
                >
                  {t('sidebar.krokDocs')}
                </MenuButton>
                <MenuList bg="rgba(4, 13, 24, 0.9)" borderColor="rgba(74, 144, 226, 0.3)">
                  <MenuItem 
                    as={Link} 
                    href="https://drive.google.com/drive/folders/1C9bEX-xZiTUBX7QimKz8QrbXE5kNNmvn?usp=drive_link"
                    icon={<FiFileText />}
                    bg="rgba(4, 13, 24, 0.9)"
                    _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                  >
                    {t('menu.techDocs')}
                  </MenuItem>
                  <MenuItem 
                    as={Link} 
                    href="https://drive.google.com/drive/folders/1SFArsn5FP83wmTG-FNUgeRGNQPyYvj_x?usp=drive_link"
                    icon={<FiImage />}
                    bg="rgba(4, 13, 24, 0.9)"
                    _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                  >
                    {t('menu.photos')}
                  </MenuItem>
                  <MenuItem 
                    as={Link} 
                    href="https://drive.google.com/drive/folders/1Ix1gmlJOyextYtYFVMojbrrlj2j_FhtC?usp=drive_link"
                    icon={<FiVideo />}
                    bg="rgba(4, 13, 24, 0.9)"
                    _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                  >
                    {t('menu.videos')}
                  </MenuItem>
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton
                  as={Button}
                  w={{ base: "full", md: "250px" }}
                  bg="rgb(0 0 0 / 60%)"
                  border="1px solid"
                  borderColor="rgba(74, 144, 226, 0.3)"
                  borderRadius="md"
                  rightIcon={<Icon as={FiChevronDown} color="yellow.400" />}
                  leftIcon={<Icon as={FiTarget} color="yellow.400" />}
                  _hover={{ 
                    transform: 'translateY(-2px)',
                    bg: "rgba(4, 13, 24, 0.8)"
                  }}
                  size="lg"
                  py={6}
                >
                  {t('sidebar.kortyDocs')}
                </MenuButton>
                <MenuList bg="rgba(4, 13, 24, 0.9)" borderColor="rgba(74, 144, 226, 0.3)">
                  <MenuItem 
                    as={Link} 
                    href="https://docs.google.com/document/d/specifications"
                    icon={<FiFileText />}
                    bg="rgba(4, 13, 24, 0.9)"
                    _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                  >
                    {t('menu.techDocs')}
                  </MenuItem>
                  <MenuItem 
                    as={Link} 
                    href="#photos"
                    icon={<FiImage />}
                    bg="rgba(4, 13, 24, 0.9)"
                    _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                  >
                    {t('menu.photos')}
                  </MenuItem>
                  <MenuItem 
                    as={Link} 
                    href="#videos"
                    icon={<FiVideo />}
                    bg="rgba(4, 13, 24, 0.9)"
                    _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                  >
                    {t('menu.videos')}
                  </MenuItem>
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton
                  as={Button}
                  w={{ base: "full", md: "250px" }}
                  bg="rgb(0 0 0 / 60%)"
                  border="1px solid"
                  borderColor="rgba(74, 144, 226, 0.3)"
                  borderRadius="md"
                  rightIcon={<Icon as={FiChevronDown} color="yellow.400" />}
                  leftIcon={<Icon as={FiCrosshair} color="yellow.400" />}
                  _hover={{ 
                    transform: 'translateY(-2px)',
                    bg: "rgba(4, 13, 24, 0.8)"
                  }}
                  size="lg"
                  py={6}
                >
                  {t('sidebar.barbosDocs')}
                </MenuButton>
                <MenuList bg="rgba(4, 13, 24, 0.9)" borderColor="rgba(74, 144, 226, 0.3)">
                  <MenuItem 
                    as={Link} 
                    href="https://docs.google.com/document/d/specifications"
                    icon={<FiFileText />}
                    bg="rgba(4, 13, 24, 0.9)"
                    _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                  >
                    {t('menu.techDocs')}
                  </MenuItem>
                  <MenuItem 
                    as={Link} 
                    href="#photos"
                    icon={<FiImage />}
                    bg="rgba(4, 13, 24, 0.9)"
                    _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                  >
                    {t('menu.photos')}
                  </MenuItem>
                  <MenuItem 
                    as={Link} 
                    href="#videos"
                    icon={<FiVideo />}
                    bg="rgba(4, 13, 24, 0.9)"
                    _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                  >
                    {t('menu.videos')}
                  </MenuItem>
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton
                  as={Button}
                  w={{ base: "full", md: "250px" }}
                  bg="rgb(0 0 0 / 60%)"
                  border="1px solid"
                  borderColor="rgba(74, 144, 226, 0.3)"
                  borderRadius="md"
                  rightIcon={<Icon as={FiChevronDown} color="yellow.400" />}
                  leftIcon={<Icon as={FiNavigation2} color="yellow.400" />}
                  _hover={{ 
                    transform: 'translateY(-2px)',
                    bg: "rgba(4, 13, 24, 0.8)"
                  }}
                  size="lg"
                  py={6}
                >
                  {t('sidebar.kibecDocs')}
                </MenuButton>
                <MenuList bg="rgba(4, 13, 24, 0.9)" borderColor="rgba(74, 144, 226, 0.3)">
                  <MenuItem 
                    as={Link} 
                    href="https://docs.google.com/document/d/specifications"
                    icon={<FiFileText />}
                    bg="rgba(4, 13, 24, 0.9)"
                    _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                  >
                    {t('menu.techDocs')}
                  </MenuItem>
                  <MenuItem 
                    as={Link} 
                    href="#photos"
                    icon={<FiImage />}
                    bg="rgba(4, 13, 24, 0.9)"
                    _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                  >
                    {t('menu.photos')}
                  </MenuItem>
                  <MenuItem 
                    as={Link} 
                    href="#videos"
                    icon={<FiVideo />}
                    bg="rgba(4, 13, 24, 0.9)"
                    _hover={{ bg: "rgba(74, 144, 226, 0.2)" }}
                  >
                    {t('menu.videos')}
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            {/* Specs grid */}
            <SimpleGrid 
              columns={{ base: 1, md: 2 }} 
              spacing={6} 
              mb={8}
              mx="auto"
              maxW="1200px"
              px={4}
            >
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
                  //width='42vw'
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
              {/* Footer */}
      <Box 
        as="footer"
        width="100%"
        bg="rgba(4, 13, 24, 0.9)"
        borderTop="1px solid"
        borderColor="rgba(74, 144, 226, 0.3)"
        mt="auto"
        py={8}
      >
        <Container maxW="1200px">
          <Flex 
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "center", md: "start" }}
            textAlign={{ base: "center", md: "left" }}
            gap={6}
          >
            <Box>
              <Text fontSize="sm" color="yellow.400">{t('sidebar.locationValue')}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="yellow.400">airblock345@gmail.com</Text>
            </Box>
          </Flex>
        </Container>
      </Box>
      </Container>
    </Box>
  );
}; 