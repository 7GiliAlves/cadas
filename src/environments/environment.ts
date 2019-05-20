// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD9g0jaTBLfpF1mfsHZodW5hCKQrgvOELc',
    authDomain: 'cadas-app.firebaseapp.com',
    databaseURL: 'https://cadas-app.firebaseio.com',
    projectId: 'cadas-app',
    storageBucket: 'cadas-app.appspot.com',
    messagingSenderId: '1048118081182'
  }
  // firebase: {
  //   apiKey: 'AIzaSyBh4Xz1noIJFnRMBF9jWdVyPyy8B-whub0',
  //   authDomain: 'cadas-elevacao.firebaseapp.com',
  //   databaseURL: 'https://cadas-elevacao.firebaseio.com',
  //   projectId: 'cadas-elevacao',
  //   storageBucket: 'cadas-elevacao.appspot.com',
  //   messagingSenderId: '598678742211'
  // }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
