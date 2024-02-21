import { gatherUniqueDestinations } from './stop_predictions';


const genericDeparture = {
    trip_id: '1',
    departure: { aimed: '2024-01-22T14:10:00+13:00', expected: null },
    status: '',
    monitored: true,
    delay: 'PS01',
    destination: { stop_id: 'CAKE', name: 'Cake' },
    vehicle_id: '1',
};

describe('gatherUniqueDestinations', () => {

    test('simple', () => {
        const got = gatherUniqueDestinations({ departures: [] });
        expect(got).toStrictEqual([]);
    });

    test('with items', () => {
        const got = gatherUniqueDestinations({
            departures: [
                { ...genericDeparture, destination: { stop_id: 'CAKE', name: 'Cake' } },
                { ...genericDeparture, destination: { stop_id: 'CAKE2', name: 'Cake' } },
                { ...genericDeparture, destination: { stop_id: 'CAKE', name: 'Cake' } },
            ]
        });
        expect(got).toStrictEqual([
            { stop_id: 'CAKE', name: 'Cake' },
            { stop_id: 'CAKE2', name: 'Cake' },
        ]);
    });
});
