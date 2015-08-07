Package.describe({
	name: 'lavan:cfs-image',
	version: '0.0.2',
	// Brief, one-line summary of the package.
	summary: 'Angular directive to easily show images stored in a Collection FS collection.',
	// URL to the Git repository containing the source code for this package.
	git: 'https://github.com/Lavan/cfs-image',
	documentation: 'README.md'
});

Package.onUse(function (api) {
	api.use('cfs:collection@0.5.5', 'client');
	api.use('urigo:angular@0.8.0', 'client');
	api.versionsFrom('1.1.0.2'); // Not tested with earlier versions.
	api.addFiles('cfs-image.js', 'client');
});

Package.onTest(function (api) {
	api.use('tinytest');
	api.use('urigo:angular', 'client');
	api.use('lavan:cfs-image');
	api.addFiles('cfs-image-tests.js');
});
