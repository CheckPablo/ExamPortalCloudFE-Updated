import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { PublicLayoutComponent } from './_layout/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './_layout/private-layout/private-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login';
import { IndexComponent } from './public/index/index.component';
import { InvigilatorLoginComponent } from './public/invigilator-login/invigilator-login.component';
import { StudentLoginComponent } from './public/student-login/student-login.component';
import { RegisterComponent } from './public/register/register.component';
import { ScanDocumentComponent } from './public/scan-document/scan-document.component';


const appRoutes: Routes = [
  // Public layout
  { path: '', component: IndexComponent },
  { path: 'invigilator-login', component: InvigilatorLoginComponent },
  { path: 'scan-document', component: ScanDocumentComponent },
  { path: 'student-login', component: StudentLoginComponent },
 
  { path: 'register', component: PublicLayoutComponent, children: [{ path: '', component: RegisterComponent },]},
  //{path: 'restricted-page', component: RestrictedPageComponent, canActivate: [MicrosoftLoginGuard]},
 
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      { path: 'logout', component: LoginComponent, canActivate: [AuthGuard] },
      {
        path: 'portal', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
        , canActivate: [AuthGuard]
      },
    ],
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes, { scrollOffset: [0, 0], scrollPositionRestoration: 'top'});
