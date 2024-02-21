// Simple fetch api mocker.
//
// TODO: Add a helper for error responses.
//
// Usage: 
//
//   import * as ALERTS from '../../testdata/2024-01-22-140238-alerts.json';
//   import * as CROF from '../../testdata/2024-01-22-140238-crof.json';
//
//   FetchMock.mockReset()
//
//   FetchMockReturn({ 'mockDefaultResponse': true })
//   FetchMockReturnOnce(CROF)
//   FetchMockReturnOnce(ALERTS)
//
//   expect(FetchMock).toHaveBeenCalledWith(
//       'https://api.opendata.metlink.org.nz/v1/stop-predictions?stop_id=CAKE',
//       { 'headers': { 'accept': 'application/json', 'x-api-key': 'SECRETAPIKEY' } }
//   )
//

export const FetchMock = jest.fn();

// This works with my jest config using node style test environment.
// I have no idea if it will work more generally or not. I suspect
// it will not as I think others don't keep fetch in 'global'.
global.fetch = FetchMock;


export const FetchMockReturn = (data: object) => {
    FetchMock.mockReturnValue(Promise.resolve({
        ok: true,
        status: 200,
        json: () => {
            return Promise.resolve(data)
        },
    } as Response));
};

export const FetchMockReturnOnce = (data: object) => {
    FetchMock.mockReturnValueOnce(Promise.resolve({
        ok: true,
        status: 200,
        json: () => {
            return Promise.resolve(data)
        },
    } as Response));
};
