import { useState, useEffect } from 'react';
import useLocalStorage from 'hook/useLocalStorage';
import ContactForm from 'modules/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import Section from 'shared/components/Section/Section';
import Contacts from 'modules/Contacts/Contacts';
import Input from 'shared/components/Input/Input';

const KEY_STORAGE = 'contacts';

function App() {
  const [contacts, setContacts] = useLocalStorage(KEY_STORAGE, []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setContacts(contacts);
  });

  const checkDuplicate = newName => {
    return contacts.find(({ name }) => name === newName);
  };

  const addContact = (name, number) => {
    if (checkDuplicate(name)) {
      alert(`${name} is already in contact`);
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    const filteredContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    setContacts(filteredContacts);
  };

  const changeFilter = e => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    console.log(normalizedFilter);
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#010101',
        flexDirection: 'column',
      }}
    >
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Input
          labelText="Find contacts by name"
          name="filter"
          value={filter}
          onChange={changeFilter}
        />
        <Contacts
          contacts={getFilteredContacts()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </div>
  );
}

export default App;
