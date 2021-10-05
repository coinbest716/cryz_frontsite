import Header from 'components/Header'
import Footer from 'components/Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header
        changeColorOnScroll={{
          height: 400,
        }}
      />
      <main>{children}</main>
      <Footer />
    </>
  )
}
