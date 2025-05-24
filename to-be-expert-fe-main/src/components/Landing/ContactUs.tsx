import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
  const { t } = useTranslation(); // Use translation hook
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        marginTop: '24px',
        width: isMobile ? '95%' : '100%',
        maxWidth: 'lg',
        position: 'relative',
        borderRadius: '16px',
        backgroundColor: '#2b2a44',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '0px 31px',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontSize: '22px',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          alignSelf: 'stretch',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'start' : 'center',
          justifyContent: isMobile ? '' : 'space-between',
          padding: '24px 0px',
          rowGap: '10px',
          textAlign: isMobile ? 'start' : '',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              lineHeight: '150%',
              fontWeight: 500,
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            {t('contactUs.title')}
          </Typography>
          <Typography
            sx={{
              fontSize: '18px',
              lineHeight: '150%',
              color: '#838291',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            {t('contactUs.subtitle')}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            width: '158px',
            borderRadius: '13px',
            backgroundColor: '#fff',
            color: '#2b2a44',
            fontSize: '14px',
            padding: '14px 20px',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          {t('contactUs.button')}
        </Button>
      </Box>
    </Box>
  );
};

export default ContactUs;
