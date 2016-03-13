// var poliNews angular.module() dec/init main.js
//= require ../main.js

// Posts constructors - Factory, Controller
poliNews.factory('posts', ['$http', postsFactory]);
poliNews.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', postsController]);

// Posts Factory
function postsFactory($http) {
	var o = { posts: [] };
	o.getAll = function() {
    return $http.get('/posts.json').success(function(data) {
      angular.copy(data, o.posts);
    });
  };	
	o.create = function(post) {
		return $http.post('/posts.json', post).success(function(data) {
			o.posts.push(data);	
		});
	};
	return o;
};

// Posts Controller
function postsController($scope, $stateParams, posts) {
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
	// incrementVotes() - main.js
	$scope.incrementVotes = incrementVotes;
};
