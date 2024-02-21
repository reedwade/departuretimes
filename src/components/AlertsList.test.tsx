import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AlertSummary, EmptyAlertSummary } from '../metlink/view/service_alerts';
import { AlertComponent, AlertsList } from './AlertsList';

describe('AlertComponent', () => {

    test('simple', () => {
        const info: AlertSummary = {
            ...EmptyAlertSummary,
            description: 'alert-desc',
            id: 'alert-id',
        };

        render(AlertComponent(info));

        expect(screen.queryByText('[Jan 1]')).not.toBeNull();
        expect(screen.queryByText('alert-desc (alert-id)')).not.toBeNull();
        expect(screen.queryByText('image-alt-text')).toBeNull();
        expect(screen.queryByText('Alert details')).toBeNull();
    });

    test('with image and url', () => {
        const info: AlertSummary = {
            ...EmptyAlertSummary,
            description: 'alert-desc',
            id: 'alert-id',
            image: 'image',
            image_alternative_text: 'image-alt-text',
            url: 'info-url',
        };

        render(AlertComponent(info));

        expect(screen.queryByText('[Jan 1]')).not.toBeNull();
        expect(screen.queryByText('alert-desc (alert-id)')).not.toBeNull();
        expect(screen.queryByText('image-alt-text')).not.toBeNull();
        expect(screen.queryByText('Alert details')).not.toBeNull()
    });

});

describe('AlertsList', () => {

    test('simple', () => {
        const info: AlertSummary = {
            ...EmptyAlertSummary,
            description: 'alert-desc',
            id: 'alert-id',
        };

        render(<AlertsList alertSummaries={[info]} label='CAKE' expanded />);

        expect(screen.queryByText('CAKE')).not.toBeNull();
        expect(screen.queryByText('[Jan 1]')).not.toBeNull();
        expect(screen.queryByText('alert-desc (alert-id)')).not.toBeNull();
        expect(screen.queryByText('image-alt-text')).toBeNull();
        expect(screen.queryByText('Alert details')).toBeNull();
    });

})
