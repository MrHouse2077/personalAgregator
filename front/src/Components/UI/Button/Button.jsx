
import Styles from "./Button.module.scss";

function Button(props) {
    
  let onClick = props.onClick
  let className = props.className

    return (
      <div className={Styles.Button}>
        
        <div
          className={className}
          onClick = {onClick}
        >
          {props.children}
           
        </div>
        
      </div>
    );
  }
  
  export default Button;
  
