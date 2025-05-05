export interface BasePermissions {
    create: boolean;
    delete: boolean;
    update: boolean;
    view:   boolean;
}

export interface Permissions {
    teacher:    BasePermissions;
    admin:      BasePermissions;
    leadership: BasePermissions;
    district:   BasePermissions;
    parent:     BasePermissions;
}

export class CreateRoleDto {
    name: string;
    permissions: Permissions;
}
