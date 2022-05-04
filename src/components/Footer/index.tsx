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
        <Link color='inherit' href='https://mui.com/'>
          Your Website
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
