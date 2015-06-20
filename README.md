# cfs-image

Angular directive to easily show images stored in a Collection FS collection.

###Uses:
* [Urigo/angular-meteor](https://github.com/Urigo/angular-meteor)
* [cfs/collection](https://atmospherejs.com/cfs/collection)

## Usage

### Installing

```bash
$ meteor add lavan:cfs-image
```

### App initialization

If you have a module called myModule, you can initialize your app like you would normally and by specifying lavan-cfs-image as a dependency:

```js
var app = angular.module('myModule', ['lavan-cfs-image']);
```

### Directive

#### Name
`cfs-image`

#### Attributes
* `image-id`: Angular expression resolving to a CFS Object ID.
* `store`: The name of the CFS Store containing the image. If this value isn't specified the first store in the collection store list is used by default.

### Data binding

```html
<cfs-image image-id="imageId" store="thumbs"></cfs-image>
```

```javascript
Images = new FS.Collection("images", {
 	stores: [
		new FS.Store.GridFS("images"),
		new FS.Store.GridFS("thumbs")
	],
	filter: {
		allow: {
			contentTypes: ['image/*']
		}
	}
});
app.controller('ImageContainerController', function($scope) {
	$scope.imageId = Meteor.user().profile.userImage;
});
```

### Configuration

By default the cfs-image will use a collection named 'Images'. This can be changed using
the cfsImageProvider.

```javascript
MyImageCollection = new FS.Collection("myImageCollection");

app.config(function(cfsImageProvider) {
	cfsImageProvider.setCollection(MyImageCollection);
});
```
