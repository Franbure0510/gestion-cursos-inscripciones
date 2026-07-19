import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <Link href="/"><h1>Oferta Académica</h1></Link>
        <nav>
          <Link href="/">Inicio</Link>
          <Link href="/courses">Cursos</Link>
        </nav>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <p>Gestión de Cursos e Inscripciones - Oferta Académica &copy; {new Date().getFullYear()}</p>
      </footer>
    </>
  )
}
