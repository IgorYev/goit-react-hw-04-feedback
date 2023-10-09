import React, { useState } from 'react';
import FeedbackOptions from './Feedback/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = option => {
    switch (option) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        break;
    }
  };

  const totalSumFeedback = good + neutral + bad;
  const positiveFeedbackPercentage =
    totalSumFeedback > 0 ? Math.round((good / totalSumFeedback) * 100) : 0;
  const isFeedbackCollected = totalSumFeedback > 0;

  return (
    <div className="container">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleFeedback}
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
    </div>
  );
};

export default App;
