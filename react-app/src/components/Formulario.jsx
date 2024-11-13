import { useState } from "react";

function Formulario({ sendData }) {
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: 0,
    });

    const handleChange = (event, field) => {
        setData({
            ...data,
            [field]:  event.target.value
        });
    };

    const handleClick = () => {
        sendData(data);
    };


    return (
        <div className="pet-details">
            <label>Nombre</label>
            <input type="text" onChange={(event) => handleChange(event, 'name')} />

            <label>Email</label>
            <input type="text" onChange={(event) => handleChange(event, 'email')} />

            <label>Teléfono</label>
            <input type="text" onChange={(event) => handleChange(event, 'phone')} />

            <button className="adopt-button" onClick={handleClick}>Enviar</button>
        </div>
    );
}

export default Formulario;
