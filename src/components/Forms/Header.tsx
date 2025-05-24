import React, { useState } from 'react';
import { Box, Button, Typography, Menu, MenuItem, useTheme, useMediaQuery } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { t } from 'i18next';

interface ResumeHeaderProps {
  name: string;
  sections: Record<string, boolean>; // Sections as object with boolean values
  onSectionSelect: (section: string) => void; // Callback to update the parent
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({ name, sections, onSectionSelect }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSectionSelect = (section: string) => {
    onSectionSelect(section); // Call the parent's callback with the selected section
    handleMenuClose(); // Close the dropdown
  };

  // Get the list of missing sections (false values in the sections object)
  const missingSections = Object.entries(sections).filter(([_, value]) => !value);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={isMobile ? 1 : 2}
      borderRadius={2}
      borderColor="divider"
      flexDirection={'column'}
      sx={{
        width: '100%',
        backgroundColor: '#fff',
        // marginTop: isMobile ? '-96px' : '0px',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {/* Left side: Name */}
      <Typography
        sx={{
          fontSize: '18px',
          fontWeight: '700',
          fontFamily: 'Poppins',
          verticalAlign: 'middle',
        }}
      >
        {name}
      </Typography>

      {/* Right side: Add Section Dropdown */}
      <Box display="flex" alignItems="center" gap={2} flexDirection={'row'}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowDropDownIcon />}
          onClick={handleMenuOpen}
          sx={{
            borderRadius: '8px',
            paddingBlock: '7px',
          }}
        >
          {t('AddSection')}
        </Button>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {missingSections.length > 0 ? (
            missingSections.map(([section]) => (
              <MenuItem key={section} onClick={() => handleSectionSelect(section)}>
                {section.replace(/_/g, ' ')} {/* Replace underscores with spaces */}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No sections available</MenuItem>
          )}
        </Menu>
      </Box>
    </Box>
  );
};

export default ResumeHeader;
