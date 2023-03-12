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
  let anchorEl = props.anchor;
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
const [anchorBar, setAnchorBar] = React.useState(anchorEl);
  const [mobileMoreAnchorBar, setMobileMoreAnchorBar] = React.useState(null);

 
  const isSearchOpen = Boolean(anchorBar);


  const handleSearchOpen = (event) => {
    setAnchorBar(event.currentTarget);
  };

  const handleMobileSearchClose = () => {
    setMobileMoreAnchorBar(null);
  };

  const handleSearchClose = () => {
    setAnchorBar(null);
    handleMobileSearchClose();
  };
  const handleMobileSearchOpen = (event) => {
    setMobileMoreAnchorBar(event.currentTarget);
  };
  const [sugList, setList] = React.useState(null);

  
 
  function renderSuggestions(data){
      const listItems = data.data.map((user) =>{console.log(1)}
      // <NavLink key={user.login} to={"/user/" + user.login +"/ProfilePage"} className={Styles.link}>
      //   <MenuItem >{user.name}</MenuItem>
      // </NavLink> 
      );    
      //setList(listItems);
      
  }
  // function showSuggestions(list){
    
  // }
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
      open={isSearchOpen}
      onClose={handleSearchClose}
    >
      <div>amogus</div>
      
      
    </Menu>
    </ThemeProvider>
  );
}