import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// componenetes
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import Registro_Examenes from './pages/Registro_Examenes'
import Registro_Muestra from './pages/Registro_Muestra'
import Consulta from './pages/Consulta'
import Captura_Resultados from './pages/Captura_Resultados'
import Examen from './pages/Examen'
import Completar from './components/Completar'
import Error from './pages/Error404'
import ProtectedRoute from './components/ProtectedRoutes'
import ProtectedPrivate from './components/ProtectedPrivate'


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Consulta" element={<Consulta />} />
          <Route path="/Consulta/paciente/:cedula" element={<Consulta />} />
          <Route path="/Examen/:id" element={<Examen />} />
        </Route>

        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />} />

        <Route path="/Registro_Examenes" element={
          <ProtectedPrivate permisos={[3, 5, 8]}>
            <Registro_Examenes />
          </ProtectedPrivate>} />

        <Route path="/Registro_Muestra" element={
          <ProtectedPrivate permisos={[2, 3, 4]}>
            <Registro_Muestra />
          </ProtectedPrivate>} />

        <Route path="/Captura_Resultados" element={
          <ProtectedPrivate permisos={[1, 2, 6, 7, 9]}>
            <Captura_Resultados />
          </ProtectedPrivate>} />

        <Route path="/Captura_Resultados/:cedula" element={
          <ProtectedPrivate permisos={[1, 2, 6, 7, 9]}>
            <Captura_Resultados />
          </ProtectedPrivate>} />

        <Route path="/Completar/:id" element={
          <ProtectedPrivate permisos={[1, 2, 6, 7, 9]}>
            <Completar />
          </ProtectedPrivate>} />


        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App