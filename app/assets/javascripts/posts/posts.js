// var poliNews angular.module() dec/init main.js
//= require ../main.js

// Posts constructors - Factory, Controller
poliNews.factory('posts', ['$http', postsFactory]);
poliNews.controller('PostsCtrl', ['$scope', 'posts', 'post', postsController]);

// Posts Factory
function postsFactory($http) {
	var o = { posts: [] };
	o.get = function(id) {
		return $http.get('/posts/' + id + '.json').then(function(res){
  		return res.data;
		});
	};
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
	o.vote = function(post, incDec) {
		// pass param incDec to rails vote
		return $http.put('/posts/' + post.id + '/vote.json', {incDec: incDec}).success(function(data) {
			post.vote = incrementVotes(post, incDec);
		});
	};
	o.addComment = function(id, comment) {
		return $http.post('/posts/' + id + '/comments.json', comment);
	};
	o.commentVote = function(post, comment, incDec) {
		console.log(incDec);
		return $http.put('/posts/' + post.id + '/comments/' + comment.id + '/vote.json', {incDec: incDec}).success(function(data) {
			post.vote = incrementVotes(comment, incDec);
		}); 
	};
	return o;
};

// Posts Controller
function postsController($scope, posts, post) {
	$scope.post = post;
	$scope.addComment = function() {
		if ($scope.body === '') { return; };
		posts.addComment(post.id, {
			author: 'user',
			body: $scope.body,
			votes: 0
		}).success(function(comment) {
			$scope.post.comments.push(comment)
		});
		$scope.body = '';
	}; 
	// incrementVotes() - main.js
	$scope.incrementVotes = function(comment, incDec) {
		posts.commentVote(post, comment, incDec);
	}; 
};
