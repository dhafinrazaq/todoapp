import Autosuggest from 'react-autosuggest';

import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {ITodo, ITag, IState} from "../../types/interfaces"
import * as actions from "../../actions/todos";
import {Search} from "../Icons/Icons"

const tags = [ 'hello', 'world' ];
  
  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : tags.filter(tag =>
      tag.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

export default function SearchBar() {
  const [value, setValue] = useState('');  
  const [suggestions, setSuggestions] = useState(['hello', 'world']);
  const dispatch = useDispatch();

  const getSuggestionValue = (suggestion: string) => suggestion;

  const renderSuggestion = (suggestion: string) => (
    <div>
      {suggestion}
    </div>
  );

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }: {value: string}) => {
      setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event: any, { newValue, method }: {newValue: string, method: string}) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: 'Type a programming language',
    value,
    onChange: onChange
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(value)
  };

  return (
    <div>
        hello
        <Form onSubmit={e => handleSubmit(e)}>
        <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={{
            container:                'react-autosuggest__container',
            containerOpen:            'react-autosuggest__container--open',
            input:                    'react-autosuggest__input',
            inputOpen:                'react-autosuggest__input--open',
            inputFocused:             'react-autosuggest__input--focused',
            suggestionsContainer:     'react-autosuggest__suggestions-container',
            suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
            suggestionsList:          'react-autosuggest__suggestions-list',
            suggestion:               'react-autosuggest__suggestion',
            suggestionFirst:          'react-autosuggest__suggestion--first',
            suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
            sectionContainer:         'react-autosuggest__section-container',
            sectionContainerFirst:    'react-autosuggest__section-container--first',
            sectionTitle:             'react-autosuggest__section-title'
          }}
      />
      <Button><Search></Search></Button>
      </Form>
    </div>
  );
}
