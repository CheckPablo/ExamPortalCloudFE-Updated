import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { VsoftOnlyGuard } from '../core/guards/vsoft-only.guard';

const routes: Routes = [
  
  {
    path: 'centers',
    canActivate: [VsoftOnlyGuard],
    loadChildren: () => import('./centers/centers.module').then(m => m.CentersModule)
  },
  {
    path: 'grades',
    loadChildren: () => import('./grades/grades.module').then(m => m.GradesModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./student-management/student-management.module').then(m => m.StudentManagementModule)
  },
  {
    path: 'subjects',
    loadChildren: () => import('./subject-management/subject-management.module').then(m => m.SubjectManagementModule)
  }, 

  {
    path: 'testupload',
    loadChildren: () => import('./test-upload-management/test-upload-management.module').then(m => m.TestUploadManagementModule)
  },
  {
    path: 'users',
    canActivate: [AdminGuard],
    loadChildren: () => import('./user-managment/user-managment.module').then(m => m.UserManagmentModule)
  },
  {
    path: 'attendance-register',
    canActivate: [AdminGuard],
    loadChildren: () => import('./attendance-register/attendance-register.module').then(m => m.AttendanceRegisterModule)
  }, 
  {
    path: 'center-attendance-management',
    canActivate: [AdminGuard],
    loadChildren: () => import('./center-attendance-management/center-attendance-management.module').then(m => m.CenterAttendanceManagementModule)
  },
  {
    path: 'test-writing',
    loadChildren: () => import('./test-writing-management/test-writing-management.module').then(m => m.TestWritingManagementModule)
  },
  {
    path: 'student-testanswer',
    loadChildren: () => import('./student-testanswer-management/student-testanswer-management.module').then(m => m.StudentTestanswerManagementModule)
  },

  {
    path: 'student-dashboard',
    loadChildren: () =>  import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
  },
  {
    path: 'live-test-monitoring',
    canActivate: [AdminGuard],
    loadChildren: () => import('./live-test-monitoring/live-test-monitoring.module').then(m => m.LiveTestMonitoringModule)
  }, 
  {
    path: 'candidate-live-monitoring',
    canActivate: [AdminGuard],
    loadChildren: () => import('./candidate-live-monitoring/candidate-live-monitoring.module').then(m => m.CandidateLiveMonitoringModule)
  },
  {
    path: 'center-summary',
    canActivate: [AdminGuard],
    loadChildren: () => import('./center-summary/center-summary.module').then(m => m.CenterSummaryModule)
  },
  {
    path: 'bulk-import',
    canActivate: [AdminGuard],
    loadChildren: () => import('./bulk-import/bulk-import.module').then(m => m.BulkImportModule)
  },
  {
    path: 'candidate-live-monitoring-chat',
    canActivate: [AdminGuard],
    loadChildren: () => import('./candidate-live-monitoring-chat/candidate-live-monitoring-chat.module').then(m => m.CandidateLiveMonitoringChatModule)
  }, 
  {
    path: 'portal',
    loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
  },
  {
    path: '',
    redirectTo: 'portal',
    pathMatch: 'full',
    //loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
