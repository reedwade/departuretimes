import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SettingsPage from './SettingsPage';

describe('page renders', () => {

    beforeAll(() => {
        localStorage.clear();
    });
    afterAll(() => {
        localStorage.clear();
    });


    test('SettingsPage', () => {
        render(
            <BrowserRouter>
                <SettingsPage />
            </BrowserRouter>
        );

        const textfield = screen.getByLabelText('Example');
        expect(textfield).toBeInTheDocument();

        const button = screen.getByText('Apply');
        expect(button).toBeInTheDocument();

        fireEvent.change(textfield, { target: { value: 'cake' } });
        fireEvent.click(button);

        expect(localStorage.getItem('example_key')).toEqual('cake');
    });

});
