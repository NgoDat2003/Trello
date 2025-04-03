import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'], 
    languageOptions: {
      ecmaVersion: 'latest', 
      globals: globals.browser, 
      parserOptions: {
        ecmaFeatures: { jsx: true }, 
        sourceType: 'module',
      },
    },
    plugins: {
      react, // Plugin cho React
      'react-hooks': reactHooks, 
      'react-refresh': reactRefresh, 
    },
    rules: {
      // Quy tắc cơ bản từ ESLint
      ...js.configs.recommended.rules,

      // Quy tắc từ eslint-plugin-react-hooks
      ...reactHooks.configs.recommended.rules,

      // Quy tắc tùy chỉnh
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // Báo lỗi nếu có biến không sử dụng, trừ biến viết hoa
      'react-refresh/only-export-components': 'warn', // Cảnh báo nếu export không phải là React component
      'eqeqeq': ['error', 'always'], // Yêu cầu sử dụng === thay vì ==
      'react/jsx-uses-react': 'error', // Đảm bảo React được sử dụng trong JSX (không cần thiết với React 17+)
      'react/jsx-uses-vars': 'error', // Đảm bảo các biến trong JSX không bị đánh dấu là không sử dụng
      'react/react-in-jsx-scope': 'off', // Tắt yêu cầu import React (không cần thiết với React 17+)
    },
  },
]