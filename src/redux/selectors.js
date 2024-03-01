//these callbacks for useSelector
export const getContacts = state => state.contacts.contacts.items;
export const getFilterValue = state => state.filter.filter;
export const getContactsState = state => state.contacts.contacts;
