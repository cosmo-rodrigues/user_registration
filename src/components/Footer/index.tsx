import { Link, Typography } from '@mui/material';

export function Footer() {
  function Copyright(props: any) {
    return (
      <Typography
        variant='body2'
        color='text.secondary'
        align='center'
        {...props}
      >
        {'Copyright © '}
        <Link
          color='inherit'
          href='https://github.com/cosmo-rodrigues'
          target='_blank'
        >
          Cosmo Rodrigues
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  return (
    <>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
}
