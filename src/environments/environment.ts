export const environment = {
  production: false,
   port: 13100,

  domain: 'localhost:13100',
  baseUrl: 'http://localhost:13100/',
  //baseUrlStage: 'http://154.0.166.61:8028/',
  baseUrlSandbox:  'http://localhost:13100/',

  //baseGetUrl: 'http://154.0.166.61:7066/',
  baseGetUrlSandbox: 'http://localhost:7066/',

  apiUrl: 'http://localhost:7066/',
  //apiUrlStage: 'https://localhost:7066/', //this is the same as baseGetURL so pick one to remove
  apiUrlSandbox: 'https://localhost:7066/',

  sebLaunchUrl: 'sebs://localhost:7066/',
  sebLaunchUrlWithoutS: 'seb://localhost:7066/',
  nonSebLaunchUrl: '//localhost:7066/',
  //sebLaunchUrl2:'seb://154.0.166.61:7066/',
  sebLaunchUrlSandbox:'seb://localhost:7066/',
  sebLaunchUrlSandboxWithS:'sebs://localhost:7066/',
 
  //sebLaunchUrl: 'sebs://154.0.166.61:7066/',
  //apiUrl:'http://127.0.0.1:5066/',
  //tunnelUrl:'https://lv6xv85g-5066.uks1.devtunnels.ms:5066/',
  //mobileTunnelUrl:'https://lv6xv85g-5066.uks1.devtunnels.ms/api/InTestWrite',
     //apiUrl: 'http://154.0.166.61:7066/', 
  syncfusionHostedUrl: 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer',
  //syncfusionHostedUrl: '/Administration',
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
    redirectUri: "http://localhost:13100/portal", // This is your redirect URI
    postLogoutRedirectUri: 'http://localhost:13100/'
    }
},
cache: {
  cacheLocation: "localStorage",
  // storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
},
apiConfig: {
  scopes: [
    'openid',
    'offline_access'
  ],
  uri: 'https://examportal.co.za/'
}
}


/*Display name
:
MicrosoftSignIn
Application (client) ID
:
054b64c2-eff6-48ce-9d8a-8c8d20a7284d
Object ID
:
8f77fc50-dca2-48f5-a502-dbc4bcf79f12
Directory (tenant) ID
:
a6d95c5e-5c26-4694-91e0-27f2b9b4c274
Supported account types
:
All Microsoft account users
Client credentials
:
Add a certificate or secret
Redirect URIs
:
1 web, 0 spa, 0 public client
Application ID URI
:
Add an Application ID URI
Managed application in local directory
:
MicrosoftSignIn*/
