import React from 'react';
import Form from "./components/Form";
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <h1>TODO LIST</h1>
        <Form/>
      </div>
    )
  }
}

export default App;