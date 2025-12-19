import { includes } from "zod";
import { Permission,Role } from "../Domain/PermissionService";



export class RolePermissionMap {
    private static readonly permissions:Record<Role,Permission[]> = {
        [Role.ADMIN]: [
      // All permissions
      Permission.USER_CREATE,
      Permission.USER_READ,
      Permission.USER_UPDATE,
      Permission.USER_DELETE,
      Permission.BUSINESS_CREATE,
      Permission.BUSINESS_READ,
      Permission.BUSINESS_UPDATE,
      Permission.BUSINESS_DELETE,
      Permission.PRODUCT_CREATE,
      Permission.PRODUCT_READ,
      Permission.PRODUCT_UPDATE,
      Permission.PRODUCT_DELETE,
      Permission.ORDER_CREATE,
      Permission.ORDER_READ,
      Permission.ORDER_UPDATE,
      Permission.ORDER_DELETE,
      Permission.CLIENT_CREATE,
      Permission.CLIENT_READ,
      Permission.CLIENT_UPDATE,
      Permission.CLIENT_DELETE,
      Permission.REPORT_GENERATE,
      Permission.REPORT_VIEW,
      Permission.REPORT_EXPORT,
    ],
    [Role.MANAGER]: [
      Permission.USER_READ,
      Permission.BUSINESS_READ,
      Permission.BUSINESS_UPDATE,
      Permission.PRODUCT_CREATE,
      Permission.PRODUCT_READ,
      Permission.PRODUCT_UPDATE,
      Permission.PRODUCT_DELETE,
      Permission.ORDER_CREATE,
      Permission.ORDER_READ,
      Permission.ORDER_UPDATE,
      Permission.CLIENT_CREATE,
      Permission.CLIENT_READ,
      Permission.CLIENT_UPDATE,
      Permission.REPORT_GENERATE,
      Permission.REPORT_VIEW,
    ],
    [Role.EMPLOYEE]: [
      Permission.PRODUCT_READ,
      Permission.ORDER_CREATE,
      Permission.ORDER_READ,
      Permission.ORDER_UPDATE,
      Permission.CLIENT_READ,
    ],
    [Role.CLIENT]: [
      Permission.ORDER_CREATE,
      Permission.ORDER_READ,
      Permission.PRODUCT_READ,
    ],
    
    };


    static getPermissions(role:Role):Permission[] {
        return this.permissions[role] || [];
    }

    static hasPermission(role:Role, permission:Permission) : boolean {
        return this.permissions[role]?.includes(permission) || false;
    }
}