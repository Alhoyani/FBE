import React, { useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { t } from 'i18next';

interface AboutMeProps {
  aboutMe: string;
  onUpdate: (updatedData: { summary: string }) => void;
}

const AboutMe: React.FC<AboutMeProps> = ({ aboutMe, onUpdate }) => {
  const [text, setText] = React.useState(aboutMe);
  const [changed, setchanged] = React.useState(false);
  // const handleSave = () => {
  //   onUpdate(text); // Pass the updated text back to the parent
  // };
  useEffect(() => {
    if (changed) {
      onUpdate({ summary: text });
    }
    return () => {};
  }, [text]);

  return (
    <Box
      p={2}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingBlock: '20px',
        backgroundColor: '#fff',
        borderRadius: '16px',
      }}
    >
      <Typography
        sx={{ fontSize: '18px', fontWeight: '600', fontFamily: 'Poppins', textAlign: 'start' }}
        color="#2B2A44"
        mb={'10px'}
      >
        {t('About Me')}
      </Typography>
      <TextField
        placeholder="Tell us about yourself"
        multiline
        rows={4}
        value={text}
        onChange={(e) => {
          setchanged(true);
          setText(e.target.value);
        }}
      />
    </Box>
  );
};

export default AboutMe;
