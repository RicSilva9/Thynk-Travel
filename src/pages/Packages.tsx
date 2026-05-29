import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PackageCard from "../components/PackageCard";
import { packages } from "../data/Package";

function Packages() {
  const [searchParams] = useSearchParams();

  // Lê os parâmetros da URL
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const departure = searchParams.get("departure");
  const returnDate = searchParams.get("return");

  // Calcula a duração em dias (se tiver datas)
  const requestedDuration = useMemo(() => {
    if (!departure || !returnDate) return null;

    const start = new Date(departure);
    const end = new Date(returnDate);
    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return diffDays;
  }, [departure, returnDate]);

  // Função auxiliar: filtra por origem e destino (sem duração)
  const filterByOriginAndDestination = (pkg: (typeof packages)[number]) => {
    if (origin) {
      const hasOrigin = pkg.origins.some(
        (o) => o.toLowerCase() === origin.toLowerCase(),
      );
      if (!hasOrigin) return false;
    }

    if (destination) {
      const matchesDestination = pkg.destination
        .toLowerCase()
        .includes(destination.toLowerCase());
      if (!matchesDestination) return false;
    }

    return true;
  };

  // Filtro principal: COM duração
  const exactMatches = useMemo(() => {
    return packages.filter((pkg) => {
      // Aplica filtro de origem + destino
      if (!filterByOriginAndDestination(pkg)) return false;

      // Aplica filtro de duração (com tolerância de 2 dias)
      if (requestedDuration) {
        const tolerance = 2;
        const minDays = requestedDuration - tolerance;
        const maxDays = requestedDuration + tolerance;

        if (pkg.durationDays < minDays || pkg.durationDays > maxDays) {
          return false;
        }
      }

      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination, requestedDuration]);

  // Filtro alternativo: SEM duração (só origem + destino)
  const alternativeMatches = useMemo(() => {
    return packages.filter(filterByOriginAndDestination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination]);

  // Verifica se o usuário fez alguma pesquisa
  const hasSearched = origin || destination || departure || returnDate;

  // Define o que vamos mostrar
  const hasExactMatches = exactMatches.length > 0;
  const hasAlternatives = alternativeMatches.length > 0;
  const showingAlternatives =
    !hasExactMatches && hasAlternatives && requestedDuration;

  // Define a lista que será exibida
  const packagesToShow = hasExactMatches ? exactMatches : alternativeMatches;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8 md:px-16">
        {/* Botão voltar */}
        <div className="mx-auto max-w-screen-2xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-700 transition hover:text-orange-500"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Voltar para a Home</span>
          </Link>
        </div>

        {/* Se não pesquisou nada */}
        {!hasSearched && (
          <div className="mx-auto mt-8 max-w-screen-2xl">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
              <div className="mb-4 rounded-full bg-orange-100 p-4">
                <MagnifyingGlassIcon className="h-10 w-10 text-orange-500" />
              </div>

              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                Pronto para encontrar o pacote perfeito?
              </h1>

              <p className="mt-3 max-w-md text-slate-600">
                Use o formulário acima para pesquisar pacotes de viagem
                incríveis. Em breve, os resultados aparecerão aqui! ✨
              </p>
            </div>
          </div>
        )}

        {/* Se pesquisou */}
        {hasSearched && (
          <div className="mx-auto mt-8 max-w-screen-2xl">
            {/* CASO 1: Encontrou pacotes exatos */}
            {hasExactMatches && (
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                  {exactMatches.length}{" "}
                  {exactMatches.length === 1
                    ? "pacote encontrado"
                    : "pacotes encontrados"}
                </h1>
                <p className="mt-2 text-slate-600">
                  {destination && (
                    <>
                      Destino: <strong>{destination}</strong>
                    </>
                  )}
                  {origin && (
                    <>
                      {destination && " • "}
                      Origem: <strong>{origin}</strong>
                    </>
                  )}
                  {requestedDuration && (
                    <>
                      {(destination || origin) && " • "}
                      Duração: <strong>~{requestedDuration} dias</strong>
                    </>
                  )}
                </p>
              </div>
            )}

            {/* CASO 2: Não achou com duração, mas tem alternativas */}
            {showingAlternatives && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-5">
                <InformationCircleIcon className="h-6 w-6 flex-shrink-0 text-orange-500" />
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Não encontramos pacotes com ~{requestedDuration} dias
                    {destination && ` para ${destination}`}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Mas confira essas{" "}
                    <strong>{alternativeMatches.length} alternativas</strong>{" "}
                    incríveis com outras durações:
                  </p>
                </div>
              </div>
            )}

            {/* CASO 3: Nenhum resultado (nem alternativa) */}
            {!hasExactMatches && !hasAlternatives && (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
                <div className="mb-4 rounded-full bg-red-100 p-4">
                  <ExclamationTriangleIcon className="h-10 w-10 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                  Nenhum pacote encontrado
                </h1>
                <p className="mt-3 max-w-md text-slate-600">
                  Não encontramos pacotes com os filtros aplicados. Tente
                  ajustar a pesquisa no formulário acima ou{" "}
                  <Link
                    to="/"
                    className="font-semibold text-orange-500 hover:underline"
                  >
                    voltar para a home
                  </Link>
                  .
                </p>
              </div>
            )}

            {/* Grid de cards (se tiver algo pra mostrar) */}
            {packagesToShow.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {packagesToShow.map((pkg) => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Packages;
