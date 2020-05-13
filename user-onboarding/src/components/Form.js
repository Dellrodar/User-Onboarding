import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
  name: yup
  .string()
  .required("Name is a required field"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("You must include an email address"),
  password: yup
    .string()
    .min(8, "Password too short. Password must be 8 characters minimum.")
    .required("You must enter a password."),
  terms: yup.boolean().oneOf([true], "Please agree to terms of use")
});

function Form() {

  // Form default state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: false
  });

  //Button disabled until all fields meet schema
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    password: "",
    terms: false
  });

  const validate = e => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then(valid => {
        setErrorState({
          ...errorState,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = e => {
    e.persist();
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  //User state to an empty array
  const [users, setUsers] = useState([])

  // Basic submit event handler and console.log to confirm form submitted

  const formSubmit = e => {
    e.preventDefault();
    console.log("form submitted!");
    axios
      .post("https://reqres.in/api/users", formState)
      .then( (response) => {
        try {
          const userData = JSON.stringify(response.data, ["name"]);
          setUsers([ ...users, userData ]);
        } catch(error) {
          console.log(error);
        }
      })
      .catch(err => console.log(err));
  };

  console.log(users);

  return (
    <div className ="parentContainer">
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          id="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errorState.name.length > 1 ? (
            <p className="error">{errorState.name}</p>
          ) : null}
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          id="email"
          value={formState.email}
          onChange={inputChange}
        />
        {errorState.email.length > 0 ? (
          <p className="error">{errorState.email}</p>
        ) : null}
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          id="password"
          value={formState.password}
          onChange={inputChange}
        />
        {errorState.password.length > 0 ? (
          <p className="error">{errorState.password}</p>
        ) : null}
      </label>
      <label htmlFor="terms">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        Terms & Conditions
        {errorState.terms.length > 0 ? (
          <p className="error">{errorState.terms}</p>
        ) : null}
      </label>
      <button disabled={buttonDisabled}>Submit</button>
    </form>
    <div>
      <pre>{users}</pre>
    </div>
  </div>
  );
}

export default Form;

