import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
// components
import Menu from 'components/Menu/Menu'

// images
import CartIcon from 'assets/images/cart.svg'
import AccountIcon from 'assets/images/account.svg'

// styles
import styles from 'components/Header/Header.module.scss'

const Header = () => {
  const router = useRouter()

  const menus = [
    {
      title: 'Salud Fem',
      link: '/female-health',
    },
    {
      title: 'Servicios',
      link: '/services',
    },
    {
      title: 'Classland',
      link: '/classland',
    },
    {
      title: 'Equipo',
      link: '/team',
    },
    {
      title: 'Contacto',
      link: '/contact',
    },
    {
      title: 'Tienda',
      link: '/shop',
    },
  ]

  return (
    <div className={'w-full flex justify-between items-center ' + styles.container}>
      <Link href={'/'} passHref>
        <p className={styles.logo}>CRYS DYAZ & CO</p>
      </Link>
      <div className="flex">
        <ul className="flex flex-col sm:flex-row list-none items-center justify-end mr-24">
          {menus &&
            menus.map((menu, key) => {
              return (
                <li
                  className={
                    'flex justify-center ' +
                    styles.menuItem +
                    ' ' +
                    (router.pathname === menu.link ? styles.active : '')
                  }
                  key={key}
                >
                  <Link href={menu.link} passHref>
                    <button>
                      <a>{router.pathname === menu.link ? <b>{menu.title}</b> : menu.title}</a>
                    </button>
                  </Link>
                </li>
              )
            })}
          <li className={'flex justify-center ml-16 ' + styles.menuItem}>
            <Link href={'/shop-cart'} passHref>
              <button>
                <Image src={CartIcon} alt="" width={22} height={19} />
              </button>
            </Link>
          </li>
          <li className={'flex justify-center ' + styles.menuItem}>
            <Link href={'/account'} passHref>
              <button>
                <Image src={AccountIcon} alt="" width={22} height={20} />
              </button>
            </Link>
          </li>
        </ul>
        <Menu />
      </div>
    </div>
  )
}

export default Header
