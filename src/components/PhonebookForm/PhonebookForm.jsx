import React, { Component } from 'react';
import css from '../PhonebookForm/PhonebookForm.module.css';

class PhoneBookForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit(name, number);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.formField} onSubmit={this.handleSubmit}>
        <input
          className={css.fieldName}
          type="text"
          name="name"
          required
          value={name}
          onChange={this.handleChange}
          placeholder="Enter name"
        />
        <input
          className={css.fieldNumber}
          type="tel"
          name="number"
          required
          value={number}
          onChange={this.handleChange}
          placeholder="Number"
        />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default PhoneBookForm;
