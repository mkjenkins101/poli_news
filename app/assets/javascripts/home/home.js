// var poliNews angular.module() dec/init main.js
//= require ../main.js

// Home constructor - Controller
poliNews.controller('HomeCtrl', ['$scope', 'posts', homeController]);

// Home Controller
function homeController($scope, posts) {
	$scope.posts = posts.posts;
	$scope.addPost = function(){
		if (!$scope.title || $scope.title === '') { return; }
		posts.create({
			title: $scope.title, 
			link: scopeLink($scope), 
			votes: 0,
			comments: []
		});
		$scope.title = '';
		$scope.link = '';
	};
	// incrementVotes() - main.js
	$scope.incrementVotes = function(post, incDec) {
		// posts.js postFactory function o.vote
		posts.vote(post, incDec);
	};
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

