import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContacts } from 'redux/contacts/contactsSlice';
import PropTypes from 'prop-types';
import Button from 'shared/components/Button/Button';
import Input from 'shared/components/Input/Input';
import styles from './ContactForm.module.scss';
function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const resetState = () => {
    setName('');
    setNumber('');
  };

  const checkDuplicate = newName => {
    return contacts.find(({ name }) => name === newName);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (checkDuplicate(name)) {
      alert(`${name} is already in contact`);
      return;
    }

    dispatch(addContact(name, number));
    resetState();
  };

  const handleChange = e => {
    const { value, name } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        labelText="Name"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        value={name}
        onChange={handleChange}
      />
      <Input
        labelText="Number"
        name="number"
        type="tel"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        value={number}
        onChange={handleChange}
      />
      <Button title="Add contact" />
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ContactForm;
