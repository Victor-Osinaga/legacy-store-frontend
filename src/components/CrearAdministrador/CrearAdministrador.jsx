import React, { useState } from 'react';
import './CrearAdministrador.css'
import config from '../../../config.js';

function CrearAdministrador() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // const formData2 = new FormData();
        // formData2.append('email', email);
        // formData2.append('password', password);
        // formData2.append('name', name);
        // formData2.append('lastname', lastname);
        const formData2 = {
            email: email,
            password: password,
            name: name,
            lastname: lastname
        }
        console.log("formdata2", JSON.stringify(formData2));

        try {
            const access_token = sessionStorage.getItem('access_token');
            const response = await fetch(`${config.API_BASE_URL}/users/`, {
                headers: { Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json' },
                // headers: { Authorization: `Bearer 123123213213` },
                method: 'POST',
                // body: JSON.stringify(obj),
                body: JSON.stringify(formData2)
            });
            const data = await response.json();

            const result = document.getElementById('resultLogin')
            if (data.status === 'ok') {
                result.innerHTML = "Admin creado"
                result.style.color = "green"
            } else {
                result.innerHTML = data.data
                result.style.color = "red"
            }
            console.log(data);
            // Aquí podrías hacer algo con la respuesta, como actualizar una lista de productos.

        } catch (error) {
            console.error(error);
        }
    };

    return(
            <section id="crear">
            <div className="div1-crear"></div>
            <div className="div2-crear"></div>
            <div className="main-crear">
                <div className="main_right-crear col-12 col-md-7 bg-light">
                    <form onSubmit={handleFormSubmit} className='main_right_cont-crear'>
                        <h3 className="section_title-crear " data-text="Crea tu producto">Nuevo administrador</h3>
                        <div className="form-group-crear">
                            <label htmlFor="email"><b>Email</b></label>
                            <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                        </div>

                        <div className='form-group-crear'>
                            <label htmlFor="password"><b>Contraseña</b></label>
                            <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                        </div>

                        <div className='form-group-crear'>
                            <label htmlFor="name"><b>Nombre</b></label>
                            <input type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} required />
                        </div>

                        <div className='form-group-crear'>
                            <label htmlFor="lastname"><b>Apellido</b></label>
                            <input type="text" id="lastname" name="lastname" value={lastname} onChange={(event) => setLastname(event.target.value)} required />
                        </div>

                        <div id="resultLogin"></div>
                        <button className='start_login-crear' type="submit"><b>Enviar</b></button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CrearAdministrador;