'use strict';

/**
 * @ngdoc service
 * @name starter.facebook
 * @description: login con facebook
 * # facebook
 * Service in the starter.
 */
angular.module('starter')
	.service('facebook', function() {
		return {
			login: function() {
				var provider = new firebase.auth.FacebookAuthProvider();
				return firebase.auth().signInWithPopup(provider).then(function(result) {
				  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
				  var token = result.credential.accessToken;
				  // The signed-in user info.
				  var user = result.user;
				  //console.log(result.user);
				  return user;
				}).catch(function(error) {
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  // The email of the user's account used.
				  var email = error.email;
				  // The firebase.auth.AuthCredential type that was used.
				  var credential = error.credential;
				  console.log(errorCode);
				  return errorCode;
				});				
			},
			salir: function () {
				return firebase.auth().signOut().then(function() {
					  // Sign-out successful.
					  var signOut = true;
					  return signOut;
					}, function(error) {
					  // An error happened.
					  var signOut = false;
					  return signOut;
					});
			}
		}
	});