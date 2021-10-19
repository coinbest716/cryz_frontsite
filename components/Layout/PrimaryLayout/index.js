import Header from 'components/Header'
import Footer from 'components/Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header
        changeColorOnScroll={{
          height: 1,
        }}
      />
      <main>{children}</main>
      <Footer />
    </>
  )
}
