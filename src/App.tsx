import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import { LandingPageShowcase } from './components/landing/LandingPageShowcase';
import { ChakraProvider } from '@chakra-ui/react';
import { LangProvider } from './components/landing/LangContext';
import { AuthProvider } from './contexts/AuthContext';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthGuard } from './components/admin/AuthGuard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <LangProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPageShowcase />} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin" 
                element={
                  <AuthGuard>
                    <AdminDashboard />
                  </AuthGuard>
                } 
              />
            </Routes>
          </BrowserRouter>
        </LangProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
