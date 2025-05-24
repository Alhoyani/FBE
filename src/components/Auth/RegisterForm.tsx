// components/RegisterForm.tsx
import { Box, Button, Checkbox, FormControlLabel, FormLabel, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSendOtpMutation } from '@/features/user/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const RegisterForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      toast.error(t('errors.enterEmail'));
      return;
    }
    if (!checked) {
      toast.error(t('errors.agreeTerms'));
      return;
    }

    try {
      await sendOtp({ email }).unwrap();
      navigate('/OTP', { state: { email } });
    } catch (error) {
      console.error('Failed to send OTP:', error);
      toast.error(t('errors.sendingOtp'));
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="start" justifyContent="center" width="100%" mx="auto">
      <FormLabel sx={{ color: '#000', textAlign: 'start' }}>{t('register.emailLabel')}</FormLabel>
      <TextField
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder={t('register.emailPlaceholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} color="primary" />}
        label={
          <Typography variant="body2" sx={{ cursor: 'text' }}>
            {t('register.agreeTo')}{' '}
            <Link href="#" color="primary">
              {t('register.terms')}
            </Link>{' '}
            {t('register.and')}{' '}
            <Link href="#" color="primary">
              {t('register.privacy')}
            </Link>
            *
          </Typography>
        }
      />
      <Button
        variant="contained"
        color="primary"
        disableRipple
        fullWidth
        sx={{
          mt: 2,
          bgcolor: '#0056FF',
          color: '#FFFFFF',
          borderRadius: '8px',
          paddingBlock: '14px',
          fontSize: '14px',
          fontWeight: '600',
          textTransform: 'none',
        }}
        onClick={handleSendOtp}
        disabled={isLoading || !checked}
      >
        {isLoading ? t('register.sendingOtp') : t('register.submitButton')}
      </Button>
    </Box>
  );
};
