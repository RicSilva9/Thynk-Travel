function Footer() {
  return (
    <footer className="mt-24 w-full bg-orange-500 text-white md:mt-32">
      <div className="mx-auto max-w-screen-2xl px-6 py-12 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:text-left">

          {/* PAGAMENTOS */}
          <div>
            <h3 className="text-lg font-semibold sm:text-xl">
              Formas de pagamento
            </h3>

            <div className="mt-4 flex justify-center gap-4 md:justify-start">
              <img
                src="/img/footer/logo-da-bandeira-mastercard.png"
                alt="Mastercard"
                className="h-6 object-contain"
              />

              <img
                src="/img/footer/Diners-Club-Logo.png"
                alt="Diners Club"
                className="h-6 object-contain"
              />

              <img
                src="/img/footer/logo-da-visa-bandeira-cartao.png"
                alt="Visa"
                className="h-6 object-contain"
              />
            </div>
          </div>

          {/* CREDITOS */}
          <div>
            <h3 className="text-lg font-semibold sm:text-xl">
              Créditos
            </h3>

            <p className="mt-4 text-sm opacity-90">
              Site desenvolvido por:
            </p>

            <a
              href="https://www.linkedin.com/in/ricardo-dev13"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-3 text-sm transition hover:text-blue-200 md:justify-start"
            >
              <img
                src="/img/footer/ricardo-dev13.jpg"
                alt="Ricardo da Silva Sousa"
                className="h-9 w-9 rounded-full object-cover"
              />
              Ricardo da Silva Sousa
            </a>

            <p className="mt-4 text-sm opacity-90">
              Projetado por:
            </p>

            <a
              href="https://www.linkedin.com/in/21john/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-3 text-sm transition hover:text-blue-200 md:justify-start"
            >
              <img
                src="/img/footer/john.jpg"
                alt="John Ferreira"
                className="h-9 w-9 rounded-full object-cover"
              />
              John Ferreira
            </a>
          </div>

          {/* TELEFONE */}
          <div>
            <h3 className="text-lg font-semibold sm:text-xl">
              Televendas
            </h3>

            <div className="mt-4 text-sm space-y-1 opacity-90">
              <p>(11) 3333-2565</p>
              <p>Segunda a Sábado: 9h às 21h</p>
              <p>Domingo: 10h às 16h</p>
            </div>
          </div>

        </div>

        {/* LINHA FINAL */}
        <div className="mt-12 border-t border-white/30 pt-6 text-center text-sm opacity-90">
          © {new Date().getFullYear()} Thynk Travel — Todos os direitos reservados
        </div>
      </div>
    </footer>
  )
}

export default Footer