import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/amicis-logo.png"
            alt="AMICIS"
            width={70}
            height={70}
            priority
          />
        </Link>

        {/* Navegação */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#4A2511] md:flex">
          <Link
            href="/animais"
            className="transition hover:text-[#F28C28]"
          >
            Animais
          </Link>

          <Link
            href="/servicos"
            className="transition hover:text-[#F28C28]"
          >
            Serviços
          </Link>

          <Link
            href="/marketplace"
            className="transition hover:text-[#F28C28]"
          >
            Marketplace
          </Link>

          <Link
            href="/planos"
            className="transition hover:text-[#F28C28]"
          >
            Planos
          </Link>

          <Link
            href="/denuncias"
            className="transition hover:text-[#F28C28]"
          >
            Denúncias
          </Link>
        </nav>

        {/* Botões */}
        <div className="flex items-center gap-3">
          <Link
            href="/cadastro"
            className="hidden rounded-full border border-[#4A2511] px-5 py-2 text-sm font-semibold text-[#4A2511] transition hover:bg-[#FFF8F1] md:block"
          >
            Cadastre-se
          </Link>

          <Link
            href="/login"
            className="rounded-full bg-[#F28C28] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#d97706]"
          >
            Entrar
          </Link>
        </div>

      </div>
    </header>
  );
}