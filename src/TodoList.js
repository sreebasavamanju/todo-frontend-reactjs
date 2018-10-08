import React,{Component} from "react";
import axios from "axios";
import TodoItems from "./TodoItems";
import "./TodoList.css";

class TodoList extends Component{
    constructor(props){
    	super(props);
    	this.addItem=this.addItem.bind(this);
    	this.deleteItem = this.deleteItem.bind(this);

    	 this.state = {
    		items: []
  		 };

  		 this.apiUrl="http://localhost:8080/todos/";

    }

  		componentDidMount(){
    // Make HTTP reques with Axios
    		axios.get(this.apiUrl)
      			.then((res) => {
        	for (var i = 0; i < res.data.length; i++) {
        		var data=res.data[i];
        		var newItem={
				text: data.title,
				key:data.id
				};
			this.setState((prevState)=>{
				return{
					items:prevState.items.concat(newItem)
					};
				});
        	}
      });

    }


    deleteItem(key) {
    	axios.delete(this.apiUrl+key )
      			.then((res) => {


  				var filteredItems = this.state.items.filter(function (item) {
    			return (item.key !== key);
  				});
 
  				this.setState({
    			items: filteredItems
  					});
      			});
	}	
    addItem(e) {
		if(this._inputElement.value !==""){
			var requestData={
				"title":this._inputElement.value,
				"completed":true
			};
			axios.post(this.apiUrl,requestData)
      			.then((res) => {
      				var data=res.data;
        				var newItem={
							text: data.title,
							key:data.id
					};
					this.setState((prevState)=>{
						return{
							items:prevState.items.concat(newItem)
							};
					});	
						
      			});
		this._inputElement.value="";
		} 
		console.log(this.state.items);
		e.preventDefault();
  	}
	render(){
		return(
			<div className="todoListMain">
				<div className="header">
					<form onSubmit={this.addItem}>
						<input ref={(a)=>this._inputElement=a} placeholder="enter task"></input>
						<button type="submit"> add </button>
					</form>
				</div>
				<TodoItems entries={this.state.items} delete={this.deleteItem}/>
			</div>
		);
	}
}export default TodoList;