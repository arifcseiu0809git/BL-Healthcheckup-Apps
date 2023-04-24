import React from 'react';  
import PropTypes from 'prop-types';  
  
class Modal extends React.Component {  
  render() {  
     
    if(!this.props.show) {  
      return null;  
    }  
     
    const backdropStyle = {  
      position: 'fixed',  
      top: 50,  
      bottom: 0,  
      left: 0,  
      right: 0,  
      backgroundColor: 'rgba(0,0,0,0.3)',  
      padding: 50,  
      
    };  
  
 const model = {  
  position: 'relative',  
  top: 0,  
  left: 0,  
  display: 'table',  
  Width: '100%',  
  height: '30%',  
  overflow: 'hidden',  
  outline: 0,  
  backgroundColor: '#fff',  
  margin: '0 auto',  
  padding: 10,  
  maxWidth: 500,  
  minHeight: 300,  
 };  
  
    return (  
      <div className="backdrop" style={backdropStyle}>  
        <div className="modal" style={model}>  
          {this.props.children}  
          <div className="footer">  
            <button className="btn-warning" onClick={this.props.onClose}>  
              Close  
            </button>  
          </div>  
        </div>  
      </div>  
    );  
  }  
}  
  
Modal.propTypes = {  
  onClose: PropTypes.func.isRequired,  
  show: PropTypes.bool,  
  children: PropTypes.node  
};  
  
export default Modal;  