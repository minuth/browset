import { flat, ShowPropertyProps, useTranslation } from 'adminjs';
import { Section, Box, Label, FormGroup, Input } from '@adminjs/design-system';

export default function EnvironmentVariableList(props: ShowPropertyProps) {
  const { record, property, resource } = props;
  const objectValue: Record<string, string> = flat.get(record.params, property.path) ?? {};
  const { tp } = useTranslation();

  return (
    <Box>
      <Label variant="light">{tp(property.propertyPath, resource.id)}</Label>
      <Section>
        {Object.entries(objectValue).map(([key, value]) => (
          <Box key={key} flex gap={16} mb="lg" style={{ gap: '8px' }}>
            <FormGroup mr="lg" mb="0px">
              <Input value={key} disabled />
            </FormGroup>
            <FormGroup mb="0px">
              <Input value={value} disabled />
            </FormGroup>
          </Box>
        ))}
      </Section>
    </Box>
  );
}
