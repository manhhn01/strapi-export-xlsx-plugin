// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (policyContext, config, { strapi }) => {
  if (policyContext.state.user.roles.some((role: Record<string, unknown>) => role.name === 'strapi-super-admin')) {
    return true;
  }

  const { collection: exportCollection } = policyContext.request.body;

  if (!exportCollection) {
    return false;
  }

  const { userAbility } = policyContext.state;
  const canExport = userAbility.can('plugin::xlsx-export.xlsx-export');

  const collectionPermissionChecker = strapi
    .plugin('content-manager')
    .service('permission-checker')
    .create({ userAbility, model: exportCollection });

  if (canExport && collectionPermissionChecker.can.read()) {
    return true;
  }

  return false;
};
