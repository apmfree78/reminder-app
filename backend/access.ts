/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// access control return a yes/no value depending on user session

import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permission to check if someone meets a criteria - yes or no
export const permissions = { ...generatedPermissions };

// Rule based functions
//  Rules can return a boolean (yes/no) or a filter which
// limits which Reminders they can access and CRUD
export const rules = {
  canManageReminders({ session }) {
    if (!isSignedIn({ session })) return false;
    // do they have the permission of canManageReminders
    if (permissions.canManageReminders({ session })) {
      return true;
    }
    // if not , do they own this item
    return { user: { id: session.itemId } };
  },
  canOrder({ session }) {
    if (!isSignedIn({ session })) return false;
    // do they have the permission of canManageReminders
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // if not , do they own this item
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }) {
    if (!isSignedIn({ session })) return false;

    // do they have the permission of canManageReminders
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // if not , do they own this item
    return { order: { user: { id: session.itemId } } };
  },
  canReadReminders({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    return true;
  },
  canManageUsers({ session }) {
    if (!isSignedIn({ session })) return false;
    // do they have the permission of canManageReminders
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // otherwise they can only update themselves
    return { id: session.itemId };
  },
};
