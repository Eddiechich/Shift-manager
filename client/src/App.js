import React from 'react';

import './App.css';
import HeaderNav from './components/HeaderNav/HeaderNav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCurrentUser } from "./services/userService";

import Main from './layouts/Main';
import Footer from './components/Footer/Footer';

function App() {
  const user = getCurrentUser();

  return (
    <div className="App"  dir='rtl'>
      <HeaderNav user={user}></HeaderNav>
      <ToastContainer />
     <Main user={user}></Main>
     <Footer></Footer>
    </div>
  );
}

export default App;
