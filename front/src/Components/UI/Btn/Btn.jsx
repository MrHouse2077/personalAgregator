

function Btn(props) {
    
  let onClick = props.onClick
  let className = props.className

    return (
      <div>
        
        <div
          className={className}
          onClick = {onClick}
        >
          {props.children}
           
        </div>
        
      </div>
    );
  }
  
  export default Btn;
  
