import { Fragment } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';


const Modal = (props) => {

    let assignedClasses = [ ];
    assignedClasses.push(classes.Modal);

    if (props.show) {
        assignedClasses.push(classes.Active);
    } 
    
    return (
        <Fragment>
            <Backdrop show={props.show} remove={props.hide} />
            <div className={assignedClasses.join(' ')}>
                {props.children}
            </div>
        </Fragment>
    )
};

export default Modal;