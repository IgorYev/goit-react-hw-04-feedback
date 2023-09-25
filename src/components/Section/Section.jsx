import React from 'react';
import css from '../Section/Section.module.css';

const Section = ({ title, children }) => {
  return (
    <div>
      <h1 className={css.section}>{title}</h1>
      {children}
    </div>
  );
};

export default Section;
