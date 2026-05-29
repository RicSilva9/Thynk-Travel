import { StarIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";
import type { TravelPackage } from "../types/travel-package";

type PackageCardProps = {
  package: TravelPackage;
};

function PackageCard({ package: pkg }: PackageCardProps) {
  // Calcula preço com desconto (se tiver)
  const finalPrice = pkg.discount
    ? pkg.price - (pkg.price * pkg.discount) / 100
    : pkg.price;

  // Formata o preço pra "R$ 1.890"
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

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl">
      {/* Imagem */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            img.onerror = null;
            img.src =
              "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800";
          }}
        />

        {/* Tag do tipo de pacote */}
        <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow">
          {pkg.packageType}
        </span>

        {/* Tag de desconto (se tiver) */}
        {pkg.discount && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow">
            -{pkg.discount}%
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-5">
        {/* Avaliação */}
        <div className="mb-2 flex items-center gap-1">
          <StarIcon className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-semibold text-slate-700">
            {pkg.rating.toFixed(1)}
          </span>
          <span className="text-xs text-slate-400">• {pkg.category}</span>
        </div>

        {/* Título */}
        <h3 className="mb-2 text-lg font-bold text-slate-800">{pkg.title}</h3>

        {/* Destino */}
        <div className="mb-2 flex items-center gap-1 text-sm text-slate-600">
          <MapPinIcon className="h-4 w-4 text-orange-500" />
          <span>
            {pkg.destination}, {pkg.country}
          </span>
        </div>

        {/* Duração */}
        <div className="mb-3 flex items-center gap-1 text-sm text-slate-600">
          <ClockIcon className="h-4 w-4 text-orange-500" />
          <span>{pkg.duration}</span>
        </div>

        {/* Descrição */}
        <p className="mb-4 line-clamp-2 flex-1 text-sm text-slate-600">
          {pkg.description}
        </p>

        {/* Preço + Botão */}
        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
          <div>
            {pkg.discount && (
              <p className="text-xs text-slate-400 line-through">
                {formattedOriginalPrice}
              </p>
            )}
            <p className="text-xs text-slate-500">a partir de</p>
            <p className="text-xl font-bold text-orange-500">
              {formattedPrice}
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500"
          >
            Ver mais
          </button>
        </div>
      </div>
    </article>
  );
}

export default PackageCard;
