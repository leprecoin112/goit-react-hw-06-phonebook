import ContactForm from 'modules/ContactForm/ContactForm';

import Section from 'shared/components/Section/Section';
import Contacts from 'modules/Contacts/Contacts';
import Input from 'shared/components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterValue, getFilterValue } from 'redux/filters/filtersSlice';

function App() {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);
  const changeFilter = e => {
    dispatch(setFilterValue(e.target.value));
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
        <ContactForm />
      </Section>
      <Section title="Contacts">
        <Input
          labelText="Find contacts by name"
          name="filter"
          value={filterValue}
          onChange={changeFilter}
        />
        <Contacts />
      </Section>
    </div>
  );
}

export default App;
