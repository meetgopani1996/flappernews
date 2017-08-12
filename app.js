var app = angular.module('flapperNews', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        //home route
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl'
            });

        $urlRouterProvider.otherwise('home');
    }
]);

app.factory('posts', [
    function() {
        var o = {
            posts: []
        };
        return o;
    }
]);

//home controller
app.controller('MainCtrl', [
    '$scope',
    'posts',
    function($scope, posts) {

        //creating a global scope for posts 
        $scope.posts = posts.posts;

        //function to add new post
        $scope.addPost = function() {

            //validation to check if the title is not null
            if (!$scope.title || $scope.title === '') {
                return;
            }

            //add post 
            $scope.posts.push({
                title: $scope.title,
                link: $scope.link,
                upvotes: 0,
                comments: [
                    { author: 'Joe', body: 'Cool post!', upvotes: 0 },
                    { author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0 }
                ]
            });

            //empty the string
            $scope.title = '';
            $scope.link = '';

            // console.log($scope);
        };

        //function to increment the votes
        $scope.incrementUpvotes = function(post) {
            post.upvotes += 1;
        };
    }
])


//post controller
app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts) {

        //get the id of the post
        $scope.post = posts.posts[$stateParams.id];

        //function to add comment for the given post
        $scope.addComment = function() {
            if ($scope.body === '') { return; }
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
            $scope.body = '';
        };

        //increment the votes in comments
        $scope.incrementUpvotes = function(comment) {
            comment.upvotes += 1;
        };
    }

])