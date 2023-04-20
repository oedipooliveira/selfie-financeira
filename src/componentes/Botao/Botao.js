import './Botao.css';

const Botao = (props) => {
    return (
        <button type={props.type} onClick={props.aoClicar} className={`botao ${props.cor} ${props.largura}`}>
            {props.children}
        </button>
    );
}

export default Botao;