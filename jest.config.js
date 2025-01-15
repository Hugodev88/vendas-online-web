module.exports = {
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: [
        "<rootDir>/setup-tests.js"
    ],
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{js,ts,jsx,tsx}"
    ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "^antd/es/(.*)$": "antd/lib/$1"
    }
}
