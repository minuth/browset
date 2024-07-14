import React from 'react';
import { Box, Button, H2, H5, Illustration, IllustrationProps, Text } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';
import { useTranslation } from 'adminjs';

const pageHeaderHeight = 300;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;

export const DashboardHeader: React.FC = () => {
  const { translateMessage } = useTranslation();
  return (
    <Box data-css="default-dashboard">
      <Box
        position="relative"
        overflow="hidden"
        bg="white"
        height={pageHeaderHeight}
        py={pageHeaderPaddingY}
        px={['default', 'lg', pageHeaderPaddingX]}
      >
        <Text textAlign="center" color="grey100">
          <H2 fontWeight="bold">{translateMessage('welcomeOnBoard_title')}</H2>
          <Text opacity={0.8}>{translateMessage('welcomeOnBoard_subtitle')}</Text>
        </Text>
      </Box>
    </Box>
  );
};

type BoxType = {
  variant: string;
  title: string;
  subtitle: string;
  href: string;
};

const Card = styled(Box)`
  display: ${({ flex }): string => (flex ? 'flex' : 'block')};
  color: ${({ theme }) => theme.colors.grey100};
  height: 100%;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.space.md};
  transition: all 0.1s ease-in;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary60};
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }

  & .dsc-icon svg,
  .gh-icon svg {
    width: 64px;
    height: 64px;
  }
`;

Card.defaultProps = {
  variant: 'container',
  boxShadow: 'card',
};

export const Dashboard: React.FC = () => {
  const { translateMessage, translateButton } = useTranslation();

  return (
    <Box>
      <Box
        mt={['xl', 'xl']}
        mb="xl"
        mx={[0, 0, 0, 'auto']}
        px={['default', 'lg', 'xxl', '0']}
        position="relative"
        flex
        flexDirection="row"
        flexWrap="wrap"
        width={[1, 1, 1, 1024]}
      >
        <Card width={1} m="lg">
          <Text textAlign="center">
            <img style={{ maxWidth: '300px' }} src="/logo.svg" />
            <H2 fontWeight="bold">{translateMessage('welcomeOnBoard_title')}</H2>
            <Text mt="xxl">
              <Button as="a" variant="contained" href="/admin/resources/Project">
                {translateButton('viewProject')}
              </Button>
            </Text>
          </Text>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
