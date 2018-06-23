import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

   constructor(props){
     super(props);
     this.state = {
       successMessage:'',
       errorMessage:'',
       fields:{
         image:'',
       }
     }
   }


  handleInputChange = (e) => {
    this.setState({...this.state,fields:{...this.state.fields,image:e.target.files[0]}})
  }

  saveImageHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('image',this.state.fields.image);
    const request = axios({
      method:'post',
      url:'/images',
      data:data,
      headers:{
        "x-custom-header":this.state.fields.image.name
      }
    })
    request.then(result => {
      console.log("result",result);
      if(result.data.status==="success"){
        this.setState({...this.state,successMessage:result.data.msg,errorMessage:''})
      }else{
        this.setState({...this.state,errorMessage:result.data.msg,successMessage:''})
      }
    }).catch(err=>console.log("error",err));
  }

  render() {
    console.log("this.state.fields.image",this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Zegal</h1>
        </header>
        <p className="App-intro">
          This is my client view to upload and save image.
        </p>
        <input type="file" onChange={this.handleInputChange}/>
        <button type="submit" onClick={this.saveImageHandler}>Save</button>

        {this.state.successMessage && (
          <p>{this.state.successMessage}</p>
        )}
        {this.state.errorMessage && (
          <p>{this.state.errorMessage}</p>
        )}

      </div>
    );
  }
}

export default App;
