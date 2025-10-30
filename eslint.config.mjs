import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.mjs"],
    rules: {
      // Indentation and formatting
      "indent": ["error", 2, {
        "SwitchCase": 1,
        "ObjectExpression": 1,
        "FunctionDeclaration": {
          "parameters": 1,
          "body": 1,
        },
      }],
      "max-len": ["error", {
        "code": 150,
        "tabWidth": 2,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true,
        "ignoreComments": true,
        "ignorePattern": "^\\s*import\\s.+\\sfrom\\s.+;$",
      }],
      
      // Object formatting
      "object-curly-spacing": ["error", "always"],
      "object-curly-newline": ["error", {
        "ObjectExpression": {
          "multiline": true,
          "minProperties": 2,
        },
        "ObjectPattern": {
          "multiline": true,
          "consistent": true,
        },
        "ImportDeclaration": {
          "multiline": true,
          "consistent": true,
        },
        "ExportDeclaration": {
          "multiline": true,
          "consistent": true,
        },
      }],
      "object-property-newline": ["error", { "allowAllPropertiesOnSameLine": false }],
      "key-spacing": ["error", {
        "beforeColon": false,
        "afterColon": true,
        "mode": "strict",
      }],
      "comma-dangle": ["error", "always-multiline"],
      "key-spacing": ["error", {
        "beforeColon": false,
        "afterColon": true,
        "mode": "strict",
      }],
      "comma-dangle": ["error", "always-multiline"],
      
      // TypeScript specific
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
      }],
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unsafe-function-type": "warn",
      
      // React
      "react-hooks/exhaustive-deps": "warn",
      
      // General
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": ["error", {
        "allowShortCircuit": true,
        "allowTernary": true,
      }],
    },
  },
];

export default eslintConfig;
