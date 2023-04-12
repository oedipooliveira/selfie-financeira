import './Table.css';

const Table = () => {
    return (
        <div className='table'>
            <table>
                <caption>Despesas</caption>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Vencimento</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Aluguel</td>
                        <td>10/04/2023</td>
                        <td>R$ 1.200,00</td>
                    </tr>
                    <tr>
                        <td>Compras no mercado</td>
                        <td>08/04/2023</td>
                        <td>R$ 350,00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Table;