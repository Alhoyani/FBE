import { Box, Typography, Link, Stack, useTheme, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation(); // Use translation hook
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: isMobile ? '95%' : '100%',
        maxWidth: 'lg',
        position: 'relative',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'start' : 'center',
        justifyContent: 'space-between',
        textAlign: 'left',
        fontSize: '12px',
        color: '#838291',
        fontFamily: 'Roboto, sans-serif',
        marginBottom: '22px',
      }}
    >
      <Typography sx={{ lineHeight: '150%', fontSize: isMobile ? '12px' : '12px' }}>
        © 2024 {t('footer.brandName')}. {t('footer.allRightsReserved')}
      </Typography>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <Link
          href="#"
          underline="hover"
          color="inherit"
          sx={{ lineHeight: '150%', fontSize: isMobile ? '12px' : '12px' }}
        >
          {t('footer.privacyPolicy')}
        </Link>
        <Link
          href="#"
          underline="hover"
          color="inherit"
          sx={{ lineHeight: '150%', fontSize: isMobile ? '12px' : '12px' }}
        >
          {t('footer.termsOfService')}
        </Link>
        <Link
          href="#"
          underline="hover"
          color="inherit"
          sx={{ lineHeight: '150%', fontSize: isMobile ? '12px' : '12px' }}
        >
          {t('footer.cookieSettings')}
        </Link>
      </Stack>
    </Box>
  );
};

export default Footer;
