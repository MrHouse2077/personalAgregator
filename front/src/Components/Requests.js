import axios from 'axios';
/*
let parametrsRequest = {
    method, 
    url,
    data,
    callback
}
*/

let domen = "http://localhost:8000";
let APIversion = "api/v1";

function Requests(parametrsRequest) {

    switch(parametrsRequest.method){
        case 'get': 
            getRequest(parametrsRequest.url, parametrsRequest.callback);
        break;
        case 'post': 
            postRequest(parametrsRequest.url, parametrsRequest.data, parametrsRequest.callback)
        break;
        default: console.log("error request"); break;
    }

    function getRequest(url, callback){
        axios({
            method: 'get',
            "url": `${domen}/${APIversion}${url}`,
            responseType: 'json'
        })
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    function postRequest(url, data, callback){
        axios({
            method: 'post',
            "url": `${domen}/${APIversion}${url}`,
            "data": data,
            responseType: 'json'
        })
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
  
export default Requests;