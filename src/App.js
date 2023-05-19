import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {

    return (
        <BrowserRouter>
            <Header></Header>

            <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/grupo" element={<TabelaGrupo/>} />
                <Route path="/grupo/form/:id?" element={<FormularioGrupo/>} />
                <Route path="/despesa" element={<TabelaDespesa/>} />
                <Route path="/despesa/form/:id?" element={<FormularioDespesa/>} />
                <Route path="/despesa/form-quitacao/:id?" element={<FormularioDespesaQuitacao/>} />
                <Route path="/receita" element={<TabelaReceita/>} />
                <Route path="/receita/form/:id?" element={<FormularioReceita/>} />
                <Route path="/receita/form-quitacao/:id?" element={<FormularioReceitaQuitacao/>} />
                <Route path="/meta" element={<TabelaMeta/>} />
                <Route path="/meta/form/:id?" element={<FormularioMeta/>} />
                <Route path="/meta/form-deposito/:id?" element={<FormularioMetaDeposito/>} />
                <Route path="*" element={<div>Página não encontrada</div>} />
            </Routes>

            <Rodape />
        </BrowserRouter>
    );

}

export default App;
