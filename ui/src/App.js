import React from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/lib/Creatable';
console.clear();

const options = [
   { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];


class MyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ""}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state.value);
    // this.props.addTodo(this.state.value);
    // this.setState({value : ''});
    
  }
  handleChange = (newValue: any, actionMeta: any) => {
        console.group('Value Changed');
        console.log(newValue);
        var val = "";
        if (!newValue) {
          val = ""
        } else {
          console.log("asdasdasdasdasdasd");
          console.log(newValue.value);
          val = newValue.value || "";
        }
        this.setState({value: val});
        
        console.log(val);
        this.props.addTodo(val);
        this.setState({value : ''});
        
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
      };
  handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group('Input Changed');
    console.log(inputValue);
    //this.state.value = newValue;
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  render() {
    return (<div>
      <form onSubmit={this.handleSubmit}>
      <CreatableSelect 
        isClearable
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={options}
      />
      </form>
    </div>)
  }
}
const Title = ({todoCount}) => {
  return (
    <div>
       <div>
          <h1>to-do ({todoCount})</h1>
       </div>
    </div>
  );
}

const TodoForm = ({addTodo}) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
      <React.Fragment>
          <Header/>
          <Form/>
          <PackageList/>
      </React.Fragment>
    )
}

const TodoList = ({todos, remove}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}<br/></div>);
}

// Contaner Component
// Todo Id
window.id = 0;
class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
    this.apiUrl = '//57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
  }
  // Lifecycle method
  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({data:res.data});
      });
  }
  // Add todo handler
  addTodo(val){
    // Assemble data
    const todo = {text: val}
    // Update data
    console.log(this.state.data);
    console.log(this.state.data.length);
    console.log(this.state.data.map( x => x.text));
    console.log(val);
    console.log(this.state.data.map( x => x.text).indexOf(val));

    if (val.length != 0 && this.state.data.map( x => x.text).indexOf(val) == -1) {
      axios.post(this.apiUrl, todo)
       .then((res) => {
          this.state.data.push(res.data);
          this.setState({data: this.state.data});
          console.log(this.state.data);
          console.log(this.state.data.length);
       });
    }
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    // Update state with filter
    axios.delete(this.apiUrl+'/'+id)
      .then((res) => {
        this.setState({data: remainder});      
      })
  }
 
  render(){
    // Render JSX
    return (
      <div>
        <Title todoCount={this.state.data.length}/>
        <MyForm addTodo={this.addTodo.bind(this)}/>
        <TodoList 
          todos={this.state.data} 
          remove={this.handleRemove.bind(this)}
        />
        <button onClick={(e) => {e.preventDefault(); console.log(this.state.data);}}>Submit</button>
      </div>
    );
  }
}

export default TodoApp;
