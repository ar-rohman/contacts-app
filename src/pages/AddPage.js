import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addContact } from '../utils/api';
import ContactInput from '../components/ContactInput';

function AddPage() {
    const navigate = useNavigate();

    async function onAddContactHandler(contact) {
        addContact(contact);
        navigate('/');
    }

    return (
        <section>
            <h2>Tambah Kontak</h2>
            <ContactInput addContact={onAddContactHandler} />
        </section>
    )
}

export default AddPage;
