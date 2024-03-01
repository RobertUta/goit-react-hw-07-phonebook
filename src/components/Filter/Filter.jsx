import { useDispatch, useSelector } from 'react-redux';
import { setFilterValue } from '../../redux/filterSlice.js';
import { getFilterValue } from '../../redux/selectors.js';

import { nanoid } from 'nanoid';
import styles from './Filter.module.scss';

const Filter = () => {
    const dispatch = useDispatch();
    const filterValue = useSelector(getFilterValue);

    const handleInputChange = evt => {
        const newFilterValue = evt.target.value;
        dispatch(setFilterValue(newFilterValue));
    };

    const filterInputId = nanoid();
    return (
        <div className={styles.wrapper}>
            <label className={styles.label} htmlFor="filterInputId">
                Find contacts by name
            </label>
            <input
                id={filterInputId}
                type="text"
                value={filterValue}
                name="filter"
                onChange={handleInputChange}
            />
        </div>
    );
};

export default Filter;
