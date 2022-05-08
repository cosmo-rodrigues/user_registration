import styled from 'styled-components';

interface IButtonColor {
  color: string;
}

export const LoginContainer = styled.main`
  align-items: center;
  display: flex;
  height: calc(100vh - 80px);
  justify-content: center;
`;

export const LoginTitle = styled.h1`
  bottom: 65vh;
  color: lightgray;
  position: absolute;

  @media (max-width: 992px) {
    display: none;
  }
`;

export const LoginOptionsWrapper = styled.article`
  align-items: center;
  border-radius: 20px;
  box-shadow: 0px 5px 33px -21px rgba(66, 68, 90, 1);
  display: flex;
  height: 75%;
  width: 60%;
  -moz-box-shadow: 0px 5px 33px -21px rgba(66, 68, 90, 1);
  -webkit-box-shadow: 0px 5px 33px -21px rgba(66, 68, 90, 1);

  @media (max-width: 992px) {
    flex-direction: column;
    height: 97vh;
    margin-top: 10vh;
    max-width: 700px;
    width: 100%;
  }
`;

export const SectionSide = styled.section`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;

  @media (max-width: 992px) {
    justify-content: flex-end;
    padding: 20px;
  }
`;

export const CenterLine = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;

  @media (max-width: 992px) {
    height: 50px;
    position: relative;
    width: 100%;
  }
`;

export const LoginButtonWrapper = styled.div<IButtonColor>`
  align-items: center;
  background-color: ${({ color }) => color};
  border-radius: 5px;
  color: white;
  cursor: pointer;
  display: flex;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 15px 25px;
  width: 150px;
`;

export const SocialIcon = styled.img`
  height: 20px;
  margin-right: 10px;
  width: 20px;
`;

export const DividerLine = styled.div`
  background-color: lightgray;
  bottom: 0;
  height: 70%;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 0.5px;
  z-index: -1;

  @media (max-width: 992px) {
    height: 0.5px;
    width: 300px;
  }
`;

export const DividerText = styled.div`
  color: gray;
  background-color: white;
  border: 2px solid lightgray;
  border-radius: 50%;
  font-weight: bold;
  padding: 10px;
`;

export const SubmitButton = styled.button`
  width: 200px;
  background-color: rgba(128, 0, 128, 0.671);
  color: white;
  font-weight: bold;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
`;
