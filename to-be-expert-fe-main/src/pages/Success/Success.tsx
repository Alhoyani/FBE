import { Box, Button, Container, Stack, Typography } from '@mui/material';
import FileIcon from '@/assets/FileIcon.svg';
import { colors } from '@/themes/colors';
import EmailIcon from '@/assets/sms-star.svg';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DownloadIcon from '@/assets/document-download.svg';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useDownloadResumeMutation } from '@/features/cvGenerator/generateCv';

const Success: React.FC = () => {
  const location = useLocation();

  // Local state for storing query params if needed
  const [_, setTransactionId] = useState<string | null>(null);
  const [hmac, setHmac] = useState<string | null>(null);
  const [__, setSuccess] = useState<string | null>(null);
  const [download] = useDownloadResumeMutation();
  // Extract the query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tid = queryParams.get('id');
    const isSuccess = queryParams.get('success');
    const hmacValue = queryParams.get('hmac');

    setTransactionId(tid);
    setSuccess(isSuccess);
    setHmac(hmacValue);
  }, [location]);

  // Download handler
  const handleDownload = useCallback(async () => {
    if (!hmac) {
      console.error('No hmac param available. Cannot download.');
      return;
    }

    try {
      const response: any = await download({ id: hmac }).unwrap();
      console.log('Download response:', response);

      // Ensure the response is a Blob
      if (response instanceof Blob) {
        // Create a URL for the Blob
        const url = window.URL.createObjectURL(response);

        // Create a temporary anchor element to initiate download
        const a = document.createElement('a');
        a.href = url;

        // Generate a meaningful filename, e.g., using the current date
        const fileName = `Resume_${new Date().toISOString().split('T')[0]}.pdf`;
        a.download = fileName;

        // Append the anchor to the document body
        document.body.appendChild(a);

        // Programmatically click the anchor to trigger download
        a.click();

        // Clean up by removing the anchor and revoking the object URL
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Response is not a Blob:', response);
      }
    } catch (error) {
      console.error('Error downloading the file:', error);
      // Optionally, display an error message to the user
    }
  }, [hmac]);

  // WhatsApp handler
  // const handleSendWhatsApp = () => {
  //   // Replace with the phone number you want
  //   const phoneNumber = '1234567890';
  //   // Construct any message you'd like to send
  //   const message = `Hey! Here's my new resume (transaction ID: ${transactionId}).`;
  //   // Open WhatsApp with that message
  //   const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  //   window.open(url, '_blank');
  // };

  // Email handler
  // const handleSendEmail = () => {
  //   // Construct mailto link
  //   // Tip: encodeURIComponent is useful if you have spaces or special characters
  //   const subject = encodeURIComponent('My New Resume');
  //   const body = encodeURIComponent(`Please find my resume attached (Transaction ID: ${transactionId}).`);
  //   const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
  //   window.location.href = mailtoLink;
  // };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F6F8',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          minWidth: '580px',
          padding: '20px',
          borderRadius: '16px',
        }}
      >
        <img src={FileIcon} alt="File Icon" style={{ marginTop: '-60px' }} />
        <Box textAlign="center" marginBlock={4}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: colors.Black,
              fontWeight: 700,
              fontFamily: 'Poppins',
              fontSize: '27px',
              maxWidth: '300px',
            }}
          >
            Congrats!! Your Resume is Ready{' '}
            <span role="img" aria-label="celebration">
              🥳
            </span>
          </Typography>
        </Box>

        <Stack spacing={2} width="100%" sx={{ color: '#F1F1f1', paddingInline: '40px' }}>
          {/* WhatsApp Button */}
          {/* <Button
            variant="outlined"
            color="inherit"
            disableFocusRipple
            disableRipple
            disableElevation
            sx={{ textTransform: 'none', height: '54px' }}
            onClick={handleDownload}
          >
            <WhatsAppIcon sx={{ marginRight: '10px', color: '#34dc58' }} />
            <Typography variant="body1" sx={{ color: colors.Black }}>
              Send to WhatsApp
            </Typography>
          </Button> */}

          {/* Email Button */}
          {/* <Button
            variant="outlined"
            color="inherit"
            disableFocusRipple
            disableRipple
            disableElevation
            sx={{ textTransform: 'none', height: '54px' }}
            onClick={handleDownload}
          >
            <img src={EmailIcon} alt="Email Icon" style={{ marginRight: '10px' }} />
            <Typography variant="body1" sx={{ color: colors.Black }}>
              Send to Email
            </Typography>
          </Button> */}

          {/* Download Button */}
          <Button
            variant="outlined"
            color="inherit"
            disableFocusRipple
            disableRipple
            disableElevation
            sx={{ textTransform: 'none', height: '54px' }}
            onClick={handleDownload}
          >
            <img src={DownloadIcon} alt="Download Icon" style={{ marginRight: '10px' }} />
            <Typography variant="body1" sx={{ color: colors.Black }}>
              Download Now
            </Typography>
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Success;
