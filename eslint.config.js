import { fixupConfigRules } from "@eslint/compat";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import ts from "typescript-eslint";

export default [
    { languageOptions: { globals: globals.browser } },
    js.configs.recommended,
    ...ts.configs.recommended,
    ...fixupConfigRules([
        {
            settings: {
                react: { version: "detect" },
            },
        },
    ]),
    {
        plugins: {
            prettier: prettier,
            import: importPlugin,
        },
        rules: {
            "prettier/prettier": "error",
            "import/order": [
                "error",
                {
                    groups: [
                        ["builtin", "external"],
                        ["internal"],
                        ["parent", "sibling", "index"],
                    ],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
        },
    },
    { ignores: ["dist/", "src/data/"] },
];
