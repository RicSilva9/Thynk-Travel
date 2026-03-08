import { useState, type ReactNode } from "react"
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react"
import classNames from "classnames"
import DatePicker from "react-datepicker"
import { ptBR } from "date-fns/locale"
import "react-datepicker/dist/react-datepicker.css"


type ModalLoginProps = {
  isOpen: boolean
  setModalOpen: () => void
  children?: ReactNode
}

function ModalLogin({
  isOpen,
  setModalOpen,
  children,
}: ModalLoginProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-96 overflow-hidden rounded-md bg-slate-50 shadow-xl">
        {children && <div>{children}</div>}

        <div className="flex w-full justify-end">
          <button
            type="button"
            className="inline-block p-3 py-2 text-xs font-bold text-black transition hover:bg-red-700 hover:text-white"
            onClick={setModalOpen}
          >
            X
          </button>
        </div>

        <div className="p-5">
          <h1 className="bg-red-400 p-3 text-sm text-black">
            AVISO! Essa tela de login é para demonstração, não iremos armazenar
            dados colocados a seguir.
          </h1>

          <h2 className="mt-5 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            Faça login em sua conta
          </h2>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Endereço de Email
                </label>

                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Senha
                  </label>

                  <div className="text-sm">
                    <a
                      href="#home-id-nav"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>

                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <div>
            <p className="mt-6 cursor-default text-center text-sm text-gray-700">
              or with
            </p>

            <div className="mt-6 flex justify-center gap-5">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg border border-black px-3 py-1 text-black transition duration-300 ease-in-out hover:border-none hover:bg-blue-500 hover:font-bold hover:text-white"
              >
                <img
                  src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                  className="max-h-5 rounded-full bg-slate-50"
                  alt="logo google"
                />
                Google
              </button>

              <button
                type="button"
                className="flex items-center gap-1 rounded-lg border border-black px-3 py-1 text-black transition duration-300 ease-in-out hover:border-none hover:bg-black hover:font-bold hover:text-white"
              >
                <img
                  src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"
                  className="max-h-5 rounded-full bg-slate-50"
                  alt="logo github"
                />
                Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type NavigationItem = {
  name: string
  href: string
  current: boolean
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "#home-id-nav", current: true },
]

type HeaderSelectorProps = {
  selectedOption: string
  handleSelection: (option: string) => void
}

function HeaderSelector({
  selectedOption,
  handleSelection,
}: HeaderSelectorProps) {
  return (
    <div className="flex justify-center gap-10 sm:justify-start sm:gap-2">
      <button
        className={`items-center rounded-3xl px-2 py-1 text-base hover:bg-slate-300 ${
          selectedOption === "Pacotes"
            ? "font-bold text-orange-500"
            : "text-black"
        }`}
        onClick={() => handleSelection("Pacotes")}
        aria-pressed={selectedOption === "Pacotes"}
      >
        Pacotes
      </button>

      <button
        className={`items-center rounded-3xl px-2 py-1 text-base hover:bg-slate-300 ${
          selectedOption === "Cruzeiros"
            ? "font-bold text-orange-500"
            : "text-black"
        }`}
        onClick={() => handleSelection("Cruzeiros")}
        aria-pressed={selectedOption === "Cruzeiros"}
      >
        Cruzeiros
      </button>
    </div>
  )
}

type HeaderLocationProps = {
  origin: string
  destination: string
  handleSwap: () => void
  setOrigin: React.Dispatch<React.SetStateAction<string>>
  setDestination: React.Dispatch<React.SetStateAction<string>>
}

function HeaderLocation({
  origin,
  destination,
  handleSwap,
  setOrigin,
  setDestination,
}: HeaderLocationProps) {
  return (
    <div className="m-auto flex items-start gap-1 sm:m-0">
      <input
        type="text"
        placeholder="Origem"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        className="w-full min-w-16 rounded-md border px-2 py-1 font-semibold text-black focus:border-orange-500 focus:outline-none focus:ring-0"
        aria-label="Origem"
      />

      <button
        onClick={handleSwap}
        className="rounded-full border bg-gray-400 px-2 py-1 hover:bg-orange-500 focus:outline-none sm:rounded-md"
        aria-label="Trocar origem e destino"
      >
        ↔
      </button>

      <input
        type="text"
        placeholder="Destino"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full min-w-16 rounded-md border px-2 py-1 font-semibold text-black focus:border-orange-500 focus:outline-none focus:ring-0"
        aria-label="Destino"
      />
    </div>
  )
}

