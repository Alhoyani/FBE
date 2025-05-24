import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FaqSection = () => {
  const { t } = useTranslation(); // Use translation hook
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [icons, setIcons] = useState<any>([]);
  const handleExpanded = (bool: boolean, index: number) => {
    const temp: any = [...icons];
    temp[index] = bool ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />;
    setIcons(temp);
  };

  // Translated FAQs
  const faqs = [
    { question: t('faq.question1.title'), answer: t('faq.question1.answer') },
    { question: t('faq.question2.title'), answer: t('faq.question2.answer') },
    { question: t('faq.question3.title'), answer: t('faq.question3.answer') },
    { question: t('faq.question4.title'), answer: t('faq.question4.answer') },
    { question: t('faq.question5.title'), answer: t('faq.question5.answer') },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: isMobile ? '95%' : '100%',
        maxWidth: 'lg',
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          marginTop: '42px',
          fontSize: isMobile ? '26px' : '38px',
          fontWeight: '600',
        }}
      >
        {t('faq.title')}
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          marginTop: '12px',
          color: '#838291',
          fontSize: isMobile ? '14px' : '18px',
          fontWeight: '400',
          fontFamily: 'Roboto',
          textAlign: isMobile ? 'center' : 'start',
        }}
      >
        {t('faq.subtitle')}
      </Typography>

      {/* FAQs */}
      <Box
        sx={{
          paddingInline: isMobile ? '5px' : '30px',
          backgroundColor: '#FFF',
          borderRadius: '16px',
          marginTop: '41px',
          width: '100%',
        }}
      >
        {faqs.map((faq, index) => (
          <Accordion
            onChange={(_, expanded) => handleExpanded(expanded, index)}
            sx={{
              backgroundColor: '#FFF',
              '&.Mui-expanded': {
                margin: '0 !important',
              },
            }}
            key={index}
            elevation={0}
          >
            <AccordionSummary
              expandIcon={icons[index] ? icons[index] : <AddOutlinedIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                '&.Mui-expanded': {
                  borderTopWidth: '1px !important',
                  borderTopColor: '#000 !important',
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: isMobile ? '18px' : '22px',
                  fontWeight: '500',
                  color: '#2B2A44',
                  paddingBlock: '24px',
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  fontSize: isMobile ? '14px' : '18px',
                  color: '#838291',
                }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FaqSection;
