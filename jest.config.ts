module.exports = {
	roots: ["<rootDir>/src"],
	coverageDirectory: "<rootDir>/coverage",
	coveragePathIgnorePatterns: ["<rootDir>/mocks/"],
	setupFiles: ["<rootDir>/jest.setup.ts"],
	reporters: ["default"],
	verbose: true,
	coverageThreshold: {
		global: {
			branches: 81,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	testMatch: ["**/*.test.ts"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	resetMocks: false,
};
