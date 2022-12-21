import * as React from 'react';
import { useState, useEffect } from "react";
import Requests from "../../Requests";
import Modal from '../../UI/Modal/Modal'
import Validator from "../../Validator";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Styles from "./AccountLayout.module.scss"

import TextField from '@mui/material/TextField';


import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import Schedule from "../../UI/Schedule/Schedule";

export default function ProfilePage(props) {
  const { log } = useParams();
  let [userInfo, setInfo] = useState({
    email: "smt",
    name: "fs",
    privacy: 1,
    login: log,
    img: "default.png",
    flag:true,
  });
  const page = window.location.pathname;
  let [pageData, setPage] = useState(page.substring(1));
  
  const navigate = useNavigate();
  useEffect(() => {     
    getUser();
    if(!token){
      navigate('/');
    }
    else if(props.authData.login== null){
      checkToken();
    }
    else{
      
      localStorage.setItem("page", pageData);
  
    }
    

  }, [pageData]);

  // let email;
  // let name;
  // if (!userInfo.mail && !userInfo.name) {
  //   email = "";
  //   name= "";
  // } else {;
  //   email = userInfo.mail;
  //   name = userInfo.name;
  // }
 
  
  let [checkvalues, checkSet] = useState({
    fieldname: {
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
    fieldlogin: {
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
    fieldemail: {
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
function saveState(data, fieldElement){
  console.log(data);
  let copy = Object.assign({}, checkvalues);
  copy[fieldElement].value = data[fieldElement].value;
  copy[fieldElement].touched = data[fieldElement].touched;
  copy[fieldElement].valid = data[fieldElement].valid;
  copy[fieldElement].msgFaild = data[fieldElement].msgFaild;
  checkSet(copy);
}
  
  
  
  let [modal, setModal] = useState({
    msg: null,
    open: false,
});
  const token = localStorage.getItem('token');
  function checkToken(){
    Requests(
      {
          method:'post', 
          url: "/checkToken",
          data: {token: token, page:window.location.pathname},
          callback: restore,
      }
    )
  }
  function restore(data){
    props.restoreData(data)
  }
  
  
  function getUser(){
    Requests(
      {
          method:'post', 
          url: "/getUser",
          data: {login: log},
          callback: renderInfo,
      }
    )
  }
  function updateUser(data){
    Requests(
      {
          method:'post', 
          url: "/updateUser",
          data: {data: data, login: log},
          callback: renderInfo,
      }
    )
  }
  function renderInfo(data){
    console.log(data);
    let copy = Object.assign([], userInfo);
    copy.email = data.data.email;
    copy.name = data.data.name;
    copy.login = log;
    copy.privacy = data.data.privacy;
    if(log==props.authData.login){
      copy.flag = false;
    }
    setInfo(copy);
  }
  function onRecieve(data){
    setModal({msg:data.msg, open:true});
    
    props.setAuthData(data);
  }
  function handleClose(){
    let copy = Object.assign([], modal);
    copy.open = false;
    setModal(copy);
  }
  function updateCheck(data){
    let fieldStart = "field"
    let par = data.target.name;
    let field =fieldStart+par;
    if(data.target.value != userInfo[par] && checkvalues[field].valid){
      let jsonData = JSON.stringify({'field': data.target.name, 'text': data.target.value})
      console.log(jsonData);
      //updateUser(jsonData);
    }
  }
  
  return (
    
    <section style={{ backgroundColor: '#eee' }}>
      <Modal alert={modal} handleClose={handleClose}/>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <NavLink to="/home">
                  <div >Home </div>
                </NavLink>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>{log}</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                  <MDBRow>
                  
                  
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
              <MDBRow>

                  <MDBCol sm="12">
                    <TextField 
                  required
                  fullWidth
                  id="login"
                  name="login"
                  defaultValue={log}
                  disabled={userInfo.flag} 
                  label="Логин"
                  
                  autoComplete="family-name"
                  onChange = {(evt)=>{
                    Validator(
                      {
                        fieldElement: "fieldlogin",
                        event: evt.target.value,
                        checkvalues: checkvalues,
                        callback: saveState,
                      }
                    )
                  }}
                  onBlur = {(evt)=>{
                    Validator(
                      {
                        fieldElement: "fieldlogin",
                        event: evt.target.value,
                        checkvalues: checkvalues,
                        callback: saveState,
                      }
                    )
                    updateCheck(evt);
                  }}
                  error = {
                      
                      (!checkvalues.fieldlogin.valid && checkvalues.fieldlogin.touched)
                      ?
                          true
                      :
                          false
                  }
                  checkvalues = {checkvalues.fieldlogin}
                  helperText= {
                    (!checkvalues.fieldlogin.valid && checkvalues.fieldlogin.touched)
                      ?
                      checkvalues.fieldlogin.msgFaild
                      :
                          ""
                }
                />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  
                  <MDBCol sm="12">
                    
                        <TextField 
                          autoComplete="given-name"
                          name="name"
                          key={userInfo.name}
                          defaultValue={userInfo.name}
                          disabled={userInfo.flag}
                          required
                          fullWidth  
                          id="firstName"
                          label="Имя"
                          autoFocus
                          onChange = {(evt)=>{
                            Validator(
                              {
                                fieldElement: "fieldname",
                                event: evt.target.value,
                                checkvalues: checkvalues,
                                callback: saveState,
                              }
                            )
                          }}
                          onBlur = {(evt)=>{
                            Validator(
                              {
                                fieldElement: "fieldname",
                                event: evt.target.value,
                                checkvalues: checkvalues,
                                callback: saveState,
                              }
                            )
                            updateCheck(evt);
                          }}
                          error = {
                              
                              (!checkvalues.fieldname.valid && checkvalues.fieldname.touched)
                              ?
                                  true
                              :
                                  false
                          }
                          checkvalues = {checkvalues.fieldname}
                          helperText= {
                            (!checkvalues.fieldname.valid && checkvalues.fieldname.touched)
                              ?
                              checkvalues.fieldname.msgFaild
                              :
                                  ""
                        }
                        />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                 
                  <MDBCol sm="12">
                    <TextField 
                  required
                  fullWidth
                  id="email"
                  
                  label="Email Address"
                  name="email"
                  key={userInfo.email}
                  defaultValue={userInfo.email}
                  disabled={userInfo.flag}
                  onChange = {(evt)=>{
                    Validator(
                      {
                        fieldElement: "fieldemail",
                        event: evt.target.value,
                        checkvalues: checkvalues,
                        callback: saveState,
                      }
                    )
                  }}
                  onBlur = {(evt)=>{
                    Validator(
                      {
                        fieldElement: "fieldemail",
                        event: evt.target.value,
                        checkvalues: checkvalues,
                        callback: saveState,
                      }
                    )
                    updateCheck(evt);
                  }}
                  error = {
                      
                      (!checkvalues.fieldemail.valid && checkvalues.fieldemail.touched)
                      ?
                          true
                      :
                          false
                  }
                  checkvalues = {checkvalues.fieldemail}
                  helperText= {
                    (!checkvalues.fieldemail.valid && checkvalues.fieldemail.touched)
                      ?
                      checkvalues.fieldemail.msgFaild
                      :
                          ""
                }
                />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <Schedule 
            log={props.authData.login}
            views={['day']} 
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}