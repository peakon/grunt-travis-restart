# grunt-travis-restart

This is a very simple grunt task to request a rebuild of the latest build for a given repository on Travis CI. 

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-travis-restart --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-travis-restart');
```


### Settings

#### github.token
Type: `String`

A GitHub token that can be used for authentication with the Travis CI API. This can also be specified using the command line argument `--token`.

#### github.org
Type: `String`

The organization name of the GitHub repo that should be rebuilt

#### github.repo
Type: `String`

The name of the repo that should be rebuilt

Example:
```js
travis-restart: {
    web: {
        github: {
            token: 'abcdefg',
            org: 'peakon',
            repo: 'api'
        }
    }
}
```
