import { createAsyncThunk } from '@reduxjs/toolkit';

export const getContactsThunk = createAsyncThunk(
    'contacts/getContacts',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(
                'https://63de5b609fa0d60060fd4895.mockapi.io/contacts'
            );
            if (!response.ok) {
                const text = await response.text();
                throw new Error(
                    `An error has occured: ${text} (${response.status})`
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteContactThunk = createAsyncThunk(
    'contacts/deleteContact',
    async function (id, { rejectWithValue }) {
        try {
            const response = await fetch(
                `https://63de5b609fa0d60060fd4895.mockapi.io/contacts/${id}`,
                { method: 'DELETE' }
            );
            if (!response.ok) {
                const text = await response.text();
                throw new Error(
                    `An error has occured: ${text} (${response.status})`
                );
            }
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
            const response = await fetch(
                `https://63de5b609fa0d60060fd4895.mockapi.io/contacts/`,
                {
                    method: 'POST',
                    body: JSON.stringify(contact),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                const text = await response.text();
                throw new Error(
                    `An error has occured: ${text} (${response.status})`
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// {
// "name": "Cameron Leffler",
// "phone": "648.962.7573",
// "createdAt": "2023-02-04T20:34:35.745Z",
// "id": "13"
// },
