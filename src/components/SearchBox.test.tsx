import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchBox } from './SearchBox';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('SearchBox', () => {

    afterEach(() => {
        mockedUsedNavigate.mockReset()
    });

    test('search for cake->CAKE with button press', () => {
        render(
            <BrowserRouter>
                <SearchBox />
            </BrowserRouter>
        );

        const textfield = screen.getByPlaceholderText('Bus or Train Stop ID...');
        expect(textfield).toBeInTheDocument();

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        fireEvent.change(textfield, { target: { value: 'cake' } });
        fireEvent.click(button);

        // Should convert 'cake' to 'CAKE'.
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/stop?stop=CAKE');
    });

    test('search for cake->CAKE with enter key', () => {
        render(
            <BrowserRouter>
                <SearchBox />
            </BrowserRouter>
        );

        const textfield = screen.getByPlaceholderText('Bus or Train Stop ID...');
        expect(textfield).toBeInTheDocument();

        fireEvent.change(textfield, { target: { value: 'cake' } });
        fireEvent.keyDown(textfield, { key: 'Enter' });

        // Should convert 'cake' to 'CAKE'.
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/stop?stop=CAKE');
    });

});
