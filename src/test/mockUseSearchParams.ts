//
// Mock useSearchParams()
//
// This must be imported before the module which calls useSearchParams().
//
// Usage:
//
//   import { SetSearchParams } from '../test/mockUseSearchParams';
//
//   SetSearchParams() // to clear
//
//   SetSearchParams({'stop': 'CAKE'}) // to set
//

let searchParams: { [key: string]: string } = {};

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useSearchParams: () => {
            return [{ get: (key: string) => searchParams[key] }, undefined]
        },
    };
});

export const SetSearchParams = (params?: { [key: string]: string }) => {
    searchParams = params || {};
};
