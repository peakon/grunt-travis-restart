var Promise = require('bluebird');
var Travis = require('travis-ci');

function getTravis(githubToken) {
	var travis = new Travis({
		version: '2.0.0',
		pro: true
	});

	return Promise.fromNode(function(callback) {
		travis.auth.github.post({
			github_token: githubToken
		}, callback);
	}).then(function(res) {
		return Promise.fromNode(function(callback) {
			travis.authenticate({
				access_token: res.access_token
			}, callback);
		});
	}).then(function() {
		return travis;
	});
}

function getLatestBuild(travis, org, repo) {
	return Promise.fromNode(function(callback) {
		travis.repos(org, repo).builds.get(callback);
	}).then(function(result) {
		return result.builds[0];
	});
}

function restartBuild(travis, buildId) {
	return Promise.fromNode(function(callback) {
		travis.builds(buildId).restart.post(callback);
	});
}

module.exports = function(grunt) {
	grunt.registerTask('travis-restart', function(target) {
		var done = this.async();

		var token = grunt.config([this.name, target, 'github', 'token']);
		var org = grunt.config([this.name, target, 'github', 'org']);
		var repo = grunt.config([this.name, target, 'github', 'repo']);

		getTravis(token).then(function(travis) {
			return getLatestBuild(travis, org, repo).then(function(lastBuild) {
				return restartBuild(travis, lastBuild.id);
			});
		}).nodeify(done);
	});
};