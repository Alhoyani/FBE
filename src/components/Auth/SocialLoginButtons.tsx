import { Box, Button, Typography } from '@mui/material';
import linkedin from '@/assets/linkedin.svg';
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useVerifyGoogleTokenMutation } from '@/features/user/authApiSlice';
import { useEffect } from 'react';
import { setCredentials } from '@/features/user/userSlice';
import { useAppDispatch } from '@/app/store';
import { useAuth } from '@/context/AuthContext';

export const SocialLoginButtons = () => {
  const [verifyGoogleToken, { isSuccess, data }] = useVerifyGoogleTokenMutation();
  const dispatch = useAppDispatch();
  const { login } = useAuth();

  const { t } = useTranslation();
  const buttonStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: '8px',
    paddingBlock: '14px',
    width: '100%',
    maxWidth: '369px',
    marginTop: '30px',
    borderRadius: '8px',
    border: '1px solid var(--Border, #EFEAEA)',
  };

  const handleGoogleSuccess = (response: any) => {
    console.log('Google Login Success:', response);
    try {
      const code = response.credential;
      verifyGoogleToken({ code })
        .unwrap()
        .then((dataRes: any) => {
          console.log('data', data);
          dispatch(
            setCredentials({
              accessToken: dataRes.access_token,
              refreshToken: dataRes.refresh_token,
              user: dataRes,
            }),
          );
          login({
            accessToken: dataRes.access,
            refreshToken: dataRes.refresh,
          });
        });
    } catch (error) {
      console.error('Error verifying Google token:', error);
    }
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
  };

  const { linkedInLogin } = useLinkedIn({
    clientId: '77lkct289wyhjo',
    redirectUri: `${window.location.origin}/linkedin`, // Ensure this matches your LinkedIn app settings
    onSuccess: (code) => {
      console.log('LinkedIn Authorization Code:', code);
      // Handle token exchange on your backend
    },
    onError: (error) => {
      console.error('LinkedIn Login Failed:', error);
    },
  });

  return (
    <>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        logo_alignment="center"
        auto_select={false}
        width={'100%'}
        containerProps={{
          style: {
            paddingBlock: '13px',
          },
        }}
      />

      {/* <Button variant="outlined" sx={buttonStyles} onClick={linkedInLogin}>
        <Box component={'img'} src={linkedin} alt="LinkedIn Logo" />
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#2B2A44',
            fontFamily: 'Roboto',
            textTransform: 'none',
          }}
        >
          {t('register.linkedinButton')}
        </Typography>
      </Button> */}
    </>
  );
};
