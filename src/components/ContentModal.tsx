import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Image,
  Box,
  Text,
  Spinner,
  Center,
  AspectRatio,
  IconButton,
  VStack,
  Icon,
  useBreakpointValue,
  Flex,
  Button,
  Link
} from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiX, FiFileText, FiImage, FiVideo, FiExternalLink, FiDownload } from 'react-icons/fi';
import { useDroneContent } from '../hooks/useFirebaseContent';
import type { ContentItem } from '../hooks/useFirebaseContent';
import { useLang } from './landing/LangContext';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  droneId: string;
  droneName: string;
  droneNameUk: string;
  initialTab?: 'specifications' | 'photos' | 'videos';
}

export const ContentModal = ({
  isOpen,
  onClose,
  droneId,
  droneName,
  droneNameUk,
  initialTab = 'photos'
}: ContentModalProps) => {
  const { language, t } = useLang();
  const { content, loading, error } = useDroneContent(droneId);
  const [selectedImage, setSelectedImage] = useState<ContentItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Responsive values
  const modalSize = useBreakpointValue({ base: 'full', md: '6xl' });
  const showTabText = useBreakpointValue({ base: false, sm: true });
  const tabFontSize = useBreakpointValue({ base: 'xs', sm: 'sm', md: 'md' });
  const headerFontSize = useBreakpointValue({ base: 'md', md: 'xl' });
  const lightboxButtonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Filter content by type
  const photos = content.filter(item => item.type === 'photo');
  const videos = content.filter(item => item.type === 'video');
  const specifications = content.filter(item => item.type === 'specification');

  // Get initial tab index
  const getInitialTabIndex = () => {
    switch (initialTab) {
      case 'specifications': return 0;
      case 'photos': return 1;
      case 'videos': return 2;
      default: return 1;
    }
  };

  const [tabIndex, setTabIndex] = useState(getInitialTabIndex());

  useEffect(() => {
    setTabIndex(getInitialTabIndex());
  }, [initialTab]);

  // Lightbox navigation
  const openLightbox = (item: ContentItem, index: number) => {
    setSelectedImage(item);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (currentImageIndex < photos.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
      setSelectedImage(photos[currentImageIndex + 1]);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
      setSelectedImage(photos[currentImageIndex - 1]);
    }
  };

  // Swipe handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentImageIndex < photos.length - 1) {
      nextImage();
    }
    if (isRightSwipe && currentImageIndex > 0) {
      prevImage();
    }
  };

  const displayName = language === 'uk' ? droneNameUk : droneName;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={modalSize}
        scrollBehavior="inside"
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(10px)" />
        <ModalContent
          bg="rgba(4, 13, 24, 0.98)"
          border={{ base: 'none', md: '1px solid' }}
          borderColor="rgba(74, 144, 226, 0.3)"
          h={{ base: '100vh', md: '100%' }}
          maxH={{ base: '100vh', md: '90vh' }}
          minH={{ base: '100vh', md: 'auto' }}
          m={{ base: 0, md: 4 }}
          borderRadius={{ base: 0, md: 'md' }}
          display="flex"
          flexDirection="column"
        >
          <ModalHeader
            color="yellow.400"
            fontFamily="mono"
            fontSize={headerFontSize}
            borderBottom="1px solid"
            borderColor="rgba(74, 144, 226, 0.3)"
            py={{ base: 3, md: 4 }}
            px={{ base: 4, md: 6 }}
          >
            {displayName}
          </ModalHeader>
          <ModalCloseButton
            color="gray.400"
            size={{ base: 'md', md: 'lg' }}
            top={{ base: 2, md: 3 }}
            right={{ base: 2, md: 3 }}
          />

          <ModalBody
            pb={{ base: 0, md: 6 }}
            px={{ base: 2, sm: 4, md: 6 }}
            flex={1}
            display="flex"
            flexDirection="column"
            overflow="hidden"
          >
            {loading ? (
              <Center py={20} flex={1}>
                <Spinner size="xl" color="yellow.400" />
              </Center>
            ) : error ? (
              <Center py={20} flex={1}>
                <Text color="red.400">{error}</Text>
              </Center>
            ) : (
              <Tabs
                index={tabIndex}
                onChange={setTabIndex}
                colorScheme="yellow"
                variant="enclosed"
                isFitted={!showTabText}
                display="flex"
                flexDirection="column"
                flex={1}
                overflow="hidden"
              >
                <TabList
                  borderColor="rgba(74, 144, 226, 0.3)"
                  flexWrap={{ base: 'nowrap', md: 'nowrap' }}
                  overflowX={{ base: 'auto', md: 'visible' }}
                  css={{
                    '&::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: 'none'
                  }}
                >
                  <Tab
                    _selected={{ color: 'yellow.400', borderColor: 'yellow.400', borderBottomColor: 'transparent' }}
                    color="gray.400"
                    fontSize={tabFontSize}
                    px={{ base: 2, sm: 3, md: 4 }}
                    py={{ base: 2, md: 3 }}
                    minW={{ base: 'auto', md: 'auto' }}
                    flex={{ base: 1, md: 'none' }}
                  >
                    <Icon as={FiFileText} mr={{ base: 0, sm: 2 }} boxSize={{ base: 4, md: 5 }} />
                    {showTabText && t('menu.techDocs')}
                  </Tab>
                  <Tab
                    _selected={{ color: 'yellow.400', borderColor: 'yellow.400', borderBottomColor: 'transparent' }}
                    color="gray.400"
                    fontSize={tabFontSize}
                    px={{ base: 2, sm: 3, md: 4 }}
                    py={{ base: 2, md: 3 }}
                    minW={{ base: 'auto', md: 'auto' }}
                    flex={{ base: 1, md: 'none' }}
                  >
                    <Icon as={FiImage} mr={{ base: 0, sm: 2 }} boxSize={{ base: 4, md: 5 }} />
                    {showTabText ? `${t('menu.photos')} (${photos.length})` : photos.length}
                  </Tab>
                  <Tab
                    _selected={{ color: 'yellow.400', borderColor: 'yellow.400', borderBottomColor: 'transparent' }}
                    color="gray.400"
                    fontSize={tabFontSize}
                    px={{ base: 2, sm: 3, md: 4 }}
                    py={{ base: 2, md: 3 }}
                    minW={{ base: 'auto', md: 'auto' }}
                    flex={{ base: 1, md: 'none' }}
                  >
                    <Icon as={FiVideo} mr={{ base: 0, sm: 2 }} boxSize={{ base: 4, md: 5 }} />
                    {showTabText ? `${t('menu.videos')} (${videos.length})` : videos.length}
                  </Tab>
                </TabList>

                <TabPanels flex={1} overflow="auto" display="flex" flexDirection="column">
                  {/* Specifications Tab */}
                  <TabPanel
                    px={{ base: 0, md: 2 }}
                    flex={1}
                    overflow="hidden"
                    pb={{ base: 0, md: 2 }}
                    display="flex"
                    flexDirection="column"
                  >
                    {specifications.length === 0 ? (
                      <Center py={10} flex={1}>
                        <Text color="gray.500" textAlign="center">
                          {language === 'uk' ? 'Специфікації незабаром' : 'Specifications coming soon'}
                        </Text>
                      </Center>
                    ) : (
                      <Box
                        flex={1}
                        display="flex"
                        flexDirection="column"
                        overflow="hidden"
                      >
                        {specifications.map((spec, index) => (
                          <Box
                            key={spec.id}
                            flex={1}
                            display="flex"
                            flexDirection="column"
                            bg="rgba(74, 144, 226, 0.1)"
                            borderRadius="md"
                            border="1px solid"
                            borderColor="rgba(74, 144, 226, 0.2)"
                            overflow="hidden"
                            mb={index < specifications.length - 1 ? 4 : 0}
                          >
                            {(spec.title || spec.description) && (
                              <Box p={{ base: 2, md: 3 }} flexShrink={0}>
                                {spec.title && (
                                  <Text
                                    fontWeight="bold"
                                    color="yellow.400"
                                    fontSize={{ base: 'sm', md: 'md' }}
                                  >
                                    {language === 'uk' ? spec.titleUk : spec.title}
                                  </Text>
                                )}
                                {spec.description && (
                                  <Text
                                    color="gray.300"
                                    whiteSpace="pre-wrap"
                                    fontSize={{ base: 'xs', md: 'sm' }}
                                    mt={1}
                                  >
                                    {language === 'uk' ? spec.descriptionUk : spec.description}
                                  </Text>
                                )}
                              </Box>
                            )}
                            {spec.fileUrl && (
                              <Box flex={1} minH="0" display="flex" flexDirection="column">
                                {isMobile ? (
                                  /* Mobile: Show buttons to view/download PDF */
                                  <Center flex={1} flexDirection="column" gap={4} p={4}>
                                    <Icon as={FiFileText} boxSize={16} color="yellow.400" opacity={0.5} />
                                    <Text color="gray.400" textAlign="center" fontSize="sm">
                                      {language === 'uk'
                                        ? 'PDF документ недоступний для перегляду на мобільному'
                                        : 'PDF preview not available on mobile'}
                                    </Text>
                                    <VStack spacing={3} w="full" maxW="280px">
                                      <Button
                                        as={Link}
                                        href={`https://docs.google.com/viewer?url=${encodeURIComponent(spec.fileUrl)}&embedded=true`}
                                        isExternal
                                        colorScheme="yellow"
                                        size="lg"
                                        w="full"
                                        leftIcon={<FiExternalLink />}
                                      >
                                        {language === 'uk' ? 'Відкрити PDF' : 'View PDF'}
                                      </Button>
                                      <Button
                                        as={Link}
                                        href={spec.fileUrl}
                                        isExternal
                                        download
                                        variant="outline"
                                        colorScheme="yellow"
                                        size="md"
                                        w="full"
                                        leftIcon={<FiDownload />}
                                      >
                                        {language === 'uk' ? 'Завантажити' : 'Download'}
                                      </Button>
                                    </VStack>
                                  </Center>
                                ) : (
                                  /* Desktop: Show embedded iframe */
                                  <iframe
                                    src={spec.fileUrl}
                                    title={spec.title}
                                    style={{
                                      border: 'none',
                                      width: '100%',
                                      height: '100%',
                                      flex: 1
                                    }}
                                  />
                                )}
                              </Box>
                            )}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </TabPanel>

                  {/* Photos Tab */}
                  <TabPanel px={{ base: 0, md: 2 }} flex={1} overflow="auto" pb={{ base: 4, md: 2 }}>
                    {photos.length === 0 ? (
                      <Center py={10}>
                        <Text color="gray.500" textAlign="center">
                          {language === 'uk' ? 'Фото незабаром' : 'Photos coming soon'}
                        </Text>
                      </Center>
                    ) : (
                      <SimpleGrid
                        columns={{ base: 2, sm: 2, md: 3, lg: 4 }}
                        spacing={{ base: 2, sm: 3, md: 4 }}
                      >
                        {photos.map((photo, index) => (
                          <Box
                            key={photo.id}
                            cursor="pointer"
                            onClick={() => openLightbox(photo, index)}
                            borderRadius="md"
                            overflow="hidden"
                            border="1px solid"
                            borderColor="rgba(74, 144, 226, 0.2)"
                            transition="all 0.2s"
                            _hover={{
                              transform: { base: 'none', md: 'scale(1.02)' },
                              borderColor: 'yellow.400'
                            }}
                            _active={{
                              transform: 'scale(0.98)'
                            }}
                          >
                            <AspectRatio ratio={4/3}>
                              <Image
                                src={photo.fileUrl}
                                alt={photo.title}
                                objectFit="cover"
                                loading="lazy"
                              />
                            </AspectRatio>
                            {photo.title && (
                              <Text
                                p={{ base: 1.5, md: 2 }}
                                fontSize={{ base: 'xs', md: 'sm' }}
                                color="gray.400"
                                noOfLines={1}
                              >
                                {language === 'uk' ? photo.titleUk : photo.title}
                              </Text>
                            )}
                          </Box>
                        ))}
                      </SimpleGrid>
                    )}
                  </TabPanel>

                  {/* Videos Tab */}
                  <TabPanel px={{ base: 0, md: 2 }} flex={1} overflow="auto" pb={{ base: 4, md: 2 }}>
                    {videos.length === 0 ? (
                      <Center py={10}>
                        <Text color="gray.500" textAlign="center">
                          {language === 'uk' ? 'Відео незабаром' : 'Videos coming soon'}
                        </Text>
                      </Center>
                    ) : (
                      <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                        {videos.map((video) => (
                          <Box
                            key={video.id}
                            borderRadius="md"
                            overflow="hidden"
                            border="1px solid"
                            borderColor="rgba(74, 144, 226, 0.2)"
                          >
                            <AspectRatio ratio={16/9}>
                              <video
                                src={video.fileUrl}
                                controls
                                playsInline
                                poster={video.thumbnailUrl}
                                style={{ backgroundColor: '#000' }}
                              />
                            </AspectRatio>
                            {video.title && (
                              <Box p={{ base: 2, md: 3 }} bg="rgba(74, 144, 226, 0.1)">
                                <Text
                                  fontWeight="bold"
                                  color="gray.200"
                                  fontSize={{ base: 'sm', md: 'md' }}
                                >
                                  {language === 'uk' ? video.titleUk : video.title}
                                </Text>
                                {video.description && (
                                  <Text
                                    fontSize={{ base: 'xs', md: 'sm' }}
                                    color="gray.400"
                                    mt={1}
                                  >
                                    {language === 'uk' ? video.descriptionUk : video.description}
                                  </Text>
                                )}
                              </Box>
                            )}
                          </Box>
                        ))}
                      </VStack>
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Lightbox for full-screen image viewing */}
      {selectedImage && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.98)"
          zIndex={2000}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Close button */}
          <IconButton
            aria-label="Close"
            icon={<FiX size={24} />}
            position="absolute"
            top={{ base: 2, md: 4 }}
            right={{ base: 2, md: 4 }}
            onClick={closeLightbox}
            colorScheme="whiteAlpha"
            size={lightboxButtonSize}
            borderRadius="full"
            zIndex={10}
          />

          {/* Previous button - hidden on mobile (use swipe) */}
          <IconButton
            aria-label="Previous"
            icon={<FiChevronLeft size={28} />}
            position="absolute"
            left={{ base: 1, md: 4 }}
            top="50%"
            transform="translateY(-50%)"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            colorScheme="whiteAlpha"
            size={lightboxButtonSize}
            borderRadius="full"
            isDisabled={currentImageIndex === 0}
            opacity={{ base: 0.6, md: 1 }}
            display={{ base: 'none', sm: 'flex' }}
          />

          {/* Image */}
          <Image
            src={selectedImage.fileUrl}
            alt={selectedImage.title}
            maxH={{ base: '85vh', md: '90vh' }}
            maxW={{ base: '100vw', md: '90vw' }}
            objectFit="contain"
            onClick={(e) => e.stopPropagation()}
            px={{ base: 2, md: 0 }}
          />

          {/* Next button - hidden on mobile (use swipe) */}
          <IconButton
            aria-label="Next"
            icon={<FiChevronRight size={28} />}
            position="absolute"
            right={{ base: 1, md: 4 }}
            top="50%"
            transform="translateY(-50%)"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            colorScheme="whiteAlpha"
            size={lightboxButtonSize}
            borderRadius="full"
            isDisabled={currentImageIndex === photos.length - 1}
            opacity={{ base: 0.6, md: 1 }}
            display={{ base: 'none', sm: 'flex' }}
          />

          {/* Image counter and swipe hint */}
          <Flex
            position="absolute"
            bottom={{ base: 6, md: 4 }}
            left="50%"
            transform="translateX(-50%)"
            direction="column"
            align="center"
            gap={1}
          >
            <Text color="white" fontSize={{ base: 'sm', md: 'md' }} fontWeight="medium">
              {currentImageIndex + 1} / {photos.length}
            </Text>
            <Text
              color="gray.500"
              fontSize="xs"
              display={{ base: 'block', sm: 'none' }}
            >
              {language === 'uk' ? 'Свайп для навігації' : 'Swipe to navigate'}
            </Text>
          </Flex>
        </Box>
      )}
    </>
  );
};
