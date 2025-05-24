import PaymentInfo from '@/components/Content/PaymentInfo';
import PaymentForm from '@/components/Steps/PaymentForm';
import { Box } from '@mui/material';

const Payment = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: '24px',
        height: '-webkit-fill-available',
      }}
    >
      <PaymentInfo />
    </Box>
  );
};

export default Payment;
