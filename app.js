var app = angular.module('flapperNews', []);

app.controller('MainCtrl', [
    '$scope',
    function($scope) {

    	//predefining the posts variable
        $scope.posts = [{
            title: 'post 1',
            upvotes: 5
        }, {
            title: 'post 2',
            upvotes: 2
        }, {
            title: 'post 3',
            upvotes: 15
        }, {
            title: 'post 4',
            upvotes: 9
        }, {
            title: 'post 5',
            upvotes: 4
        }];

        // set hello world value to test
        $scope.test = "Hello World!";

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
                upvotes: 0
            });

            //empty the string
            $scope.title = '';
            $scope.link = '';
        };

        //function to increment the votes
        $scope.incrementUpvotes = function(post){
            post.upvotes += 1;
        };
    }
])