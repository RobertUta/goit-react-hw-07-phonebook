import ContactsList from './ContactsList/ContactsList.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getContactsState } from '../redux/selectors.js';
import { getContactsThunk } from '../redux/operations.js';
import PhonebookEditor from './PhonebookEditor/PhonebookEditor.jsx';
import Section from './Section/Section.jsx';
import Filter from './Filter/Filter.jsx';
import { useEffect } from 'react';
import AppToastContainer from '../components/AppToastContainer/AppToastContainer';

function App() {
    const { items, status, error } = useSelector(getContactsState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContactsThunk());
    }, [dispatch]);

    if (status === 'loading')
        return (
            <Section title="Phonebook">
                <PhonebookEditor />
                <h1>DATA UPDATE</h1>
            </Section>
        );
    if (error) return <h1>{error}</h1>;

    return (
        <>
            <Section title="Phonebook">
                <PhonebookEditor />
            </Section>
            {items.length > 0 && (
                <Section title="Contacts">
                    <Filter />
                    <ContactsList />
                </Section>
            )}
            {items.length === 0 && (
                <Section title="Contacts">
                    <Filter />
                    <p>You don't have any saved contacts, please add</p>
                </Section>
            )}
            <AppToastContainer />
        </>
    );
}

export default App;
