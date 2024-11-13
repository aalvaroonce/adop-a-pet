import { useState } from "react";

function Filter({ onFilterChange }) {
    const [tipo, setTipo] = useState("");
    const [edad, setEdad] = useState(0);
    const [genero, setGenero] = useState("");
    const [esterilizado, setEsterilizado] = useState(null);

    const handleTipoChange = (event) => setTipo(event.target.value);
    const handleEdadChange = (event) => setEdad(parseInt(event.target.value, 10));
    const handleGeneroChange = (event) => setGenero(event.target.value);
    const handleEsterilizadoChange = (value) => {
        setEsterilizado(esterilizado === value ? null : value);
    };

    const handleClick = () => {
        const filterData = {
            tipo,
            edad: edad < 1 ? "menor de un año" : edad,
            genero,
            esterilizado
        };
        onFilterChange(filterData);
    };

    return (
        <nav className="filter-menu">
            <div className="filter-item">
                <label className="filter-label">Tipo Mascota</label>
                <input
                    className="filter-input"
                    type="text"
                    value={tipo}
                    onChange={handleTipoChange}
                    placeholder="Ingrese tipo..."
                />
            </div>
            <div className="filter-item">
                <label className="filter-label">Edad (años)</label>
                <input
                    className="filter-range"
                    type="range"
                    min="0"
                    max="11"
                    value={edad}
                    onChange={handleEdadChange}
                />
                <span className="edad-display">
                    {edad < 1 ? "Menor de un año" : `${edad} años`}
                </span>
            </div>
            <div className="filter-item">
                <label className="filter-label">Género</label>
                <select
                    className="filter-input"
                    value={genero}
                    onChange={handleGeneroChange}
                >
                    <option value="" disabled hidden>Seleccione género...</option>
                    <option value="macho">Macho</option>
                    <option value="hembra">Hembra</option>
                </select>
            </div>
            <div className="filter-item">
                <label className="filter-label">¿Esterilizado?</label>
                <div className="direction-options">
                    <label className="direction-option">
                        <input
                            type="checkbox"
                            value="true"
                            checked={esterilizado === "true"}
                            onChange={() => handleEsterilizadoChange("true")}
                        />
                        Sí
                    </label>
                    <label className="direction-option">
                        <input
                            type="checkbox"
                            value="false"
                            checked={esterilizado === "false"}
                            onChange={() => handleEsterilizadoChange("false")}
                        />
                        No
                    </label>
                </div>
            </div>
            <button className="filter-button" onClick={handleClick}>Aplicar Filtros</button>
        </nav>
    );
}

export default Filter;
