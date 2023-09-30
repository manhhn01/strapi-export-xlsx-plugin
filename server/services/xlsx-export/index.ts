import { Strapi } from '@strapi/strapi';
import utils from '@strapi/utils';
import XLSX from 'xlsx';

export default ({ strapi }: { readonly strapi: Strapi }) => ({
  async xlsxExport(exportCollection: string) {
    const ctx = strapi.requestContext.get();

    const entries = await strapi.entityService.findMany(exportCollection as any);
    if (!entries) {
      throw new utils.errors.NotFoundError();
    }

    const sanitizedEntries = await utils.sanitize.contentAPI.output(entries, strapi.getModel(exportCollection), {
      auth: ctx.auth,
    });

    const worksheet = XLSX.utils.json_to_sheet(Array.isArray(sanitizedEntries) ? sanitizedEntries : [sanitizedEntries]);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, exportCollection.split('.').pop() || 'worksheet');

    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  },
});
