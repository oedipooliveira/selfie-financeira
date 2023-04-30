import './CampoExibicao.css';

const CampoExibicao = (props) => {

    return (
        <div className="campo-exibicao">
            <label htmlFor={`id${props.label}`}>{props.label}:</label>
            <span>{props.valor}</span>
        </div>
    );
}

export default CampoExibicao;