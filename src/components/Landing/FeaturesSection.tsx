import { Box, Typography, Card, useTheme, useMediaQuery } from '@mui/material';
import person from '@/assets/person.svg';
import heart from '@/assets/heart.svg';
import medal from '@/assets/medal.svg';
import getSelected from '@/assets/getSelected.svg';
import Grid2 from '@mui/material/Grid2'; // Import Grid2 from the experimental material components
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation(); // Use the translation hook
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      title: t('features.createPersonalizedCVs.title'),
      description: t('features.createPersonalizedCVs.description'),
      icon: person,
    },
    {
      title: t('features.userFriendlyInterface.title'),
      description: t('features.userFriendlyInterface.description'),
      icon: heart,
    },
    {
      title: t('features.standOut.title'),
      description: t('features.standOut.description'),
      icon: medal,
    },
    {
      title: t('features.getHired.title'),
      description: t('features.getHired.description'),
      icon: getSelected,
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        textAlign: 'center',
        fontSize: 38,
        color: '#2b2a44',
        fontFamily: 'Poppins',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '36px',
      }}
    >
      <Typography
        sx={{
          fontWeight: isMobile ? 700 : 600,
          lineHeight: '117%',
          maxWidth: '793px',
          fontSize: isMobile ? '26px' : '38px',
          fontFamily: 'Poppins',
          marginBottom: '36px',
        }}
      >
        {t('features.title')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid2
          container
          rowGap={'23px'}
          spacing={isMobile ? '23px' : '35px'}
          sx={{ maxWidth: 1200 }}
          size={12}
          paddingInline={1}
        >
          {features.map((item, index) => (
            <Grid2 key={index} size={{ xs: 6, sm: 6, md: 3 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  position: 'relative',
                  backgroundColor: '#fff',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  paddingInline: isMobile ? '12px' : '24px',
                  paddingBlock: isMobile ? '0px' : '24px',
                  paddingTop: isMobile ? '12px' : '24px',
                  height: '100%',
                }}
              >
                <Box
                  component="img"
                  src={item.icon}
                  alt=""
                  sx={{
                    width: '64px',
                    height: '64px',
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    lineHeight: '140%',
                    fontSize: isMobile ? '14.1px' : '16px',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    textAlign: 'start',
                    fontSize: isMobile ? '12px' : '16px',
                    lineHeight: '150%',
                    color: '#838291',
                    maxWidth: '228px',
                    minHeight: '91px',
                  }}
                >
                  {item.description}
                </Typography>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default FeaturesSection;
