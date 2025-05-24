import { FunctionComponent } from 'react';
import { Box, Divider } from '@mui/material';
import TitleSection from '@/components/Landing/TitleSection';
import FeaturesSection from '@/components/Landing/FeaturesSection';
import CustomizeCvSection from '@/components/Landing/CustomizeCvSection';
import CreateCvSection from '@/components/Landing/CreateCvSection';
import FaqSection from '@/components/Landing/FaqSection';
import ContactUs from '@/components/Landing/ContactUs';
import Ending from '@/components/Landing/Ending';
import Footer from '@/components/Landing/Footer';
import CVCarousel from '@/components/Landing/CVCarousel';

const Landing: FunctionComponent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#f1f8fd',
        overflowY: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TitleSection />
      <FeaturesSection />
      <CustomizeCvSection />
      <CVCarousel />
      <CreateCvSection />
      <FaqSection />
      <ContactUs />
      <Ending />
      <Divider sx={{ width: '100%', marginBottom: '24px' }} />
      <Footer />
    </Box>
  );
};

export default Landing;
