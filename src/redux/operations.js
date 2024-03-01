import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContactsThunk = createAsyncThunk(
    'contacts/getContacts',
    async function (_, { rejectWithValue }) {
        try {
            const response = await axios.get(
                'https://63de5b609fa0d60060fd4895.mockapi.io/contacts'
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteContactThunk = createAsyncThunk(
    'contacts/deleteContact',
    async function (id, { rejectWithValue }) {
        try {
            await axios.delete(
                `https://63de5b609fa0d60060fd4895.mockapi.io/contacts/${id}`
            );

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const addContactThunk = createAsyncThunk(
    'contacts/addContact',
    async function ({ name, phone }, { rejectWithValue }) {
        const today = new Date();
        const contact = {
            name,
            phone,
            createdAt: today.toLocaleString(),
        };
        try {
            const response = await axios.post(
                `https://63de5b609fa0d60060fd4895.mockapi.io/contacts/`,
                contact
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
