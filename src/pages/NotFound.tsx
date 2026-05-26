import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4 text-center">
      <h1 className="text-9xl font-bold text-orange-500">404</h1>
      <h2 className="text-2xl font-semibold text-slate-800 mt-4">
        Página não encontrada
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        Ops! Parece que você se perdeu em uma viagem. A página que você procura
        não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-2xl bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-700 transition"
      >
        Voltar para o início
      </Link>
    </div>
  );
}

export default NotFound;
