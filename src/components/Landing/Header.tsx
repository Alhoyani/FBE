import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery, Popover, ButtonBase, Stack } from '@mui/material';
import EnAppLogo from '@/assets/appLogo.svg';
import arAppLogo from '@/assets/appLogoAr.svg';
import TemporaryDrawer from './Drawer';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { logout, setLanguage } from '@/features/user/userSlice'; // <-- Import logout
import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';
import { useJwt } from 'react-jwt';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '@/context/AuthContext';

const Header = ({ bgColor }: { bgColor?: string }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { logout: userAuthLogout } = useAuth();
  const { user: stateUser } = useAppSelector((state) => state.userData);
  console.log('stateUser', stateUser);

  // If user is not logged in, redirect to register (or login) page

  // Language
  const language = useAppSelector((state) => state.userData.language);

  // Grab user info from store
  const { accessToken } = useAppSelector((state) => state.userData);

  // JWT decode
  const { decodedToken, isExpired } = useJwt(accessToken ?? '');

  // Drawer state
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  // Popover state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handlePersonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? 'user-popover' : undefined;

  // Handle language switch
  const handleChangeLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
    document.documentElement.setAttribute('dir', newLanguage === 'en' ? 'ltr' : 'rtl');
  };

  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'en' ? 'ltr' : 'rtl');
  }, [language]);

  // Handle logout
  const handleLogout = () => {
    userAuthLogout();
    dispatch(logout());
    handlePopoverClose();
    // Optionally navigate the user to a public route
    navigation('/');
  };

  return (
    <Stack
      sx={{
        // position: 'fixed',
        height: 73,
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: bgColor,
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.82)',
          height: 73,
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'Poppins',
          fontSize: 14,
          paddingInline: isMobile ? '17px' : '',
          maxWidth: 'lg',
        }}
      >
        {/* Logo */}
        <Box
          flex={0.5}
          display="flex"
          flexDirection="row"
          justifyContent={{ sm: 'flex-start', md: 'center', lg: 'center' }}
        >
          <Box
            onClick={() => navigation('/')}
            component="img"
            src={i18n.dir() === 'ltr' ? EnAppLogo : arAppLogo}
            alt={t('appLogoAlt')}
            sx={{
              width: '73.7px',
              height: '32.6px',
              ':hover': {
                cursor: 'pointer',
              },
            }}
          />
        </Box>

        {/* Navigation Links (Optional, currently empty array) */}
        {!isMobile && (
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: '15px',
            }}
          ></Box>
        )}

        {/* Language Switch & Profile / Get Started */}
        <Box
          sx={{
            flex: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          {/* Language Switch (hidden on mobile if you choose) */}
          {!isMobile && <Button onClick={handleChangeLanguage}>{language === 'en' ? 'AR' : 'EN'}</Button>}

          {/* If token is valid, show person icon & email; otherwise, show "Get Started" button */}
          {accessToken ? (
            <Box display="flex" alignItems="center" gap={1}>
              <ButtonBase onClick={handlePersonClick}>
                <PersonIcon
                  aria-describedby={popoverId}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                />
              </ButtonBase>

              <Typography
                aria-describedby={popoverId}
                onClick={handlePersonClick}
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#2B2A44',
                  cursor: 'pointer',
                }}
              >
                {stateUser?.user?.user?.email}
              </Typography>

              {/* Popover */}
              <Popover
                id={popoverId}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stateUser?.user?.user?.email}
                  </Typography>
                  <Button variant="outlined" onClick={handleLogout} sx={{ textTransform: 'none' }}>
                    Logout
                  </Button>
                </Box>
              </Popover>
            </Box>
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#0e41fc',
                borderRadius: '8px',
                padding: '7px 12px',
                fontWeight: 600,
                lineHeight: '150%',
                zIndex: 3,
              }}
              onClick={() => {
                navigation('/register');
              }}
            >
              {t('getStarted')}
            </Button>
          )}

          {/* Drawer for Mobile */}
          {isMobile && (
            <TemporaryDrawer open={open} toggleDrawer={toggleDrawer} onChangeLanguage={handleChangeLanguage} />
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default Header;
