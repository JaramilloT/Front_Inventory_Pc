import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sesion } from "./components/Sesion/Sesion";
import { Register } from "./components/Register/Register";
import { From } from "./components/From/From";
import { Details } from "./components/Details/Details";
import { Main } from "./components/Main/Main";
import { View } from "./components/View/View";
import { Home } from "./components/Home/Home";
import { PrivateRoute } from './components/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Sesion />} />
        <Route path='/sesion' element={<Sesion />} />
        <Route path='/register' element={<Register />} />
        
        {/* Rutas protegidas */}
        <Route path='/home-152628282828' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path='/from' element={
          <PrivateRoute>
            <From />
          </PrivateRoute>
        } />
        <Route path='/details/:id' element={
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        } />
        <Route path='/main' element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        } />
        <Route path='/view' element={
          <PrivateRoute>
            <View />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
