import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import TranslateIcon from '@mui/icons-material/Translate';

import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import { IconButton, ListItemText, Stack, Typography } from '@mui/material';
import AppLogo from '@/assets/appLogo.svg';
import { LinkedIn, X } from '@mui/icons-material';
export default function TemporaryDrawer({
  open,
  toggleDrawer,
  onChangeLanguage
}: {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
  onChangeLanguage:  () => void;
}) {
  const DrawerList = (
    <Box
      sx={{
        width: 250,
        paddingInlineStart: '48px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box>
        <Stack direction={'row'} justifyContent={'space-between'} pt={'30px'}>
          <Box
            component="img"
            src={AppLogo}
            alt=""
            sx={{
              width: '73.7px',
              height: '32.6px',
            }}
          />
          <IconButton
            sx={{
              color: '#000',
            }}
            onClick={toggleDrawer(false)}
          >
            <Close />
          </IconButton>
        </Stack>
        <List>
          {['Home Page', 'CV Builder', 'Features', 'Pricing', 'About Us'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton disableGutters>
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontFamily: 'Poppins',
                    fontWeight: '500',
                    color: '#000',
                  }}
                >
                  {text}
                </Typography>
              </ListItemButton>
            </ListItem>

          ))}
            <ListItemButton  onClick={onChangeLanguage}>
          <TranslateIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Change Language" />
        </ListItemButton>
        </List>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          //   flex: 1,
          alignItems: 'flex-end',
          //   backgroundColor: 'red',
          marginTop: 'auto',
          marginBottom: '43px',
          //   height: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <X sx={{ width: '18px', height: '18px', color: '#000' }} />
          <Typography sx={{ fontSize: '12px', color: '#000' }}>Twitter</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#000' }}>
          <LinkedIn sx={{ width: '18px', height: '18px', color: '#000' }} />
          <Typography sx={{ fontSize: '12px', color: '#000' }}>LinkedIn</Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      <IconButton
        sx={{ backgroundColor: '#F5F6F8', zIndex: 3, borderRadius: '8px', color: '#000' }}
        onClick={toggleDrawer(true)}
      >
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
