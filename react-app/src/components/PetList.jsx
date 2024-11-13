import axios from 'axios';
import { useEffect, useState } from 'react';
import PetDetails from './PetDetails';
import Filter from './Filter';

function PetList() {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [filters, setFilters] = useState({ tipo: "", edad: 0, genero: "", esterilizado: null });   

    useEffect(() => {
        fetchPets(filters);
    }, [filters]);

    const fetchPets = async (filters) => {
        try {
            const url = `https://huachitos.cl/api/animales`;
            const response = await axios.get(url);
            let filteredPets = response.data.data;
    
            if (filters.tipo) {
                filteredPets = filteredPets.filter((pet) => 
                    pet.tipo.toLowerCase() === filters.tipo.replace(/\s+/g, '').toLowerCase()
                );
            }
            
            if (filters.edad) {
                if (typeof filters.edad === "string" && filters.edad === "menor de un año") {
                    filteredPets = filteredPets.filter((pet) =>
                        pet.edad.includes("Meses")
                    );
                } else if (typeof filters.edad === "number") {
                    filteredPets = filteredPets.filter((pet) => 
                        parseInt(pet.edad) === filters.edad && pet.edad.includes("Años")
                    );
                }
            }
    
            if (filters.genero) {
                filteredPets = filteredPets.filter((pet) => 
                    pet.genero.toLowerCase() === filters.genero.toLowerCase()
                );
            }
    
            if (filters.esterilizado !== null) {
                filteredPets = filteredPets.filter((pet) => 
                    pet.esterilizado === (filters.esterilizado === "true" ? 1 : 0)
                );
            }
    
            setPets(filteredPets);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handlePetClick = (pet) => {
        setSelectedPet(pet); // Establece la mascota seleccionada
    };

    const handleBackClick = () => {
        setSelectedPet(null); // Regresa a la vista con la lista completa
    };

    return (
        <div className="pet-list">
            {selectedPet ? (
                <div>
                    <button onClick={handleBackClick} className="back-button">← Regresar</button>
                    <PetDetails pet={selectedPet} />
                </div>
            ) : (
                <>
                    <h2 className="pet-list-title">Lista de Animales</h2>
                    <Filter onFilterChange={handleFilterChange} />
                    <div className="pets-container">
                        {pets.map((pet) => (
                            <div key={pet.id} className="pets-card" onClick={() => handlePetClick(pet)}>
                                <h3 className="pets-nombre">{pet.nombre}</h3>
                                <p className="pets-tipo">Tipo de mascota: {pet.tipo}</p>
                                <img className="pet-image" src={pet.imagen} alt={`Imagen de ${pet.nombre}`} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default PetList;
