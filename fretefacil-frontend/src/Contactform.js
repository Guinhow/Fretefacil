import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {
                setSuccessMessage(result.message);
                setFormData({ nome: '', email: '', mensagem: '' })
            } else {
                alert('Erro ao enviar a mensagem');
            }
        } catch (error) {
            alert('Erro ao enviar a mensagem: ' + error.message);
        }
    };

    return (
        <div className="lista-filtros contact-form">
            <div>
                <h1>Fale Conosco!</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <label>
                    Nome:
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Mensagem:
                    <textarea className='msg-box'
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Enviar</button>
                {successMessage && <p>{successMessage}</p>}
            </form>
        </div>
    );
};

export default ContactForm;
