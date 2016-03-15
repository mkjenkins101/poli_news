//////////////////////////////////////////////////////
// Angular Main including external module ui-router //
// https://github.com/angular-ui/ui-router/         //
// gem 'angular-rails-templates'                    //
//////////////////////////////////////////////////////

// PoliNews()
var poliNews = angular.module('poliNews', ['ui.router', 'templates']);

// Poli News constructor - Config
poliNews.config(['$stateProvider', '$urlRouterProvider', poliNewsConfig]);

// Main Config
function poliNewsConfig($stateProvider, $urlRouterProvider) {
	var $home = {
		url: '/home',
		templateUrl: 'home/_home.html',
		controller: 'HomeCtrl',
		resolve: {
			postPromise: ['posts', function(posts){
    		return posts.getAll();
  		}]
		}
	};
	var $posts = {
		url: '/posts/{id}',
		templateUrl: 'posts/_posts.html',
		controller: 'PostsCtrl',
		resolve: {
  		post: ['$stateParams', 'posts', function($stateParams, posts) {
    		return posts.get($stateParams.id);
  		}]
		}
	};
	$stateProvider.state('home', $home);
	$stateProvider.state('posts', $posts);
	$urlRouterProvider.otherwise('home');
};

// incrementVotes function [home/home.js, posts/posts.js]
function incrementVotes(obj, incDec){
	if (incDec == 'inc')
		obj.votes += 1;
	if (incDec == 'dec')
		obj.votes -= 1;
};

