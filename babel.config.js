module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module:react-native-dotenv',
			{
				moduleName: '@env',
				path: '.env',
				blacklist: null,
				whitelist: null,
				safe: false,
				allowUndefined: true,
			},
		],
		[
			require.resolve('babel-plugin-module-resolver'),
			{
				cwd: 'babelrc',
				extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
				root: ['.'],
				alias: {
					'@api': './src/api',
					'@core': './src/core',
					'@hooks': './src/hooks',
					'@i18n': './src/i18n',
					'@screens': './src/screens',
					'@store': './src/store',
					'@ui': './src/ui',
				  }
			}
		]
	],
};