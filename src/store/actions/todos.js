import * as actionTypes from './actionTypes';
import axios from 'axios';


export const addTodoStart = ( val ) => {
    return {
        type: actionTypes.ADD_TODO_START,
        inputVal: val,
    }
}
export const addTodoSuccess = ( todoData ) => {
    return {
        type: actionTypes.ADD_TODO_SUCCESS ,
        data: todoData
    }
}
export const addTodoFailed = ( err , val ) => {
    return {
        type: actionTypes.ADD_TODO_FAILED ,
        error: err,
        inputVal: val,
    }
}
export const addTodo = ( newTodoData ) => {
    return dispatch => {
        dispatch( addTodoStart( newTodoData.name.value ) )
        axios.post('https://todos-app-1dfd8.firebaseio.com/todos.json', newTodoData)
            .then( res => {
                dispatch( addTodoSuccess( { id: res.data.name, ...newTodoData} ) )
                console.log(res);
                })
            .catch( err => dispatch(  addTodoFailed( err , newTodoData.name )) )
    }
}
export const removeTodoStart = (  ) => {
    return {
        type: actionTypes.REMOVE_TODO_START ,
    }
}
export const removeTodoSuccess = ( id ) => {
    return {
        type: actionTypes.REMOVE_TODO_SUCCESS ,
        id: id
    }
}
export const removeTodoFailed = ( err ) => {
    return {
        type: actionTypes.REMOVE_TODO_FAILED ,
        err : err
    }
}

export const removeTodo = ( id )=> {
    return dispatch => {
        dispatch( removeTodoStart( ) )
        axios.delete(`https://todos-app-1dfd8.firebaseio.com/todos/${id}.json`)
            .then( res => dispatch( removeTodoSuccess( id ) ) )
            .catch( err => dispatch( removeTodoFailed( err.message) ) )
    }
}

export const fetchTodosStart = (  ) => {
    return {
        type: actionTypes.FETCH_TODOS_START,
    }
}
export const fetchTodosSuccess = ( todosData ) => {
    return {
        type: actionTypes.FETCH_TODOS_SUCCESS,
        todos: todosData
    }
}
export const fetchTodosFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_TODOS_FAILED,
        error: errorMessage,
    }
}
export const fetchTodos = (  ) => {
    return dispatch => {
        dispatch( fetchTodosStart( ) )
        axios.get('https://todos-app-1dfd8.firebaseio.com/todos.json')
            .then( response => {
                let fetchedTodos = [ ] ;
                    for (let key in response.data) {
                        fetchedTodos.push( {
                            ...response.data[key],
                            id: key
                        } )
                    }
                    console.log(fetchedTodos);
                    dispatch( fetchTodosSuccess( fetchedTodos ) );
                })
                .catch( err => {
                    dispatch( fetchTodosFailed( err.message  ) )
                } )
            }
        }
export const editTodoStart = ( ) => {
    return {
        type: actionTypes.EDIT_TODO_START,
    }
}
export const editTodoSuccess = ( id , value ) => {
    return {
        type: actionTypes.EDIT_TODO_SUCCESS,
        id: id,
        val: value,
    }
}
export const editTodoFailed = ( err ) => {
    return {
        type: actionTypes.EDIT_TODO_FAILED,
    }
}

export const editTodo = ( todoData ) => {
    const editedData ={ 
        name: todoData.value,
    }
    console.log(editedData);
    return dispatch => {
        dispatch( editTodoStart( ) )
        axios.patch(`https://todos-app-1dfd8.firebaseio.com/todos/${todoData.id}.json` , editedData )
            .then( res => {
                console.log(res);
                dispatch( editTodoSuccess( todoData.id, todoData.value ) );
            })
            .catch( err => {
                return dispatch( editTodoFailed( err.message ) )
            })
    }
}

export const checkTodoStart = ( ) => {
    return {
        type: actionTypes.CHECK_TODO_START,
    }
}
export const checkTodoSuccess = ( ) => {
    return {
        type: actionTypes.CHECK_TODO_SUCCESS,
    }
}
export const checkTodoFailed = ( err ) => {
    return {
        type: actionTypes.CHECK_TODO_FAILED,
    }
}
export const checkTodo= ( id, status ) => {
    return dispatch => {
        dispatch( checkTodoStart( ) )
        const obj = {
            completed: status
        }
        axios.patch(`https://todos-app-1dfd8.firebaseio.com/todos/${id}.json` , obj)
            .then( res=> {
                return dispatch( checkTodoSuccess( res) )
            })
            .catch( err => {
                console.log(err.message);
                return dispatch( checkTodoFailed( err.message ) )
            })
    }
}

