app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './components/home/home.html',
            controller  : 'HomeController'
        })
        .when('/calendar', {
            templateUrl: './components/workout-calendar/workout-calendar.html',
            controller  : 'WorkoutCalendarController'
        })
        .when('/login', {
            templateUrl: './components/login/login.html',
            controller  : 'LoginController'
        })
});