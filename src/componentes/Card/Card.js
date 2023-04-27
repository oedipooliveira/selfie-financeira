import './Card.css';

function Card(props) {
    return (
        <div className={'card card-' + props.cor}>
            <div className='titulo'>
                <span className='icone'>
                    {props.children}
                </span>
                <span>{props.titulo}</span>
            </div>
            <span className='valor text-center'>R$ 500,00</span>
        </div>
    );
}

export default Card;