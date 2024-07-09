export const environment = {
  port: 13100,
    production: true,

    domain: 'examportal-cloud.co.za',
    //domain: '154.0.166.61:7086',

    baseUrlStage: 'https://examportal-cloud.co.za/',
    //baseUrlStage: 'http://154.0.166.61:7086/',

    baseUrlSandbox: 'https://examportal-cloud.co.za/',
    //baseUrlSandbox:'http://154.0.166.61:7086/',
  
    baseGetUrlSandbox: 'https://examportal-cloud.co.za/',
    //baseGetUrlSandbox:'http://154.0.166.61:7086/',
    
    apiUrl: 'https://examportal-cloud.co.za/',
    //apiUrl: 'http://154.0.166.61:7086', 

    apiUrlSandbox: 'https://examportal-cloud.co.za/',
    //apiUrlSandbox: 'http://154.0.166.61:7086/', 

    sebLaunchUrlSandbox:'seb://examportal-cloud.co.za/',
    //sebLaunchUrlSandbox: 'seb://154.0.166.61:7086/',

    sebLaunchUrlSandboxWithS:'sebs://examportal-cloud.co.za/',
    //sebLaunchUrlSandboxWithS: 'sebs://154.0.166.61:7086/',

    syncfusionHostedUrl: 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer',
    syncfusionHostedWordUrl: 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/',
    appVersion: 'v2.0.0',
    appName: 'Exam Portal Cloud', 
    firebaseConfig: {
      apiKey: "AIzaSyDwgYKpDdAEZ3AJ7bXVNcgOCrrQCJr78ds",
      authDomain: "examportalcloud-6f5cd.firebaseapp.com",
      databaseURL: "https://examportalcloud-6f5cd.firebaseio.com",
      projectId: "examportalcloud-6f5cd",
      storageBucket: "examportalcloud-6f5cd.appspot.com",
      messagingSenderId: "1021622419179",
      appId: "1:1021622419179:web:39ec15ed9f4d95a14d88ae",
      measurementId: "G-64VVTWKBDV"
  },  
  msalConfig: {
    auth:{
      //clientId: "32952808-ce6f-4b50-92c4-015cce2575a7", // Application (client) ID from the app registration
      //clientId: "054b64c2-eff6-48ce-9d8a-8c8d20a7284d", // Application (client) ID from the app registration
      clientId:"9b50d453-3025-42e6-9e49-cf3357f36bea",  // Application (client) ID from the app registration
      authority:"https://login.microsoftonline.com/common", // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
      redirectUri: "https://examportal-cloud.co.za/portal", // This is your redirect URI
      postLogoutRedirectUri: 'https://examportal-cloud.co.za'
      }
  },
  cache: {
    cacheLocation: "localStorage",
    //storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
  },
  apiConfig: {
    scopes: [
      'openid',
      'offline_access'
    ],
    uri: 'https://examportal.co.za/'
  }
  }
  
  