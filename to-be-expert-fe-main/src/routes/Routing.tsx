import { Routes, Route } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Landing from '@/pages/Landing/Landing';
import OTP from '@/pages/Auth/OTP';
import Templates from '@/pages/Home/Home';
import CreateLayout from '@/pages/Steps/CreateLayout';
import JobDescriptionForm from '@/components/Steps/JobDiscription';
import NameForm from '@/components/Steps/NameForm';
import Loading from '@/pages/Steps/Loading';
import FinalStep from '@/pages/Steps/FinalStep';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import Payment from '@/pages/Steps/Payment';
import PublicOnlyRoute from './PublicOnlyRoute';
import Success from '@/pages/Success/Success';

const Routing = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="*" element={<Landing />} />
      <Route element={<PublicOnlyRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/OTP" element={<OTP />} />
      </Route>

      <Route path="/linkedin" element={<LinkedInCallback />} />

      {/* Protected routes */}

      <Route element={<CreateLayout />}>
        <Route path="/home" element={<Templates />} />
        <Route path="/create" element={<JobDescriptionForm />} />
        <Route path="/name" element={<NameForm />} />
        <Route path="/Loading" element={<Loading />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
      </Route>
      <Route path="/final-step" element={<FinalStep />} />
    </Routes>
  );
};

export default Routing;
