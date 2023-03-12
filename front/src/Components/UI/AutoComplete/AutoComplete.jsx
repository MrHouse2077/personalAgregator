import React, { useState, useEffect }from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Styles from './AutoComplete.module.scss';


import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import Requests from "../../Requests";

export default function AutoComplete(props) {
  
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
  const email = localStorage.getItem('email');
  
  let [alert, setAlert] = useState({
    msg: null,
    open: false,
  });
useEffect(()=>{
    if(sugList.flag==props.search|| props.search==null){
      return;
    }
    console.log(sugList.flag)
    console.log(props.search);
    suggestSearch(props.search);
});

  let List = {
      data: null,
      flag: null,
  };
  const [sugList, setList] = React.useState(List);

  
 
  function renderSuggestions(data){
    let copy = Object.assign([], sugList);
    copy.data = data.data;
    copy.flag = props.search;
    setList(copy);
      
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
   
      <Box className={Styles.box}>
      {sugList.data!=null? 
      sugList.data.map((user) =>{ return <NavLink key={user.login} to={"/user/" + user.login +"/ProfilePage"} className={Styles.link}>
          <MenuItem >Логин:{user.login} Имя:{user.name} </MenuItem>
        </NavLink> 
      }):null  }  
      </Box>
  );
}

