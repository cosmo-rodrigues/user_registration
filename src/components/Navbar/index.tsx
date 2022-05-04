// import { ThemeSwitcher } from './components/ThemeSwitcher';
import { HeaderContainer, HeaderContent } from './styles';
import { NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <h3>EZ Record</h3>
        <nav>
          <NavLink to='/'>Serviços</NavLink>
          <NavLink to='/'>Contato</NavLink>
          <NavLink to='/'>Carreira</NavLink>
        </nav>
        <img src='/user.ico' alt='avatar' />
        {/* <ThemeSwitcher /> */}
      </HeaderContent>
    </HeaderContainer>
  );
}
