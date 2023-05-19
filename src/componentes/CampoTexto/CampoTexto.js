import './CampoTexto.css';

const CampoTexto = ({aoAlterado, label, valor, obrigatorio, placeholder, tipo = 'text'}) => {
    const aoDigitado = (event) => {
        aoAlterado(event.target.value);
    }

    return (
        <div className="campo-texto">
            <label htmlFor={`id${label}`}>{label}:</label>
            <input type={tipo} id={`id${label}`} value={valor} onChange={aoDigitado} required={obrigatorio} placeholder={placeholder} />
        </div>
    );
}

export default CampoTexto;