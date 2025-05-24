import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import bag from '@/assets/briefcaseG.svg';
import clipboard from '@/assets/clipboard.svg';
import note from '@/assets/note-2.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGenerateCVMutation } from '@/features/cvGenerator/generateCv';
import { useAppDispatch } from '@/app/store';
import { setCurrentCv } from '@/features/CurrentCv/currentCvSlice';
interface StepProgressProps {
  step: number;
  totalSteps: number;
  title: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({ step, totalSteps, title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const progressValue = (step / totalSteps) * 100;
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { templateId, jobDescription, name } = state || {};
  const [generateCV, { isLoading }] = useGenerateCVMutation();
  const handleGenerateCV = async () => {
    try {
      const body = {
        full_name: name,
        job_description: jobDescription,
        template_id: templateId,
      };

      const res = await generateCV(body).unwrap();
      console.log('res', res);
      // const result = res.json();
      dispatch(setCurrentCv(res));
      navigate('/final-step', { replace: true });
      // Executes the mutation and waits for the response
    } catch (err: any) {
      console.error('Error generating CV:', err);
      // window.location.reload(); // Reload the page on failure
      navigate('/home', { replace: true });
    }
  };
  useEffect(() => {
    if (!isLoading) {
      handleGenerateCV();
    }
    return () => {};
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: '#fff',
        borderRadius: '14px',
        minWidth: isMobile ? '98%' : '580px',
        paddingTop: '115px',
        paddingBottom: '96px',
        marginBlock: 'auto',
      }}
    >
      <Box position="relative" display="inline-flex">
        <CircularProgress
          // variant="determinate"
          value={progressValue}
          size={100}
          thickness={0.9}
          sx={{
            transform: { rotate: 'revert' },
          }}
        ></CircularProgress>
        <Box
          component="img"
          src={bag}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <Box
          component="img"
          src={note}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '-100%',
            // transform: 'translate(-25%, -50%)',
          }}
        />
        <Box
          component="img"
          src={clipboard}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '150%',
            // transform: 'translate(-50%, -50%)',
          }}
        />
      </Box>
      <Typography color="primary" mt={2}>
        Step {step}/{totalSteps}
      </Typography>
      <Typography
        sx={{
          fontSize: '24px',
          color: '#2B2A44',
          fontWeight: '600',
          fontFamily: 'Poppins',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

// Usage example
