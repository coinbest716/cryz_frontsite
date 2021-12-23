import React, { useState, useEffect } from 'react'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// third party components
import client from 'utils/apolloclient'
import { Auth } from 'aws-amplify'

// redux
import { useDispatch } from 'react-redux'

// custom components
import SocialButtonGroup from 'components/SocialButtonGroup'

// images
import CandyboxIcon from 'assets/images/candybox.svg'
import CloseIcon from 'assets/images/close.svg'

// json data
import SocialURLData from 'assets/data/SocialURLData'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'components/Menu/Menu.module.scss'

const menuList = [
  {
    num: '01',
    label: 'Home',
    nav: '/',
  },
  {
    num: '02',
    label: 'Equipo',
    nav: '/#team',
  },
  {
    num: '03',
    label: 'Salud Fem',
    nav: '/female-health',
  },
  {
    num: '04',
    label: 'Servicios',
    nav: '/services',
  },
  {
    num: '05',
    label: 'Contacto',
    nav: '/contact',
  },
  // {
  //   num: '05',
  //   label: 'Tienda',
  //   nav: '/tienda',
  // },
  {
    num: '06',
    label: 'Classland',
    nav: '/classland',
  },
  {
    num: '07',
    label: 'News',
    nav: '/news',
  },
  {
    num: '08',
    label: 'Academy',
    nav: '/academy',
  },
]

const BurgerIcon = ({ visibilty, setVisibility, router }) => {
  return (
    <div className={`${styles.burgerIcon}`} onClick={() => setVisibility(prev => !prev)}>
      {visibilty === false || visibilty === undefined ? (
        <Image src={CandyboxIcon} alt={''} width={34} height={31} />
      ) : (
        <Image src={CloseIcon} alt={''} width={34} height={31} />
      )}
    </div>
  )
}

const Menu = () => {
  // variables
  const [visibility, setVisibility] = useState()
  const router = useRouter()

  const dispatch = useDispatch()

  const academy = '/images/menu/academy.jpg'
  const news = '/images/menu/news.jpg'
  const team = '/images/menu/team.png'
  const off = '/images/off-white.svg'

  const [activeImage, setActiveImage] = useState('')
  const [activeHover, setActiveHover] = useState(false)
  const [viewport, setViewport] = useState('desktop') // mobile, ipad, desktop

  // handlers
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setViewport('desktop')
    } else if (window.innerWidth === 1024) {
      setViewport('ipad')
    } else {
      setViewport('mobile')
    }
  }, [])

  useEffect(() => {
    const resizeFunction = () => {
      if (window.innerWidth > 1024) {
        setViewport('desktop')
      } else if (window.innerWidth === 1024) {
        setViewport('ipad')
      } else {
        setViewport('mobile')
      }
    }
    window.addEventListener('resize', resizeFunction)
  }, [])

  const handleGotoLink = link => {
    setVisibility(false)
    router.push(link)
  }

  const handleClickLogout = async () => {
    dispatch({ type: 'set', isLoading: true })
    await client.resetStore()
    await client.clearStore()
    await Auth.signOut()
    localStorage.clear()
    router.push('/')
  }

  const handleMouseMover = event => {
    if (activeImage === '') return
    let x = event.clientX - 200
    let y = event.clientY - 200
    let sharp = document.getElementById('sharp')
    sharp.style.left = x + 'px'
    sharp.style.top = y + 'px'
  }

  const handleMouseOver = id => {
    setActiveHover(true)
    switch (id) {
      case 'academyMenu':
        setActiveImage(academy)
        break
      case 'newsMenu':
        setActiveImage(news)
        break
      case 'teamMenu':
        setActiveImage(team)
        break
    }
  }

  const handleMouseLeave = () => {
    setActiveHover(false)
    setActiveImage('')
  }

  return (
    <>
      <BurgerIcon visibilty={visibility} setVisibility={setVisibility} router={router} />

      <div
        className={
          visibility === true
            ? viewport === 'mobile'
              ? styles.menuMobileOpen
              : styles.menuOpen
            : visibility === false
            ? styles.menuClose
            : styles.menu
        }
      >
        {viewport === 'mobile' ? (
          <div className={styles.menuMobileContainer}>
            {menuList.map(menuItem => (
              <div
                key={menuItem.label}
                className={`mb-6 ml-1 text-white text-lg flex items-center ${
                  router.asPath === menuItem.nav && 'font-black'
                }`}
                onClick={() => handleGotoLink(menuItem.nav)}
              >
                <span className={styles.menuNumber}>{menuItem.num}</span>
                {menuItem.label}
              </div>
            ))}
            <div className="flex items-center text-white pt-4" onClick={handleClickLogout}>
              <div style={{ width: '32px', height: '32px' }}>
                <Image src={off} alt={''} width={32} height={32} />
              </div>
              <span>Logout</span>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.circleImageCover} id="sharp">
              {activeImage !== '' ? (
                <div className={activeHover ? styles.animationImage : styles.circleImage}>
                  <Image
                    src={activeImage}
                    alt={''}
                    width={400}
                    height={400}
                    objectFit="cover"
                    objectPosition="center"
                    layout="fill"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div
              className={globalStyles.container + ' mx-auto h-screen flex flex-wrap content-between'}
              onMouseMove={handleMouseMover}
            >
              <div className={'h-48 xl:h-96 w-full mt-32 sm:mt-48 ' + styles.menuItems}>
                <div className={'grid grid-cols-2 gap-x-9 flex items-center h-full'}>
                  <div
                    className={'relative cursor-pointer h-full'}
                    onClick={() => handleGotoLink('/academy')}
                    onMouseOver={() => handleMouseOver('academyMenu')}
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    <div className={'absolute inset-y-1/4 w-full flex justify-center'}>
                      <a id="academyMenu">
                        <div className={`${styles.number} invisible sm:visible mx-1`}>01</div>
                        Academy
                      </a>
                    </div>
                  </div>
                  <div
                    className={'relative cursor-pointer h-full'}
                    onClick={() => handleGotoLink('/news')}
                    onMouseOver={() => handleMouseOver('newsMenu')}
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    <div className={'absolute inset-y-1/4 w-full flex justify-center'}>
                      <a id="newsMenu">
                        News
                        <div className={`${styles.number} invisible sm:visible mx-1`}>02</div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className={'block xl:hidden grid grid-cols-1 gap-x-9 flex justify-center h-full'}>
                  <div
                    className={'relative cursor-pointer h-full'}
                    onClick={() => handleGotoLink('/#team')}
                    onMouseOver={() => handleMouseOver('teamMenu')}
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    <div className={'absolute inset-y-1/4 w-full flex justify-center'}>
                      <a id="teamMenu">
                        Equipo
                        <div className={`${styles.number} invisible sm:visible mx-1`}>03</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.socials} w-full flex flex-wrap mr-4`}>
                <div className={'w-full flex justify-end'}>
                  <SocialButtonGroup color="white" socialURL={SocialURLData[0]} />
                </div>
                <div className={styles.whiteLine}></div>
                <div className={`w-full flex justify-end mb-10 ${styles.copyright}`}>
                  CrysDyaz&Co © Todos los derechos reservados
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Menu
