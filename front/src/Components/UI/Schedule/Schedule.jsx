
import React, { useState, useEffect }from 'react';
import "devextreme-intl";

import 'devextreme/dist/css/dx.light.css';
import Requests from "../../Requests";
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import ruMessages from "devextreme/localization/messages/ru.json";


import { locale, loadMessages, formatMessage } from 'devextreme/localization';



let current = new Date();
let date = `${current.getFullYear()}${current.getMonth()+1}${current.getDate()}`;

const token = localStorage.getItem('token');
const login = localStorage.getItem('login');

function Schedule (props){
  
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
    Requests(
      {
          method:'post', 
          url: "/getEvents",
          data: {login: login, token: token},
          callback: initialRender,
      }
    )
  }
  useEffect(() => {     
    loadMessages(ruMessages);
    locale("ru");
    if(eventData.events.id==null && login!=null && eventData.friends.userId==null){
      getEvents();
    }
  }
  );
  function initialRender(data){
    let jsondata = data.data;
    let friends = data.data;
    let events = JSON.parse(jsondata[0]); 
    friends = JSON.parse(jsondata[1]); 


    let copy = Object.assign([], eventData);
    if(friends.length != 0){
      copy.friends = friends
      for (let i = 0; i < friends.length; i++) {
        
        copy.friends.userId = friends[i].id;
        copy.friends.text = friends[i].name; 
      }
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
    let copy = Object.assign([], eventData);
    let event = data.event;
    copy.events.id = data.data.id;
    copy.events.text = event.text;
    copy.events.description = event.description;
    copy.events.startDate = event.startDate;
    copy.events.recurrenceRule = event.recurrenceRule;
    copy.events.endDate = event.endDate;
    setEvent(copy);
   }
  const addEvent = (evt)=>{
    let data = evt.appointmentData;
    let url = "/addEvent";
    let jsonData = JSON.stringify(data);
    
    sendEvent(jsonData, url);
  }
  const updateEvent = (evt)=>{
    let data = evt.appointmentData;
    let url = "/editEvent";
   
    let jsonData = JSON.stringify(data);
    
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
    friends: {
      userId: null,
      text: null,
      color: '#727bd2',
    }
  }
  let [eventData, setEvent] = useState(StateEvent);

  function onAppointmentFormOpening(evt) {

    const form = evt.form;
    let items = form.option('items');
    items[0].items[2].items[0].visible = false;
    form.option('items', items)
    
  }
  console.log(eventData.friends);
        return (
            
            <React.Fragment>
              
                <Scheduler
                    views={views}
                    
                    dataSource={eventData.events}
                    defaultCurrentDate={current}
                    onAppointmentAdded={addEvent}
                    onAppointmentUpdated={updateEvent}
                    onAppointmentDeleted={deleteEvent}
                    onAppointmentFormOpening={function(evt){onAppointmentFormOpening(evt)}}>
                       
                  <Resource
                    fieldExpr="userId"
                    allowMultiple={true}
                    dataSource={eventData.friends}
                    label="Пользователи"
                    useColorAsDefault="grey"
                    />
                </Scheduler>    
            </React.Fragment>
        )    
}
  export default Schedule;
  