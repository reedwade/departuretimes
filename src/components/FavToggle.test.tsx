import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { FavToggle } from './FavToggle';


describe('FavToggle', () => {

    beforeAll(() => {
        localStorage.clear()
    });
    afterAll(() => {
        localStorage.clear()
    });


    test('set', () => {
        render(
            <FavToggle stopID='CAKE' />
        );

        expect(localStorage.getItem('favs/CAKE')).toBeNull();

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        // On
        fireEvent.click(button);
        expect(localStorage.getItem('favs/CAKE')).toEqual('1');

        // Off
        fireEvent.click(button);
        expect(localStorage.getItem('favs/CAKE')).toBeNull();
    });

    test('set with destination', () => {
        render(
            <FavToggle stopID='CAKE' destinationID='TUNA'/>
        );

        expect(localStorage.getItem('favs/CAKE/TUNA')).toBeNull();

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        // On
        fireEvent.click(button);
        expect(localStorage.getItem('favs/CAKE/TUNA')).toEqual('1');

        // Off
        fireEvent.click(button);
        expect(localStorage.getItem('favs/CAKE/TUNA')).toBeNull();
    });

});
