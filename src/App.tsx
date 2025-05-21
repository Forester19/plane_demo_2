import { theme } from './theme';
import { LandingPageShowcase } from './components/landing/LandingPageShowcase';
import { ChakraProvider } from '@chakra-ui/react';
import { LangProvider } from './components/landing/LangContext';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LangProvider>
        <LandingPageShowcase />
      </LangProvider>
    </ChakraProvider>
  );
}

export default App;
