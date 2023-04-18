import './Tabela.css';
import Botao from '../Botao/Botao';

const Table = ({titulo, colunas, children, aoClicarEmNovo}) => {
    return (
        <div className='table'>
            <div className='container'>
                <table>
                    <caption>
                        <div className='container-flex'>
                            {titulo}
                            <Botao aoClicar={aoClicarEmNovo}>
                                Novo
                            </Botao>
                        </div>
                    </caption>
                    <thead>
                        <tr>
                            {colunas.map(item => <th key={item.titulo}>{item.titulo}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;