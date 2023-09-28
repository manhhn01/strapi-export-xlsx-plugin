import { Strapi } from '@strapi/strapi';

export default async ({ strapi }: { readonly strapi: Strapi }) => {
  // bootstrap phase

  // Register permission actions.
  const actions = [
    {
      section: 'plugins',
      displayName: 'Export the data to xlsx',
      uid: 'xlsx-export',
      pluginName: 'xlsx-export',
    },
  ];

  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