type SearchButtonProps = {
  onClick: () => void
}

function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <div className="flex w-full max-w-52 items-start justify-center">
      <button
        onClick={onClick}
        className="w-full max-w-52 rounded-2xl bg-orange-500 py-2 text-white hover:bg-orange-700"
      >
        Pesquisar
      </button>
    </div>
  )
}

function Nav() {
  const [openModal, setOpenModal] = useState(false)

  const smoothScroll = (target: string) => {
    const element = document.querySelector(target)

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      })
    }
  }

  return (
    <Disclosure
      as="nav"
      className="fixed left-0 right-0 top-0 z-40 max-w-screen-2xl rounded-b-lg bg-slate-900/40 px-4 backdrop-blur sm:mx-4 sm:px-8 md:px-16 2xl:m-auto"
    >
      {({ open }) => (
        <>
          <ModalLogin
            isOpen={openModal}
            setModalOpen={() => setOpenModal(!openModal)}
          />

          <div className="mx-auto">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 font-bold text-orange-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Abrir menu principal</span>

                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex shrink-0 items-center max-sm:hidden">
                  <a
                    href="#home-id-nav"
                    onClick={(e) => {
                      e.preventDefault()
                      smoothScroll("#home-id-nav")
                    }}
                  >
                    <img
                      className="h-10 w-auto"
                      src="/img/header/business-logo.png"
                      alt="Logo"
                    />
                  </a>
                </div>

                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "text-white hover:bg-gray-700 hover:text-white"
                            : "text-white hover:bg-gray-700 hover:text-white",
                          "mt-1 rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                        onClick={(e) => {
                          e.preventDefault()
                          smoothScroll(item.href)
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Abrir menu de usuário</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://i.pinimg.com/736x/de/ba/87/deba871bd0100ddf6f530dc30f87272a.jpg"
                          alt="Avatar do usuário"
                        />
                      </MenuButton>
                    </div>

                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <MenuItem>
                          <button
                            className="w-full px-4 py-2 text-left text-black hover:bg-slate-100"
                            onClick={() => setOpenModal(true)}
                          >
                            Login
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "text-white hover:bg-gray-700 hover:text-white"
                      : "text-white hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    smoothScroll(item.href)
                  }}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

type HeaderDateProps = {
  departureDate: Date | null
  returnDate: Date | null
  setDepartureDate: React.Dispatch<React.SetStateAction<Date | null>>
  setReturnDate: React.Dispatch<React.SetStateAction<Date | null>>
  noDate: boolean
  handleToggleNoDate: () => void
}

function HeaderDate({
  departureDate,
  returnDate,
  setDepartureDate,
  setReturnDate,
  noDate,
  handleToggleNoDate,
}: HeaderDateProps) {
  const today = new Date()

  return (
    <div className="m-auto flex flex-col items-start gap-2 sm:m-0">
      <div className="flex gap-1">
        <div className="relative">
          <DatePicker
            selected={departureDate}
            onChange={(date: Date | null) => setDepartureDate(date)}
            placeholderText="Ida"
            locale={ptBR}
            disabled={noDate}
            className={`w-full min-w-14 rounded-md border px-2 py-1 font-semibold focus:border-orange-500 focus:outline-none focus:ring-0 ${
              noDate
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-black cursor-text"
            }`}
            dateFormat="dd/MM/yyyy"
            aria-label="Data de ida"
            minDate={today}
          />
        </div>

        <div className="relative">
          <DatePicker
            selected={returnDate}
            onChange={(date: Date | null) => setReturnDate(date)}
            placeholderText="Volta"
            locale={ptBR}
            disabled={noDate}
            className={`w-full min-w-14 rounded-md border px-2 py-1 font-semibold focus:border-orange-500 focus:outline-none focus:ring-0 ${
              noDate
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-black cursor-text"
            }`}
            dateFormat="dd/MM/yyyy"
            aria-label="Data de volta"
            minDate={departureDate ?? today}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            id="no-date-switch"
            type="checkbox"
            checked={noDate}
            onChange={handleToggleNoDate}
            className="sr-only"
            aria-label="Sem data definida"
          />

          <div
            className={`h-4 w-8 rounded-full shadow-inner ${
              noDate ? "bg-green-500" : "bg-slate-300"
            }`}
          ></div>

          <div
            className={`absolute top-0 h-4 w-4 rounded-full bg-white shadow-md transition-transform ${
              noDate ? "translate-x-4" : "translate-x-0"
            }`}
          ></div>
        </label>

        <label
          htmlFor="no-date-switch"
          className={`cursor-pointer text-sm ${
            noDate ? "font-semibold text-black" : "text-gray-500"
          }`}
        >
          Sem data definida
        </label>
      </div>
    </div>
  )
}

function Header() {
  const [selectedOption, setSelectedOption] = useState("Pacotes")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState<Date | null>(null)
  const [returnDate, setReturnDate] = useState<Date | null>(null)
  const [noDate, setNoDate] = useState(false)

  const handleSelection = (option: string) => setSelectedOption(option)

  const handleSwap = () => {
    setOrigin(destination)
    setDestination(origin)
  }

  const handleSearchClick = () => {
    console.log("Pesquisar")
  }

  const handleToggleNoDate = () => {
  setNoDate((prev) => !prev)

  if (!noDate) {
    setDepartureDate(null)
    setReturnDate(null)
  }
}

  return (
    <header
      className="mx-0 max-w-screen-2xl rounded-b-2xl bg-slate-700 bg-cover bg-center bg-fixed px-8 pb-20 pt-20 text-white sm:mx-4 sm:pb-24 md:px-16 2xl:m-auto"
      style={{ backgroundImage: "url(/img/header/bg-header.png)" }}
      id="home-id-nav"
    >
      <Nav />

      <section>
        <h1 className="fjalla w-1/2 text-3xl leading-tight tracking-normal hover:cursor-default max-lg:w-2/3 max-sm:w-full sm:text-4xl">
          Oferecemos os melhores pacotes de viagem para suas férias!
        </h1>

        <p className="mt-2 w-1/2 hover:cursor-default max-lg:w-2/3 max-lg:text-sm max-md:text-xs max-sm:hidden">
          A Agência de Viagens oferece serviços personalizados para quem busca
          destinos incríveis. Com nossos pacotes de viagem, você terá uma
          experiência única e inesquecível. Realize seus sonhos de viajar
          conosco!
        </p>
      </section>

      <section className="mt-5 rounded-2xl bg-slate-50 p-2 sm:mt-10 sm:p-5">
        <HeaderSelector
          selectedOption={selectedOption}
          handleSelection={handleSelection}
        />

        <div className="mt-1 sm:mt-3">
          {selectedOption === "Pacotes" && (
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
              <div className="flex flex-col items-center gap-4 px-4 pt-4 sm:justify-between sm:px-0 sm:pt-0 md:flex-row md:items-start">
                <HeaderLocation
                  origin={origin}
                  destination={destination}
                  handleSwap={handleSwap}
                  setOrigin={setOrigin}
                  setDestination={setDestination}
                />

                <HeaderDate
                  departureDate={departureDate}
                  returnDate={returnDate}
                  setDepartureDate={setDepartureDate}
                  setReturnDate={setReturnDate}
                  noDate={noDate}
                  handleToggleNoDate={handleToggleNoDate}
                />
              </div>
              <div className="flex w-full max-w-60 justify-center">
                <SearchButton onClick={handleSearchClick} />
              </div>
            </div>
          )}

          {selectedOption === "Cruzeiros" && (
            <div className="rounded-md bg-red-200 p-2">
              <span className="text-red-900">
                Esta seção do site ainda está em desenvolvimento. Estamos
                trabalhando para trazer todas as funcionalidades o mais rápido
                possível. Agradecemos sua compreensão!
              </span>
            </div>
          )}
        </div>
      </section>
    </header>
  )
}

export default Header