import Header from "./components/Header"
import Destinos from "./components/Destinos"
import Categorias from "./components/Categorias"
import Depoimentos from "./components/Depoimentos"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Header />
      <main>
        <Destinos />
        <Categorias />
        <Depoimentos />
      </main>
      <Footer />
    </>
  )
}

export default App