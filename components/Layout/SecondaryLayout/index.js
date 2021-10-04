import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}
