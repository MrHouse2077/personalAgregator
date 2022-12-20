import * as React from 'react';
import { useState, useEffect } from "react";
import Requests from "../../Requests";
import Modal from '../../UI/Modal/Modal'
import Validator from "../../Validator";
import { NavLink, useNavigate } from "react-router-dom";


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" >
      {'Copyright © '}
      <Link color="inherit" href="https://youtu.be/dQw4w9WgXcQ">
        PA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


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

export default function StartPage(props){
  const token = localStorage.getItem('token');
  function checkToken(){
    Requests(
      {
          method:'post', 
          url: "/checkToken",
          data: {token: token},
          callback: restore,
      }
    )
  }
  function restore(data){
    props.restoreData(data)
  }
  const navigate = useNavigate();
  useEffect(() => {     
    if(token){
      console.log(1);
        checkToken();
    }

    
  });
  let [modal, setModal] = useState({
      msg: null,
      open: false,
  });
  let [checkvalues, checkSet] = useState({
    fieldEmail: {
        flag : null,
        value: null,
        msgFaild: null,
        valid: false,
        touched: false,
        rules:[
            {
                //проверка на email
                msg: "Введите email",
                f: function(valueElement){
                    const regexp_email = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/iu;
                    return (regexp_email.test(valueElement))? {status: true}: {status: false, msgFaild: this.msg};
                }
            },
        ],
     },
     fieldPassword: {
        value: null,
        msgFaild: null,
        valid: false,
        touched: false,
        rules:[
            {
                //проверка на минимальную длинну
                minLength: 5,
                msg: "Минимальная длинна пароля: 5 символов",
                f: function(valueElement){
                    return (valueElement.length >= this.minLength)? {status: true}: {status:false, msgFaild: this.msg};
                }
            },
  
        ]
    },
    formValid: false,
  });

    const handleSubmit = (event) => {
        event.preventDefault();
        
    };
    function  handleClose(){
        let copy = Object.assign([], modal);
        copy.open = false;
        setModal(copy);
    };
    function setMsg() {
        let copy = Object.assign([], modal);
        copy.msg = "Неверная почта или пароль!";
        copy.open = true;
        setModal(copy);
      };
    function onLogin(){
        let data = createObject()
        Requests(
            {
                method:'post', 
                url: "/login",
                data: {email: data.email, password: data.password},
                callback: onRecieve,
            }
        )
            
    }
    function onRecieve(data){
        setModal({msg:data.msg, open:true})
        props.setAuthData(data);
    }
    function saveState(data, fieldElement){
        
      let copy = Object.assign({}, checkvalues);
      copy[fieldElement].value = data[fieldElement].value;
      copy[fieldElement].touched = data[fieldElement].touched;
      copy[fieldElement].valid = data[fieldElement].valid;
      copy[fieldElement].msgFaild = data[fieldElement].msgFaild;
      checkSet(copy);
    }
  
    function createObject(){
      if(checkvalues.fieldPassword.valid && checkvalues.fieldEmail.valid){
        let objectForRequest = {
          email: checkvalues.fieldEmail.value,
          password: checkvalues.fieldPassword.value,
        };
        return objectForRequest;
      }
    }
  
  
      
  
  return (
    <ThemeProvider theme={theme}>
        <Modal alert={modal} handleClose={handleClose}/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
             <FontAwesomeIcon icon={solid('lock')} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Введите email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {(evt)=>{
                Validator(
                  {
                    fieldElement: "fieldEmail",
                    event: evt.target.value,
                    checkvalues: checkvalues,
                    callback: saveState,
                  }
                )
              }}
              onBlur = {(evt)=>{
                Validator(
                  {
                    fieldElement: "fieldEmail",
                    event: evt.target.value,
                    checkvalues: checkvalues,
                    callback: saveState,
                  }
                )
              }}
              error = {
                  
                  (!checkvalues.fieldEmail.valid && checkvalues.fieldEmail.touched)
                  ?
                      true
                  :
                      false
              }
              checkvalues = {checkvalues.fieldEmail}
              helperText= {
                (!checkvalues.fieldEmail.valid && checkvalues.fieldEmail.touched)
                  ?
                  checkvalues.fieldEmail.msgFaild
                  :
                      ""
            }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Введите пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {(evt)=>{
                Validator(
                  {
                    fieldElement: "fieldPassword",
                    event: evt.target.value,
                    checkvalues: checkvalues,
                    callback: saveState,
                  }
                )
              }}
              onBlur = {(evt)=>{
                Validator(
                  {
                    fieldElement: "fieldPassword",
                    event: evt.target.value,
                    checkvalues: checkvalues,
                    callback: saveState,
                  }
                )
              }}
                error = {
                  
                      (!checkvalues.fieldPassword.valid && checkvalues.fieldPassword.touched)
                      ?
                          true
                      :
                          false
                  }
                
                helperText= {
                    (!checkvalues.fieldPassword.valid && checkvalues.fieldPassword.touched)
                      ?
                      checkvalues.fieldPassword.msgFaild
                      :
                          ""
                }
                  
              checkvalues = {checkvalues.fieldPassword}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={ 
                (checkvalues.fieldPassword.valid && checkvalues.fieldEmail.valid)
                ?
                 onLogin
                  
                :
                null
                
                
                }
            >
              Войти
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to="/passReset" variant="body2">
                  Забыли пароль?
                </NavLink>
              </Grid>
              <Grid item>
              <NavLink to="/Register" variant="body2">
                  Нет аккаунта? Зарегистрируйтесь!
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}