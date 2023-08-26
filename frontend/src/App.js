import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer'
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login';
import SignUp from './components/SignUp';


 import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList/>} />
            <Route path="/add" element={<AddProduct />} />
            {/* since on click update in Opreation column thius type of url is genertaed: http://localhost:3000/update/64df5da07a8486f3acd6574f , which donot match with any url so we make to match here: , after an paramter  is coming so we make to accept a param in update route
            As : path="/update/:id" */}
            <Route path="/update/:id" element={<UpdateProduct/>} /> 
            <Route path="/profile" element={<h1>profile product  compo</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;