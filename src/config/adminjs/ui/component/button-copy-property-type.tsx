import { BasePropertyComponentProps, useTranslation } from 'adminjs';
import { Box, Label } from '@adminjs/design-system';
import ButtonCopy from './button-copy.js';

export default function ButtonCopyPropertyType(props: BasePropertyComponentProps) {
  const { record, property } = props;
  const { params } = record;
  const content = params[property.name];
  const { tl } = useTranslation();

  return (
    <Box mb={24}>
      <Label variant="light">{tl(property.label)}</Label>
      <ButtonCopy content={content} alertMessage="Key copied" />
    </Box>
  );
}
