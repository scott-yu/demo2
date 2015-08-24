(function (undefined) {
    var iecors = function ($) {

        var shouldInstall = function () { return true; };

        var couldBeHandledByXdr = function () { return true; };

        var addParamToUrl = function () { return ''; };

        var openXdrConnection = function () { return; };

        var getAccessTokenFromHeader = function () { return ''; };

        var xdrTransport = function () { return { send: function() {}, abort: function() {} }; };

        var install = function () { };

        return { install: install };
    };

}).call(this);