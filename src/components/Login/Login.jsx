import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import { login } from '../../fetch/fetch';
import logo from '../../assets/logo-jarry.png'
import useStoreContext from '../../provider/storeProvider';
import TagCloud from 'TagCloud';


function Login() {

    const container = '.tagcloud';
    // const texts = [
    //     'envio nacional', '.', '100% para ti', '.',
    //     'lo tenemos', '.', 'compra rapida', '.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.',
    // ];
    const texts = [
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
    ];

    const options = {
        radius: 80,
        maxSpeed: 'fast',
        initSpeed: 'fast',
        direction: 240,
        keep: true,
        useContainerInlineStyles: true
    };

    TagCloud(container, texts, options);
    const { settoken } = useStoreContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const divResult = document.getElementById('resultLogin')
        divResult.innerHTML = `<b className="sesionComprobando">Comprobando</b>`
        divResult.style.opacity = 1;

        const data = { email, password };
        const response = await login(data)

        // divResult.innerHTML = `<b>${response.data}</b>`

        if (response.status === 'ok') {
            divResult.innerHTML = `<b className="sesionExitoso">Session iniciada</b>`;
            divResult.style.opacity = 0;
            divResult.style.transition = "all 2.5s linear";
            sessionStorage.setItem('access_token', response.data.access_token);
            settoken(true)
            // setTimeout(() => {
            navigate("/");
            // }, 2000);
        } else {
            divResult.innerHTML = `<b className="sesionFallido">Credenciales incorrectas</b>`;
            divResult.style.opacity = 0;
            divResult.style.transition = "all 2.5s linear";
        }
    }
    return (
        <section id="login">
            <div className="div1"></div>
            {/* <div className="div2"></div> */}
            <div className="main">
                <div className="main_left">
                    <div className='main_left_cont'>
                        <h3 style={{fontWeight:"600"}}>JARRY INDUMENTARIA</h3>
                        <img src={logo} className="bg-white img-fluid img_login mb-2" alt="" />
                        
                    </div>
                </div>
                {/* <div className="main_left">
                    <div className='main_left_cont'>
                        <h3 style={{ fontWeight: "600" }}>JARRY INDUMENTARIA</h3>
                        <div className='.tagCloudContainer' style={{ color: "white", display: "flex", width: "41.7%", fontSize: "15px", position: "relative", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                            <div className='tagcloud' style={{ position: "relative" }}>
                                <img style={{ padding: "25px", position: "absolute", top: "0", bottom: "0", right: "0", left: "0", width: "100%" }} src={logo} />
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="main_right col-12 col-md-7 bg-light">
                    {/* <div className="main_right_cont"> */}
                    {/* <div className="d-flex w-100 justify-content-end mb-0">
                            <button  className="btn_home badge bg-primary text-wrap">Home</button>
                        </div> */}

                    <form className='main_right_cont' onSubmit={handleSubmit} method="post">
                        <h3 className="section_title glitchLogin" data-text="Log in">Log in</h3>
                        <div className="form-group">
                            <label htmlFor="nombreUsuario"><b>Email</b></label>
                            <input value={email} onChange={handleEmailChange} id="nombreUsuario" type="email" name="nombreUsuario"
                                placeholder="john_doe@email.com" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"><b>Contraseña</b></label>
                            <input value={password} onChange={handlePasswordChange} id="password" type="password" name="password"
                                placeholder="Tu contraseña ..." required />
                        </div>
                        <div id="resultLogin"></div>
                        {/* <div className="d-flex"> */}
                        <button className="start_login" type="submit"
                            value="Submit"><b>INICIAR</b></button>
                        {/* </div> */}
                    </form>
                    {/* </div> */}
                </div>
            </div>
        </section>
    )
}

export default Login;