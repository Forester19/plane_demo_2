import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  Alert,
  AlertIcon,
  InputGroup,
  InputLeftElement,
  Icon
} from '@chakra-ui/react';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="#040D18"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="md">
        <Box
          bg="rgba(4, 13, 24, 0.9)"
          border="1px solid"
          borderColor="rgba(74, 144, 226, 0.3)"
          borderRadius="lg"
          p={8}
        >
          <VStack spacing={6}>
            <Heading
              color="yellow.400"
              fontFamily="mono"
              size="lg"
              textAlign="center"
            >
              ADMIN ACCESS
            </Heading>

            {error && (
              <Alert status="error" borderRadius="md" bg="red.900">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color="gray.400">Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FiMail} color="gray.500" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      bg="rgba(0, 0, 0, 0.3)"
                      border="1px solid"
                      borderColor="rgba(74, 144, 226, 0.3)"
                      color="white"
                      _hover={{ borderColor: 'rgba(74, 144, 226, 0.5)' }}
                      _focus={{ borderColor: 'yellow.400', boxShadow: 'none' }}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="gray.400">Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FiLock} color="gray.500" />
                    </InputLeftElement>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      bg="rgba(0, 0, 0, 0.3)"
                      border="1px solid"
                      borderColor="rgba(74, 144, 226, 0.3)"
                      color="white"
                      _hover={{ borderColor: 'rgba(74, 144, 226, 0.5)' }}
                      _focus={{ borderColor: 'yellow.400', boxShadow: 'none' }}
                    />
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="yellow"
                  w="full"
                  size="lg"
                  isLoading={loading}
                  mt={4}
                >
                  Sign In
                </Button>
              </VStack>
            </form>

            <Text fontSize="sm" color="gray.500" textAlign="center">
              Contact administrator if you need access
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};
