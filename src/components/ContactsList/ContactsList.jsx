import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../redux/selectors.js';
import { getFilterValue } from '../../redux/selectors.js';
import styles from './ContactsList.module.scss';
import { deleteContactThunk } from '../../redux/operations.js';

function filterContacts(allContacts, filterValue) {
    if (filterValue !== '') {
        return allContacts.filter(contact =>
            contact.name.toLowerCase().includes(filterValue.toLowerCase())
        );
    }
    return allContacts;
}

const ContactsList = () => {
    const dispatch = useDispatch();
    const allContacts = useSelector(getContacts); //масив
    const filterValue = useSelector(getFilterValue); // строка
    const filteredContacts = filterContacts(allContacts, filterValue); //масив

    const handleDeleteBtn = id => dispatch(deleteContactThunk(id));

    return (
        <ul className={styles.list}>
            {filteredContacts.map(({ name, phone, id }) => (
                <li className={styles.item} key={id}>
                    {name}: {phone}
                    <button
                        className={styles.button}
                        type="button"
                        onClick={() => {
                            handleDeleteBtn(id);
                        }}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default ContactsList;
