import { useState , useEffect } from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const  EditTodoDialog = props => {

    const { show, todoData } = props;

    const [ openEditTodo, setOpenEditTodo ] = useState(show);

    const [ inputVal , setInputVal ] = useState( todoData.value );

    useEffect( (  ) => {
        setInputVal(todoData.value);
    } , [ todoData ] )


    useEffect( ( ) => {
        setOpenEditTodo(show)
    } , [ show ])

    return (
        <div>
            <Dialog open={openEditTodo} onClose={ props.editTodoCloseHandler } aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Do You Want To Edit Your Todo ?
                </DialogContentText>
                    <Input value={inputVal} onChange={ (event)  => setInputVal(event.target.value) } />
                </DialogContent>
                <DialogActions>
                    <Button onClick={ (  ) => props.editTodoConfirmHandler( { ...todoData, value: inputVal } ) } primary>
                        Submit
                    </Button>
                    <Button onClick={props.editTodoCloseHandler} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default EditTodoDialog;
