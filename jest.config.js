module.exports = {
    verbose: false,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}'
    ],
    moduleDirectories: [
        "node_modules",
        "src",
        "test"
    ],
    setupFiles: ["jest-canvas-mock", 'whatwg-fetch'],
    // Disable detailed coverage reporting in console
    coverageReporters: ['json', 'lcov'],
    testURL: 'http://localhost',
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Test Report"
        }]
    ],
    testResultsProcessor: "./node_modules/jest-html-reporter"
};
