angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, facebook) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {
    nick: 'Anónimo',
    avatar: 'img/anonimo.png'
  };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Log in con facebook
  $scope.faceLog = function() {
    var usuario = facebook.login();
    usuario.then(function (datos) {
      $scope.loginData.nick = datos.displayName;
      $scope.loginData.avatar = datos.photoURL;
      $scope.modal.hide();
    });
  };

  // Log out con facebook
  $scope.salir = function () {
    var usuario = facebook.salir();
    usuario.then(function (dato) {
      $scope.loginData.nick = 'Anónimo';
      $scope.loginData.avatar = 'img/anonimo.png';
      $scope.logeado = false;
      digiere();
    });
  };  

  // Checa si el usuario está conectado
  $scope.checaStatus = function () {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        // console.log(user);
        $scope.loginData.nick = user.displayName;
        $scope.loginData.avatar = user.photoURL;
        $scope.logeado = true;
      } else {
        // No user is signed in.
        $scope.logeado = false;
      }
    });    
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.checaStatus();

  // Procesa datos que angular todavía no ha digerido
  function digiere() {
      if(!$scope.$$phase) {
          $scope.$digest();
      }                
  }

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
