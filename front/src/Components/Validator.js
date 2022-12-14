
// let params=
//     {
//       fieldElement, название поля для проверки
//       event, event.target.value поля для проверки
//       checkValues, состояние, с правилами и полями для контроля
//       callback, функция для сохранения состояния и передачи в исходный файл
//     }



function Validator(params){    

    let copy = Object.assign({}, params.checkValues);

    if(copy[params.fieldElement].hasOwnProperty('value'))
        copy[params.fieldElement].value = params.event;

    if(copy[params.fieldElement].hasOwnProperty('touched'))
        copy[params.fieldElement].touched = true;

    for(let rule of copy[params.fieldElement].rules){
        if(!rule.f(params.event).status){
            copy[params.fieldElement].valid = false
            if(copy[params.fieldElement].hasOwnProperty('msgFaild'))
                copy[params.fieldElement].msgFaild = rule.f(params.event).msgFaild;
            
            break;
        }
        copy[params.fieldElement].valid = rule.f(params.event).status;
        if(copy[params.fieldElement].hasOwnProperty('msgFaild'))
            copy[params.fieldElement].msgFaild = '';
    }

    params.callback(copy, params.fieldElement);
    

}
export default Validator;