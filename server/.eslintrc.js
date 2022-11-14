module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'prettier/prettier': [
			'warn',
			{
				'arrowParens': 'avoid',
				'useTabs': true,
				'singleQuote': true,
				'tabWidth': 2,
				'jsxSingleQuote': true,
				'trailingComma': 'none',
				'semi': false,
				'endOfLine': 'auto',
				'bracketSpacing': true,
				'bracketSameLine': false,
				'proseWrap': 'never'
			}
		],
		"complexity": ["error", 25],
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off'
	}
}
