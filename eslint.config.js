import pluginJs from '@eslint/js'
import pluginPrettier from 'eslint-plugin-prettier/recommended'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginPrettier,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'error'
    }
  }
]
