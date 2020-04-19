import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

export class Autocomplete extends Component {
    constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ''
    };
  }

    onChange = (e) => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = (e) => {
      this.setState({ userInput : e.target.innerText ,  activeSuggestion: 0, filteredSuggestions: [],  showSuggestions: false})
  }


 render(){

     const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

     let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <div class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <div key={suggestion} onClick={this.onClick}>
                 <span style={{margin:"5px"}} className="glyphicon glyphicon-tasks"></span>
                  {suggestion}
                </div>
              );
            })}
          </div>
        );
      } else {
        suggestionsListComponent = (
          <div class="suggestions">
            <em>No suggestions!</em>
          </div>
        );
      }
    }

   return (
      <React.Fragment>
        <input 
          className="inputCustom"
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </React.Fragment>
    );
};

  static propTypes = {};

  static defaultProperty={
        suggestions: []
      };
}

export default Autocomplete;