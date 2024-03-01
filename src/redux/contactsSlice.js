import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';
import { getContactsThunk } from './operations';
import { deleteContactThunk } from './operations';
import { addContactThunk } from './operations';
const contactsInitialState = {
    contacts: {
        items: [],
        status: null,
        error: null,
    },
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: contactsInitialState,
    extraReducers: builder => {
        builder
            .addCase(getContactsThunk.pending, state => {
                state.contacts.error = null;
                state.contacts.status = 'loading';
            })
            .addCase(getContactsThunk.fulfilled, (state, action) => {
                state.contacts.error = null;
                state.contacts.status = 'resolved';
                state.contacts.items = action.payload;
            })
            .addCase(getContactsThunk.rejected, (state, action) => {
                state.contacts.status = 'rejected';
                state.contacts.error = action.payload;
            })
            .addCase(deleteContactThunk.fulfilled, (state, action) => {
                state.contacts.error = null;
                const id = action.payload;
                state.contacts.items = state.contacts.items.filter(
                    item => item.id !== id
                );
                toast.success('contact was deleted');
            })
            .addCase(deleteContactThunk.rejected, state => {
                state.contacts.status = 'rejected';
                toast.error('Контакт не видален, спробуй ще');
            })
            .addCase(addContactThunk.fulfilled, (state, action) => {
                state.contacts.error = null;
                state.contacts.status = 'resolved';
                state.contacts.items.push(action.payload);
                toast.success('Контакт додан');
            })
            .addCase(addContactThunk.rejected, state => {
                state.contacts.status = 'rejected';
                toast.error('Контакт не додан, спробуй ще раз');
            });
    },
});
export const contactsReducer = contactsSlice.reducer;
