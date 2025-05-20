import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    primary: '#1E2A3B',
    secondary: '#2D3748',
    accent: '#4A90E2',
    accent2: '#2C5282',
  },
};

const styles = {
  global: {
    'html, body': {
      margin: 0,
      padding: 0,
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      background: '#151E2C',
      color: 'white',
    },
    '#root': {
      height: '100vh',
      width: '100vw',
    },
  },
};

export const theme = extendTheme({
  colors,
  styles,
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'xl',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        letterSpacing: '0.5px',
        _before: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(74,144,226,0.15), rgba(44,82,130,0.15))',
          opacity: 1,
          transition: 'opacity 0.3s ease',
        },
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 20px rgba(74,144,226,0.25)',
          _before: {
            opacity: 0.8,
          },
        },
        _active: {
          transform: 'translateY(1px)',
        },
      },
      variants: {
        solid: {
          bg: 'rgba(45,55,72,0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(74,144,226,0.3)',
          boxShadow: '0 4px 15px rgba(74,144,226,0.15), inset 0 0 0 1px rgba(255,255,255,0.1)',
          textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          color: 'rgba(255,255,255,0.95)',
          _hover: {
            bg: 'rgba(55,65,82,0.98)',
            border: '1px solid rgba(74,144,226,0.5)',
            boxShadow: '0 8px 25px rgba(74,144,226,0.2), inset 0 0 0 1px rgba(255,255,255,0.2)',
            color: 'white',
          },
        },
      },
      defaultProps: {
        size: 'lg',
      },
    },
  },
}); 