import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ErrorBox } from './ErrorBox';

test('empty error', async () => {
    render(<ErrorBox />);
    // Should render empty-ish.
    expect(screen.queryByText(/\w/, { exact: false })).toBeNull();
});

test('generic error', async () => {
    render(<ErrorBox error={new Error('hi')} />);
    expect(screen.queryByText('hi')).not.toBeNull();
});
