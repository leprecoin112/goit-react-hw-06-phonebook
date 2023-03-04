import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contacts.module.scss';
import Button from 'shared/components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getContacts } from 'redux/contacts/contactsSlice';
import { getFilterValue } from 'redux/filters/filtersSlice';

function Contacts() {
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const getFilteredContacts = () => {
    const normalizedFilter = filterValue.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  return (
    <ul className={styles.contacts}>
      {getFilteredContacts().map(({ id, name, number }) => (
        <li className={styles.contact} key={id}>
          <span className={styles.circle}></span>
          <p>
            {name} {number}
          </p>
          <Button
            type="button"
            title="Delete"
            onClick={() => dispatch(deleteContact(id))}
          />
        </li>
      ))}
    </ul>
  );
}

Contacts.propTypes = {
  onDeleteContact: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};

export default Contacts;
