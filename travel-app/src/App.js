import React, { Component } from "react";
import Header from "./components/Header";
import Destino from "./components/Destinos";
import Categorias from "./components/Categorias";
import Depoimentos from "./components/Depoimentos";
import Footer from "./components/Footer";

class App extends Component {
  render(){
    return(
      <>
      <Header />
      <div>
        <Destino />
        <Categorias />
        <Depoimentos />
      </div>
      <Footer />
      </>
    )
  }
}

export default App