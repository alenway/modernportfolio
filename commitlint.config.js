module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat", // new features
                "fix", // bug fixes
                "docs", // documentation updates
                "style", // formatting, missing semi colons, etc.
                "refactor", // code changes without fixing bugs or adding features
                "test", // adding or modifying tests
                "chore", // other changes that don't modify src or test files
                "ci", // CI/CD config changes
                "perf", // performance improvements
            ],
        ],
        "type-case": [2, "always", "lower-case"],
        "scope-empty": [2, "never"], // scope is required
        "subject-empty": [2, "never"],
        "subject-min-length": [2, "always", 5],
        "subject-max-length": [2, "always", 72],
        "body-max-line-length": [1, "always", 100],
        "header-max-length": [2, "always", 72], // recommended
    },
};
