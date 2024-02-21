import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockComponent } from '../test/mockComponent';
import { SetSearchParams } from '../test/mockUseSearchParams'; // import before StopPage

const mockStopComponents = MockComponent('../components/Stop', 'Stop');

// Import the component we're testing after the mock handlers are set.
import StopPage from './StopPage';

describe('page renders', () => {

    beforeEach(() => {
        SetSearchParams();
        mockStopComponents.mockClear();
    });

    test('StopPage with no params', () => {
        render(
            <BrowserRouter>
                <StopPage />
            </BrowserRouter>
        );
        expect(mockStopComponents).toHaveBeenCalledTimes(0);
        expect(screen.queryAllByText('no Stop ID provided', { exact: false }).length).toEqual(1);
    });

    test('StopPage with params', async () => {
        SetSearchParams({ 'stop': 'CAKE' });

        await act(async () =>
            render(
                <BrowserRouter>
                    <StopPage />
                </BrowserRouter>
            )
        );

        expect(mockStopComponents).toHaveBeenCalledTimes(1);
        expect(mockStopComponents).toHaveBeenCalledWith({ stopID: 'CAKE', destinationID: undefined });
    });
});
