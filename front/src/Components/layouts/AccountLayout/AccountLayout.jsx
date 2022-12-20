import React, { useEffect, useState } from 'react';
import {
  NavLink,
  useParams,
  useNavigate,
} from "react-router-dom";
import Requests from "../../Requests";
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

import UserPage from "../../Pages/UserPage/UserPage";
export default function ProfilePage(props) {
  const page = window.location.pathname;
  let [pageData, setPage] = useState(page.substring(1));
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
  const navigate = useNavigate();
  useEffect(() => {     
    
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
  const {log} = useParams();
  return (
    <section style={{ backgroundColor: '#eee' }}>
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
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">example@example.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                
              </MDBCardBody>
            </MDBCard>

            <UserPage nick={log}/>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}