import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type Destination = {
  name: string
  images: [string, string]
}

const destinations: Destination[] = [
  {
    name: "Rio de Janeiro",
    images: ["/img/destinos/rio-001.jpg", "/img/destinos/rio-002.jpg"],
  },
  {
    name: "Tokyo",
    images: ["/img/destinos/tokyo-001.jpg", "/img/destinos/tokyo-002.jpg"],
  },
  {
    name: "Paris",
    images: ["/img/destinos/paris-001.jpg", "/img/destinos/paris-002.jpg"],
  },
  {
    name: "Nova York",
    images: [
      "/img/destinos/nova-york-001.jpg",
      "/img/destinos/nova-york-002.jpg",
    ],
  },
  {
    name: "Egito",
    images: ["/img/destinos/egito-001.jpeg", "/img/destinos/egito-002.png"],
  },
  {
    name: "Moscow",
    images: ["/img/destinos/moscow-001.jpg", "/img/destinos/moscow-002.jpg"],
  },
]

type DestinationButtonProps = {
  name: string
  isActive: boolean
  onClick: () => void
}

function DestinationButton({
  name,
  isActive,
  onClick,
}: DestinationButtonProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={[
          "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 sm:text-base",
          "hover:-translate-y-0.5",
          isActive
            ? "border-orange-500 bg-orange-50 text-orange-500 shadow-sm"
            : "border-slate-300 text-slate-700 hover:border-orange-300 hover:text-orange-400",
        ].join(" ")}
      >
        {name}
      </button>
    </li>
  )
}

function Destinos() {
  const [selectedDestinationName, setSelectedDestinationName] = useState(
    destinations[0].name
  )

  const selectedDestination = useMemo(
    () =>
      destinations.find(
        (destination) => destination.name === selectedDestinationName
      ) ?? destinations[0],
    [selectedDestinationName]
  )

  return (
    <section className="mx-auto w-full max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-16 lg:py-20">
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        <div>
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
              Escolha os melhores destinos na melhor agência
            </h2>

            <p className="mt-5 max-w-2xl border-l-4 border-orange-500 pl-4 text-sm leading-7 text-slate-600 sm:text-base">
              Com a Agência de Viagens, você pode explorar os melhores destinos
              ao redor do mundo. Oferecemos pacotes personalizados para destinos
              exóticos, praias paradisíacas, cidades históricas e muito mais.
              Descubra novas culturas, experimente novos sabores e crie memórias
              inesquecíveis em sua próxima viagem.
            </p>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-center text-2xl font-semibold text-orange-500 sm:text-3xl">
              Destinos mais procurados
            </h3>

            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {destinations.map((destination) => (
                <DestinationButton
                  key={destination.name}
                  name={destination.name}
                  isActive={selectedDestination.name === destination.name}
                  onClick={() => setSelectedDestinationName(destination.name)}
                />
              ))}
            </ul>
          </motion.div>

          <div className="mt-10 md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDestination.name}
                className="grid grid-cols-1 gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                {selectedDestination.images.map((image, index) => (
                  <motion.div
                    key={`${selectedDestination.name}-${index}`}
                    className="overflow-hidden rounded-2xl bg-white shadow-md"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                  >
                    <img
                      src={image}
                      alt={`${selectedDestination.name} ${index + 1}`}
                      className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDestination.name}
              className="flex flex-col items-end gap-6"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
            >
              {selectedDestination.images.map((image, index) => (
                <motion.div
                  key={`${selectedDestination.name}-${index}`}
                  className="w-full overflow-hidden rounded-2xl bg-white shadow-md"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <img
                    src={image}
                    alt={`${selectedDestination.name} ${index + 1}`}
                    className="h-36 w-full object-cover transition-transform duration-500 hover:scale-105 lg:h-44"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Destinos