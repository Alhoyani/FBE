import { FC } from 'react';
import { Button } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
interface SaveButtonProps {
  isMobile: boolean;
  isSaving: boolean;
  onClick: () => void;
}

const SaveButton: FC<SaveButtonProps> = ({ isMobile, isSaving, onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        position: 'fixed',
        bottom: isMobile ? 27 : 20, // Adjust the bottom position for mobile view
        right: isMobile ? 10 : 'calc(50% - 28px)', // Align it to the right for mobile
        zIndex: 1000,
        textTransform: 'none',
        borderRadius: '50%',
        padding: '16px',
        width: '56px',
        height: '56px',
        minWidth: 'unset',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSaving ? 'gray' : 'rgba(43, 200, 68, 1)',
        '&:hover': {
          backgroundColor: isSaving ? 'gray' : 'rgba(43, 42, 68, 0.9)',
        },
      }}
      onClick={onClick}
      disabled={isSaving}
    >
      {isSaving ? '...' : <CachedIcon sx={{ color: 'white' }} />}
    </Button>
  );
};

export default SaveButton;
