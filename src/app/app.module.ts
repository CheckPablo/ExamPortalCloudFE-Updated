import { NgModule, isDevMode } from '@angular/core';
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig
} from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  NgbModule,
  NgbCarouselConfig,
  NgbModalConfig
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './core/guards/auth.guard';
import { AlertComponent } from './_helpers/alert.component';
import { AlertService } from './_services/alert.service';
import { ChartApiService } from './_services/chart.api';
import { TableApiService } from './_services/table-api.service';
import { ApplicationApiService } from './_services/application-api.service';
import { QuillInitializeServiceService } from './_services/quill-initialize-service.service';
import { routing } from './app.routing';

// Components
import { AppComponent } from './app.component';
import { SettingsModule } from './_layout/settings/settings.module';
import { ThemeSettingsConfig } from './_layout/settings/theme-settings.config';
import { HeaderComponent } from './_layout/header/header.component';
import { VerticalComponent as HeaderVerticalComponent } from './_layout/header/vertical/vertical.component';
import { HorizontalComponent as HeaderHorizontalComponent } from './_layout/header/horizontal/horizontal.component';
import { FullLayoutNavbarComponent } from './_layout/header/full-layout-navbar/full-layout-navbar.component';
import { FooterComponent } from './_layout/footer/footer.component';
import { NavigationComponent as AppNavigationComponent } from './_layout/navigation/navigation.component';
import { PublicLayoutComponent } from './_layout/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './_layout/private-layout/private-layout.component';
import { LoginComponent } from './login';
import { NavbarService } from './_services/navbar.service';
import { VerticalnavComponent } from './_layout/navigation/verticalnav/verticalnav.component';
import { HorizontalnavComponent } from './_layout/navigation/horizontalnav/horizontalnav.component';
import { NgScrollbarModule } from 'ngx-scrollbar'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// spinner
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { DeviceDetectorService } from './_services/device-detector.service';
import { RouterModule } from '@angular/router';
import { CustomizerComponent } from './_layout/customizer/customizer.component';
import { NgChartsModule } from 'ng2-charts';
import { PartialsModule } from './content/partials/partials.module';
import { BreadcrumbModule } from './_layout/breadcrumb/breadcrumb.module';
import { HorizontalCustomizerComponent } from './_layout/customizer/horizontal-customizer/horizontal-customizer.component';
import { BlockTemplateComponent } from './_layout/blockui/block-template.component';
//import { BlockUIModule } from 'ng-block-ui';
import { BlockUIModule } from "primeng/blockui";
import { MatchHeightModule } from './content/partials/general/match-height/match-height.module';
import { FullLayoutComponent } from './_layout/full-layout/full-layout.component';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from './_api/user/user.service';
import { IndexComponent } from './public/index/index.component';
import { InvigilatorLoginComponent } from './public/invigilator-login/invigilator-login.component';
import { StudentLoginComponent } from './public/student-login/student-login.component';
import { ScanDocumentComponent } from './public/scan-document/scan-document.component';
import { RegisterComponent } from './public/register/register.component';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { CenterAdminMenu, CenterUserMenu, VsoftMenu, StudentUserMenu } from './_layout/settings/menu-settings.config';
import { MsalModule, MsalService, MSAL_INSTANCE , MsalGuard, MsalBroadcastService, MsalInterceptorConfiguration, MSAL_GUARD_CONFIG, MsalGuardConfiguration, MSAL_INTERCEPTOR_CONFIG, MsalRedirectComponent} from "@azure/msal-angular";
import { BrowserCacheLocation, IPublicClientApplication, InteractionType, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import {NgxPhotoEditorModule} from "ngx-photo-editor";
import { PopUpComponent } from "./content/pop-up/pop-up.component";
import { PopUpTestUploadComponent } from "./content/pop-up-testupload/pop-uptestupload.component"
import { CommonModule } from '@angular/common';

//import { ServiceWorkerModule } from '@angular/service-worker';
  export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: environment.msalConfig.auth,
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage
      //storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        //loggerCallback,
        logLevel: LogLevel.Verbose,
        piiLoggingEnabled: false
      }
    }
  });
}
 
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.apiConfig.uri, environment.apiConfig.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
} 

 export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  const auth= { 
    interactionType: InteractionType.Redirect,
    //authRequest: loginRequest
  };
  return(auth as MsalGuardConfiguration)
}  

@NgModule({
    declarations: [
        AppComponent,
        PublicLayoutComponent,
        PrivateLayoutComponent,
        HeaderComponent,
        FullLayoutNavbarComponent,
        //GradesPipe, 
        // AdvancedSortableDirective, 
        HeaderHorizontalComponent,
        HeaderVerticalComponent,
        FooterComponent,
        AppNavigationComponent,
        AlertComponent,
        LoginComponent,
        VerticalnavComponent,
        HorizontalnavComponent,
        CustomizerComponent,
        HorizontalCustomizerComponent,
        BlockTemplateComponent,
        FullLayoutComponent,
        IndexComponent,
        InvigilatorLoginComponent,
        RegisterComponent,
        StudentLoginComponent,
        ScanDocumentComponent,
    ],
    providers: [
        AuthGuard,
        ChartApiService,
        AlertService,
        NavbarService,
        TableApiService,
        ApplicationApiService,
        DeviceDetectorService,
        QuillInitializeServiceService,
        UserService,
        NgbCarouselConfig,
        NgbModalConfig,
        /*{ provide: LocationStrategy, useClass: HashLocationStrategy },*/
        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
        { provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory },
        MsalService,
        MsalGuard,
        MsalBroadcastService
    ],
    bootstrap: [AppComponent],
    //MsalRedirectComponent
    exports: [RouterModule],
    imports: [
        BrowserModule,
        CommonModule,
        //NgxPicaModule,
        PartialsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgChartsModule,
        BrowserAnimationsModule,
        MatchHeightModule,
        BreadcrumbModule,
        NgbModule,
        FormsModule,
        RouterModule,
        routing,
        //Settings modules
        SettingsModule.forRoot(ThemeSettingsConfig, VsoftMenu, CenterAdminMenu, CenterUserMenu, StudentUserMenu),
        NgScrollbarModule,
        //ScrollbarModule,
        ToastrModule.forRoot({
            maxOpened: 1,
            /*preventDuplicates: true,*/
            autoDismiss: true
        }),
        NgxSpinnerModule,
        LoadingBarRouterModule,
        Ng2ImgMaxModule,
        NgxPhotoEditorModule,
        /*  ServiceWorkerModule.register('ngsw-worker.js', {
           enabled: !isDevMode(),
           // Register the ServiceWorker as soon as the application is stable
           // or after 30 seconds (whichever comes first).
           registrationStrategy: 'registerWhenStable:30000'
         }), */
        MsalModule,
        PopUpComponent, 
        PopUpTestUploadComponent
    ]
})
export class AppModule { }
