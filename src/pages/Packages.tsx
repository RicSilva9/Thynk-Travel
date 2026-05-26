import Header from "../components/Header";
import Footer from "../components/Footer";

function Packages() {
  return (
    <>
      <Header />
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold text-center mt-10">
          Resultados da Pesquisa
        </h1>
        <p className="text-center mt-4 text-gray-600">
          Em breve os pacotes aparecerão aqui! 🚀
        </p>
      </main>
      <Footer />
    </>
  );
}

export default Packages;
