export default {
  type: 'admin',
  routes: [
    {
      method: 'POST',
      path: '/export',
      handler: 'xlsxExport.xlsxExport',
      config: {
        policies: ['plugin::xlsx-export.xlsx-export'],
      }
    }
  ]
}
