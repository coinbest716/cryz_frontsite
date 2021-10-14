import React, { useEffect, useState } from 'react'
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
import ShoppingCart from 'components/components/ShoppingCart'
import shoppingCartData from 'assets/data/ShoppingCartData'

const Header = props => {
  const router = useRouter()

  const [changeHeaderColor, setChangeHeaderColor] = React.useState(false)

  const [openCart, setOpenCart] = useState(false)
  const [cartData, setCartData] = useState([])

  const menus = [
    {
      title: 'Salud Fem',
      link: '/female-health',
      subMenus: [
        {
          title: 'Preparación al parto',
          link: '/female-health/preparation-for-childbirth',
          subMenus: [
            {
              title: '1 to 1',
              link: '/buy-one-to-one',
            },
            {
              title: 'Presencial',
              link: '/buy-person',
            },
          ],
        },
        {
          title: 'Suelo pélvico',
          link: '/female-health/pelvic-floor',
          subMenus: [
            {
              title: '1 to 1',
              link: '/buy-one-to-one',
            },
            {
              title: 'Presencial',
              link: '/buy-person',
            },
          ],
        },
        {
          title: 'Postparto',
          link: '/female-health/postpartum',
          subMenus: [
            {
              title: '1 to 1',
              link: '/buy-one-to-one',
            },
            {
              title: 'Presencial',
              link: '/buy-person',
            },
            {
              title: 'Planes Online',
              link: '/buy-plans-online',
            },
          ],
        },
        {
          title: 'Embarazo',
          link: '/female-health/pregnancy',
          subMenus: [
            {
              title: '1 to 1',
              link: '/buy-one-to-one',
            },
            {
              title: 'Presencial',
              link: '/buy-person',
            },
            {
              title: 'Planes Online',
              link: '/buy-plans-online',
            },
          ],
        },
        {
          title: 'Asesoria de Lactancia',
          link: '/female-health/lactation-counseling',
          subMenus: [
            {
              title: '1 to 1',
              link: '/buy-one-to-one',
            },
            {
              title: 'Presencial',
              link: '/buy-person',
            },
            {
              title: 'Planes Online',
              link: '/buy-plans-online',
            },
          ],
        },
        {
          title: 'Menopausia',
          link: '/female-health/menopause',
          subMenus: [
            {
              title: '1 to 1',
              link: '/buy-one-to-one',
            },
            {
              title: 'Presencial',
              link: '/buy-person',
            },
            {
              title: 'Planes Online',
              link: '/buy-plans-online',
            },
          ],
        },
        {
          title: 'Asesoria del sueño',
          link: '/female-health/child-sleep-counseling',
          subMenus: [
            {
              title: '1 to 1',
              link: '/buy-one-to-one',
            },
          ],
        },
        {
          title: 'Entrena tu Diástasis',
          link: '/female-health/train-your-diastasis',
          subMenus: [
            {
              title: '1 to 1',
              link: '/buy-one-to-one',
            },
            {
              title: 'Presencial',
              link: '/buy-person',
            },
          ],
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

  useEffect(() => {
    setCartData(shoppingCartData)
  }, [])

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

  const handleClickShoppingCard = () => {
    setOpenCart(!openCart)
  }

  const handleRemoveCart = index => {
    let array = [...cartData]
    array.splice(index, 1)
    setCartData(array)
  }

  const handleBack = () => {
    setOpenCart(false)
  }

  const handleCheckout = () => {
    setOpenCart(false)
  }

  return (
    <div className={changeHeaderColor === true ? styles.whiteContainer : styles.transparentContainer}>
      <Link href={'/'} passHref>
        <p className={styles.logo}>CRYS DYAZ & CO</p>
      </Link>
      <div className="flex">
        <ul className="flex flex-col sm:flex-row list-none items-center justify-end mr-24">
          {/* text menu part */}
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
                        <div className="flex flex-wrap relative">
                          {menu.subMenus.map((subMenu, idx) =>
                            subMenu.subMenus !== undefined && subMenu.subMenus.length !== 0 ? (
                              <div key={idx}>
                                <div className={styles.subDropdown}>
                                  <button className={styles.subDropbtn}>
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
                                  </button>
                                  <div className={styles.subDropdownContent}>
                                    {subMenu.subMenus.map((item, index) => (
                                      <div key={index}>
                                        <Link href={item.link} passHref>
                                          <a
                                            className={
                                              styles.menuText +
                                              ' ' +
                                              (router.pathname === item.link || router.asPath === item.link
                                                ? styles.active
                                                : '')
                                            }
                                          >
                                            {router.pathname === item.link ? <b>{item.title}</b> : item.title}
                                          </a>
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
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
                            )
                          )}
                        </div>
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
          {/* icon menu part */}
          <li className={'flex justify-center items-center ml-16 ' + styles.iconMenuItem}>
            {/* <Link href={'/shop-cart'} passHref> */}
            <button
              className="duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center"
              onClick={handleClickShoppingCard}
            >
              <Image src={CartIcon} alt="" width={22} height={19} />
            </button>
            {/* </Link> */}
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
      {openCart && (
        <div className="absolute top-20 right-20">
          <ShoppingCart
            data={cartData}
            handleRemoveCart={handleRemoveCart}
            handleBack={handleBack}
            handleCheckout={handleCheckout}
          />
        </div>
      )}
    </div>
  )
}

export default Header
