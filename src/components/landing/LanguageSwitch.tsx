import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { useLang } from './LangContext';

export const LanguageSwitch = () => {
  const { language, setLanguage, t } = useLang();
  
  const bgColor = useColorModeValue('rgba(4, 13, 24, 0.7)', 'rgba(4, 13, 24, 0.7)');
  const activeBgColor = useColorModeValue('rgba(74, 144, 226, 0.5)', 'rgba(74, 144, 226, 0.5)');
  
  const toggleLanguage = () => {
    setLanguage(language === 'uk' ? 'en' : 'uk');
  };
  
  return (
    <Button
      onClick={toggleLanguage}
      position="absolute"
      top="20px"
      right="20px"
      zIndex="5"
      bg={bgColor}
      color="white"
      border="1px solid"
      borderColor="rgba(74, 144, 226, 0.3)"
      size="sm"
      _hover={{ bg: activeBgColor }}
      fontFamily="mono"
      px={3}
    >
      {t('lang.switch')}
    </Button>
  );
}; 