import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FetchMockReturn } from '../test/mockFetch';
import AboutPage from './AboutPage';
import HomePage from './HomePage';

FetchMockReturn({ 'mockDefaultResponse': true });

const Wrapper = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('simple page renders', () => {

    beforeAll(() => {
        localStorage.clear();
    });
    afterAll(() => {
        localStorage.clear();
    });

    test('AboutPage', () => {
        render(
            <BrowserRouter>
                <AboutPage />
            </BrowserRouter>
        );
    });

    test('HomePage', () => {
        render(
            <Wrapper>
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            </Wrapper>
        );
    });

    test('HomePage with fav', async () => {
        localStorage.setItem('favs/A', '1');

        await act(async () =>
            render(
                <Wrapper>
                    <BrowserRouter>
                        <HomePage />
                    </BrowserRouter>
                </Wrapper>
            )
        );

        expect(screen);
    });
});
