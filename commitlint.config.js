// commitlint.config.js

module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        // ✅ Only allow these types
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

        // ✅ Force lowercase for commit types (e.g., "feat", not "FEAT")
        "type-case": [2, "always", "lower-case"],

        // ✅ Scope is optional but must not be empty if used
        "scope-empty": [2, "never"],

        // ✅ Subject must not be empty and must be brief
        "subject-empty": [2, "never"],
        "subject-min-length": [2, "always", 5],
        "subject-max-length": [2, "always", 72],

        // ❌ Disallow vague words in subject
        "subject-blacklist": [1, "always", ["stuff", "things", "fixes"]],

        // ⚠️ Breaking changes must use BREAKING CHANGE in body/footer
        "body-max-line-length": [1, "always", 100],
    },
};
