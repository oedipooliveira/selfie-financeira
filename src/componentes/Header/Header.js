import { Link } from 'react-router-dom';
import { AiOutlinePoweroff } from 'react-icons/ai';
import './Header.css';

const Header = ({aoDeslogar, autenticado}) => {
    return (
        <header className="header">
            <h1>Selfie Financeira</h1>
            <nav className={`nav ${autenticado ? '' : 'hidden'}`}>
                <Link className="link" to="/dashboard">
                    Dashboard
                </Link>
                <Link className="link" to="/grupo">
                    Grupos
                </Link>
                <Link className="link" to="/despesa">
                    Despesas
                </Link>
                <Link className="link" to="/receita">
                    Receitas
                </Link>
                <Link className="link" to="/meta">
                    Metas
                </Link>
                <Link className="link btn-sair" to="/login" onClick={aoDeslogar}>
                    <AiOutlinePoweroff size={20} />
                </Link>
            </nav>
        </header>
    );
}

export default Header