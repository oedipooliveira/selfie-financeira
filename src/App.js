import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './componentes/Header/Header';
import TabelaGrupo from './componentes/TabelaGrupo/TabelaGrupo';
import TabelaDespesa from './componentes/TabelaDespesa/TabelaDespesa';
import FormularioDespesa from './componentes/FormularioDespesa/FormularioDespesa';
import Rodape from './componentes/Rodape/Rodape';

function App() {

    return (
        <BrowserRouter>
            <Header></Header>

            <Routes>
                <Route path="/" element={<div>Página inicial</div>} />
                <Route path="/grupo" element={<TabelaGrupo/>} />
                <Route path="/despesa" element={<TabelaDespesa/>} />
                <Route path="/despesa/form/:id?" element={<FormularioDespesa/>} />
                <Route path="/receita" element={<TabelaDespesa/>} />
                <Route path="/receita/form/:id?" element={<FormularioDespesa/>} />
                <Route path="*" element={<div>Página não encontrada</div>} />
            </Routes>

            <Rodape />
        </BrowserRouter>
    );

}

export default App;
