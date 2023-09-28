import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { readonly strapi: Strapi }) => ({
  async xlsxExport(ctx: any) {
    const { collection: exportCollection } = ctx.request.body;

    const xlsxBuffer = await strapi.plugin('xlsx-export').service('xlsxService').xlsxExport(exportCollection);

    ctx.body = xlsxBuffer;
  },
});
