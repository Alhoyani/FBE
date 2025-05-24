import React, { useCallback, useState } from 'react';
import { Box, Button, TextField, Typography, InputLabel } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import STC from '@/assets/images/stc.png';
import CreditCard from '@/assets/wallet.svg';
import cardDark from '@/assets/cardDark.svg';
import { colors } from '@/themes/colors';

const PaymentForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };
  const StcImage = useCallback(() => {
    return <Box component={'img'} src={STC} />;
  }, []);
  const CreditCardIcon = useCallback(() => {
    return <Box component={'img'} src={activeTab == 0 ? CreditCard : cardDark} />;
  }, [activeTab]);

  return (
    <Box
      sx={{
        minWidth: 713,
        margin: 'auto',
        boxShadow: 3,
        borderRadius: '15px',
        paddingBlock: '42px',
        paddingInline: '50px',
        height: '425px',
      }}
    >
      {/* Title */}
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          columnGap: '10px',
        }}
      >
        <PaySelectBtn
          Icon={CreditCardIcon}
          active={activeTab === 0}
          label="Credit card"
          onClick={() => {
            handleTabChange(0);
          }}
        />
        <PaySelectBtn
          Icon={StcImage}
          active={activeTab === 1}
          label="STC Pay"
          onClick={() => {
            handleTabChange(1);
          }}
        />
        <PaySelectBtn
          Icon={AppleIcon}
          active={activeTab === 2}
          label="Apple Pay"
          onClick={() => {
            handleTabChange(2);
          }}
        />
      </Box>

      {/* Card Input Form */}
      {activeTab === 0 && (
        <Box mt={3} display="flex" flexDirection="column" gap={2}>
          <Box display="flex" gap={2}>
            <Box flex={1}>
              <InputLabel>Holder Name </InputLabel>
              <TextField placeholder="Holder Name" size="small" variant="outlined" fullWidth />
            </Box>

            <Box flex={1}>
              <InputLabel>Card Number </InputLabel>
              <TextField placeholder="Card Number" size="small" variant="outlined" fullWidth />
            </Box>
          </Box>
          <Box display="flex" gap={2}>
            <Box flex={1}>
              <InputLabel>Expiry date </InputLabel>
              <TextField size="small" placeholder="MM/YY" variant="outlined" fullWidth />
            </Box>
            <Box flex={1}>
              <InputLabel>CVV </InputLabel>
              <TextField size="small" placeholder="CVV" variant="outlined" fullWidth />
            </Box>
          </Box>
          {/* Submit Button */}
          <Button
            disableElevation
            disableRipple
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: '13px', fontWeight: 'bold', mt: 2, textTransform: 'none' }}
          >
            Create Your Resume
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PaymentForm;
const PaySelectBtn = ({
  Icon,
  label,
  active,
  onClick,
}: {
  Icon: any;
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
        flexDirection: 'row',
        columnGap: '10px',
      }}
      variant="outlined"
    >
      <Icon
        fill={active ? colors.Main : colors.Black}
        color={active ? colors.Main : colors.Black}
        tintColor={active ? colors.Main : colors.Black}
      />
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
