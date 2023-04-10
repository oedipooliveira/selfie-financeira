import './CampoTexto.css';

const CampoTexto = (props) => {
    const aoDigitado = (event) => {
        props.aoAlterado(event.target.value);
    }

    return (
        <div className="campo-texto">
            <label htmlFor={`id${props.label}`}>{props.label}:</label>
            <input id={`id${props.label}`} value={props.valor} onChange={aoDigitado} required={props.obrigatorio} placeholder={props.placeholder} />
        </div>
    );
}

export default CampoTexto;