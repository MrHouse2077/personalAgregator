
import React, { useState, useEffect }from 'react';

import 'devextreme/dist/css/dx.light.css';
import Requests from "../../Requests";
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import ruMessages from "devextreme/localization/messages/ru.json";


import { locale, loadMessages, formatMessage } from 'devextreme/localization';



let current = new Date();
let date = `${current.getFullYear()}${current.getMonth()+1}${current.getDate()}`;

const token = localStorage.getItem('token');
const email = localStorage.getItem('email');
let all;
function Schedule (props){
  const login = props.log;
  const views = props.views;
  function sendEvent(eventsData, url){
    Requests(
      {
          method:'post', 
          url: url,
          data: {event: eventsData, login: login, token: token},
          callback: renderEvents,
      }
    )
  }
  function getEvents(){
    console.log(localStorage.getItem('login'));
    Requests(
      {
          method:'post', 
          url: "/getEvents",
          data: {login: login, token: token, viewer: localStorage.getItem('login')},
          callback: initialRender,
      }
    )
  }
  useEffect(() => {     
    loadMessages(ruMessages);
    locale("ru");
    all = "Все друзья";
    if(eventData.events.id==null && login!=null && eventData.friends[0].id==null){
      getEvents();
    }
  }
  );
  function initialRender(data){
    let jsondata = data.data;
    let friends = data.data;
    let myId;
    let events = JSON.parse(jsondata[0]);
    friends = JSON.parse(jsondata[1]); 
  
    let copy = Object.assign([], eventData);
    console.log(friends.length);
    if(friends.length != 0){
      let string
      copy.friends = friends
       
      for (let i = 0; i < friends.length; i++) {
        copy.friends[i].id = friends[i].id;
        if(friends[i].login == localStorage.getItem("login")){
          myId = friends[i].id;
        }
        string = friends[i].name + ", @" + friends[i].login;
        copy.friends[i].text = string; 
      }
      let alls = {
        "id": 0,
        "text": all,
      }
      copy.friends.unshift(alls);
      
     
    }
    if(events.length == 0 && friends.length != 0){
      setEvent(copy);
    }
    if(events.length == 0){
      return;
    }
    else{
      copy.events = events;
      for (let i = 0; i < events.length; i++) {
        
        copy.events.id = events[i].id;
        copy.events.text = events[i].text;
        copy.events.description = events[i].description;
        copy.events.startDate = events[i].startDate;
        copy.events.recurrenceRule = events[i].recurrenceRule;
        copy.events.endDate = events[i].endDate;         
       
      }
    }
    setEvent(copy);
  }
  function renderEvents(data){

   }
  const addEvent = (evt)=>{
    console.log(evt.appointmentData);
    let data = evt.appointmentData;
    let url = "/addEvent";
    let jsonData = JSON.stringify(data);
    console.log(jsonData);
    sendEvent(jsonData, url);
  }
  const updateEvent = (evt)=>{
    let data = evt.appointmentData;
    let url = "/editEvent";
   
    let jsonData = JSON.stringify(data);
    console.log(jsonData);
    sendEvent(jsonData, url);
  }
  const deleteEvent = (evt)=>{
    let data = evt.appointmentData.id;

    deletingEvent(data);
  }
  function deletingEvent(id){
    Requests(
      {
          method:'post', 
          url: "/deleteEvent",
          data: {data:id, login: login, token: token},
          callback: onDelete,
      }
    )
  }

  function onDelete(){
    
  }
  let StateEvent =  {
    events: {
      id: null,
      text: null,
      description: null,
      startDate: null,
      recurrenceRule: null,
      endDate: null,

    },
    friends: [
      {
        text: null,
        id: null,
        color: '#727bd2',
      }
    ]
  }
  let [eventData, setEvent] = useState(StateEvent);
  
  function onAppointmentFormOpening(evt) {
    const found = eventData.friends.find(obj => {
      return obj.email === email;
    });
    let id;
    if(found!=undefined){
      id = found.id;
    }
    
    if(login == localStorage.getItem("login") || evt.appointmentData.moderators!=undefined && 
    (evt.appointmentData.moderators.includes(id) 
    || evt.appointmentData.moderators.includes(0))){
      const form = evt.form;
      let items = form.option('items');
      items[0].items[2].items[0].visible = false;
      form.option('items', items)
    }
    else{
      evt.cancel =true;
      return;
    }
    
    
  }
  function click(){
    console.log("click!");
  }
  // console.log(eventData.friends);
        return (
            
            <React.Fragment>
              
                <Scheduler
                    views={views}
                    
                    dataSource={eventData.events}
                    defaultCurrentDate={current}
                    onAppointmentAdded={addEvent}
                    onAppointmentUpdated={updateEvent}
                    onAppointmentDeleted={deleteEvent}
                    onAppointmentContextMenu={click}
                    onAppointmentFormOpening={function(evt){onAppointmentFormOpening(evt)}}>
                       
                  <Resource
                    fieldExpr="moderators"
                    allowMultiple={true}
                    dataSource={eventData.friends}           
                    label="Могут контролировать:"
                    useColorAsDefault="grey"
                  />
                  <Resource
                    fieldExpr="readers"
                    allowMultiple={true}
                    dataSource={eventData.friends}
                    label="Могут видеть:"
                    useColorAsDefault="grey"
                  />
                </Scheduler>    
            </React.Fragment>
        )    
}
  export default Schedule;
  