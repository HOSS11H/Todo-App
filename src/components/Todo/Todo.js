import { useState } from 'react';

import { connect } from 'react-redux';
import { checkTodo } from '../../store/actions/index';


import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



import Button from '../UI/Button/Button';
import Wrapper from '../UI/Wrapper/Wrapper';

// It is important to define your styled components outside of the render method
// Write your styled components the recommended way: 
/* const Wrapper = styled.div`
    display: flex;
    &:: before {
        content: '';
        display: ${props => props.importance === 'necessary' ? 'block' : 'none' }
    }
    @media (max-width: 600px) {
        width: auto
    }
`; */

const GreenCheckbox = withStyles({
        root: {
            color: green[400],
            '&$checked': {
                color: green[600],
            },
        },
        checked: {},
    })( (props) => <Checkbox color="default" {...props} />);

const Todo = props => {

    // var isTrue = ( props.completed === 'true' ) ;

    const [ checkedState , setCheckedState ] = useState( props.completed );

    const checkedStateHandler = ( ) => {
        props.checkedStateHttp( props.id , !checkedState );
        setCheckedState( prevState => !prevState );
    }


    const style = {
        textDecoration : checkedState ? 'line-through' : 'none' ,
    }

    const editedData = { 
        id: props.id, 
        value: props.name, 
        completed: checkedState 
    }

    return ( <Wrapper importance={props.importance}>
        <p style={ style }>{props.name}</p>
        <div>
            <FormControlLabel control={ <GreenCheckbox checked={ checkedState } 
                    onChange={checkedStateHandler} name="checkedG" /> }
                label={ checkedState ? 'completed' : 'uncompleted'} />
                <Button primary onClick={ ( ) => props.editTodoOpenHandler( editedData ) } >Edit</Button>
                <IconButton aria-label="delete" onClick={ ( ) => props.removeTodoHandler(props.id)}>
                    <DeleteIcon />
                </IconButton>
                
        </div>
    </Wrapper>)
}

const mapDispatchToProps = dispatch => {
    return {
        checkedStateHttp: ( id , state ) => dispatch( checkTodo( id , state ) ) ,  
    }
}

export default connect(null , mapDispatchToProps)(Todo);

