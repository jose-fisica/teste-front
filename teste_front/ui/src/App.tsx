import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/Home'
import "../src/register-fa-icons";
import PrivateRouter from './routes/PrivateRouter';
import ProjetoPage from './pages/Projetos/Projeto';
import CreateProjetoPage from './pages/Projetos/CreateProjetoPage';
import SaudeProjetoFormPage from './pages/Projetos/FormPage/SaudeProjetoFormPage';
import ProsciProjetoFormPage from './pages/Projetos/FormPage/ProsciProjetoFormPage';
import SponsorPrimarioFormPage from './pages/Projetos/FormPage/SponsorPrimarioFormPage';
import CoalizaoPatrocinioFormPage from './pages/Projetos/FormPage/CoalizaoPatrocinioFormPage';



function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
    </div>
  );
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRouter />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/projeto/:id" element={<ProjetoPage/>}/>
          <Route path="/projeto-saude/:id" element={<SaudeProjetoFormPage/>} />
          <Route path="/projeto-prosci/:id" element={<ProsciProjetoFormPage/>} />
          <Route path="/projeto-sponsor-primario/:id" element={<SponsorPrimarioFormPage/>} />
          <Route path="/projeto-coalizao-patrocinio/:id" element={<CoalizaoPatrocinioFormPage/>} />
          <Route path="/new" element={<CreateProjetoPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
