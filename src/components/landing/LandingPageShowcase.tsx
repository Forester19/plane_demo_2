import { Box } from '@chakra-ui/react';
import { LandingPage3 } from './LandingPage3';

export const LandingPageShowcase = () => {
  return (
    <Box overflowY='scroll' maxH="100vh" minH="100vh" bg="#030612">
      <LandingPage3/>
    </Box>
  );
};