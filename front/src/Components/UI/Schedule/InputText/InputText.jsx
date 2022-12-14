
import Styles from "./InputText.module.scss";

function InputText(props) {
    
    let type = props.type;
    let placeholder = props.placeholder;
    let onChange = props.onChange;
    let className = props.className;
    let onBlur = props.onBlur;
    let checkValues = props.checkValues;
   

  
    return (
      <div className={Styles.InputText}>
        
        <input 
          type={type} 
          placeholder={placeholder}
          onChange = {onChange}
          className= {className}
          onBlur = {onBlur}
        />
        <p
          className={

            (checkValues.msgFaild === null)
            ?
              Styles.nonActive
            :
              (!checkValues.valid)
              ?
                Styles.active
              :
                Styles.nonActive

          }  
        >
          {checkValues.msgFaild}
        </p>
        
      </div>
    );
  }
  
  export default InputText;
  
