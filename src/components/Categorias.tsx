import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type TravelPackage = {
  id: number
  name: string
  image: string
}

type CategoryKey = "parques" | "praias" | "monumentos"

type TravelCategory = {
  key: CategoryKey
  label: string
  packages: TravelPackage[]
}

const categories: TravelCategory[] = [
  {
    key: "parques",
    label: "Parques",
    packages: [
      {
        id: 1,
        name: "Disney Orlando - Florida",
        image: "/img/bg-cards/bg-card-parques-1.png",
      },
      {
        id: 2,
        name: "Beto Carrero - Brasil",
        image: "/img/bg-cards/bg-card-parques-2.png",
      },
      {
        id: 3,
        name: "Disney Paris - França",
        image: "/img/bg-cards/bg-card-parques-3.png",
      },
    ],
  },
  {
    key: "praias",
    label: "Praias",
    packages: [
      {
        id: 4,
        name: "Copacabana - Brasil",
        image: "/img/bg-cards/bg-card-praias-1.jpg",
      },
      {
        id: 5,
        name: "Waikiki Beach - Havaí",
        image: "/img/bg-cards/bg-card-praias-2.jpg",
      },
      {
        id: 6,
        name: "Bondi Beach - Austrália",
        image: "/img/bg-cards/bg-card-praias-3.jpg",
      },
    ],
  },
  {
    key: "monumentos",
    label: "Monumentos",
    packages: [
      {
        id: 7,
        name: "Torre Eiffel - França",
        image: "/img/bg-cards/bg-card-monumentos-1.jpg",
      },
      {
        id: 8,
        name: "Machu Picchu - Peru",
        image: "/img/bg-cards/bg-card-monumentos-2.jpg",
      },
      {
        id: 9,
        name: "Coliseu - Itália",
        image: "/img/bg-cards/bg-card-monumentos-3.jpg",
      },
    ],
  },
]

type CategoryButtonProps = {
  label: string
  isActive: boolean
  onClick: () => void
}

function CategoryButton({
  label,
  isActive,
  onClick,
}: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={[
        "rounded-full px-5 py-2 text-base font-medium transition-all duration-300 sm:text-lg",
        "hover:-translate-y-0.5",
        isActive
          ? "bg-orange-50 text-orange-500 shadow-sm"
          : "text-slate-700 hover:text-orange-400",
      ].join(" ")}
    >
      {label}
    </button>
  )
}

type PackageCardProps = {
  name: string
  image: string
  index: number
}

function PackageCard({ name, image, index }: PackageCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="group overflow-hidden rounded-2xl shadow-md"
    >
      <div
        className="relative h-56 bg-cover bg-center sm:h-72 md:h-80 lg:h-96"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/35 transition duration-300 group-hover:bg-black/45" />

        <div className="relative flex h-full items-end p-5 sm:p-6">
          <h3 className="text-xl font-semibold leading-snug text-white sm:text-2xl md:text-3xl">
            {name}
          </h3>
        </div>
      </div>
    </motion.article>
  )
}

function Categorias() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryKey>("parques")

  const currentCategory = useMemo(
    () =>
      categories.find((category) => category.key === selectedCategory) ??
      categories[0],
    [selectedCategory]
  )

  return (
    <section
      id="categorias-id-nav"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mx-auto max-w-md text-center text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
          Categorias populares
        </h2>
      </motion.div>

      <motion.div
        className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {categories.map((category) => (
          <CategoryButton
            key={category.key}
            label={category.label}
            isActive={selectedCategory === category.key}
            onClick={() => setSelectedCategory(category.key)}
          />
        ))}
      </motion.div>

      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.key}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35 }}
          >
            {currentCategory.packages.map((travelPackage, index) => (
              <PackageCard
                key={travelPackage.id}
                name={travelPackage.name}
                image={travelPackage.image}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Categorias