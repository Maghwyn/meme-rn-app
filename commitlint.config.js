module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'subject-case': [2, 'never', ['upper-case', 'pascal-case', 'start-case']],
		'type-enum': [
			2,
			'always',
			[
				'build',
				'chore',
				'ci',
				'docs',
				'feat',
				'fix',
				'types',
				'perf',
				'refactor',
				'revert',
				'style',
				'test',
				'wip',
			],
		],
		'header-max-length': [2, 'always', Infinity],
	},
};
