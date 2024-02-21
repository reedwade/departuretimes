import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { AppNavBar, AppRoutes } from './components/AppNav';
import { ErrorBox } from './components/ErrorBox';
import { getApiKey } from './metlink/api/api';


const App = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppNavBar />
                <main>
                    <ErrorBox error={getApiKey() ? undefined : new Error('API Key is not configured')} />
                    <AppRoutes />
                </main>
            </BrowserRouter>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
