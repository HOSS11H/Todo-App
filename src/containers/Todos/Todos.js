import { useState,  useEffect  } from 'react';
import { connect } from 'react-redux'
import Todo from '../../components/Todo/Todo';

import { fetchTodos , removeTodo, editTodo } from '../../store/actions/index';

import React from 'react';
import Button from '../../components/UI/Button/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import EditTodoDialog from '../../components/EditTodoDialog/EditTodoDialog';

import CircularProgress from '@material-ui/core/CircularProgress';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Todos = props =>{
    
    // For The Edit Dialog
    const [ openEditTodo, setOpenEditTodo ] = useState(false);
    const [ editedTodoData, setEditedTodoData ] = useState({ id: null, value: '' });
    
    // For The Delete Dialog
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [ selectedTodoId , setSelectedTodoId ] = useState(null);

    const editDialogOpenHandler = ( todoData ) => {
        // We Open The Dialog 
        setOpenEditTodo(true);
        // We Set The Todo's Data
        setEditedTodoData( todoData );
    }
    
    const editConfirmHandler = ( newTodoData ) => {
        // We Dispatch The Edit Action
        props.editTodo( newTodoData );
        // We Close The Dialog 
        setOpenEditTodo(false);
        // We Clear The Edited Todo data
        setEditedTodoData( { id: null , value: '' } );
    }

    const editDialogCloseHandler = ( ) => {
        // We Close The Dialog 
        setOpenEditTodo(false);
        // We Clear The Edited Todo data
        setEditedTodoData( { id: null , value: '' } );
    }

    const deleteDialogOpenHandler = ( id ) => {
        // We Open The Dialog
        setOpenDeleteConfirm(true);
        // We Store The Todo's Id In The State
        setSelectedTodoId(id);
    };
    
    const deleteConfirmHandler = id => {
        // We Close The Dialog
        setOpenDeleteConfirm(false);
        // We Dispatch The Delete Action With The Stored Id In The State 
        removeTodo(selectedTodoId)
    }
    
    const deleteDialogCloseHandler = () => {
        // We Reset The Value Of The Selected Todo Id IN The State
        setSelectedTodoId(null)
        // We Close The Dialog
        setOpenDeleteConfirm(false);
    };

    const { fetchTodosHandler , removeTodo , todoRemoved ,fetchedTodos , loadingTodos } = props;    
    
    useEffect( () => {
        // Load Todos ON Intiallization
        fetchTodosHandler( )
    }, [ fetchTodosHandler ])

    useEffect( ( ) => {
        // We Reset The Value Of The Selected Todo Id After Successful Deleting
        if( todoRemoved ) {
            setSelectedTodoId(null)
        }
    } , [ todoRemoved ])


    const loadedTodos = fetchedTodos.map( todo => ( 
        <Todo key={todo.id} id={ todo.id } name= { todo.name} importance={todo.importance} 
        completed={todo.completed} removeTodoHandler={ deleteDialogOpenHandler } 
        editTodoOpenHandler={ editDialogOpenHandler }  />
    ))

    return (
        <div>
            { loadingTodos ? <CircularProgress color='primary' /> : null }
            { loadedTodos }
            <Todo key='jf73njg' id='jf73njg' name= 'testing1' importance='necessary' completed removeTodoHandler={ removeTodo }  />
            <Todo key='jf73hfhjg' id='jf73njg' name= 'testing2' importance='necessary' completed={false} removeTodoHandler={ removeTodo }  />
            <Dialog
                open={openDeleteConfirm}
                TransitionComponent={Transition}
                keepMounted
                onClose={deleteDialogCloseHandler}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Are You Sure You Want To Delete This Todo"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        This Todo Will Be Deleted Permanently
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteConfirmHandler} primary>
                        Agree
                    </Button>
                    <Button onClick={deleteDialogCloseHandler} >
                        Disagree
                    </Button>
                </DialogActions>
            </Dialog>
            <EditTodoDialog show={openEditTodo} todoData={editedTodoData} 
                editTodoConfirmHandler= { editConfirmHandler }
                editTodoCloseHandler={ editDialogCloseHandler } />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        fetchedTodos: state.td.todos,
        loadingTodos: state.td.loadingTodos,
        todoRemoved: state.td.todoRemoved
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchTodosHandler : ( ) => dispatch( fetchTodos( ) ),
        removeTodo: ( id ) => dispatch( removeTodo( id ) ),
        editTodo: ( todoData ) => dispatch( editTodo( todoData ) )
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Todos);