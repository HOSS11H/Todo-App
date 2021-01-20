import { useState , useCallback, useEffect , useRef } from "react";
import { addTodo } from '../../store/actions/index'
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import Button from "../../components/UI/Button/Button";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import Input from "../../components/UI/Input/Input";

const AddTodo = props => {

    const { addTodoHttp , newTodoInputValue, addingTodo } = props;

    const [ inputValue , setInputValue ] =useState(newTodoInputValue)

    useEffect(() => {
        setInputValue( newTodoInputValue );
    }, [ newTodoInputValue ])

    const inputRef = useRef( );

    /* useEffect( ( ) => { 
        const timer = setTimeout( ( ) => {
        if (inputValue === inputRef.current.value) {
            const query = inputValue.length === 0 ? ''
            : `?orderBy="name"&equalTo="${ inputValue }"`
            fetch('https://todos-app-1dfd8.firebaseio.com/todos.json' + query )
            .then( response => response.json() )
            .then( bodyData => {
                console.log(bodyData);
            })
        }
        } , '500')
        return ( ) => {
        clearTimeout( timer );
        }
    
    }, [ inputValue , inputRef ]);
     */

    const addTodoHandler = useCallback( (  ) => {
        const newTodoData = {
            name: inputValue,
            completed: false,
        }
        if ( inputValue !== '' ) {
            addTodoHttp( newTodoData ) ;
        }
    }  , [ addTodoHttp,  inputValue ])


    return(
        <Wrapper>
            <Input ref={inputRef} value={inputValue} onChange={ event => setInputValue(event.target.value) } />
            { addingTodo ? <CircularProgress style={ { margin: '0 5px' } } color='primary' /> : null }
            <Button primary onClick={ ( ) => addTodoHandler( ) }>Add</Button>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        addingTodo: state.td.addingTodo,
        todoAdded: state.td.todoAdded,
        newTodoInputValue: state.td.newTodo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTodoHttp: ( todo ) => dispatch( addTodo( todo ) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);