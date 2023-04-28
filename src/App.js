import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './componentes/Header/Header';
import Dashboard from './componentes/Dashboard/Dashboard';
import TabelaGrupo from './componentes/TabelaGrupo/TabelaGrupo';
import FormularioGrupo from './componentes/FormularioGrupo/FormularioGrupo';
import TabelaDespesa from './componentes/TabelaDespesa/TabelaDespesa';
import FormularioDespesa from './componentes/FormularioDespesa/FormularioDespesa';
import TabelaReceita from './componentes/TabelaReceita/TabelaReceita';
import FormularioReceita from './componentes/FormularioReceita/FormularioReceita';
import TabelaMeta from './componentes/TabelaMeta/TabelaMeta';
import FormularioMeta from './componentes/FormularioMeta/FormularioMeta';
import Rodape from './componentes/Rodape/Rodape';

function App() {

    return (
        <BrowserRouter>
            <Header></Header>

            <Routes>
                <Route path="/" element={<div>Página inicial</div>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/grupo" element={<TabelaGrupo/>} />
                <Route path="/grupo/form/:id?" element={<FormularioGrupo/>} />
                <Route path="/despesa" element={<TabelaDespesa/>} />
                <Route path="/despesa/form/:id?" element={<FormularioDespesa/>} />
                <Route path="/receita" element={<TabelaReceita/>} />
                <Route path="/receita/form/:id?" element={<FormularioReceita/>} />
                <Route path="/meta" element={<TabelaMeta/>} />
                <Route path="/meta/form/:id?" element={<FormularioMeta/>} />
                <Route path="*" element={<div>Página não encontrada</div>} />
            </Routes>

            <Rodape />
        </BrowserRouter>
    );

}

export default App;
