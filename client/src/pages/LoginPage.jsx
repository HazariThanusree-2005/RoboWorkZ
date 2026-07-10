import { Component as SignInCard2 } from '@/components/ui/sign-in-card-2';

const LoginPage = ({ defaultMode = 'signin' }) => {
  return <SignInCard2 defaultMode={defaultMode} />;
};

export default LoginPage;
