import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';


test('App renders', () => {
    render(<App />);

    expect(screen.getByText('DepartureTimes.click')).toBeInTheDocument();
});
