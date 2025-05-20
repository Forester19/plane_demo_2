import { useState } from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, Badge } from '@chakra-ui/react';
import { LandingPage1 } from './LandingPage1';
import { LandingPage2 } from './LandingPage2';
import { LandingPage3 } from './LandingPage3';

export const LandingPageShowcase = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box minH="100vh" bg="#030612">
      <Tabs 
        isFitted 
        variant="enclosed" 
        colorScheme="blue" 
        onChange={(index) => setTabIndex(index)}
        defaultIndex={0}
        h="100vh"
        display="flex"
        flexDirection="column"
      >
        <TabList bg="rgba(13, 25, 48, 0.8)" borderBottomWidth="1px" borderBottomColor="rgba(74, 144, 226, 0.3)">
          {['Modern Clean', 'Centered Cards', 'Military Style'].map((title, index) => (
            <Tab 
              key={index}
              _selected={{ 
                color: 'yellow.400', 
                bg: 'rgba(13, 25, 48, 0.9)',
                borderBottom: '2px solid',
                borderBottomColor: 'yellow.400'
              }}
              color="gray.300"
              py={4}
            >
              <VStack spacing={1}>
                <Text fontWeight="bold">Design {index + 1}</Text>
                <Badge 
                  colorScheme={tabIndex === index ? 'yellow' : 'blue'} 
                  variant={tabIndex === index ? 'solid' : 'outline'}
                >
                  {title}
                </Badge>
              </VStack>
            </Tab>
          ))}
        </TabList>
        <TabPanels p={0} flex="1" overflow="auto">
          <TabPanel p={0} h="100%">
            <LandingPage1 />
          </TabPanel>
          <TabPanel p={0} h="100%">
            <LandingPage2 />
          </TabPanel>
          <TabPanel p={0} h="100%">
            <LandingPage3 />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}; 