import { createContext, Dispatch, ReactNode, SetStateAction } from 'react';
import { DefaultTheme } from 'styled-components';
import { usePersistedState } from '../../hooks/usePersistedState';
import { dark } from '../../styles/themes/dark';
import { light } from '../../styles/themes/light';

interface ITheme {
  theme: DefaultTheme;
  setTheme: Dispatch<SetStateAction<string>>;
}

const DEFAULT_THEME_VALUE = {
  theme: {},
  setTheme: (string: string) => string,
};

export const ThemeContext = createContext<ITheme>(
  DEFAULT_THEME_VALUE as any
) as any;

export function UserThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);
  const [checked, setChecked] = usePersistedState('checked', false);

  const toggleTheme = () => {
    if (theme.title === 'light') {
      return setTheme(dark);
    }
    return setTheme(light);
  };

  function handleToggle() {
    setChecked(!checked);
    toggleTheme();
  }

  return (
    <ThemeContext.Provider value={{ theme, checked, handleToggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
