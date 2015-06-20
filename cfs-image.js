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
