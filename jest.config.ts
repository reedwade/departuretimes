import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',

    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                diagnostics: {
                    ignoreCodes: [1343]
                },
                astTransformers: {
                    before: [
                        {
                            path: 'ts-jest-mock-import-meta',
                            options: { metaObjectReplacement: { env: { VITE_API_KEY: "SECRETAPIKEY" } } }
                        }
                    ]
                }
            }
        ],
    },

    globals: {
        __APP_VERSION__: "test.test.test",
        __APP_HASH__: "githash",
    },

    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png|css)$': '<rootDir>/src/test/__mocks__/fileMock.js',
    },

    collectCoverageFrom: ['src/**/*.js', 'src/**/*.tsx', 'src/**/*.ts', '!src/vite-env.d.ts'],

    // verbose: true,

    // setupFilesAfterEnv:["<rootDir>/src/test/setupTests.js"],
};

export default config;
