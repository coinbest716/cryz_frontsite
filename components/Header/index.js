import React from 'react'
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

const Header = props => {
  const router = useRouter()

  const [changeHeaderColor, setChangeHeaderColor] = React.useState(false)

  const menus = [
    {
      title: 'Salud Fem',
      link: '/female-health',
      subMenus: [
        {
          title: 'Preparación al parto',
          link: '/female-health',
          subMenus: [
            {
              title: '1 to 1',
              link: '/female-health/preparation-for-childbirth/1-to-1',
            },
            {
              title: 'Presencial',
              link: '/female-health/preparation-for-childbirth/presencial',
            },
            {
              title: 'Planes Online',
              link: '/female-health/preparation-for-childbirth/planes-online',
            },
          ],
        },
        {
          title: 'Suelo pélvico',
          link: '/female-health/pelvic-floor',
        },
        {
          title: 'Postparto',
          link: '/female-health/postpartum',
        },
        {
          title: 'Embarazo',
          link: '/female-health/pregnancy',
        },
        {
          title: 'Asesoria de Lactancia',
          link: '/female-health/lactation-counseling',
        },
        {
          title: 'Menopausia',
          link: '/female-health/menopause',
        },
        {
          title: 'Asesoria del sueño',
          link: '/female-health/sleep-counseling',
        },
        {
          title: 'Entrena tu Diástasis',
          link: '/female-health/train-your-diastasis',
        },
      ],
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
      link: '/#team',
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

  const gotoTeamSection = () => {
    if (router.pathname === '/') {
      const sectionPosition = document.getElementById('team').offsetTop
      window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth',
      })
      setTimeout(() => {
        router.push('/#team')
      }, 500)
    } else {
      router.push('/#team')
    }
  }

  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener('scroll', headerColorChange)
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener('scroll', headerColorChange)
      }
    }
  })

  const headerColorChange = () => {
    const { changeColorOnScroll } = props
    const windowsScrollTop = window.pageYOffset
    if (windowsScrollTop > changeColorOnScroll.height) {
      setChangeHeaderColor(true)
    } else {
      setChangeHeaderColor(false)
    }
  }

  return (
    <div className={changeHeaderColor === true ? styles.whiteContainer : styles.transparentContainer}>
      <Link href={'/'} passHref>
        <p className={styles.logo}>CRYS DYAZ & CO</p>
      </Link>
      <div className="flex">
        <ul className="flex flex-col sm:flex-row list-none items-center justify-end mr-24">
          {menus &&
            menus.map((menu, key) => {
              return (
                <li className={'flex justify-center ' + styles.menuItem} key={key}>
                  {menu.link === '/#team' ? (
                    <button onClick={() => gotoTeamSection()}>
                      <a
                        className={
                          styles.menuText +
                          ' ' +
                          (router.pathname === menu.link || router.asPath === menu.link ? styles.active : '')
                        }
                      >
                        {router.pathname === menu.link ? <b>{menu.title}</b> : menu.title}
                      </a>
                    </button>
                  ) : menu.subMenus !== undefined && menu.subMenus.length !== 0 ? (
                    <div className={styles.dropdown}>
                      <button className={styles.dropbtn}>
                        <Link href={menu.link} passHref>
                          <a
                            className={
                              styles.menuText +
                              ' ' +
                              (router.pathname === menu.link || router.asPath === menu.link ? styles.active : '')
                            }
                          >
                            {router.pathname === menu.link ? <b>{menu.title}</b> : menu.title}
                          </a>
                        </Link>
                      </button>
                      <div className={styles.dropdownContent}>
                        {menu.subMenus.map((subMenu, idx) => (
                          <div key={idx}>
                            <Link href={subMenu.link} passHref>
                              <a
                                className={
                                  styles.menuText +
                                  ' ' +
                                  (router.pathname === subMenu.link || router.asPath === subMenu.link
                                    ? styles.active
                                    : '')
                                }
                              >
                                {router.pathname === subMenu.link ? <b>{subMenu.title}</b> : subMenu.title}
                              </a>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button>
                      <Link href={menu.link} passHref>
                        <a
                          className={
                            styles.menuText +
                            ' ' +
                            (router.pathname === menu.link || router.asPath === menu.link ? styles.active : '')
                          }
                        >
                          {router.pathname === menu.link ? <b>{menu.title}</b> : menu.title}
                        </a>
                      </Link>
                    </button>
                  )}
                </li>
              )
            })}
          <li className={'flex justify-center ml-16 ' + styles.iconMenuItem}>
            <Link href={'/shop-cart'} passHref>
              <button>
                <Image src={CartIcon} alt="" width={22} height={19} />
              </button>
            </Link>
          </li>
          <li className={'flex justify-center ' + styles.iconMenuItem}>
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
