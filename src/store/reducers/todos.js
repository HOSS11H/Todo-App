import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const intialState = {
    todos: [ ],
    loadingTodos: false,
    error: false,
    newTodo: '',
    addingTodo: false,
    todoAdded: false,
    removingTodo: false,
    todoRemoved: false,
} ;

const reducer = ( state = intialState , action ) => {
    switch( action.type ) {
        case( actionTypes.ADD_TODO_START ) :
            return updateObject( state , {
                addingTodo: true,
                todoAdded: false,
                newTodo: action.inputVal,
            } )
        case( actionTypes.ADD_TODO_SUCCESS ) :
            const updatedTodos = [ ...state.todos ];
            updatedTodos.push( action.data );
            return updateObject( state , {
                todos: updatedTodos,
                addingTodo: false,
                todoAdded: true,
                newTodo: '',
            } )
        case( actionTypes.ADD_TODO_FAILED) :
            return updateObject( state, {
                addingTodo: false,
                todoAdded: false,
                newTodo: action.inputVal
            } )
        case( actionTypes.REMOVE_TODO_START ) :
            return updateObject( state , {
                removingTodo: true,
                todoRemoved: false,
            })
        case( actionTypes.REMOVE_TODO_SUCCESS ) :
            const updatedArr = state.todos.filter( el => action.id !== el.id )
            return updateObject( state , {
                todos: updatedArr,
                removingTodo: false,
                todoRemoved: true,
            } )
        case( actionTypes.REMOVE_TODO_FAILED ) :
            return updateObject( state , {
                removingTodo: false,
                todoRemoved: false,
            }  )
        case ( actionTypes.EDIT_TODO_START ) : 
            return updateObject( state, {
                editingTodo: true,
                todoEdited: false,
            } )
        case ( actionTypes.EDIT_TODO_SUCCESS ) : 
            // We Indicate The Index Of THe Selected Todo
            let todoIndex = state.todos.findIndex( el => {
                return el.id === action.id
            } )
            // We Make A Copy Of The Todo
            let updatedTodo = { ...state.todos[todoIndex] };
            // We Edit It
            updatedTodo.name = action.val;
            // We Make A Copy Of The Todos
            let editedTodos =  [ ...state.todos ]
            // We Update The Cloned Todos
            editedTodos[todoIndex] =updatedTodo;
            return updateObject( state, {
                todos: editedTodos,
                editingTodo: false,
                todoEdited: true,
            } )
        case ( actionTypes.EDIT_TODO_FAILED ) : 
            return updateObject( state , {
                editingTodo: false,
                todoEdited: false,
            } )
        case ( actionTypes.FETCH_TODOS_START ): 
            return updateObject( state , {
                loadingTodos: true,
                error: false,
            } )
        case ( actionTypes.FETCH_TODOS_SUCCESS ): 
            return updateObject( state , {
                loadingTodos: false,
                todos: action.todos,
            } )
        case ( actionTypes.FETCH_TODOS_FAILED ): 
            return updateObject( state , {
                loadingTodos: false,
                error: action.error,
            } )
        default : 
            return state
    }
};
export default reducer;