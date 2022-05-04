import { ReactNode } from 'react';
import { Footer } from '../Footer';
import { Navbar } from '../Navbar';
import { MainContainer } from './styles';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <MainContainer>{children}</MainContainer>
      <Footer />
    </>
  );
}
