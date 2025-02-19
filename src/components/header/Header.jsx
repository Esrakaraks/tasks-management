
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userReducer';


function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
   
    const handleLogout = () => {
        dispatch(logout())
        navigate("/register");
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management
          </Typography>
          <Box className="headerRight" >
            {user?.name && (<IconButton className="headerRight-login" onClick={handleLogout} >               
                <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
                    {user.name}
                </Typography>
                <LogoutIcon />
            </IconButton>)  }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;
