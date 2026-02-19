import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Flex,
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Image,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Spinner,
  Center,
  AspectRatio,
  Icon,
  useBreakpointValue,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { FiLogOut, FiPlus, FiEdit2, FiTrash2, FiMoreVertical, FiImage, FiVideo, FiFileText } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { 
  useDroneContent, 
  addContentItem, 
  updateContentItem, 
  deleteContentItem,
  uploadFile,
  deleteFile
} from '../../hooks/useFirebaseContent';
import type { ContentItem } from '../../hooks/useFirebaseContent';

// Drone models configuration
const droneModels = [
  { id: 'krok', name: 'KROK', nameUk: 'КРОК' },
  { id: 'kortyk', name: 'KORTYK', nameUk: 'КОРТИК' },
  { id: 'garpun', name: 'GARPUN', nameUk: 'ГАРПУН' },
  { id: 'kibec', name: 'KIBEC', nameUk: 'КІБЕЦЬ' }
];

export const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [selectedDrone, setSelectedDrone] = useState(droneModels[0]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });
  const modalSize = useBreakpointValue({ base: 'full', md: 'xl' });
  const showTabText = useBreakpointValue({ base: false, sm: true });
  const headerSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    titleUk: '',
    description: '',
    descriptionUk: '',
    type: 'photo' as 'photo' | 'video' | 'specification',
    file: null as File | null
  });

  const { content, loading, refetch } = useDroneContent(selectedDrone.id);

  // Filter content by type
  const photos = content.filter(item => item.type === 'photo');
  const videos = content.filter(item => item.type === 'video');
  const specifications = content.filter(item => item.type === 'specification');

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const openAddModal = (type: 'photo' | 'video' | 'specification') => {
    setEditingItem(null);
    setFormData({
      title: '',
      titleUk: '',
      description: '',
      descriptionUk: '',
      type,
      file: null
    });
    onOpen();
  };

  const openEditModal = (item: ContentItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      titleUk: item.titleUk,
      description: item.description || '',
      descriptionUk: item.descriptionUk || '',
      type: item.type,
      file: null
    });
    onOpen();
  };

  const handleDelete = async (item: ContentItem) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      // Delete file from storage
      if (item.fileUrl) {
        await deleteFile(item.fileUrl);
      }
      // Delete document
      await deleteContentItem(item.id);
      toast({
        title: 'Item deleted',
        status: 'success',
        duration: 3000
      });
      refetch();
    } catch (error) {
      toast({
        title: 'Error deleting item',
        status: 'error',
        duration: 3000
      });
    }
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      toast({
        title: 'Title is required',
        status: 'warning',
        duration: 3000
      });
      return;
    }

    setIsUploading(true);

    try {
      let fileUrl = editingItem?.fileUrl || '';

      // Upload new file if provided
      if (formData.file) {
        const path = `${selectedDrone.id}/${formData.type}s/${Date.now()}_${formData.file.name}`;
        fileUrl = await uploadFile(formData.file, path);
      }

      if (editingItem) {
        // Update existing item
        await updateContentItem(editingItem.id, {
          title: formData.title,
          titleUk: formData.titleUk,
          description: formData.description,
          descriptionUk: formData.descriptionUk,
          ...(fileUrl && { fileUrl })
        });
        toast({
          title: 'Item updated',
          status: 'success',
          duration: 3000
        });
      } else {
        // Add new item
        const maxOrder = content
          .filter(c => c.type === formData.type)
          .reduce((max, c) => Math.max(max, c.order), 0);

        await addContentItem({
          droneId: selectedDrone.id,
          type: formData.type,
          title: formData.title,
          titleUk: formData.titleUk || formData.title,
          description: formData.description,
          descriptionUk: formData.descriptionUk,
          fileUrl,
          order: maxOrder + 1
        });
        toast({
          title: 'Item added',
          status: 'success',
          duration: 3000
        });
      }

      onClose();
      refetch();
    } catch (error) {
      toast({
        title: 'Error saving item',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000
      });
    } finally {
      setIsUploading(false);
    }
  };

  const ContentCard = ({ item }: { item: ContentItem }) => (
    <Box
      bg="rgba(74, 144, 226, 0.1)"
      borderRadius="md"
      border="1px solid"
      borderColor="rgba(74, 144, 226, 0.2)"
      overflow="hidden"
    >
      {item.type === 'photo' && item.fileUrl && (
        <AspectRatio ratio={16/9}>
          <Image src={item.fileUrl} alt={item.title} objectFit="cover" loading="lazy" />
        </AspectRatio>
      )}
      {item.type === 'video' && item.fileUrl && (
        <AspectRatio ratio={16/9}>
          <video src={item.fileUrl} style={{ objectFit: 'cover' }} />
        </AspectRatio>
      )}
      {item.type === 'specification' && (
        <Box 
          h={{ base: '80px', md: '100px' }} 
          bg="rgba(0,0,0,0.3)" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
        >
          <Icon as={FiFileText} boxSize={{ base: 8, md: 10 }} color="yellow.400" />
        </Box>
      )}
      
      <Flex p={{ base: 2, md: 3 }} justify="space-between" align="center">
        <Box flex={1} minW={0}>
          <Text 
            fontWeight="bold" 
            color="gray.200" 
            noOfLines={1}
            fontSize={{ base: 'sm', md: 'md' }}
          >
            {item.title}
          </Text>
          <Text 
            fontSize={{ base: 'xs', md: 'sm' }} 
            color="gray.500" 
            noOfLines={1}
          >
            {item.titleUk}
          </Text>
        </Box>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FiMoreVertical />}
            variant="ghost"
            size="sm"
            color="gray.400"
            ml={2}
          />
          <MenuList bg="rgba(4, 13, 24, 0.95)" borderColor="rgba(74, 144, 226, 0.3)">
            <MenuItem
              icon={<FiEdit2 />}
              onClick={() => openEditModal(item)}
              bg="transparent"
              _hover={{ bg: 'rgba(74, 144, 226, 0.2)' }}
            >
              Edit
            </MenuItem>
            <MenuItem
              icon={<FiTrash2 />}
              onClick={() => handleDelete(item)}
              bg="transparent"
              _hover={{ bg: 'rgba(255, 0, 0, 0.2)' }}
              color="red.400"
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );

  return (
    <Box minH="100vh" bg="#040D18">
      {/* Header */}
      <Box
        bg="rgba(4, 13, 24, 0.95)"
        borderBottom="1px solid"
        borderColor="rgba(74, 144, 226, 0.3)"
        py={{ base: 3, md: 4 }}
        px={{ base: 3, md: 6 }}
        position="sticky"
        top={0}
        zIndex={100}
      >
        <Flex 
          justify="space-between" 
          align="center" 
          maxW="1400px" 
          mx="auto"
          gap={2}
        >
          <Heading 
            size={headerSize} 
            color="yellow.400" 
            fontFamily="mono"
            whiteSpace="nowrap"
          >
            ADMIN
          </Heading>
          <HStack spacing={{ base: 2, md: 4 }}>
            <Text 
              color="gray.400" 
              fontSize={{ base: 'xs', md: 'sm' }}
              display={{ base: 'none', sm: 'block' }}
              noOfLines={1}
              maxW={{ base: '100px', md: '200px' }}
            >
              {user?.email}
            </Text>
            <Button
              leftIcon={isMobile ? undefined : <FiLogOut />}
              variant="outline"
              colorScheme="yellow"
              size={buttonSize}
              onClick={handleSignOut}
            >
              {isMobile ? <FiLogOut /> : 'Sign Out'}
            </Button>
          </HStack>
        </Flex>
      </Box>

      {/* Main Content */}
      <Container maxW="1400px" py={{ base: 4, md: 8 }} px={{ base: 3, md: 6 }}>
        {/* Drone Selector */}
        <Wrap spacing={{ base: 2, md: 4 }} mb={{ base: 4, md: 8 }}>
          {droneModels.map((drone) => (
            <WrapItem key={drone.id}>
              <Button
                variant={selectedDrone.id === drone.id ? 'solid' : 'outline'}
                colorScheme="yellow"
                size={buttonSize}
                onClick={() => setSelectedDrone(drone)}
              >
                {drone.name}
              </Button>
            </WrapItem>
          ))}
        </Wrap>

        {/* Content Tabs */}
        <Tabs colorScheme="yellow" variant="enclosed" isFitted={isMobile}>
          <TabList 
            borderColor="rgba(74, 144, 226, 0.3)"
            overflowX={{ base: 'auto', md: 'visible' }}
            css={{
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none'
            }}
          >
            <Tab
              _selected={{ color: 'yellow.400', borderColor: 'yellow.400', borderBottomColor: 'transparent' }}
              color="gray.400"
              fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
              px={{ base: 2, md: 4 }}
              py={{ base: 2, md: 3 }}
            >
              <Icon as={FiImage} mr={{ base: 0, sm: 2 }} boxSize={{ base: 4, md: 5 }} />
              {showTabText ? `Photos (${photos.length})` : photos.length}
            </Tab>
            <Tab
              _selected={{ color: 'yellow.400', borderColor: 'yellow.400', borderBottomColor: 'transparent' }}
              color="gray.400"
              fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
              px={{ base: 2, md: 4 }}
              py={{ base: 2, md: 3 }}
            >
              <Icon as={FiVideo} mr={{ base: 0, sm: 2 }} boxSize={{ base: 4, md: 5 }} />
              {showTabText ? `Videos (${videos.length})` : videos.length}
            </Tab>
            <Tab
              _selected={{ color: 'yellow.400', borderColor: 'yellow.400', borderBottomColor: 'transparent' }}
              color="gray.400"
              fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
              px={{ base: 2, md: 4 }}
              py={{ base: 2, md: 3 }}
            >
              <Icon as={FiFileText} mr={{ base: 0, sm: 2 }} boxSize={{ base: 4, md: 5 }} />
              {showTabText ? `Specs (${specifications.length})` : specifications.length}
            </Tab>
          </TabList>

          <TabPanels>
            {/* Photos Tab */}
            <TabPanel px={0}>
              <Flex justify="flex-end" mb={4}>
                <Button
                  leftIcon={<FiPlus />}
                  colorScheme="yellow"
                  size={buttonSize}
                  onClick={() => openAddModal('photo')}
                >
                  {isMobile ? 'Add' : 'Add Photo'}
                </Button>
              </Flex>
              {loading ? (
                <Center py={10}>
                  <Spinner color="yellow.400" />
                </Center>
              ) : photos.length === 0 ? (
                <Center py={10}>
                  <Text color="gray.500">No photos yet</Text>
                </Center>
              ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 3, md: 4 }}>
                  {photos.map((item) => (
                    <ContentCard key={item.id} item={item} />
                  ))}
                </SimpleGrid>
              )}
            </TabPanel>

            {/* Videos Tab */}
            <TabPanel px={0}>
              <Flex justify="flex-end" mb={4}>
                <Button
                  leftIcon={<FiPlus />}
                  colorScheme="yellow"
                  size={buttonSize}
                  onClick={() => openAddModal('video')}
                >
                  {isMobile ? 'Add' : 'Add Video'}
                </Button>
              </Flex>
              {loading ? (
                <Center py={10}>
                  <Spinner color="yellow.400" />
                </Center>
              ) : videos.length === 0 ? (
                <Center py={10}>
                  <Text color="gray.500">No videos yet</Text>
                </Center>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 3, md: 4 }}>
                  {videos.map((item) => (
                    <ContentCard key={item.id} item={item} />
                  ))}
                </SimpleGrid>
              )}
            </TabPanel>

            {/* Specifications Tab */}
            <TabPanel px={0}>
              <Flex justify="flex-end" mb={4}>
                <Button
                  leftIcon={<FiPlus />}
                  colorScheme="yellow"
                  size={buttonSize}
                  onClick={() => openAddModal('specification')}
                >
                  {isMobile ? 'Add' : 'Add Spec'}
                </Button>
              </Flex>
              {loading ? (
                <Center py={10}>
                  <Spinner color="yellow.400" />
                </Center>
              ) : specifications.length === 0 ? (
                <Center py={10}>
                  <Text color="gray.500">No specifications yet</Text>
                </Center>
              ) : (
                <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                  {specifications.map((item) => (
                    <ContentCard key={item.id} item={item} />
                  ))}
                </VStack>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size={modalSize}
        scrollBehavior="inside"
      >
        <ModalOverlay bg="rgba(0, 0, 0, 0.8)" />
        <ModalContent 
          bg="rgba(4, 13, 24, 0.98)" 
          borderColor="rgba(74, 144, 226, 0.3)"
          m={{ base: 0, md: 4 }}
          borderRadius={{ base: 0, md: 'md' }}
          maxH={{ base: '100vh', md: '90vh' }}
        >
          <ModalHeader 
            color="yellow.400" 
            fontFamily="mono"
            fontSize={{ base: 'md', md: 'lg' }}
            py={{ base: 3, md: 4 }}
          >
            {editingItem ? 'Edit' : 'Add'} {formData.type}
          </ModalHeader>
          <ModalCloseButton color="gray.400" />
          
          <ModalBody px={{ base: 4, md: 6 }}>
            <VStack spacing={{ base: 3, md: 4 }}>
              <FormControl isRequired>
                <FormLabel color="gray.400" fontSize={{ base: 'sm', md: 'md' }}>
                  Title (English)
                </FormLabel>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  bg="rgba(0, 0, 0, 0.3)"
                  borderColor="rgba(74, 144, 226, 0.3)"
                  color="white"
                  fontSize={{ base: 'sm', md: 'md' }}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="gray.400" fontSize={{ base: 'sm', md: 'md' }}>
                  Title (Ukrainian)
                </FormLabel>
                <Input
                  value={formData.titleUk}
                  onChange={(e) => setFormData({ ...formData, titleUk: e.target.value })}
                  bg="rgba(0, 0, 0, 0.3)"
                  borderColor="rgba(74, 144, 226, 0.3)"
                  color="white"
                  fontSize={{ base: 'sm', md: 'md' }}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="gray.400" fontSize={{ base: 'sm', md: 'md' }}>
                  Description (English)
                </FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  bg="rgba(0, 0, 0, 0.3)"
                  borderColor="rgba(74, 144, 226, 0.3)"
                  color="white"
                  fontSize={{ base: 'sm', md: 'md' }}
                  rows={3}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="gray.400" fontSize={{ base: 'sm', md: 'md' }}>
                  Description (Ukrainian)
                </FormLabel>
                <Textarea
                  value={formData.descriptionUk}
                  onChange={(e) => setFormData({ ...formData, descriptionUk: e.target.value })}
                  bg="rgba(0, 0, 0, 0.3)"
                  borderColor="rgba(74, 144, 226, 0.3)"
                  color="white"
                  fontSize={{ base: 'sm', md: 'md' }}
                  rows={3}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="gray.400" fontSize={{ base: 'sm', md: 'md' }}>
                  {editingItem ? 'Replace File (optional)' : 'Upload File'}
                </FormLabel>
                <Input
                  type="file"
                  accept={
                    formData.type === 'photo' ? 'image/*' :
                    formData.type === 'video' ? 'video/*' :
                    '.pdf,.doc,.docx'
                  }
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    file: e.target.files?.[0] || null 
                  })}
                  bg="rgba(0, 0, 0, 0.3)"
                  borderColor="rgba(74, 144, 226, 0.3)"
                  color="white"
                  pt={1}
                  fontSize={{ base: 'sm', md: 'md' }}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter 
            px={{ base: 4, md: 6 }} 
            py={{ base: 3, md: 4 }}
            gap={2}
          >
            <Button 
              variant="ghost" 
              onClick={onClose} 
              color="gray.400"
              size={buttonSize}
            >
              Cancel
            </Button>
            <Button
              colorScheme="yellow"
              onClick={handleSubmit}
              isLoading={isUploading}
              loadingText="Uploading..."
              size={buttonSize}
            >
              {editingItem ? 'Save' : 'Add'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
