module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testEnvironment: "node",
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/test/tsconfig.json',
        },
    },
    transformIgnorePatterns: [
        "node_modules/(?!troublesome-dependency/.*)",
    ],
}