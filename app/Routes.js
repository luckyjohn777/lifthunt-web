app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/app/components/home/home.html',
            controller  : 'HomeController'
        })
        .when('/calendar', {
            templateUrl : '/app/components/workout-calendar/workout-calendar.html',
            controller  : 'WorkoutCalendarController'
        })
        .when('/login', {
            templateUrl : '/app/components/login/login.html',
            controller  : 'LoginController'
        })
});