import { Flex, Box, useColorModeValue } from '@chakra-ui/react';
import { useLang } from './LangContext';

// Flag emojis
const UA_FLAG = "🇺🇦";
const UK_FLAG = "🇬🇧";

export const LanguageSwitch = () => {
  const { language, setLanguage } = useLang();
  
  const bgColor = useColorModeValue('rgba(4, 13, 24, 0.7)', 'rgba(4, 13, 24, 0.7)');
  const activeBgColor = useColorModeValue('rgba(74, 144, 226, 0.5)', 'rgba(74, 144, 226, 0.5)');
  
  return (
    <Flex
      bg={bgColor}
      border="1px solid"
      borderColor="rgba(74, 144, 226, 0.3)"
      borderRadius="md"
      overflow="hidden"
      flexDirection="column"
      width="32px"
      height="56px"
    >
      <Box
        py={1}
        cursor="pointer"
        bg={language === 'uk' ? activeBgColor : 'transparent'}
        onClick={() => setLanguage('uk')}
        transition="all 0.2s"
        _hover={{ bg: activeBgColor }}
        fontSize="sm"
        textAlign="center"
        borderBottom="1px solid"
        borderColor="rgba(74, 144, 226, 0.3)"
        height="28px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {UA_FLAG}
      </Box>
      <Box
        py={1}
        cursor="pointer"
        bg={language === 'en' ? activeBgColor : 'transparent'}
        onClick={() => setLanguage('en')}
        transition="all 0.2s"
        _hover={{ bg: activeBgColor }}
        fontSize="sm"
        textAlign="center"
        height="28px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {UK_FLAG}
      </Box>
    </Flex>
  );
}; 