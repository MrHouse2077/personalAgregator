import * as React from 'react';
import { useState } from "react";
import Requests from "../../Requests";
import Modal from '../../UI/Modal/Modal'
import Validator from "../../Validator";
import { NavLink } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
        main: green[500],
      },
      secondary: {
        main: purple[500],
      },
    },
  });
export default function SignUpPage(props) {
    let [modal, setModal] = useState({
        msg: null,
        open: false,
    });
    let [checkvalues, checkSet] = useState({
        fieldName: {
            flag : null,
            value: null,
            msgFaild: null,
            valid: false,
            touched: false,
            rules:[
                {
                    //проверка имени
                    minLength: 2,
                    msg: "Минимальный размер имени: 2 символа",
                    f: function(valueElement){
                        return (valueElement.length >= this.minLength)? {status: true}: {status:false, msgFaild: this.msg};
                    }
                },
            ],
         },
        fieldLogin: {
            flag : null,
            value: null,
            msgFaild: null,
            valid: false,
            touched: false,
            rules:[
                {
                    //проверка логина
                    f: function(login){
                        if(/^[a-zA-Z1-9]+$/.test(login) === false) return {status: false, msgFaild: 'В логине должны быть только латинские буквы'};
                        if(login.length < 4 || login.length > 20) return {status: false, msgFaild: 'В логине должен быть от 4 до 20 символов'};
                        if(parseInt(login.substr(0, 1))) return {status: false, msgFaild: 'Логин должен начинаться с буквы'};
                        else return {status: true};
                    }
                },
            ],
         },
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
      function onLogin(){
          let data = createObject()
          Requests(
              {
                  method:'post', 
                  url: "/register",
                  data: {name:data.name, login: data.login, email: data.email, password: data.password},
                  callback: onRecieve,
              }
          )
              
      }
      function onRecieve(data){
          setModal({msg:data.msg, open:true});
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
        if(checkvalues.fieldName.valid && checkvalues.fieldLogin.valid && checkvalues.fieldPassword.valid && checkvalues.fieldEmail.valid){
          let objectForRequest = {
            name: checkvalues.fieldName.value,
            login: checkvalues.fieldLogin.value,
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Имя"
                  autoFocus
                  onChange = {(evt)=>{
                    Validator(
                      {
                        fieldElement: "fieldName",
                        event: evt.target.value,
                        checkvalues: checkvalues,
                        callback: saveState,
                      }
                    )
                  }}
                  onBlur = {(evt)=>{
                    Validator(
                      {
                        fieldElement: "fieldName",
                        event: evt.target.value,
                        checkvalues: checkvalues,
                        callback: saveState,
                      }
                    )
                  }}
                  error = {
                      
                      (!checkvalues.fieldName.valid && checkvalues.fieldName.touched)
                      ?
                          true
                      :
                          false
                  }
                  checkvalues = {checkvalues.fieldName}
                  helperText= {
                    (!checkvalues.fieldName.valid && checkvalues.fieldName.touched)
                      ?
                      checkvalues.fieldName.msgFaild
                      :
                          ""
                }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="login"
                  label="Логин"
                  name="log"
                  autoComplete="family-name"
                  onChange = {(evt)=>{
                    Validator(
                      {
                        fieldElement: "fieldLogin",
                        event: evt.target.value,
                        checkvalues: checkvalues,
                        callback: saveState,
                      }
                    )
                  }}
                  onBlur = {(evt)=>{
                    Validator(
                      {
                        fieldElement: "fieldLogin",
                        event: evt.target.value,
                        checkvalues: checkvalues,
                        callback: saveState,
                      }
                    )
                  }}
                  error = {
                      
                      (!checkvalues.fieldLogin.valid && checkvalues.fieldLogin.touched)
                      ?
                          true
                      :
                          false
                  }
                  checkvalues = {checkvalues.fieldLogin}
                  helperText= {
                    (!checkvalues.fieldLogin.valid && checkvalues.fieldLogin.touched)
                      ?
                      checkvalues.fieldLogin.msgFaild
                      :
                          ""
                }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={ 
                (checkvalues.fieldName.valid && checkvalues.fieldLogin.valid && checkvalues.fieldPassword.valid && checkvalues.fieldEmail.valid)
                ?
                onLogin
                  
                :
                null
                
                
                }
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/" variant="body2">
                  Уже есть аккаунт? Войдите!
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}