'use strict';

/**
 * we use the $modal from ui.bootstrap for editing Pods
 * this is the controller that is invoked once a Pod is opened inside the modal
 * @param $scope
 * @param $modalInstance
 * @param editPod
 * @constructor
 */
var ModalPodEditorCtrl = function ($scope, $modalInstance, editPod) {

        $scope.pod = editPod;
        $scope.hideRawJSON = true;

        $scope.ok = function () {
            // Make sure we send back the edited element after user is done
            $modalInstance.close($scope.pod);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

/**
 * this is the main Pods Controller that deals with listing, editing and deleting Pods
 * it uses the PodsService from wp-pods-api.js
 * and the $modal service from ui.bootstrap
 *
 * all currently listed Pods are stored in $scope.pods
 */
    app.controller('PodsCtrl', function ($scope, PodsService, $modal, $log) {

        $scope.pods = []; // the list
        $scope.podType = PodsService.getPodTypes()[0]; // only needed for listing and creating a new entry

        /**
         * make sure we have a list of entries that can be displayed when the user loads the main list view
         */

        PodsService.list($scope.podType).then(function(res) {
            $scope.pods = res.data;
        });

        /**
         * to add a new pod, open a modal, show a nice view inside, then use PodsService.save()
         */
        $scope.addPod = function() {

            var newPod = {
                post_title : 'title goes here',
                post_content : 'content goes here',
                post_status : 'publish', // set this to "publish" as default, otherwise it won't show up in our next list() call
                post_type : $scope.podType

                // TODO: add other default values here or pull in from a proper Model in some service
            };

            // TODO: maybe have a different UI for adding new elements?
            var modalInstance = $modal.open({
                templateUrl: 'views/pods.editor.html',
                controller: ModalPodEditorCtrl,
                //size: size,
                resolve: {
                    editPod: function () {
                        return newPod;
                    }
                }
            });

            /**
             * after editing in the modal view is done, continue here
             */
            modalInstance.result.then(function (podAfterEdit) {

                $log.log("getting ready for saving ", podAfterEdit);
                PodsService.save(podAfterEdit).success(function(podAfterSaving) {

                    // add new element to pods in UI
                    $scope.pods[podAfterSaving.id] = podAfterSaving;

                    // TODO: handle result of adding process here or in PodsService
                    // e.g. show notification to user

                });

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * we use ui.bootstrap's $modal service for showing a modal window to edit
         * @param pod
         */
        $scope.editPod = function(pod) {

            var modalInstance = $modal.open({
                templateUrl: 'views/pods.editor.html',
                controller: ModalPodEditorCtrl,
                //size: size,
                resolve: {
                    editPod: function () {
                        return pod;
                    }
                }
            });

            modalInstance.result.then(function (podAfterEdit) {

                $log.log("getting ready for saving ", podAfterEdit);
                PodsService.save(podAfterEdit);
                // TODO: handle result of saving process here or in PodsService
                // e.g. show notification to user

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * directly delete a Pod, no questions asked
         * @param pod
         */
        $scope.deletePod = function(pod) {
            // TODO: add an "Are you sure you want to delete ____ ?" dialogue here
            PodsService.delete(pod)
                .success(function(data) {
                    // remove element from our scope
                    delete $scope.pods[pod.id];
                })
                .error(function(data, headers) {
                    // TODO: nice error handling
                    alert("could not delete pod");
                })
            ;
        };
    });