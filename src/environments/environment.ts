// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'default',
  firebase: {
    config : {
      apiKey: "AIzaSyCYGqGYkTM0NVEDpOpibHOaxBeCEmICq3w",
      authDomain: "ecommerce-gye-efms.firebaseapp.com",
      projectId: "ecommerce-gye-efms",
      storageBucket: "ecommerce-gye-efms.appspot.com",
      messagingSenderId: "916014801557",
      appId: "1:916014801557:web:8e423784ae3f9666a3b19c"
    }
  },
  actionCodeSettings: {
    url: 'http://localhost:5200/demo'//'http://localhost:5200/profile/new'
    ,
    handleCodeInApp: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
