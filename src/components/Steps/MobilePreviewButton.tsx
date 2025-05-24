import { FC } from 'react';
import { Button, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

interface MobilePreviewButtonProps {
  htmlPreviewVisible: boolean;
  onPreviewClick: () => void;
}

const MobilePreviewButton: FC<MobilePreviewButtonProps> = ({ htmlPreviewVisible, onPreviewClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<DescriptionIcon />}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '255px',
        marginInline: 'auto',
        zIndex: 1000,
        textTransform: 'none',
        borderRadius: '47px',
        padding: '16px 24px',
        backgroundColor: 'rgba(43, 42, 68, 1)',
        '&:hover': {
          backgroundColor: 'rgba(43, 42, 68, 0.9)',
        },
      }}
      onClick={onPreviewClick}
    >
      <Typography
        variant="button"
        sx={{
          fontFamily: 'Poppins, Helvetica',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 1)',
        }}
      >
        {htmlPreviewVisible ? 'Hide Template' : 'Preview the Template'}
      </Typography>
    </Button>
  );
};

export default MobilePreviewButton;
