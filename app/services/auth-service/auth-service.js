angular.module('ImageDirectorApp')
    .service('authService', [function() {

        var tokenKey = "image_wizard_access_token";
        var userNameKey = "image_director_username";
        var authData = {
            isAuthorized: false
        };

        this.check = function() {
            let token = sessionStorage.getItem(tokenKey);
            let userName = sessionStorage.getItem(userNameKey);
            if(token && userName){
                authData.isAuthorized = true;
                return userName;
              }
        }

        this.login = function(userName, token) {
            sessionStorage.setItem(userNameKey, userName);
            sessionStorage.setItem(tokenKey, token);
            authData.isAuthorized = true;
        }

        this.logout = function() {
            sessionStorage.removeItem(tokenKey);
            sessionStorage.removeItem(userNameKey);
            authData.isAuthorized = false;
        }

        this.getAuthData = function() {
            return authData;
        }

    }]);