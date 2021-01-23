import Autosuggest from "react-autosuggest";

import React, { useState } from "react";
import { Button, Form } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { ITodo, ITag, IState } from "../../types/interfaces";
import * as actions from "../../actions/todos";
import { Search } from "../Icons/Icons";
import { searchBarTheme } from "./style";

export default function SearchBar() {
  const tags: ITag[] = useSelector((state: IState) => state.todo.tags);
  const [value, setValue] = useState("");
  const [tag, setTag] = useState<ITag>();
  const [suggestions, setSuggestions] = useState<ITag[]>([]);
  const dispatch = useDispatch();

  const getSuggestionValue = (suggestion: ITag) => suggestion.name;

  const renderSuggestion = (suggestion: ITag) => <div>{suggestion.name}</div>;

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : tags.filter(
          (tag) => tag.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (
    event: any,
    { newValue, method }: { newValue: string; method: string }
  ) => {
    setValue(newValue);

    if (
      method == "click" ||
      method == "down" ||
      method == "up" ||
      method == "enter"
    ) {
      setTag(tags.find((tag) => tag.name === newValue));
    }
  };

  const inputProps = {
    placeholder: "Search tag",
    value,
    onChange: onChange,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof tag === "undefined") {
      console.log("all todos load");
      dispatch(actions.getTodos());
    } else {
      console.log("todos with tag");
      // @ts-ignore
      dispatch(actions.getTodoWithTag(tag));
    }
  };

  return (
    <div>
      <Form className="form-inline" onSubmit={(e) => handleSubmit(e)}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={searchBarTheme}
        />
        <Button className="search-button" color="link">
          <Search></Search>
        </Button>
      </Form>
    </div>
  );
}
