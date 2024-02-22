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

    const testOptions = [
        { label: "CAKE", id: "CAKE" },
    ]

    test('search for cake->CAKE with button press', () => {
        render(
            <BrowserRouter>
                <SearchBox options={testOptions} />
            </BrowserRouter>
        );

        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);

        const comboboxs = screen.getAllByRole('combobox');
        expect(comboboxs).toHaveLength(2);
        expect(comboboxs[0]).toHaveValue("")
        expect(comboboxs[1]).toHaveValue("")

        // open the menu
        fireEvent.click(buttons[0]);

        const menuOptions = screen.getAllByRole('option');
        expect(menuOptions).toHaveLength(1);

        // select CAKE
        fireEvent.click(menuOptions[0]);

        expect(comboboxs[0]).toHaveValue("CAKE")
        expect(comboboxs[1]).toHaveValue("")

        expect(mockedUsedNavigate).toHaveBeenCalledWith('/stop?stop=CAKE');
    });

});
