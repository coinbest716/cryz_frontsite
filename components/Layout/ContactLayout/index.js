import Header from 'components/Header'
import ContactFooter from 'components/ContactFooter'

export default function Layout({ children }) {
  return (
    <>
      <Header
        changeColorOnScroll={{
          height: 100,
        }}
      />
      <main>{children}</main>
      <ContactFooter />
    </>
  )
}
