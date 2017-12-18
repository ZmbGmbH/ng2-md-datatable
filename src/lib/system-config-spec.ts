/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    // RxJS
    'rxjs': 'vendor/rxjs',

    // HammerJS
    'hammerjs': 'vendor/hammerjs/hammer.js',

    // Angular specific mappings.
    '@angular/core': 'vendor/@angular/core/bundles/core.umd.js',
    '@angular/core/testing': 'vendor/@angular/core/bundles/core-testing.umd.js',
    '@angular/common': 'vendor/@angular/common/bundles/common.umd.js',
    '@angular/common/http': 'vendor/@angular/common/bundles/common-http.umd.js',
    '@angular/common/testing': 'vendor/@angular/common/bundles/common-testing.umd.js',
    '@angular/compiler': 'vendor/@angular/compiler/bundles/compiler.umd.js',
    '@angular/compiler/testing': 'vendor/@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/forms': 'vendor/@angular/forms/bundles/forms.umd.js',
    '@angular/forms/testing': 'vendor/@angular/forms/bundles/forms-testing.umd.js',
    '@angular/animations': 'vendor/@angular/animations/bundles/animations.umd.js',
    '@angular/animations/browser': 'vendor/@angular/animations/bundles/animations-browser.umd.js',
    '@angular/http': 'vendor/@angular/http/bundles/http.umd.js',
    '@angular/http/testing': 'vendor/@angular/http/bundles/http-testing.umd.js',
    '@angular/platform-browser': 'vendor/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser/testing':
      'vendor/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic':
      'vendor/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/platform-browser-dynamic/testing':
      'vendor/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/material': 'vendor/@angular/material/bundles/material.umd.js',
    '@angular/cdk/bidi': 'vendor/@angular/cdk/bundles/cdk-bidi.umd.js',
    '@angular/cdk/coercion': 'vendor/@angular/cdk/bundles/cdk-coercion.umd.js',
    '@angular/cdk/platform': 'vendor/@angular/cdk/bundles/cdk-platform.umd.js',
    '@angular/cdk/keycodes': 'vendor/@angular/cdk/bundles/cdk-keycodes.umd.js',
    '@angular/cdk/a11y': 'vendor/@angular/cdk/bundles/cdk-a11y.umd.js',
    '@angular/cdk/overlay': 'vendor/@angular/cdk/bundles/cdk-overlay.umd.js',
    '@angular/cdk/portal': 'vendor/@angular/cdk/bundles/cdk-portal.umd.js',
    '@angular/cdk/collections': 'vendor/@angular/cdk/bundles/cdk-collections.umd.js',
    '@angular/cdk/observers': 'vendor/@angular/cdk/bundles/cdk-observers.umd.js',
    '@angular/cdk/accordion': 'vendor/@angular/cdk/bundles/cdk-accordion.umd.js',
    '@angular/cdk/scrolling': 'vendor/@angular/cdk/bundles/cdk-scrolling.umd.js',
    '@angular/cdk/layout': 'vendor/@angular/cdk/bundles/cdk-layout.umd.js',
    '@angular/cdk/table': 'vendor/@angular/cdk/bundles/cdk-table.umd.js',
    '@angular/cdk/stepper': 'vendor/@angular/cdk/bundles/cdk-stepper.umd.js',
    'tslib': 'vendor/tslib/tslib.js',
  },
  packages: {
    // Thirdparty barrels.
    'rxjs': { main: 'index' },
    'ng2-md-datatable': {
      format: 'cjs',
      main: 'ng2-md-datatable.umd.js'
    },
    // Set the default extension for the root package, because otherwise the demo-app can't
    // be built within the production mode. Due to missing file extensions.
    '.': {
      defaultExtension: 'js'
    }
  },
});
