type RoleReqs = string | string[] | null | undefined

export type RoleConfig = {
  // Roles the calling user must have
  required?: string[],
  // Roles the calling user must not have
  forbidden?: string[],
  // Must include at least one of these roles
  selection?: string[],
}

// Adapted from: https://github.com/hapijs/hapi/blob/06d2723203ebe36cfe89528530dbf3f8d2648bcf/lib/auth.js#L420

/**
 * Creates an object that indicates which roles are required which are forbidden
 * and of which at least one needs to be present.
 *
 * For example: the following input ['+a', '!b', 'c', 'd'] will return
 * {
 *   required: ['a'],
 *   forbidden: ['b'],
 *   selection: ['c', 'd'],
 * }
 *
 * Based on how scopes work in Hapi:
 * https://hapi.dev/api/?v=20.0.0#-routeoptionsauthaccessscope
 * @param role
 */
export const roleSetup = (roleReqs: RoleReqs): RoleConfig | false => {
  if (!roleReqs) {
    return false;
  }

  const roleConfig: RoleConfig = {};
  for (const value of roleReqs) {
    const prefix = value[0];
    const type = prefix === "+" ? "required" : (prefix === "!" ? "forbidden" : "selection");
    const clean = type === "selection" ? value : value.slice(1);
    roleConfig[type] = roleConfig[type] || []
    ;(roleConfig[type] as string[]).push(clean);
  }

  return roleConfig;
};

export const validateRoleConfig = (roleReqs: RoleReqs, roles: string[] = []) => {
  const roleConfig = roleSetup(roleReqs);
  if (!roleConfig) {
    return true;
  }

  const { required, forbidden, selection } = roleConfig;

  if (required) {
    const intersection =
      required.filter((role) => roles.includes(role));
    if (intersection.length < required.length) {
      return false;
    }
  }

  if (forbidden) {
    const intersection =
      forbidden.filter((role) => roles.includes(role));
    if (intersection.length) {
      return false;
    }
  }

  if (selection) {
    const intersection =
      selection.filter((role) => roles.includes(role));
    if (!intersection.length) {
      return false;
    }
  }

  return true;
};
