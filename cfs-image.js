/*
 Copyright (c) 2015, Per Bernhardsson
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this
 list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
angular.module('lavan-cfs-image', ['angular-meteor'])
	.controller('CfsImageController', ['$scope', '$meteor', 'cfsImage',
		function ($scope, $meteor, cfsImage) {
			var self = $scope;
			$meteor.subscribe(cfsImage.subscription).then(function () {
				$meteor.autorun(self, function () {
					var imageId = self.getReactively('imageId');
					if (_.isEmpty(imageId))
						return;
					var store = self.getReactively('store');
					var query = _.isEmpty(store) ? {} : {store: store};
					var image = cfsImage.collection.findOne(imageId);
					if (_.isUndefined(image))
						self.imageUrl = "";
					else
						self.imageUrl = image.url(query);
				});
			});
		}
	])
	.directive('cfsImage', function () {
		return {
			scope: {
				imageId: '=',
				store: '@',
				collection: '@'
			},
			restrict: 'E',
			replace: true,
			template: '<img src="{{imageUrl}}">',
			controller: 'CfsImageController'
		}
	})
	.controller('CfsBackgroundController', ['$scope', '$meteor', 'cfsImage',
		function ($scope, $meteor, cfsImage) {
			var self = $scope;
			$meteor.subscribe(cfsImage.subscription).then(function () {
				$meteor.autorun(self, function () {
					var element = self.getReactively('element');
					if (_.isUndefined(element))
						return;
					var imageId = self.getReactively('cfsBackground');
					if (_.isEmpty(imageId))
						return;
					var store = self.getReactively('cfsStore');
					var position = self.getReactively('cfsPosition');
					var size = self.getReactively('cfsSize');
					var repeat = self.getReactively('cfsRepeat');
					var query = _.isEmpty(store) ? {} : {store: store};
					var image = cfsImage.collection.findOne(imageId);
					if (_.isUndefined(image))
						element.style.backgroundImage = '';
					else
						element.style.backgroundImage = 'url(' + image.url(query) + ')';
					if (!_.isUndefined(position))
						element.style.backgroundPosition = position;
					if (!_.isUndefined(size))
						element.style.backgroundSize = size;
					element.style.backgroundRepeat = repeat || 'no-repeat';
				});
			});
		}
	])
	.directive('cfsBackground', function () {
		return {
			scope: {
				cfsBackground: '=',
				cfsStore: '@',
				cfsPosition: '@',
				cfsSize: '@',
				cfsRepeat: '@',
				cfsCollection: '@'
			},
			restrict: 'A',
			controller: 'CfsBackgroundController',
			link: function (scope, element, attrs) {
				scope.element = element[0];
			}
		}
	})
	.provider('cfsImage', function () {
		// Default collection 'Images'.
		if (!_.isUndefined(Images)) {
			this.collection = Images;
		}
		// Default subscription 'images'.
		this.subscription = 'images';

		this.setCollection = function (collection) {
			this.collection = collection;
		};
		this.setSubscription = function (subscription) {
			this.subscription = subscription;
		};
		this.$get = function () {
			return this;
		};
	});
