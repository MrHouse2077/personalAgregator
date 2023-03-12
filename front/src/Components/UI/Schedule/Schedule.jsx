import React, { useState, useEffect }from 'react';
 
import 'devextreme/dist/css/dx.light.css';
import Requests from "../../Requests";
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import ruMessages from 'devextreme/localization/messages/ru.json';






let current = new Date();
let date = `${current.getFullYear()}${current.getMonth()+1}${current.getDate()}`;
console.log(current);
const token = localStorage.getItem('token');
const login = localStorage.getItem('login');
function Schedule (props){
  class App extends React.Component {
    constructor(props) {
        super(props);
        loadMessages(ruMessages);
        locale(navigator.language);
    }
  }
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
    
    // if(){
    //   navigate('/');
    // }
    if(eventData.events.id==null && login!=null){
      getEvents();
    }
  }
  );
  function initialRender(data){
    let events = data.data;
    
    if(data.data == null){
      return;
    }
    let copy = Object.assign([], eventData);
    copy.events = events;
    for (let i = 0; i < events.length; i++) {
      
      copy.events.id = events[i].id;
      copy.events.text = events[i].text;
      copy.events.description = events[i].description;
      copy.events.startDate = events[i].startDate;
      copy.events.recurrenceRule = events[i].recurrenceRule;
      copy.events.endDate = events[i].endDate;
      
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
  // function gettingUsers(){
  //   Requests(
  //     {
  //         method:'post', 
  //         url: "/deleteEvent",
  //         data: {token: token},
  //         callback: onDelete,
  //     }
  //   )
  // }
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
    }
  }
  let [eventData, setEvent] = useState(StateEvent);
  // let [dataApp, setAuth] = useState(stateApp);
  
  function onAppointmentFormOpening(evt) {

    const form = evt.form;
    let items = form.option('items');
    console.log(items[0]);
    items[0].items[2].items[0].visible = false;
    form.option('items', items)

  }
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
                  {/* <Resource
                    fieldExpr="ownerId"
                    allowMultiple={true}
                   // dataSource={resourcesData}
                    label="Владелец"
                    /> */}
                </Scheduler>    
            </React.Fragment>
        )    
}
  export default Schedule;
  