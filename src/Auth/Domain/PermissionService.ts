export enum Permission {
  // User permissions
  USER_CREATE = 'USER_CREATE',
  USER_READ = 'USER_READ',
  USER_UPDATE = 'USER_UPDATE',
  USER_DELETE = 'USER_DELETE',
  
  // Business permissions
  BUSINESS_CREATE = 'BUSINESS_CREATE',
  BUSINESS_READ = 'BUSINESS_READ',
  BUSINESS_UPDATE = 'BUSINESS_UPDATE',
  BUSINESS_DELETE = 'BUSINESS_DELETE',
  
  // Product permissions
  PRODUCT_CREATE = 'PRODUCT_CREATE',
  PRODUCT_READ = 'PRODUCT_READ',
  PRODUCT_UPDATE = 'PRODUCT_UPDATE',
  PRODUCT_DELETE = 'PRODUCT_DELETE',
  
  // Order permissions
  ORDER_CREATE = 'ORDER_CREATE',
  ORDER_READ = 'ORDER_READ',
  ORDER_UPDATE = 'ORDER_UPDATE',
  ORDER_DELETE = 'ORDER_DELETE',
  
  // Client permissions
  CLIENT_CREATE = 'CLIENT_CREATE',
  CLIENT_READ = 'CLIENT_READ',
  CLIENT_UPDATE = 'CLIENT_UPDATE',
  CLIENT_DELETE = 'CLIENT_DELETE',
  
  // Report permissions
  REPORT_GENERATE = 'REPORT_GENERATE',
  REPORT_VIEW = 'REPORT_VIEW',
  REPORT_EXPORT = 'REPORT_EXPORT',
}

export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  CLIENT = 'CLIENT',
}

export interface PermissionService {
  hasPermission(role: string, permission: Permission): Promise<boolean>;
  getPermissionsByRole(role: string): Promise<Permission[]>;
}