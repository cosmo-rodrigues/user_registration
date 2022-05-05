// import dotenv from 'dotenv';
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

// dotenv.config();
console.log(process.env.REACT_APP_OAUTH_GOOGLE_URL);
export function Login() {
  const google = () => {
    window.open(process.env.REACT_APP_OAUTH_GOOGLE_URL, '_self');
  };

  const github = () => {
    window.open(process.env.REACT_APP_OAUTH_GITHUB_URL, '_self');
  };

  const facebook = () => {
    window.open(process.env.REACT_APP_OAUTH_FACEBOOK_URL, '_self');
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
