import { useParams, Link, useLocation } from "react-router-dom";
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { packages } from "../data/Package";

function PackageDetail() {
  const { id } = useParams();
  const location = useLocation();

  // Converte o id (string da URL) pra number
  const numericId = Number(id);

  // Busca o pacote pelo id
  const pkg = packages.find((p) => p.id === numericId);

  // Se não achou, mostra mensagem provisória (vamos melhorar depois)
  if (!pkg) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8 md:px-16">
          <div className="mx-auto max-w-screen-2xl">
            {/* Botão voltar */}
            <Link
              to={`/packages${location.search}`}
              className="inline-flex items-center gap-2 text-slate-700 transition hover:text-orange-500"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="text-sm font-medium">
                Voltar para os resultados
              </span>
            </Link>

            {/* Conteúdo principal */}
            <div className="mt-8 flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
              {/* Ícone */}
              <div className="mb-6 rounded-full bg-orange-100 p-5">
                <ExclamationTriangleIcon className="h-12 w-12 text-orange-500" />
              </div>

              {/* Título */}
              <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
                Ops! Pacote não encontrado
              </h1>

              {/* Mensagem */}
              <p className="mt-4 max-w-md text-slate-600">
                O pacote que você procura não existe ou foi removido. Mas não se
                preocupe, temos muitos outros destinos incríveis pra você
                explorar! ✈️
              </p>

              {/* ID procurado (informativo) */}
              <p className="mt-2 text-xs text-slate-400">
                ID procurado: <strong>{id}</strong>
              </p>

              {/* Botão de ação */}
              <div className="mt-8">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  Voltar para a Home
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8 md:px-16">
        <div className="mx-auto max-w-screen-2xl">
          {/* Botão voltar */}
          <Link
            to={`/packages${location.search}`}
            className="inline-flex items-center gap-2 text-slate-700 transition hover:text-orange-500"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="text-sm font-medium">
              Voltar para os resultados
            </span>
          </Link>

          {/* Conteúdo provisório — mostra os dados do pacote em texto */}
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-800">{pkg.title}</h1>

            <p className="mt-2 text-lg text-slate-600">
              {pkg.destination}, {pkg.country}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <strong className="text-slate-700">ID:</strong>{" "}
                <span className="text-slate-600">{pkg.id}</span>
              </div>
              <div>
                <strong className="text-slate-700">Tipo:</strong>{" "}
                <span className="text-slate-600">{pkg.packageType}</span>
              </div>
              <div>
                <strong className="text-slate-700">Categoria:</strong>{" "}
                <span className="text-slate-600">{pkg.category}</span>
              </div>
              <div>
                <strong className="text-slate-700">Duração:</strong>{" "}
                <span className="text-slate-600">{pkg.duration}</span>
              </div>
              <div>
                <strong className="text-slate-700">Avaliação:</strong>{" "}
                <span className="text-slate-600">⭐ {pkg.rating}</span>
              </div>
              <div>
                <strong className="text-slate-700">Preço:</strong>{" "}
                <span className="text-slate-600">
                  R$ {pkg.price.toLocaleString("pt-BR")}
                </span>
              </div>
              {pkg.discount && (
                <div>
                  <strong className="text-slate-700">Desconto:</strong>{" "}
                  <span className="text-red-500">-{pkg.discount}%</span>
                </div>
              )}
              <div className="sm:col-span-2">
                <strong className="text-slate-700">Destaque:</strong>{" "}
                <span className="text-slate-600">
                  {pkg.featured ? "✅ Sim" : "❌ Não"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <strong className="text-slate-700">Descrição curta:</strong>
              <p className="mt-1 text-slate-600">{pkg.description}</p>
            </div>

            <div className="mt-4">
              <strong className="text-slate-700">Descrição completa:</strong>
              <p className="mt-1 text-slate-600">{pkg.fullDescription}</p>
            </div>

            <div className="mt-4">
              <strong className="text-slate-700">O que está incluído:</strong>
              <ul className="mt-2 list-inside list-disc text-slate-600">
                {pkg.includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <strong className="text-slate-700">
                Origens disponíveis ({pkg.origins.length}):
              </strong>
              <p className="mt-1 text-sm text-slate-600">
                {pkg.origins.join(", ")}
              </p>
            </div>

            <div className="mt-4">
              <strong className="text-slate-700">Imagem principal:</strong>
              <img
                src={pkg.image}
                alt={pkg.title}
                className="mt-2 h-48 w-full rounded-lg object-cover sm:w-96"
              />
            </div>

            <div className="mt-4">
              <strong className="text-slate-700">
                Galeria ({pkg.gallery.length} imagens):
              </strong>
              <div className="mt-2 flex gap-2 overflow-x-auto">
                {pkg.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${pkg.title} - foto ${index + 1}`}
                    className="h-32 w-48 flex-shrink-0 rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default PackageDetail;
