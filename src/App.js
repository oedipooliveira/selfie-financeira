import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import { isAuthenticated } from './auth/Auth';
import Header from './componentes/Header/Header';
import Dashboard from './componentes/Dashboard/Dashboard';
import TabelaGrupo from './componentes/TabelaGrupo/TabelaGrupo';
import FormularioGrupo from './componentes/FormularioGrupo/FormularioGrupo';
import TabelaDespesa from './componentes/TabelaDespesa/TabelaDespesa';
import FormularioDespesa from './componentes/FormularioDespesa/FormularioDespesa';
import FormularioDespesaQuitacao from './componentes/FormularioDespesaQuitacao/FormularioDespesaQuitacao';
import TabelaReceita from './componentes/TabelaReceita/TabelaReceita';
import FormularioReceita from './componentes/FormularioReceita/FormularioReceita';
import FormularioReceitaQuitacao from './componentes/FormularioReceitaQuitacao/FormularioReceitaQuitacao';
import TabelaMeta from './componentes/TabelaMeta/TabelaMeta';
import FormularioMeta from './componentes/FormularioMeta/FormularioMeta';
import FormularioMetaDeposito from './componentes/FormularioMetaDeposito/FormularioMetaDeposito';
import Rodape from './componentes/Rodape/Rodape';
import Login from './componentes/Login/Login';
import Conta from './componentes/Conta/Conta';

function App() {

    const [autenticado, setAutenticado] = useState(isAuthenticated);

    function RequireAuth({ children }: { children: JSX.Element }) {
        if (!isAuthenticated()) {
            return <Navigate to="/login" />;
        }

        return children;
    }

    const aoDeslogar = (event) => {
        sessionStorage.removeItem('access_token');
        setAutenticado(false);
    }

    const aoLogar = (event) => {
        setAutenticado(true);
    }

    return (
        <BrowserRouter>
            <Header aoDeslogar={aoDeslogar} autenticado={autenticado}></Header>

            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/login" element={<Login aoEfetuarLogin={aoLogar}/>} />
                <Route path="/conta" element={<Conta/>} />
                <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                <Route path="/grupo" element={<RequireAuth><TabelaGrupo /></RequireAuth>} />
                <Route path="/grupo/form/:id?" element={<RequireAuth><FormularioGrupo /></RequireAuth>} />
                <Route path="/despesa" element={<RequireAuth><TabelaDespesa /></RequireAuth>} />
                <Route path="/despesa/form/:id?" element={<RequireAuth><FormularioDespesa /></RequireAuth>} />
                <Route path="/despesa/form-quitacao/:id?" element={<RequireAuth><FormularioDespesaQuitacao /></RequireAuth>} />
                <Route path="/receita" element={<RequireAuth><TabelaReceita /></RequireAuth>} />
                <Route path="/receita/form/:id?" element={<RequireAuth><FormularioReceita /></RequireAuth>} />
                <Route path="/receita/form-quitacao/:id?" element={<RequireAuth><FormularioReceitaQuitacao /></RequireAuth>} />
                <Route path="/meta" element={<RequireAuth><TabelaMeta /></RequireAuth>} />
                <Route path="/meta/form/:id?" element={<RequireAuth><FormularioMeta /></RequireAuth>} />
                <Route path="/meta/form-deposito/:id?" element={<RequireAuth><FormularioMetaDeposito /></RequireAuth>} />
                <Route path="*" element={<div>Página não encontrada</div>} />
            </Routes>

            <Rodape />
        </BrowserRouter>
    );

}

export default App;
