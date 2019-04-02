import React, { Component } from 'react';
import DynamicForm from './components/DynamicForm';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [
      {id: 1, name:"a", age:29, qualification:"B.Com",rating:3,gender:"male",
          city:"Kerala",skills:["reactjs","angular","vuejs"]},
      {id: 2, name:"b", age:35, qualification:"B.Sc",rating:5,gender:"female",
          city:"Mumbai",skills:["reactjs","angular"]},
      {id: 3, name:"c", age:42, qualification:"B.E",rating:3,gender:"female",
        city:"Bangalore",skills:["reactjs"]},
    ],
    current: {}};
  }

  statearooni = {
    data: [
      {id: 1, name:"a", age:29, qualification:"B.Com",rating:3,gender:"male",
          city:"Kerala",skills:["reactjs","angular","vuejs"]},
      {id: 2, name:"b", age:35, qualification:"B.Sc",rating:5,gender:"female",
          city:"Mumbai",skills:["reactjs","angular"]},
      {id: 3, name:"c", age:42, qualification:"B.E",rating:3,gender:"female",
        city:"Bangalore",skills:["reactjs"]},
    ],
    current: {}
  }

  onSubmit = (model) => {
    let data = [];
    if (model.id) {
      data = this.state.data.filter((d) => {
        return d.id !== model.id
      });
    } else {
      model.id = +new Date();
      data = this.state.data.slice();
    }

    console.log(`${this.state.data} it is 3`);
    console.log(`${model} it is 1`);
    this.setState({
      data: [model, ...data]
    });
    console.log(`${[model, ...data]} has it changed to 4?`);
  }

  onEdit = (id) => {
    let record = this.state.data.find((d) => {
      return d.id === id;
    });
    alert(JSON.stringify(record));
    this.setState({
      current: record
    })
  }

  render() {
    let data = this.state.data.map((d) => {
      return (
        <tr key={d.id}>
            <td>{d.name}</td>
            <td>{d.age}</td>
            <td>{d.qualification}</td>
            <td>{d.rating}</td>
            <td><button onClick={()=>{this.onEdit(d.id)}}>edit</button></td>
        </tr>
      );
    });
    
    return (
      <div className="App">
        <DynamicForm className="form"
          title = "Registration"
          defaultValues = {this.state.current}
          model={[
            {key: "name", label: "Name", props: {required: true}},
            {key: "age",label: "Age", type: "number"},
            {key: "rating",label: "Rating", type: "number", props:{min:0,max:5}},
            
            {key: "qualification",label: "Qualification"}
            
          ]}
          onSubmit = {(model) => {this.onSubmit(model)}} 
        />

        <table border="1">
          <tbody>{data}</tbody>
        </table>

      </div>
    );
  }
}

export default App;
