import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <h1>Selfie Financeira</h1>
            <nav className="nav">
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
            </nav>
        </header>
    );
}

export default Header