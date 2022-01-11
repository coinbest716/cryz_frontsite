import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// custom components
import Menu from 'components/Menu/Menu'

// images
import AccountIcon from 'assets/images/account.svg'
import MessageIcon from 'assets/images/message-box.svg'

// styles
import styles from 'components/Header/Header.module.scss'
import ShoppingCart from 'components/components/ShoppingCart'
import shoppingCartData from 'assets/data/ShoppingCartData'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Header = props => {
  // variables
  const { viewport } = props
  const router = useRouter()
  const dispatch = useDispatch()

  const [changeHeaderColor, setChangeHeaderColor] = useState(false)
  const [getDisciplineList, { data: disciplineListData, loading: disciplineListLoading, error: disciplineListError }] =
    useLazyQuery(graphql.queries.getDisciplineList)

  const [openCart, setOpenCart] = useState(false)
  const [cartData, setCartData] = useState([])
  const [menus, setMenus] = useState([])
  const [showCart, setShowCart] = useState(true)
  const [showLogin, setShowLogin] = useState(true)

  // handlers
  useEffect(() => {
    getDisciplineList()
  }, [getDisciplineList])

  useEffect(() => {
    if (!disciplineListError && disciplineListData && disciplineListData.getDisciplineList) {
      let subMenus = []
      disciplineListData.getDisciplineList.map(item => {
        let object = {}
        if (item.id !== 8) {
          object.title = item.name
          if (item.id === 6) {
            object.link = '/female-health/matronas'
          } else {
            object.link = '/female-health/' + item.id
          }
          let subMenu = []
          let temp = {}
          if (item.stream_button) {
            temp = { id: item.id, title: '1 to 1', link: '/buy/buy-one-to-one' }
            subMenu.push(temp)
          }
          if (item.personal_button) {
            temp = { id: item.id, title: 'Presencial', link: '/buy/buy-person' }
            subMenu.push(temp)
          }
          if (item.online_button) {
            temp = { id: item.id, title: 'Planes Online', link: '/buy/buy-plans-online' }
            subMenu.push(temp)
          }
          object.subMenus = subMenu
          subMenus.push(object)
        }
      })
      let menu = []
      console.log(subMenus)
      menu.push({ title: 'Salud Fem', link: '/female-health', subMenus: subMenus })
      menu.push(
        {
          title: 'Salud Baby',
          link: '/salud-baby',
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
        }
      )
      setMenus(menu)
    }
  }, [disciplineListLoading, disciplineListData, disciplineListError])

  useEffect(() => {
    setCartData(shoppingCartData)
    if (viewport === 'mobile') {
      if (process.env.NEXT_PUBLIC_MOBILE_DASHBOARD === 'false') {
        setShowLogin(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (
      router.pathname === '/purchase-login' ||
      router.pathname === '/purchase-register' ||
      router.pathname === '/purchase/order-failed' ||
      router.pathname === '/purchase/order-success' ||
      router.pathname === '/purchase/transfer-success'
    ) {
      setShowCart(false)
    }
  }, [router.pathname])

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

  useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener('scroll', headerColorChange)
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener('scroll', headerColorChange)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const headerColorChange = () => {
    const { changeColorOnScroll } = props
    const windowsScrollTop = window.pageYOffset
    if (windowsScrollTop > changeColorOnScroll.height) {
      setChangeHeaderColor(true)
    } else {
      setChangeHeaderColor(false)
    }
  }

  const handleClickShoppingCard = bool => {
    setOpenCart(bool)
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
    router.push('/purchase-login')
  }

  const handleGotoRouter = link => {
    if (link === '/#team') {
      dispatch({ type: 'set', isLoading: false })
    } else if (router.pathname !== link) {
      dispatch({ type: 'set', isLoading: true })
    }
  }

  const handleGotoBuyPage = (id, link) => {
    switch (link) {
      case '/buy/buy-one-to-one':
        router.push({
          pathname: link,
          query: { discipline_id: id, service_type: 'streaming', type: 'femHealth' },
        })
        break
      case '/buy/buy-person':
        router.push({
          pathname: link,
          query: { discipline_id: id, service_type: 'personal', type: 'femHealth' },
        })
        break
      case '/buy/buy-plans-online':
        router.push({
          pathname: link,
          query: { discipline_id: id, service_type: 'online', type: 'femHealth' },
        })
        break
    }
  }

  return (
    <div
      className={changeHeaderColor === true ? styles.whiteContainer : styles.transparentContainer}
      style={router.pathname === '/' ? { borderBottom: 'none' } : {}}
    >
      <div onClick={() => handleGotoRouter('/')}>
        <Link href={'/'} passHref>
          <p className={styles.logo}>CRYS DYAZ & CO</p>
        </Link>
      </div>
      <div className={'flex'}>
        <ul className={'flex flex-row list-none items-center justify-end mr-24'}>
          {/* text menu part */}
          {viewport !== 'mobile' &&
            menus &&
            menus.map((menu, key) => {
              return (
                <li
                  className={'flex justify-center items-center ' + styles.menuItem}
                  key={key}
                  onClick={() => handleGotoRouter(menu.link)}
                >
                  {menu.link === '/#team' ? (
                    <button onClick={() => gotoTeamSection()} className={'hidden xl:block'}>
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
                              ('/' + router.pathname.split('/')[1] === menu.link || router.asPath === menu.link
                                ? styles.active
                                : '')
                            }
                          >
                            {router.pathname === menu.link ? <b>{menu.title}</b> : menu.title}
                          </a>
                        </Link>
                      </button>
                      <div className={styles.dropdownContent}>
                        <div className={'flex flex-wrap relative'}>
                          {menu.subMenus.map((subMenu, idx) =>
                            subMenu.subMenus !== undefined && subMenu.subMenus.length !== 0 ? (
                              <div key={idx}>
                                <div className={styles.subDropdown}>
                                  <button className={styles.subDropbtn}>
                                    <Link
                                      href={
                                        subMenu.link === '/female-health/6' ? '/female-health/matronas' : subMenu.link
                                      }
                                      passHref
                                    >
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
                                      <div
                                        key={index}
                                        onClick={() => handleGotoBuyPage(item.id, item.link)}
                                        className={'cursor-pointer'}
                                      >
                                        {/* <Link href={item.link} passHref> */}
                                        <a
                                          className={
                                            styles.subMenuText +
                                            ' ' +
                                            (router.pathname === item.link || router.asPath === item.link
                                              ? styles.active
                                              : '')
                                          }
                                        >
                                          {router.pathname === item.link ? <b>{item.title}</b> : item.title}
                                        </a>
                                        {/* </Link> */}
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
                  ) : menu.link === '/contact' ? (
                    <>
                      <button className={'hidden lg:block'}>
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
                      <div className={'flex lg:hidden justify-center items-center ' + styles.iconMenuItem}>
                        <button
                          className={
                            'duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center block xl:hidden'
                          }
                          onClick={() => router.push('/contact')}
                        >
                          <Image src={MessageIcon} alt="" width={22} height={19} />
                        </button>
                      </div>
                    </>
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
          {showLogin && (
            <li
              className={'flex justify-center items-center xl:ml-16 ' + styles.iconMenuItem}
              onClick={() => handleGotoRouter('login')}
            >
              <button
                className={'duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center'}
                onClick={() => router.push('/login')}
              >
                <Image src={AccountIcon} alt="" width={22} height={20} />
              </button>
            </li>
          )}
        </ul>
        <Menu viewport={viewport} />
      </div>
      {openCart && (
        <div className={'absolute top-20 right-20'} onMouseLeave={handleBack}>
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
