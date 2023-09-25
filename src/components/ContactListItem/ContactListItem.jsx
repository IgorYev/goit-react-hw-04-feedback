import React from 'react';
import css from '../ContactListItem/ContactListItem.module.css';

const ContactListItem = ({ contact, onDeleteContact }) => {
  const { id, name, number } = contact;

  return (
    <li className={css.contactListItem}>
      {name}: {number}
      <button className={css.deleteBtn} onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </li>
  );
};

export default ContactListItem;
