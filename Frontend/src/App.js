import React from 'react';
import './App.css';
import backgroundImg from './Images/back.jpg';
import Autocomplete from './AutoComplete';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      restuarants: []
    }
  }
  componentDidMount() {
    axios.get("http://localhost:3006/cities")
      .then(res => this.setState({ cities: res.data }))
      .catch(err => console.log(err))

  }

  handleChange = (event) => {
    console.log(`http://localhost:9000/hotels?city=${event.target.value}`)
    axios.get(`http://localhost:9000/hotels?city=${event.target.value}`)
      .then(res => this.setState({ restuarants: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    const { cities, restuarants } = this.state;
    const suggestOptions = restuarants.map((item)=> { return item.name})
    return (
      <div>
        <div className="header">
          Online Food Ordering App
   </div>
        <div className="middle"></div>
        <div className="dvContainer">

          <img className="backgroundimage" src={backgroundImg} alt="ok" border="0" alt=""></img>

          <div className="dvInsideTL Row">
            <span style={{ top: "30%", left: "3%" }} className="glyphicon glyphicon-send"></span>
            <select onChange={this.handleChange} style={{ "maxWidth": "160px", "marginRight": "-10px", "paddingLeft": "30px" }} className="custom-select Column">
              {cities.map((item, index) => {
                console.log(item)
                return <option key={index}>{item}</option>
              })}
            </select>
            <span style={{ top: "30%", left: "3%" }} className="glyphicon glyphicon-search"></span>


            <Autocomplete
              suggestions={suggestOptions}
            />

            <button style={{ "maxWidth": "120px" }} className="btn btn-danger Column">Search</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
