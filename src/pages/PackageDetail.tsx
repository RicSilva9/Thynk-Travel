import { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon,
  ClockIcon,
  MapPinIcon,
  CheckCircleIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PackageCard from "../components/PackageCard";
import { packages } from "../data/Package";

function PackageDetail() {
  const { id } = useParams();
  const location = useLocation();

  // Converte o id (string da URL) pra number
  const numericId = Number(id);

  // Busca o pacote pelo id
  const pkg = packages.find((p) => p.id === numericId);

  // Estado pra controlar qual imagem está em destaque
  const [mainImage, setMainImage] = useState(pkg?.image || "");

  // ============================================
  // 🚨 CASO: Pacote não encontrado
  // ============================================
  if (!pkg) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8 md:px-16">
          <div className="mx-auto max-w-screen-2xl">
            <Link
              to={`/packages${location.search}`}
              className="inline-flex items-center gap-2 text-slate-700 transition hover:text-orange-500"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="text-sm font-medium">
                Voltar para os resultados
              </span>
            </Link>

            <div className="mt-8 flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
              <div className="mb-6 rounded-full bg-orange-100 p-5">
                <ExclamationTriangleIcon className="h-12 w-12 text-orange-500" />
              </div>

              <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
                Ops! Pacote não encontrado
              </h1>

              <p className="mt-4 max-w-md text-slate-600">
                O pacote que você procura não existe ou foi removido. Mas não se
                preocupe, temos muitos outros destinos incríveis pra você
                explorar! ✈️
              </p>

              <p className="mt-2 text-xs text-slate-400">
                ID procurado: <strong>{id}</strong>
              </p>

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

  // ============================================
  // 💰 CÁLCULOS DE PREÇO
  // ============================================
  const finalPrice = pkg.discount
    ? pkg.price - (pkg.price * pkg.discount) / 100
    : pkg.price;

  const formattedPrice = finalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedOriginalPrice = pkg.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Imagem fallback (caso quebre)
  const fallbackImage =
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800";

  // ============================================
  // 🎯 PACOTES RELACIONADOS (mesmo destino)
  // ============================================
  const relatedPackages = packages
    .filter((p) => p.destination === pkg.destination && p.id !== pkg.id)
    .slice(0, 4);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8 md:px-16">
        <div className="mx-auto max-w-screen-2xl">
          {/* ============================================
              🔙 BOTÃO VOLTAR
          ============================================ */}
          <Link
            to={`/packages${location.search}`}
            className="inline-flex items-center gap-2 text-slate-700 transition hover:text-orange-500"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="text-sm font-medium">
              Voltar para os resultados
            </span>
          </Link>
          {/* ============================================
              🏷️ TÍTULO + INFOS RÁPIDAS
          ============================================ */}
          <div className="mt-6">
            {/* Tags */}
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                {pkg.packageType}
              </span>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                {pkg.category}
              </span>
              {pkg.featured && (
                <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-slate-800">
                  ⭐ Destaque
                </span>
              )}
              {pkg.discount && (
                <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                  -{pkg.discount}% OFF
                </span>
              )}
            </div>

            {/* Título */}
            <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
              {pkg.title}
            </h1>

            {/* Destino + Rating */}
            <div className="mt-2 flex flex-wrap items-center gap-4 text-slate-600">
              <div className="flex items-center gap-1">
                <MapPinIcon className="h-5 w-5 text-orange-500" />
                <span>
                  {pkg.destination}, {pkg.country}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <StarIcon className="h-5 w-5 text-orange-500" />
                <span className="font-semibold text-slate-700">
                  {pkg.rating.toFixed(1)}
                </span>
                <span className="text-sm">avaliação</span>
              </div>

              <div className="flex items-center gap-1">
                <ClockIcon className="h-5 w-5 text-orange-500" />
                <span>{pkg.duration}</span>
              </div>
            </div>
          </div>
          {/* ============================================
              📐 GRID PRINCIPAL (2 colunas no desktop)
          ============================================ */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* COLUNA ESQUERDA (2/3) */}
            <div className="lg:col-span-2">
              {/* 🖼️ Imagem principal */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <img
                  src={mainImage}
                  alt={pkg.title}
                  className="h-96 w-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.onerror = null;
                    img.src = fallbackImage;
                  }}
                />
              </div>

              {/* 🎴 Galeria de miniaturas */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {/* Inclui imagem principal + galeria */}
                {[pkg.image, ...pkg.gallery].map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setMainImage(img)}
                    className={`overflow-hidden rounded-xl transition ${
                      mainImage === img
                        ? "ring-4 ring-orange-500"
                        : "ring-2 ring-transparent hover:ring-orange-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${pkg.title} - foto ${index + 1}`}
                      className="h-24 w-full object-cover"
                      onError={(e) => {
                        const imgEl = e.currentTarget;
                        imgEl.onerror = null;
                        imgEl.src = fallbackImage;
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* 📝 Sobre este pacote */}
              <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800">
                  Sobre este pacote
                </h2>
                <p className="mt-3 leading-relaxed text-slate-600">
                  {pkg.fullDescription}
                </p>
              </div>

              {/* ✅ O que está incluído */}
              <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800">
                  O que está incluído
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {pkg.includes.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-slate-600"
                    >
                      <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 🌍 Saídas disponíveis */}
              <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800">
                  Saídas disponíveis
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Este pacote sai de {pkg.origins.length}{" "}
                  {pkg.origins.length === 1 ? "cidade" : "cidades"}:
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pkg.origins.map((origin, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
                    >
                      <MapPinIcon className="h-3.5 w-3.5 text-orange-500" />
                      {origin}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA (1/3) — Card de preço STICKY */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 rounded-2xl bg-white p-6 shadow-lg">
                {/* Preço */}
                <div className="border-b border-slate-100 pb-4">
                  {pkg.discount && (
                    <p className="text-sm text-slate-400 line-through">
                      De {formattedOriginalPrice}
                    </p>
                  )}
                  <p className="text-xs text-slate-500">a partir de</p>
                  <p className="text-3xl font-bold text-orange-500">
                    {formattedPrice}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">por pessoa</p>
                </div>

                {/* Informações rápidas */}
                <div className="mt-4 space-y-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <ClockIcon className="h-4 w-4 text-orange-500" />
                    <span>
                      <strong>{pkg.duration}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <StarIcon className="h-4 w-4 text-orange-500" />
                    <span>
                      Avaliação <strong>{pkg.rating.toFixed(1)}</strong> / 5.0
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <TagIcon className="h-4 w-4 text-orange-500" />
                    <span>
                      Tipo <strong>{pkg.packageType}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPinIcon className="h-4 w-4 text-orange-500" />
                    <span>
                      <strong>{pkg.origins.length}</strong>{" "}
                      {pkg.origins.length === 1 ? "saída" : "saídas"}
                    </span>
                  </div>
                </div>

                {/* Botão de reserva */}
                <button
                  type="button"
                  className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-700"
                  onClick={() =>
                    alert("🎉 Em breve você poderá reservar este pacote!")
                  }
                >
                  Reservar agora
                </button>

                <p className="mt-3 text-center text-xs text-slate-500">
                  💳 Parcelamento em até 12x
                </p>
              </div>
            </div>
          </div>{" "}
          {/* ============================================
              🎯 PACOTES RELACIONADOS
          ============================================ */}
          {relatedPackages.length > 0 && (
            <section className="mt-16">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                  Outros pacotes para {pkg.destination}
                </h2>
                <p className="mt-2 text-slate-600">
                  Explore mais opções para o mesmo destino
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {relatedPackages.map((relatedPkg) => (
                  <PackageCard key={relatedPkg.id} package={relatedPkg} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default PackageDetail;
