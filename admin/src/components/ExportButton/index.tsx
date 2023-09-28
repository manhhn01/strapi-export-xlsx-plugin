import { Button } from '@strapi/design-system';
import React from 'react';
import { useIntl } from 'react-intl';

import getTrad from '../../utils/getTrad';

export const ExportButton = () => {
  const { formatMessage } = useIntl();
  const []

  return <Button>{formatMessage({ id: getTrad('export.button') })}</Button>
};
