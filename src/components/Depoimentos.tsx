type Testimonial = {
  id: number
  author: string
  destination: string
  comment: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    author: "Marina Costa",
    destination: "Maldivas",
    comment: "Inesquecível! A viagem foi incrível do começo ao fim.",
    avatar: "/img/depoimentos/profile-img-comentario1.jpg",
  },
  {
    id: 2,
    author: "Carlos Henrique",
    destination: "Paris",
    comment:
      "Tudo muito bem organizado. Atendimento excelente e roteiro impecável.",
    avatar: "/img/depoimentos/profile-img-comentario2.jpg",
  },
  {
    id: 3,
    author: "Fernanda Lima",
    destination: "Tokyo",
    comment: "Foi uma experiência única. Já quero planejar a próxima viagem.",
    avatar: "/img/depoimentos/profile-img-comentario3.jpg",
  },
  {
    id: 4,
    author: "Rafael Souza",
    destination: "Rio de Janeiro",
    comment:
      "Equipe muito atenciosa e suporte rápido durante toda a viagem.",
    avatar: "/img/depoimentos/profile-img-comentario4.jpg",
  },
  {
    id: 5,
    author: "Juliana Martins",
    destination: "Nova York",
    comment:
      "Os detalhes fizeram toda a diferença. Foi tudo acima do esperado.",
    avatar: "/img/depoimentos/profile-img-comentario5.png",
  },
  {
    id: 6,
    author: "Patrícia Almeida",
    destination: "Egito",
    comment: "Amei cada momento. Organização, conforto e passeios incríveis.",
    avatar: "/img/depoimentos/profile-img-comentario6.jpg",
  },
]

function Stars() {
  return (
    <div className="mt-4 flex items-center justify-center gap-1.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className="text-lg text-orange-500">
          ★
        </span>
      ))}
    </div>
  )
}

type TestimonialCardProps = {
  author: string
  destination: string
  comment: string
  avatar: string
}

function TestimonialCard({
  author,
  destination,
  comment,
  avatar,
}: TestimonialCardProps) {
  return (
    <article className="w-75 shrink-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:w-85">
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={`Avatar de ${author}`}
          className="h-12 w-12 rounded-full object-cover"
          loading="lazy"
        />

        <div>
          <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
            {author}
          </h3>
          <p className="text-sm text-slate-500">{destination}</p>
        </div>
      </div>

      <div className="mt-4">
        <span className="text-3xl leading-none text-orange-500">“</span>
        <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
          {comment}
        </p>
        <Stars />
      </div>
    </article>
  )
}

function Depoimentos() {
  const marqueeItems = [...testimonials, ...testimonials]

  return (
    <section className="mx-auto w-full max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
          Veja o que nossos clientes dizem sobre nossos serviços
        </h2>

        <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
          Comentários reais de pessoas que viajaram com a Thynk Travel e viveram
          experiências inesquecíveis.
        </p>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-white via-white/80 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-white via-white/80 to-transparent sm:w-24" />

        <div className="marquee group flex gap-6">
          {marqueeItems.map((item, index) => (
            <TestimonialCard
              key={`${item.id}-${index}`}
              author={item.author}
              destination={item.destination}
              comment={item.comment}
              avatar={item.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Depoimentos