import { Box, VStack, Image, Text, Heading } from '@chakra-ui/react';

export const Header = () => {
  return (
    <VStack spacing={{ base: 4, md: 6 }} align="center" py={{ base: 4, md: 8 }}>
      <Box
        bg="white"
        p={{ base: 3, md: 4 }}
        borderRadius="full"
        boxShadow="lg"
        _hover={{ transform: 'scale(1.05)' }}
        transition="all 0.2s"
      >
        <Image
          src="./logo.svg"
          alt="OUR AWESOME PLANE Logo"
          boxSize={{ base: "60px", md: "80px" }}
        />
      </Box>
      <VStack spacing={{ base: 1, md: 2 }}>
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="bold"
          textAlign="center"
          bgGradient="linear(to-r, brand.accent, brand.accent2)"
          bgClip="text"
          lineHeight={{ base: "1.2", md: "1.4" }}
        >
          OUR AWESOME PLANE
        </Heading>
        <Text
          fontSize={{ base: "md", md: "xl" }}
          color="gray.300"
          textAlign="center"
        >
          LAST MILE TARGETING
        </Text>
      </VStack>
    </VStack>
  );
}; 