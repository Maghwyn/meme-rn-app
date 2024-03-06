const config = {
	"branches": [
		{
			"name": "main"
		},
		{
			"name": "dev",
			"channel": "dev",
			"prerelease": true
		}
	],
	"plugins": [
		"@semantic-release/commit-analyzer",
		"@semantic-release/release-notes-generator",
		[
			"@semantic-release/changelog",
			{
				"changelogFile": "CHANGELOG.md"
			}
		],
		[
			"@semantic-release/npm",
			{
				"npmPublish": false
			}
		],
		[
			"@semantic-release/git",
			{
				"assets": [
					"package.json",
					"package-lock.json",
					"CHANGELOG.md"
				],
				"message": "ci(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
			}
		],
		"@semantic-release/github"
	]
}

module.exports = config;