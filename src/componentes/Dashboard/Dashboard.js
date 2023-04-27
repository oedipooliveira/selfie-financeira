import './Dashboard.css';
import Card from '../Card/Card';
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineCheckCircle } from 'react-icons/ai';

function Dashboard() {
    return (
        <div className='dashboard'>
            <Card titulo='Despesas' cor='red'>
                <AiOutlineMinusCircle className='red' />
            </Card>
            <Card titulo='Receitas' cor='green'>
                <AiOutlinePlusCircle className='green' />
            </Card>
            <Card titulo='Resultado' cor='blue'>
                <AiOutlineCheckCircle className='blue' />
            </Card>
        </div>
    );
}

export default Dashboard;