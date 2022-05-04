import styled from 'styled-components';

export const HeaderContainer = styled.header`
  border-bottom: 1px solid #ccc;
  height: 5rem;
`;

export const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  height: 5rem;
  margin: 0 auto;
  max-width: 1120px;
  padding: 0 2rem;

  nav {
    margin-left: 5rem;
    height: 5rem;

    a {
      color: ${({ theme }) => theme.colors.text};
      display: inline-block;
      position: relative;
      padding: 0 0.5rem;
      height: 5rem;
      line-height: 5rem;
      text-decoration: none;
      transition: color 0.2s;

      & + a {
        margin-left: 2rem;
      }

      &:hover {
        color: ${({ theme }) => theme.colors.danger};
      }

      &.active {
        color: ${({ theme }) => theme.colors.danger};
        font-weight: bold;
      }

      &.active::after {
        content: '';
        height: 3px;
        border-radius: 3px 3px 0 0;
        width: 100%;
        position: absolute;
        bottom: 1px;
        left: 0;
        background: ${({ theme }) => theme.colors.danger};
      }
    }

    @media (min-width: 992px) {
      .MuiFormGroup-root {
        display: none !important;
        background-color: red;
      }
    }
  }

  > img {
    margin-left: auto;
  }
`;
