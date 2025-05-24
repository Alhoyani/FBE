import { FC } from 'react';
import { Stack, Box, IconButton, Button, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { redirect, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/store';
import { useCheckoutCvMutation } from '@/features/cvGenerator/generateCv';
import i18n from '@/i18n';

interface PreviewPanelProps {
  decodedHtml: string;
  onClose: () => void; // Callback for closing the overlay
  visible: boolean;
}

const PreviewPanel: FC<PreviewPanelProps> = ({ decodedHtml, onClose, visible }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)'); // Check if the screen size is mobile
  console.log('isMobile', isMobile);
  const handleDonwload = () => {
    navigate('/payment');
  };
  if (isMobile && visible) {
    // Mobile-specific overlay
    return (
      <Stack
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,

          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark overlay
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000, // Ensure it overlays the entire screen
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
          }}
        >
          {/* Close Icon */}
          <IconButton
            onClick={onClose}
            sx={{
              color: '#FFF',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Download Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#0e41fc',
            color: '#FFF',
            fontSize: '16px',
            ':hover': {
              backgroundColor: '#0636c9',
            },
          }}
          onClick={handleDonwload}
        >
          Download File
        </Button>
        <Box
          sx={{
            height: '551px',
            width: '396px',
            backgroundColor: '#ffffff',
            overflow: 'scroll',
            borderRadius: '8px',
          }}
          dangerouslySetInnerHTML={{ __html: decodedHtml }}
        />
      </Stack>
    );
  }

  // Default Web View
  return (
    <Stack
      flex={1}
      sx={{
        backgroundColor: '#2B2A44',
        paddingInline: '16px',
        alignItems: 'center',
        position: 'fixed',
        width: '50%',
        right: 0,
        height: '100vh',
        overflow: 'scroll',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box
        sx={{
          width: '593px',
          height: '90px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          disableRipple
          disableFocusRipple
          disableElevation
          sx={{
            height: '32px',
            borderColor: '#34335C',
            color: '#FFF',
            fontSize: '12px',
            backgroundColor: '#34335C',
            ':hover': {
              backgroundColor: '#34335C',
            },
          }}
          startIcon={<GridViewOutlinedIcon />}
          variant="outlined"
          onClick={() => {
            navigate('/home');
          }}
        >
          change template
        </Button>
        <Button
          disableRipple
          disableFocusRipple
          disableElevation
          sx={{
            height: '32px',
            ':hover': {
              backgroundColor: '#0e41fc',
            },
          }}
          variant="contained"
          onClick={handleDonwload}
        >
          download
        </Button>
      </Box>

      <Box
        sx={{
          height: '827px',
          width: '593px',
          backgroundColor: '#ffffff',
          overflow: 'scroll',
          borderRadius: '8px',
        }}
        dangerouslySetInnerHTML={{ __html: decodedHtml }}
      />
    </Stack>
  );
};

export default PreviewPanel;
