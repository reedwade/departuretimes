//
// Mock a component.
//
// This MockComponent() must be called before importing the module with the upper level component
// which references your mocked component.
//
// Component name is decorative only. The mocked component must be the default export for the module.
//
// Usage:
//
//   import { MockComponent } from '../test/mockComponent';
//
//   const mockStopComponent = MockComponent('../components/Stop', 'Stop');
//
//   // import higher level components
//   import StopPage from './StopPage';
//
//   mockStopComponent.mockClear() // to clear the mock
//
//   // inspect after usage
//   expect(mockStopComponent).toHaveBeenCalledTimes(1)
//   expect(mockStopComponent).toHaveBeenCalledWith({ stopID: '', destinationID: undefined })
//
//

export const MockComponent = (modulePath: string, name: string): jest.Mock => {
    const mock = jest.fn();
    mock.mockName(`Mock-${name}`);

    jest.mock(modulePath, () => {
        return {
            __esModule: true,
            default: (props: object) => {
                mock(props);
                return (
                    <div>
                        <div>
                            Mock-{name}
                        </div>
                        <div>
                            props={JSON.stringify(props)}
                        </div>
                    </div>
                );
            },
        };
    });

    return mock;
};
