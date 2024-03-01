import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import styles from './PhonebookEditor.module.scss';
import { toast } from 'react-toastify';
import { addContactThunk } from '../../redux/operations';

function checkOnSameName(contacts, name) {
    return Boolean(
        contacts.find(
            contact => contact.name.toLowerCase() === name.toLowerCase()
        )
    );
}

const PhonebookEditor = () => {
    const allContacts = useSelector(getContacts);
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.elements.name.value;
        const phone = form.elements.number.value;

        if (name === '') return;

        if (checkOnSameName(allContacts, name)) {
            return toast.info(`${name} is already in contacts`);
        }

        dispatch(addContactThunk({ name, phone }));
        form.reset();
    };

    const nameInputId = nanoid();
    const numberInputId = nanoid();

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor={nameInputId} className={styles.label}>
                Name
            </label>

            <input
                id={nameInputId}
                className={styles.input}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
            <label htmlFor={numberInputId} className={styles.label}>
                Number
            </label>
            <input
                id={numberInputId}
                className={styles.input}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />

            <button type="submit" className={styles.btn}>
                Add contact
            </button>
        </form>
    );
};

export default PhonebookEditor;
