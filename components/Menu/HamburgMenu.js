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

// images and icons
import CandyboxGrayIcon from 'assets/images/candybox-gray.svg'
import CloseGrayIcon from 'assets/images/close-gray.svg'

import resizeIcon from 'public/images/resize.svg'
import homeIcon from 'public/images/home.svg'
import dashboardIcon from 'public/images/dashboard.svg'
import shoppingIcon from 'public/images/shopping.svg'
import messageIcon from 'public/images/message.svg'
import profileIcon from 'public/images/profile.svg'
import billingIcon from 'public/images/billing.svg'
import calendarIcon from 'public/images/calendar.svg'
import nutritionIcon from 'public/images/nutrition.svg'
import plansIcon from 'public/images/plans.svg'
import logoutIcon from 'public/images/off.svg'
import homeBlackIcon from 'public/images/home_black.svg'
import dashboardBlackIcon from 'public/images/dashboard_black.svg'
import shoppingBlackIcon from 'public/images/shopping_black.svg'
import messageBlackIcon from 'public/images/message_black.svg'
import profileBlackIcon from 'public/images/profile_black.svg'
import billingBlackIcon from 'public/images/billing_black.svg'
import calendarBlackIcon from 'public/images/calendar_black.svg'
import nutritionBlackIcon from 'public/images/nutrition_black.svg'
import plansBlackIcon from 'public/images/plans_black.svg'

// json data
import SocialURLData from 'assets/data/SocialURLData'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'components/Menu/HamburgMenu.module.scss'

const menuList = [
  {
    href: '/',
    icon: homeIcon,
    iconBlack: homeBlackIcon,
    title: 'Home',
  },
  {
    href: '/dashboard',
    icon: dashboardIcon,
    iconBlack: dashboardBlackIcon,
    title: 'Dashboard',
  },
  {
    href: '/dashboard/shopping',
    icon: shoppingIcon,
    iconBlack: shoppingBlackIcon,
    title: 'Compras',
  },
  {
    href: '/dashboard/message',
    icon: messageIcon,
    iconBlack: messageBlackIcon,
    title: 'Mensajes',
  },
  {
    href: '/dashboard/profile',
    icon: profileIcon,
    iconBlack: profileBlackIcon,
    title: 'Perfil',
  },
  {
    href: '/dashboard/billing',
    icon: billingIcon,
    iconBlack: billingBlackIcon,
    title: 'Facturación',
  },
  {
    href: '/dashboard/calendar',
    icon: calendarIcon,
    iconBlack: calendarBlackIcon,
    title: 'Calendario',
  },
  // {
  //   href: '/dashboard/nutrition',
  //   icon: nutritionIcon,
  //   iconBlack: nutritionBlackIcon,
  //   title: 'Nutrición',
  // },
  {
    href: '/dashboard/planes',
    icon: plansIcon,
    iconBlack: plansBlackIcon,
    title: 'Planes online',
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

      <div className={visibility === true ? styles.menuOpen : styles.menuClose}>
        {menuList.map(menuItem => (
          <div
            key={menuItem.title}
            className={`my-3 ml-1 flex items-center ${router.asPath === menuItem.href && 'font-black'}`}
            onClick={() => handleGotoLink(menuItem.href)}
          >
            {router.pathname.split('/')[2] === menuItem.href.split('/')[2] && menuItem.href !== '/' ? (
              <a className={'flex items-center m-2'}>
                <Image src={menuItem.iconBlack} alt="" width={21} height={21} />
              </a>
            ) : (
              <a className={'flex items-center m-2'}>
                <Image src={menuItem.icon} alt="" width={21} height={21} />
              </a>
            )}
            {menuItem.title}
          </div>
        ))}
        <div className="my-3 flex items-center pt-2" onClick={handleClickLogout}>
          <a className={'flex items-center m-2 mr-0'}>
            <Image src={logoutIcon} alt={''} width={32} height={32} />
          </a>
          <span>Logout</span>
        </div>
      </div>
    </div>
  )
}

export default Menu
