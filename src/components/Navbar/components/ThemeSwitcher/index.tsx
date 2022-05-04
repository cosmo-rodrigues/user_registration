import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MaterialUISwitch } from './MaterialUISwitch';
import { useContext } from 'react';
import { ThemeContext } from '../../../../context/Theme';

export function ThemeSwitcher() {
  const { checked, handleToggle } = useContext(ThemeContext);

  return (
    <FormGroup>
      <FormControlLabel
        checked={checked}
        label=''
        control={<MaterialUISwitch sx={{ m: 1 }} />}
        onChange={handleToggle}
      />
    </FormGroup>
  );
}
