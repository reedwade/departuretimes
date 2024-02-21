import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ALERTS from '../../testdata/2024-01-22-140238-alerts.json';
import * as CROF from '../../testdata/2024-01-22-140238-crof.json';
import { FetchMock, FetchMockReturn, FetchMockReturnOnce } from '../test/mockFetch';
import Stop from './Stop';


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


describe('Stop component', () => {
    beforeEach(() => {
        FetchMock.mockReset()
    });


    test('Stop with no stopID', () => {
        render(
            <Wrapper>
                <BrowserRouter>
                    <Stop stopID='' destinationID='' />
                </BrowserRouter>
            </Wrapper>
        );
        expect(screen.queryByText('no Stop ID provided')).toBeInTheDocument();
    });

    test('Stop CAKE', async () => {
        FetchMockReturn({ 'mockDefaultResponse': true });

        render(
            <Wrapper>
                <BrowserRouter>
                    <Stop stopID='CAKE' />
                </BrowserRouter>
            </Wrapper>
        );

        expect(screen.queryByText('no Stop ID provided')).toBeNull();
        expect(screen.queryByText('Stop CAKE')).not.toBeNull();

        expect(FetchMock).toHaveBeenCalledTimes(2);

        expect(FetchMock).toHaveBeenCalledWith(
            'https://api.opendata.metlink.org.nz/v1/gtfs-rt/servicealerts',
            { 'headers': { 'accept': 'application/json', 'x-api-key': 'SECRETAPIKEY' } },
        );

        expect(FetchMock).toHaveBeenCalledWith(
            'https://api.opendata.metlink.org.nz/v1/stop-predictions?stop_id=CAKE',
            { 'headers': { 'accept': 'application/json', 'x-api-key': 'SECRETAPIKEY' } }
        );
    });

    test('Stop CAKE/PIE', async () => {
        FetchMockReturn({ 'mockDefaultResponse': true });

        render(
            <Wrapper>
                <BrowserRouter>
                    <Stop stopID='CAKE' destinationID='PIE' />
                </BrowserRouter>
            </Wrapper>
        );

        expect(screen.queryByText('no Stop ID provided')).toBeNull();
        expect(screen.queryByText('Stop CAKE (to PIE)')).not.toBeNull();

        expect(FetchMock).toHaveBeenCalledTimes(2);

        expect(FetchMock).toHaveBeenCalledWith(
            'https://api.opendata.metlink.org.nz/v1/gtfs-rt/servicealerts',
            { 'headers': { 'accept': 'application/json', 'x-api-key': 'SECRETAPIKEY' } },
        );

        expect(FetchMock).toHaveBeenCalledWith(
            'https://api.opendata.metlink.org.nz/v1/stop-predictions?stop_id=CAKE',
            { 'headers': { 'accept': 'application/json', 'x-api-key': 'SECRETAPIKEY' } }
        );
    });

    test('Stop CROF', async () => {
        FetchMockReturn({ 'mockDefaultResponse': true });
        FetchMockReturnOnce(CROF);
        FetchMockReturnOnce(ALERTS);

        render(
            <Wrapper>
                <BrowserRouter>
                    <Stop stopID='CROF' />
                </BrowserRouter>
            </Wrapper>
        );

        await screen.findByText('to WELL');

        expect(screen.queryAllByText('to WELL', { exact: false }).length).toEqual(6);
        expect(screen.queryAllByText('Please allow extra time for travel', { exact: false }).length).toEqual(2);
        expect(FetchMock).toHaveBeenCalledTimes(2);
    });

    // TODO - more needed here, failure cases are mostly not covered

});
