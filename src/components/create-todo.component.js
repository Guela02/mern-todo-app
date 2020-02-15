import React, { Component } from 'react';
// import { render } from '@testing-library/react';
import axios from 'axios';


export default class CreateTodo extends Component {

    /*provide any custom initialization that must be done before any other 
    methods can be called on an instantiated object.*/

    constructor(props) {
        super(props); //parent constructor

        //state properties
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        //create
        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }

    }
    //use to update from state objects
    onChangeTodoDescription(e) {

        this.setState({
            todo_description: e.target.value

        });
    }

    onChangeTodoResponsible(e) {

        this.setState({
            todo_responsible: e.target.value

        });
    }

    onChangeTodoPriority(e) {

        this.setState({
            todo_priority: e.target.value

        });
    }


    onSubmit(e) {
        e.preventDefault(); //resetting on an empty string

        // use to output values
        console.log('Form submitted:');
        // use to output values - value will be found from this.state.todo
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }

        //endpoint w/c is accepting incoming post request containing an object
        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));



        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false

        })

    }



    render() {
        return ( //form should be in return statement
            <div style={{ marginTop: 20 }}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription}

                        />
                    </div>
                    <div className="form-group">
                        <label>Responsible</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_responsible}
                            onChange={this.onChangeTodoResponsible}

                        />

                    </div>



                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio" //for redio button
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.todo_priority === 'Low'} //if priority is low
                                /*event handler w/c is makling sure state obj is updated if radio input is checked.
                                Handled by onChangeTodoPriority*/
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.todo_priority === 'Low'} //if priority is low
                                /*event handler w/c is makling sure state obj is updated if radio input is checked.
                                Handled by onChangeTodoPriority*/
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                                checked={this.state.todo_priority === 'Medium'} //if priority is medium
                                /*event handler w/c is makling sure state obj is updated if radio input is checked.
                                Handled by onChangeTodoPriority*/
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>

                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />

                    </div>



                </form>
            </div>
        )
    }
}
