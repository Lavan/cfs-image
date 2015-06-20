Package.describe({
	name: 'lavan:cfs-image',
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: 'Angular directive to easily show images stored in a Collection FS collection.',
	// URL to the Git repository containing the source code for this package.
	git: 'https://github.com/Lavan/cfs-image',
	documentation: 'README.md'
});

Package.onUse(function (api) {
	api.use('cfs:collection', 'client');
	api.use('urigo:angular', 'client');
	api.versionsFrom('1.1.0.2');
	api.addFiles('cfs-image.js', 'client');
});

Package.onTest(function (api) {
	api.use('tinytest');
	api.use('urigo:angular', 'client');
	api.use('lavan:cfs-image');
	api.addFiles('cfs-image-tests.js');
});
