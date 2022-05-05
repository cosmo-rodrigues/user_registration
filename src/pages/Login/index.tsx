import {
  CenterLine,
  DividerLine,
  DividerText,
  LoginButtonWrapper,
  LoginContainer,
  LoginOptionsWrapper,
  LoginTitle,
  SectionSide,
  SocialIcon,
} from './styles';
import { LoginForm } from './LoginForm';

export function Login() {
  const google = () => {
    window.open(
      'https://registration-user-api.herokuapp.com/auth/google',
      '_self'
    );
  };

  const github = () => {
    window.open(
      'https://registration-user-api.herokuapp.com/auth/github',
      '_self'
    );
  };

  const facebook = () => {
    window.open(
      'https://registration-user-api.herokuapp.com/auth/facebook',
      '_self'
    );
  };

  return (
    <LoginContainer>
      <LoginTitle>Entre como preferir!</LoginTitle>
      <LoginOptionsWrapper>
        <SectionSide>
          <LoginButtonWrapper color='#df4930' onClick={google}>
            <SocialIcon src='./img/google.png' alt='Google' />
            Google
          </LoginButtonWrapper>
          <LoginButtonWrapper color='#507cc0' onClick={facebook}>
            <SocialIcon src='./img/facebook.png' alt='Facebook' />
            Facebook
          </LoginButtonWrapper>
          <LoginButtonWrapper color='black' onClick={github}>
            <SocialIcon src='./img/github.png' alt='Github' />
            Github
          </LoginButtonWrapper>
        </SectionSide>
        <CenterLine>
          <DividerLine />
          <DividerText>OU</DividerText>
        </CenterLine>
        <SectionSide>
          <LoginForm />
        </SectionSide>
      </LoginOptionsWrapper>
    </LoginContainer>
  );
}
