'use strict';

angular.module('wp-pods-api', [])

/**
 * PodsEndPoint is a configurable Provider
 * use it to set your API endpoint and auth credentials
 * during app.config() phase
 */
.provider('PodsEndPoint', function() {

    var APIurl = 'this.needs.to.change';
    var APIauth = 'Basic ' + 'window.btoa(username + ":" + password)';// compare https://github.com/WP-API/Basic-Auth
    var APIpods = new Array('posts');

    return {
        $get: function() {
            return {
                getURL: function() {
                    return APIurl;
                },
                getAuth : function() {
                    return APIauth;
                },
                getPodTypes : function() {
                    return APIpods;
                }
            }
        },
        setAPI: function (newValue) {
            APIurl = newValue;
        },
        setAuth : function(textAndbase64) {
            APIauth = textAndbase64;
        },
        setPodTypes : function(typesArray) {
            APIpods = typesArray;
        }
    };

})
/**
 * PodsService is the Pods DATA API, used to create, update, delete and list entries of a specific Pod type
 */
.service('PodsService', function(PodsEndPoint, $resource, $http) {

    var APIend = PodsEndPoint.getURL();

    $http.defaults.headers.common['Authorization'] = PodsEndPoint.getAuth();

    var PodService = {};

    PodService.getPodTypes = function() {
        // TODO: get a list of all available Pod types from the API
        // for now, just return what has been configured before
        return PodsEndPoint.getPodTypes();
    };

     /**
     * list all entries of a specific pod type
     * @param {string} podType
     * @returns {*}
     */
    PodService.list = function(podType) {
        return $http({
            url: APIend + podType,
            method: "GET"
        });
    };

    PodService.save = function(pod) {
        if (pod.id !== undefined) {
            return PodService.update(pod);
        }
        else {
            return PodService.create(pod);
        }
    };

    PodService.create = function(pod) {
        return $http({
            url: APIend + pod.post_type,
            method: "POST",
            data: pod,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data) {
            pod = data;
        });
    };

    PodService.update = function(pod) {

        var podId = pod.id || pod.ID;

        return $http({
            url: APIend + pod.post_type + "/" + podId,
            method: "PUT",
            data: pod,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data) {
            // update with new values from API callback
            // TODO: update everything?
            pod.post_modified = data.post_modified;
            pod.post_modified_gmt = data.post_modified_gmt;

        }).error(function (data, status, headers, config) {

            console.log("FAIL!");
            console.log(data, status, headers, config);

        });
    };

    PodService.delete = function(pod) {
		var podId = pod.ID || pod.id;
        return $http({
            url: APIend + pod.post_type + "/" + podId,
            method: "DELETE"
        });
    };


    return PodService;
});