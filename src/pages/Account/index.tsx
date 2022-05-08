// @ts-nocheck
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/Auth';
import { userService } from '../../services/user';
import { Close } from '@mui/icons-material';

export function Account() {
  const [open, setOpen] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRemove = async () => {
    try {
      window.alert('Realente deseja excluir sua conta?');
      await userService.remove(user.id);
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 5000,
      });
    }
  };

  const handleClose = () => setOpen(!open);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md'>
      <DialogTitle>
        <Typography>Deletar minha conta</Typography>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>Foi muito bom ter você conosco {user.name}! :-)</Typography>
        <Typography>É uma pena que esteja saindo.</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={() => handleRemove()}
          color='warning'
        >
          Apagar minha conta
        </Button>
      </DialogActions>
    </Dialog>
  );
}
