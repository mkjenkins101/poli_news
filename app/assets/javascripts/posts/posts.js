// var poliNews angular.module() dec/init main.js
//= require ../main.js

// Posts constructors - Factory, Controller
poliNews.factory('posts', [postsFactory]);
poliNews.controller('PostsCtrl', ['$scope','$stateParams','posts',postsController]);

// Posts Factory
function postsFactory() {
	return { posts: [] };
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
	// incrementVotes() - main.js
	$scope.incrementVotes = incrementVotes;
};
