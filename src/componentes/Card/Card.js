import './Card.css';
import FormataValorReal from '../../util/FormataValorReal';

function Card(props) {
    return (
        <div className={'card card-' + props.cor}>
            <div className='titulo'>
                <span className='icone'>
                    {props.children}
                </span>
                <span>{props.titulo}</span>
            </div>
            <span className='valor text-center'>{FormataValorReal(props.valor)}</span>
        </div>
    );
}

export default Card;