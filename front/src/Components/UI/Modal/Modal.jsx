import Styles from "./Modal.module.scss";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function Modal(props) {
    
    function closeFunc(){
        props.handleClose();
    }

    return (
        <div>
        <Dialog
          open={props.alert.open}
          onClose={closeFunc}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.alert.msg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeFunc}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
        
    );
  }
  
export default Modal;