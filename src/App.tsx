import { theme } from './theme';
import { LandingPageShowcase } from './components/landing/LandingPageShowcase';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LandingPageShowcase />
    </ChakraProvider>
  );
}

export default App;
