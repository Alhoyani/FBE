import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import Lock from '@/assets/lock.svg';
import { colors } from '@/themes/colors';
import { useCheckoutCvMutation, useGetMethodsQuery } from '@/features/cvGenerator/generateCv';

const PaymentInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  // Uncomment the lines below if you're fetching data from an API
  const { data, isLoading, isSuccess, error, isFetching }: any = useGetMethodsQuery();
  const [paymentMethods, setPaymentMethods] = useState<any>([]);
  const [paymentInfo, setPaymentInfo] = useState<any>({});
  const [goToPayment] = useCheckoutCvMutation();

  // if (isLoading) return <CircularProgress />;
  // if (error) return <Typography color="error">Error loading payment methods.</Typography>;

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };
  useEffect(() => {
    if (isSuccess && data) {
      setPaymentMethods(data?.payment_methods);
      setPaymentInfo(data?.payment_info);
    }

    return () => {};
  }, [data]);
  const handleDownload = () => {
    goToPayment({ id: paymentMethods[activeTab]?.code as any })
      .unwrap()
      .then((response: any) => {
        console.log('response', response);
        if (response?.checkout_url) {
          window.location.href = response.checkout_url;
          // redirect(response.checkout_url);
        }
      });
  };
  if (isLoading || isFetching) return <Typography color="error">Loading...</Typography>;
  return (
    <Box
      sx={{
        minWidth: '563px',
        margin: 'auto',
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Header */}
      <Typography
        fontWeight="700"
        mb={2}
        sx={{
          color: colors.Black,
          fontSize: '24px',
          fontFamily: 'Poppins',
        }}
      >
        Choose Payment Method
      </Typography>

      {/* Payment Methods */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          columnGap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {!isFetching &&
          !isLoading &&
          paymentMethods?.map((method: any, index: number) => (
            <PaySelectBtn
              key={method.code}
              active={activeTab === index}
              label={method.name}
              Icon={() => (
                <img
                  src={method.icon}
                  alt={`${method.name} icon`}
                  width={24}
                  height={24}
                  style={{ objectFit: 'contain' }}
                />
              )}
              onClick={() => handleTabChange(index)}
            />
          ))}
      </Box>

      {/* Total Amount Title */}
      <Typography
        mt={2}
        fontWeight="400"
        textAlign="center"
        sx={{
          color: colors.Text,
          fontFamily: 'Poppins',
          fontSize: '16px',
        }}
      >
        Total Amount
      </Typography>

      {/* Payment Summary */}
      <Box display="flex" flexDirection="column" gap={2} width={'100%'}>
        {/* Total Amount */}
        <Typography fontWeight="bold" color="primary" textAlign="center" fontSize={'36px'}>
          {paymentInfo.total_amount} {paymentInfo.currency}
        </Typography>

        {/* Secure Payment Indicator */}
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <Box component="img" src={Lock} alt={'secure'} width={20} height={20} />
          <Typography color="#04B500" fontSize={10}>
            Secure Payment
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Order Summary */}
        <Typography
          sx={{
            color: colors.Text,
            fontWeight: '600',
            fontFamily: 'Poppins',
            fontSize: '14px',
          }}
          gutterBottom
        >
          Order Summary
        </Typography>

        {/* Item Details */}
        <Box display="flex" justifyContent="space-between">
          <BlackText text={`${paymentInfo.quantity} X ${paymentInfo.product}`} />
          <BlackText text={`${paymentInfo.price} ${paymentInfo.currency}`} />
        </Box>

        {/* VAT Details */}
        <Box display="flex" justifyContent="space-between">
          <BlackText text={`VAT ${paymentInfo.vat_percentage}`} />
          <BlackText text={`${paymentInfo.vat_amount} ${paymentInfo.currency}`} />
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Total Amount */}
        <Box display="flex" justifyContent="space-between" fontWeight="bold">
          <BlackText text="Total" />
          <BlackText text={`${paymentInfo.total_amount} ${paymentInfo.currency}`} color={colors.Main} />
        </Box>
      </Box>

      {/* Action Button */}
      <Button
        disableElevation
        disableRipple
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleDownload}
        sx={{ py: '13px', fontWeight: 'bold', mt: 2, textTransform: 'none' }}
      >
        Create Your Resume
      </Button>
    </Box>
  );
};

export default PaymentInfo;

// Helper Component for Text with Black Color
const BlackText = ({ text, color = colors.Black }: { color?: string; text: string }) => {
  return (
    <Typography
      sx={{
        color: color,
        fontSize: '16px',
        fontWeight: '500',
        fontFamily: 'Poppins',
      }}
    >
      {text}
    </Typography>
  );
};

// Payment Method Selection Button
const PaySelectBtn = ({
  Icon,
  label,
  active,
  onClick,
}: {
  Icon?: React.FC;
  label: string;
  active: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <Button
      disableRipple
      disableFocusRipple
      disableElevation
      onClick={onClick}
      sx={{
        borderColor: active ? colors.Main : colors.Border,
        color: active ? colors.Main : colors.Black,
        borderRadius: '7.6px',
        paddingBlock: '12px',
        display: 'flex',
        alignItems: 'center',
        columnGap: '10px',
        minWidth: '120px',
      }}
      variant="outlined"
    >
      {Icon && <Icon />}
      <Typography
        sx={{
          color: active ? colors.Main : colors.Black,
          fontSize: '13.5px',
          fontWeight: '500',
          fontFamily: 'Poppins',
        }}
      >
        {label}
      </Typography>
    </Button>
  );
};
