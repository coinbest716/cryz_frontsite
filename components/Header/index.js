import Link from 'next/link'
import Images from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import AppsIcon from 'assets/images/apps.svg'
import styles from 'components/Header/Header.module.scss'

const Header = () => {
  const router = useRouter()
  console.log(router.pathname)
  const dispatch = useDispatch()
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
      <div className={styles.logo}> logo part</div>
      <div className="flex">
        <ul className="flex flex-col sm:flex-row list-none items-center justify-end">
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
                  <Link href={menu.link}>
                    <button name={menu.title} onClick={() => dispatch({ type: 'set', menu: menu.title })}>
                      <a>{router.pathname === menu.link ? <b>{menu.title}</b> : menu.title}</a>
                    </button>
                  </Link>
                </li>
              )
            })}
        </ul>
        <button className={'flex justify-center items-center ' + styles.hamburgerMenu}>
          <Images src={AppsIcon} alt="" width={32} height={32} />
        </button>
      </div>
    </div>
  )
}

export default Header
