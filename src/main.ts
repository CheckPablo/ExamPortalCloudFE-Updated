import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base'; 
//import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalRedirectComponent, MsalService } from "@azure/msal-angular";
//import { BrowserCacheLocation, BrowserUtils, IPublicClientApplication, InteractionType, LogLevel, PublicClientApplication } from "@azure/msal-browser";
//registerLicense('Mgo+DSMBaFt+QHJqXU1hXk5Hd0BLVGpAblJ3T2ZQdVt5ZDU7a15RRnVfR15jSHxXfkVhXn1Wdw==;Mgo+DSMBPh8sVXJ1S0R+VFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jTH1Td0dnUX9cd3BTQQ==;ORg4AjUWIQA/Gnt2VFhiQllPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtQdkRhXXdecnNTRGc=;MjI1MTkyOUAzMjMxMmUzMDJlMzBBc3J4NTdtUDl2Q1A4TVN3M0h3SzUzVlpxbld0TjdIQ09WU21tRm1oQzR3PQ==;MjI1MTkzMEAzMjMxMmUzMDJlMzBSTHFVa09qMS9HWVhIVVhPM2RRT0ZRdTgyR3Fodk95THM2amR6Q3Uva2dJPQ==;NRAiBiAaIQQuGjN/V0d+Xk9MfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5WdUViW3tWcHZdQmdb;MjI1MTkzMkAzMjMxMmUzMDJlMzBCT3cxelVUaGRjajhwUDFvcjBGaTA3YVl1SlpzVFlBYU9FZlNndWtqTDR3PQ==;MjI1MTkzM0AzMjMxMmUzMDJlMzBHOVE5SXVkMDhPbUVBa3U3UE15Y3ZiV2hlclhGYjlpNisyN20weEV3VjlJPQ==;Mgo+DSMBMAY9C3t2VFhiQllPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtQdkRhXXdecn1WRGc=;MjI1MTkzNUAzMjMxMmUzMDJlMzBKT0hwN1BXektJb3NZYlRUYjdDZVlBcjYzdmw3SnhiWUtWK2pMbHJhMkFjPQ==;MjI1MTkzNkAzMjMxMmUzMDJlMzBSNWxoVlFJNXN0bDhxSVhVUFE2eENSNk95clFZMERrdG9BRnZXanNLcmowPQ==;MjI1MTkzN0AzMjMxMmUzMDJlMzBCT3cxelVUaGRjajhwUDFvcjBGaTA3YVl1SlpzVFlBYU9FZlNndWtqTDR3PQ==')
//registerLicense('ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5WdEJjUXpac3FQRGdf')
registerLicense('ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5WdE1jXHpXdHVdRGVe');
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


