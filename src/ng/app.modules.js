angular
    .module('app', [
        'ngAnimate',
        'plangular',
        'angular-svg-round-progress'
    ])
    .config(function(plangularConfigProvider) {
        plangularConfigProvider.clientId = 'REDACTED_SOUNDCLOUD_ID';
    });
