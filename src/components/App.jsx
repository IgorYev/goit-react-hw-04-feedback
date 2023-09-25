import React, { Component } from 'react';
import FeedbackOptions from './Feedback/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import { nanoid } from 'nanoid';

import ContactList from './ContactList/ContactList';
import PhoneBookForm from './PhonebookForm/PhonebookForm';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
    contacts: [],
    filter: '',
  };

  handleFeedback = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };

  countTotalFeedback() {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  }

  countPositiveFeedbackPercentage() {
    const { good } = this.state;
    const total = this.countTotalFeedback();
    return total > 0 ? Math.round((good / total) * 100) : 0;
  }

  handleFilterChange = event => {
    this.setState({ filter: event.target.value.toLowerCase() });
  };
  isNameUnique = name => {
    const { contacts } = this.state;
    return !contacts.some(contact => contact.name === name);
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleSubmit = (name, number) => {
    if (name.trim() === '' || number.trim() === '') {
      alert('Please enter a name and a phone number');
      return;
    }

    if (!this.isNameUnique(name)) {
      alert('This name is already in contacts');
      return;
    }

    const newContact = { id: nanoid(), name, number };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  getFilteredContacts() {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  }

  render() {
    const { good, neutral, bad, filter } = this.state;
    const totalSumFeedback = this.countTotalFeedback();
    const positiveFeedbackPercentage = this.countPositiveFeedbackPercentage();
    const isFeedbackCollected = totalSumFeedback > 0;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className="container">
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={this.handleFeedback}
          />
        </Section>
        <Section title="Statistics">
          {isFeedbackCollected ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalSumFeedback}
              positivePercentage={positiveFeedbackPercentage}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
        <Section title="Phonebook">
          <PhoneBookForm onSubmit={this.handleSubmit} />
        </Section>

        <Section title="Contacts">
          <Filter filter={filter} onFilterChange={this.handleFilterChange} />

          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        </Section>
      </div>
    );
  }
}

export default App;
