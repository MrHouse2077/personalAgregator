import React, { useState, useEffect }from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Styles from './AutoComplete.module.scss';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Modal from '../Modal/Modal'
import Requests from "../../Requests";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

export default function AutoComplete(props) {
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
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
  const email = localStorage.getItem('email');

  let [alert, setAlert] = useState({
    msg: null,
    open: false,
  });

useEffect(()=>{
  suggestSearch(props.search);
});
function  handleClose(){
  let copy = Object.assign([], alert);
  copy.open = false;
  setAlert(copy);
};

  const [anchorEl, setAnchorEl] = React.useState(null);


  
  const isMenuOpen = Boolean(anchorEl);




  const handleMenuClose = () => {
    setAnchorEl(null);
  
  };
  
  function renderSuggestions(){
      // const listItems = users.map((user) =>
      // <NavLink to={"/user/" + login +"/ProfilePage"} className={Styles.link}>
      //   <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      // </NavLink> 
      // );
      // return (
      //   <ul>{listItems}</ul>
      // );
  }

  function suggestSearch(search){
    Requests(
      {
          method:'post', 
          url: "/getSearchSuggestions",
          data: {login: login, token: token, search: search},
          callback: renderSuggestions,
      }
    )
  }
  return (
    
    <ThemeProvider theme={theme}>
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={props.menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Modal alert={alert} handleClose={handleClose}/>
      
      
    </Menu>
    </ThemeProvider>
  );
}