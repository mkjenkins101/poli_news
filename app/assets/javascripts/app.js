//////////////////////////////////////////////////////
// Angular Main including external module ui-router //
// https://github.com/angular-ui/ui-router/         //
//////////////////////////////////////////////////////

// App()
var app = angular.module('poliNews', ['ui.router']);

// incrementVotes function [MainCtrl, PostsCtrl]
function incrementVotes(obj,incDec){
	if (incDec == 'inc')
		obj.votes += 1;
	if (incDec == 'dec')
		obj.votes -= 1;
};

// Regex test if usergiven url has protocol. Appends
// unsecure http if none provided by user
function scopeLink($scope) {
	var url = '';
	if (/^https?:\/\//i.test($scope.link) || /^http?:\/\//i.test($scope.link)) {
    url = $scope.link;
  } else {  
    url = 'http://' + $scope.link;
  }   
	return url;
};

///////////////////////////////////////////////////////
// PoliNews callbacks - Factory, Controllers, Config // 
///////////////////////////////////////////////////////

// Main Factory
function mainFactory() {
	return { posts: [] };
};

// Main Controller
function mainController($scope,posts) {
	$scope.posts = posts.posts;
	$scope.addPost = function(){
		if (!$scope.title || $scope.title === '') { return; }
		$scope.posts.push({
			title: $scope.title, 
			link: scopeLink($scope), 
			votes: 0,
			comments: []
		});
		$scope.title = '';
		$scope.link = '';
	};
	$scope.incrementVotes = incrementVotes;
};

// Posts Controller
function postsController($scope,$stateParams,posts) {
	$scope.post = posts.posts[$stateParams.id];
	$scope.addComment = function() {
		if ($scope.body === '') { return; };
		$scope.post.comments.push({
			author: 'user',
			body: $scope.body,
			votes: 0
		});
		$scope.body = '';
	}; 
	$scope.incrementVotes = incrementVotes;
};

// Main Config
function mainConfig($stateProvider,$urlRouterProvider) {
	var $home = {
		url: '/home',
		templateUrl: '/home.html',
		controller: 'MainCtrl'
	};
	var $posts = {
		url: '/posts/{id}',
		templateUrl: '/posts.html',
		controller: 'PostsCtrl'
	};
	$stateProvider.state('home', $home);
	$stateProvider.state('posts', $posts);
	$urlRouterProvider.otherwise('home');
};

//////////////////////////////////////////////////////////
// Poli News constructors - Factory, Controller, Config //
//////////////////////////////////////////////////////////

app.config(['$stateProvider','$urlRouterProvider',mainConfig]);
app.factory('posts', [mainFactory]);
app.controller('MainCtrl', ['$scope','posts',mainController]);
app.controller('PostsCtrl', ['$scope','$stateParams','posts',postsController]);
