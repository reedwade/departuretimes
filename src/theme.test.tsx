import { ThemeProvider } from '@emotion/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import theme from './theme';

test('theme', () => {
    render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                tuna
            </ThemeProvider>
        </React.StrictMode>,
    );

    expect(screen.getByText('tuna')).toBeInTheDocument();
});
