import './App.css';
import Layout from './components/UI/Layout/Layout';
import AddTodo from './containers/AddTodo/AddTodo';
import Todos from './containers/Todos/Todos';


function App() {
  
  
  // Leaner Switch Case In The Reducers 
  // More Fields To Add To The Todo

  return (
    <div className="App">
      <Layout>
        <AddTodo />
        <Todos />
      </Layout>
    </div>
  );
}

export default App;
