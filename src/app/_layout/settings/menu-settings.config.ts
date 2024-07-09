// Default menu settings configurations

export interface MenuItem {
  title: string;
  icon: string;
  page: string;
  isExternalLink?: boolean;
  issupportExternalLink?: boolean;
  isStarterkitExternalLink?: boolean;
  badge: { type: string, value: string };
  submenu: {
    items: Partial<MenuItem>[];
  };
  section: string;
}

export interface MenuConfig {
  vertical_menu: {
    items: Partial<MenuItem>[]
  };
}

export interface StudentMenuConfig {
  vertical_menu: {
    items: []
  };
}

export const VsoftMenu: MenuConfig = {
  vertical_menu: {
    items: [
      {
        title: 'Dashboard',
        icon: 'la-home',
        page: '/portal',
      },
      {
        title: 'System Settings',
        icon: 'la-gear',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Grade Maintenance',
              page: '/portal/grades'
            },
            {
              title: 'Subject Maintenance',
              page: '/portal/subjects'
            },
            {
              title: 'User Administrator',
              page: '/portal/users'
            },
            {
              title: 'Student Maintenance',
              page: '/portal/students'
            },
          ]
        }
      },
      {
        title: 'Test Upload',
        icon: 'la-file-text',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Add test',
              page: '/portal/testupload'
            },
            {
              title: 'View tests',
              page: '/portal/testupload/view-tests'
            },
            {
              title: 'OTP',
              page: '/portal/testupload/tests-otp'
            },
          ]
        }
      },
      {
        title: 'Student Information',
        icon: 'la-user',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Add student',
              page: 'portal/students/add-student',
            },
            {
              title: 'View students',
              page: 'portal/students',
            },
            {
              title: 'Export student answers',
              page: 'portal/students/export-student-answers',
            },
          ]
        }
      },
      {
        title: 'Monitoring',
        icon: 'la-tv',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Live monitoring',
              page: '/portal/live-test-monitoring',
            },
            {
              title: 'Test chat ',
              page: '/portal/candidate-live-monitoring-chat',
            }           
          ]
        }
      },
      {
        title: 'Attendance Register',
        icon: 'la-pencil-square',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Attendance register',
              page: '/portal/attendance-register',
            },           
          ]
        }
      },
      {
        title: 'Admin Options',
        icon: 'la-trophy',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'User Approval',
              page: '/portal/users/approval',
            },
            {
              title: 'Centre management',
              page: '/portal/centers',
            },
            {
              title: 'Centre Attendance',
              page: '/portal/center-attendance-management',
            },
            {
              title: 'Centre Summary',
              page: '/portal/center-summary',
            },
            {
              title: 'Bulk import',
              page: '/portal/bulk-import',
            },
          ]
        }
      },
    ]
  }
};

export const CenterAdminMenu: MenuConfig = {
  vertical_menu: {
    items: [
      {
        title: 'Dashboard',
        icon: 'la-home',
        page: '/portal',
      },
      {
        title: 'System Settings',
        icon: 'la-gear',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Grade Maintenance',
              page: '/portal/grades'
            },
            {
              title: 'Subject Maintenance',
              page: '/portal/subjects'
            },
            {
              title: 'User Administrator',
              page: '/portal/users'
            },
            {
              title: 'Student Maintenance',
              page: '/portal/students'
            },
          ]
        }
      },
      {
        title: 'Test Upload',
        icon: 'la-file-text',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Add test',
              page: '/portal/testupload'
            },
            {
              title: 'View tests',
              page: '/portal/testupload/view-tests'
            },
            {
              title: 'OTP',
              page: '/portal/testupload/tests-otp'
            },
          ]
        }
      },
      {
        title: 'Student Information',
        icon: 'la-user',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Add student',
              page: 'portal/students/add-student',
            },
            {
              title: 'View students',
              page: 'portal/students',
            },
            {
              title: 'Export student answers',
              page: ' portal/students/export-student-answers',
            },
          ]
        }
      },
      {
        title: 'Monitoring',
        icon: 'la-tv',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Live monitoring',
              page: '/portal/live-test-monitoring',
            },
            {
              title: 'Test chat ',
              page: '/portal/candidate-live-monitoring-chat',
            }           
          ]
        }
      },
      {
        title: 'Attendance Register',
        icon: 'la-pencil-square',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Attendance register',
              page: '/portal/attendance-register',
            },           
          ]
        }
      },
      {
        title: 'Admin Options',
        icon: 'la-trophy',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'User Approval',
              page: '/portal/users/approval',
            },
            {
              title: 'Centre Attendance',
              page: '/portal/center-attendance-management',
            },
          ]
        }
      },
    ]
  }
};

export const CenterUserMenu: MenuConfig = {
  vertical_menu: {
    items: [
      {
        title: 'Dashboard',
        icon: 'la-home',
        page: '/portal',
      },
      {
        title: 'System Settings',
        icon: 'la-gear',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Grade Maintenance',
              page: '/portal/grades'
            },
            {
              title: 'Subject Maintenance',
              page: '/portal/subjects'
            },
            {
              title: 'User Administrator',
              page: '/portal/users'
            },
            {
              title: 'Student Maintenance',
              page: '/portal/students'
            },
          ]
        }
      },
      {
        title: 'Test Upload',
        icon: 'la-file-text',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Add test',
              page: '/portal/testupload'
            },
            {
              title: 'View tests',
              page: '/portal/testupload/view-tests'
            },
            {
              title: 'OTP',
              page: '/portal/testupload/tests-otp'
            },
          ]
        }
      },
      {
        title: 'Student Information',
        icon: 'la-user',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Add student',
              page: 'portal/students/add-student',
            },
            {
              title: 'View students',
              page: 'portal/students',
            },
            {
              title: 'Export student answers',
              page: '/portal/students/export-student-answers',
            },
          ]
        }
      },
      {
        title: 'Monitoring',
        icon: 'la-tv',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Live monitoring',
              page: '/portal/live-test-monitoring',
            },
            {
              title: 'Test chat ',
              page: '/portal/candidate-live-monitoring',
            }           
          ]
        }
      },
      {
        title: 'Attendance Register',
        icon: 'la-pencil-square',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Attendance register',
              page: '/portal/attendance-register',
            },           
          ]
        }
      }
    ]
  }
};

export const StudentUserMenu: StudentMenuConfig = {
  vertical_menu: {
    items: [
    
    ]
  }
};