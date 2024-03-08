module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module:react-native-dotenv',
			{
				moduleName: '@env',
				path: '.env.development',
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
					'@components': './src/components',
					'@core': './src/core',
					'@hooks': './src/hooks',
					'@i18n': './src/i18n',
					'@navigations': './src/navigations',
					'@screens': './src/screens',
					'@store': './src/store',
					'@ui': './src/ui',
					'@utils': './src/utils',
					'@assets': './assets',
				},
			},
		],
		'react-native-reanimated/plugin',
	],
};