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
import CandyboxGrayIcon from 'assets/images/candybox-gray.svg'
import CloseGrayIcon from 'assets/images/close-gray.svg'

// json data
import SocialURLData from 'assets/data/SocialURLData'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'components/Menu/HamburgMenu.module.scss'

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
        <Image src={CandyboxGrayIcon} alt={''} width={25} height={23} />
      ) : (
        <Image src={CloseGrayIcon} alt={''} width={25} height={23} />
      )}
    </div>
  )
}

const Menu = () => {
  // variables
  const [visibility, setVisibility] = useState()
  const router = useRouter()

  const dispatch = useDispatch()

  const off = '/images/off-white.svg'

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
  return (
    <div className="relative">
      <BurgerIcon visibilty={visibility} setVisibility={setVisibility} router={router} />

      <div className={visibility === true ? styles.menuOpen : visibility === false ? styles.menuClose : styles.menu}>
        <div className={styles.menuContainer}>
          {menuList.map(menuItem => (
            <div
              key={menuItem.label}
              className={`mb-6 ml-1 text-lg flex items-center ${router.asPath === menuItem.nav && 'font-black'}`}
              onClick={() => handleGotoLink(menuItem.nav)}
            >
              <span className={styles.menuNumber}>{menuItem.num}</span>
              {menuItem.label}
            </div>
          ))}
          <div className="flex items-center pt-4" onClick={handleClickLogout}>
            <div style={{ width: '32px', height: '32px' }}>
              <Image src={off} alt={''} width={32} height={32} />
            </div>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
