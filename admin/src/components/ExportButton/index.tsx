import { Button } from '@strapi/design-system';
import { CheckPermissions, useFetchClient, useNotification } from '@strapi/helper-plugin';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

import getTrad from '../../utils/getTrad';

const slugRegex = /collectionType\/([^\/?]+)/;

export const ExportButton = () => {
  const { formatMessage } = useIntl();
  const { post } = useFetchClient();
  const toggleNotification = useNotification();
  const { pathname } = useLocation();

  const slug = pathname.match(slugRegex)?.[1];

  const [isExporting, setIsExporting] = useState<boolean>(false);

  const onExport = async () => {
    setIsExporting(true);

    try {
      if (!slug) {
        throw new Error('No slug');
      }

      toggleNotification({
        type: 'info',
        message: { id: getTrad('export.message.processing') },
      });

      const response = await post(
        '/xlsx-export/export',
        {
          collection: slug,
        },
        { responseType: 'blob' },
      );

      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(response.data);
      a.download = 'export.xlsx';
      a.click();

      window.URL.revokeObjectURL(a.href);
      a.remove();

      toggleNotification({
        type: 'info',
        message: { id: getTrad('export.message.success') },
      });
    } catch (e) {
      toggleNotification({
        type: 'warning',
        message: { id: getTrad('export.message.error') },
      });

      // eslint-disable-next-line no-console
      console.error(e);
    }

    setIsExporting(false);
  };

  return (
    <CheckPermissions permissions={[{ action: 'plugin::xlsx-export.xlsx-export', subject: null }]}>
      <Button onClick={onExport} loading={isExporting}>
        {formatMessage({ id: getTrad('export.button') })}
      </Button>
    </CheckPermissions>
  );
};
