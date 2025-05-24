import React, { useState } from 'react';
import { Typography, TextField, Button, Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LayoutWrapper from './LayoutWrapper';
import { useTranslation } from 'react-i18next';

const JobDescriptionForm: React.FC = () => {
  const { t } = useTranslation(); // <-- Using react-i18next
  const navigation = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [description, setDescription] = useState<string>('');

  const handleNextClick = () => {
    navigation('/name', {
      state: {
        ...state,
        jobDescription: description,
      },
    });
  };

  return (
    <LayoutWrapper>
      <Container
        maxWidth="sm"
        style={{
          backgroundColor: '#FFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBlock: '25px',
          borderRadius: '14px',
        }}
      >
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            fontFamily: 'Poppins',
            textAlign: 'center',
          }}
          color="primary"
          gutterBottom
        >
          {/* Using the translation key from your translation file */}
          {t('jobDescriptionForm.tellUsAboutJob')}
        </Typography>

        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: '700',
            fontFamily: 'Poppins',
          }}
          fontWeight="bold"
          align="center"
          gutterBottom
        >
          {t('jobDescriptionForm.writeJobDescriptionTitle')}
        </Typography>

        <TextField
          variant="outlined"
          placeholder={t('jobDescriptionForm.placeholder') || ''}
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={10}
          fullWidth
          style={{ marginBottom: '1.5rem' }}
        />

        <Button
          variant="contained"
          disableRipple
          color="primary"
          sx={{
            borderRadius: '8px',
            paddingBlock: '13px',
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'none',
            fontFamily: 'Roboto',
            '&:hover': {
              backgroundColor: 'rgba(14, 65, 252, 1)',
              color: '#fff',
            },
          }}
          fullWidth
          onClick={handleNextClick}
        >
          {t('jobDescriptionForm.nextAddName')}
        </Button>
      </Container>
    </LayoutWrapper>
  );
};

export default JobDescriptionForm;
