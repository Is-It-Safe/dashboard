import { QueryClientProvider } from 'react-query';
import queryClient from './services/client/query';
import { AuthProvider } from './context/auth/AuthProvider';
import { Router } from './router/router';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
