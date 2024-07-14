import { Icon, Button } from '@adminjs/design-system';
import { useNotice } from 'adminjs';

export type Props = { content: string; alertMessage?: string };

export default function ButtonCopy(props: Props) {
  const { content, alertMessage = 'Contents Copied' } = props;
  const alert = useNotice();

  const copyContent = () => {
    navigator.clipboard.writeText(content);
    alert({
      message: alertMessage,
      type: 'info',
    });
  };

  return (
    <Button size="icon" variant="outlined" onClick={copyContent}>
      {content} <Icon icon="Copy" />
    </Button>
  );
}
