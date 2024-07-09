import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { THEME_SETTINGS_CONFIG } from './theme-settings.service';
import { MENU_SETTINGS_CONFIG } from './menu-settings.service';
import { CENTER_ADMIN_MENU_CONFIG } from './center-admin-menu.service';
import { CENTER_USER_MENU_CONFIG } from './center-user-menu.service';
import { STUDENT_ADMIN_MENU_CONFIG } from './student-admin-menu.service';

@NgModule()
export class SettingsModule {
  constructor(@Optional() @SkipSelf() parentModule: SettingsModule) {
    if (parentModule) {
      throw new Error('SettingsModule is already loaded. Import it in the AppModule only!');
    }
  }

  static forRoot(themeConfig, vsoftMenu, centerAdminMenu, centerUserMenu, studentUserMenu): ModuleWithProviders<SettingsModule> {
    return {
      ngModule: SettingsModule,
      providers: [
        {
          provide: THEME_SETTINGS_CONFIG,
          useValue: themeConfig
        },
        {
          provide: MENU_SETTINGS_CONFIG,
          useValue: vsoftMenu
        },
        {
          provide: CENTER_ADMIN_MENU_CONFIG,
          useValue: centerAdminMenu
        },
        {
          provide: CENTER_USER_MENU_CONFIG,
          useValue: centerUserMenu
        }, 
        {
          provide: STUDENT_ADMIN_MENU_CONFIG,
          useValue: studentUserMenu
        }
      ]
    };
  }
}
