import { useState, useEffect } from "react";
import Formulario from "./Formulario";
import Mensaje from "./Mensaje";

function PetDetails({ pet }) {
    const [body, setBody] = useState(null);
    const [formulario, setFromulario]= useState(false)
    const [mensaje, setMensaje] = useState("")

    const handleSendData = (data) => {
        setBody(data);  
    };

    useEffect(() => {
        if (body) {

            // fetch(`https://huachitos.cl/api/animales`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',  
            //     },
            //     body: JSON.stringify(body),
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log(data.data);
            //     })
            //     .catch(error => {
            //         console.log({ text: "Error en la conexión", type: "error" });
            //     });
            setMensaje({text:"Le contactaremos por correo para más información!", type: "exito"})
        }
    }, [body]);

    return (
        <div className="pet-details">
            <h1 className="pet-name">{pet.nombre}</h1>
            <img className="pet-image" src={pet.imagen} alt={`Imagen de ${pet.nombre}`} />
            {pet.tipo && <p className="pet-type"><strong>Tipo de Mascota:</strong> {pet.tipo}</p>}

            {pet.color && (
                <p className="pet-color">
                    <strong>Color:</strong> 
                    <span 
                        style={{
                            display: 'inline-block',
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            border: '2px solid black',
                            backgroundColor: pet.color,
                            marginLeft: '8px',
                            verticalAlign: 'middle'
                        }}
                    ></span>
                </p>
            )}
            {pet.edad && <p><strong>Edad:</strong> {pet.edad}</p>}
            {pet.estado && <p><strong>Estado:</strong> {pet.estado}</p>}
            {pet.genero && <p><strong>Género:</strong> {pet.genero}</p>}

            {pet.desc_fisica && (
                <p>
                    <strong>Descripción Física:</strong> <span dangerouslySetInnerHTML={{ __html: pet.desc_fisica }} />
                </p>
            )}
            {pet.desc_personalidad && (
                <p>
                    <strong>Descripción de Personalidad:</strong> <span dangerouslySetInnerHTML={{ __html: pet.desc_personalidad }} />
                </p>
            )}
            {pet.desc_adicional && (
                <p>
                    <strong>Descripción Adicional:</strong> <span dangerouslySetInnerHTML={{ __html: pet.desc_adicional }} />
                </p>
            )}

            {pet.esterilizado !== undefined && <p><strong>Esterilizado:</strong> {pet.esterilizado ? 'Sí' : 'No'}</p>}
            {pet.vacunas !== undefined && <p><strong>Vacunas al día:</strong> {pet.vacunas ? 'Sí' : 'No'}</p>}
            {pet.equipo && <p><strong>Equipo:</strong> {pet.equipo}</p>}
            {pet.region && <p><strong>Región:</strong> {pet.region}</p>}
            {pet.comuna && <p><strong>Comuna:</strong> {pet.comuna}</p>}
            <button className="filter-button" onClick={() => setFromulario(!formulario)}>Adoptar</button>
            {formulario && <Formulario sendData={handleSendData}/>}
            <Mensaje mensaje={mensaje}></Mensaje>
        </div>
    );
}

export default PetDetails;
