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
			$meteor.subscribe('images').then(function () {
				$meteor.autorun(self, function () {
					var imageId = self.getReactively('imageId');
					if (_.isEmpty(imageId))
						return;
					var store = self.getReactively('store');
					var query = _.isEmpty(store) ? {} : {store: store};
					var image = cfsImage.collection.findOne(self.imageId);
					self.imageUrl = image.url(query);
				});
			});
		}
	])
	.directive('cfsImage', function () {
		return {
			scope: {
				imageId: '=',
				store: '@'
			},
			restrict: 'E',
			replace: true,
			template: '<img src="{{imageUrl}}">',
			controller: 'CfsImageController'
		}
	})
	.provider('cfsImage', function () {
		// Default collection 'Images'
		if (!_.isUndefined(Images)) {
			this.collection = Images;
		}

		this.setCollection = function (collection) {
			this.collection = collection;
		};
		this.$get = function () {
			return this;
		};
	});
