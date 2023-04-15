import './Table.css';

const Table = ({colunas, children}) => {
    return (
        <div className='table'>
            <div className='container'>
                <table>
                    <caption>Despesas</caption>
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