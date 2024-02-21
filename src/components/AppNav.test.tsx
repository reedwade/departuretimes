import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NotFound } from './AppNav';


describe('NotFound', () => {
    test('simple', () => {
        render(
            <NotFound />
        );

        expect(screen.queryByText('Page Not Found')).not.toBeNull();
    });
})
