import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Modal from '../UI/Modal/Modal'
import Requests from "../Requests";
import AutoComplete from "../UI/AutoComplete/AutoComplete";
import {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Styles from './Header.module.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
const token = localStorage.getItem('token');
const login = localStorage.getItem('login');
const email = localStorage.getItem('email');
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.45),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  let [alert, setAlert] = useState({
      msg: null,
      open: false,
  });

  let [search, setSearch] = useState(null);
  
  function  handleClose(){
    let copy = Object.assign([], alert);
    copy.open = false;
    setAlert(copy);
  };
  function setMsg(data) {
    let copy = Object.assign([], alert);
    copy.msg = data;
    copy.open = true;
    setAlert(copy);
  };

  function sendSearch(log){
    Requests(
      {
          method:'post',
          url: "/getSearchResult",
          data: {login: log, token: token},
          callback: RenderSearch,
      }
    )
  }
  function RenderSearch(data){
    if(data.code==404){
      setMsg(data.msg);
    }
    else{
      navigate("/user/" + data.data.login +"/ProfilePage");
    }
    
  }
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // function changeSet(value){
  //   setSearch(value);
  // }
  function loggingOut(){
      props.logout();
  }
  function searchStart(evt){
    if (evt.key=="Enter"){
      let log = evt.target.value;
      sendSearch(log);
    }
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <ThemeProvider theme={theme}>
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {console.log(login)}
      <Modal alert={alert} handleClose={handleClose}/>
      {(login==null)? 
   
        <NavLink to="/" className={Styles.link}>
          <MenuItem onClick={handleMenuClose}>
            Login 
          </MenuItem>
        </NavLink>
      :
      <div>
        <NavLink to={"/user/" + login +"/ProfilePage"} className={Styles.link}>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        </NavLink> 
        <MenuItem onClick={function(evt){handleMenuClose(); loggingOut()}} >Logout</MenuItem>
      </div>}
      
    </Menu>
    </ThemeProvider>
  );

  

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            DF
          </Typography>

          <Search onKeyDown={function(evt){searchStart(evt)}}>
            <SearchIconWrapper>
                <FontAwesomeIcon icon={solid('magnifying-glass')} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              aria-controls="searchBar"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(evt)=>{setSearch(evt.target.value)}}
            />
          </Search>
          {console.log(search)}
          {/* <AutoComplete search={search} label ="searchBar"/> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <FontAwesomeIcon icon={solid('bell')} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <FontAwesomeIcon icon={solid('user')} />
            </IconButton>
          </Box>
         
        </Toolbar>
      </AppBar>
      {renderMenu}
      
    </Box>
    </ThemeProvider>
  );
}
  