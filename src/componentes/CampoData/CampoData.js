import './CampoData.css';

const CampoData = (props) => {
    const aoDigitado = (event) => {
        props.aoAlterado(event.target.value);
    }

    return (
        <div className="campo-data">
            <label htmlFor={`id${props.label}`}>{props.label}:</label>
            <input type="date" id={`id${props.label}`} value={props.valor.slice(0, 10)} onChange={aoDigitado} required={props.obrigatorio} />
        </div>
    );
}

export default CampoData;