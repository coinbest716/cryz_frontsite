import React, { useState } from 'react'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// images and icons
import CandyboxGrayIcon from 'assets/images/candybox-gray.svg'
import CloseGrayIcon from 'assets/images/close-gray.svg'

import nutritionIcon from 'public/images/nutrition.svg'
import nutritionBlackIcon from 'public/images/nutrition_black.svg'
import plansIcon from 'public/images/plans.svg'
import plansBlackIcon from 'public/images/plans_black.svg'
import academyIcon from 'public/images/academy.svg'
import academyBlackIcon from 'public/images/academy_black.svg'

import styles from 'components/Menu/HamburgMenu.module.scss'

const menuList = [
  {
    href: '/dashboard/nutrition',
    icon: nutritionIcon,
    iconBlack: nutritionBlackIcon,
    title: 'Nutrición',
  },
  {
    href: '/dashboard/plans',
    icon: plansIcon,
    iconBlack: plansBlackIcon,
    title: 'Planes online',
  },
  /*{
    href: '/dashboard/academy',
    icon: academyIcon,
    iconBlack: academyBlackIcon,
    title: 'Academy',
  },*/
  {
    href: '/dashboard/cursos',
    icon: academyIcon,
    iconBlack: academyBlackIcon,
    title: 'Cursos',
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

  const handleGotoLink = link => {
    setVisibility(false)
    router.push(link)
  }

  return (
    <div className="relative">
      <BurgerIcon visibilty={visibility} setVisibility={setVisibility} router={router} />

      <div className={visibility === true ? styles.menuOpen : styles.menuClose}>
        {menuList.map(menuItem => (
          <div
            key={menuItem.title}
            className={`my-3 ml-1 flex items-center ${router.asPath === menuItem.href && 'font-semibold'}`}
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
      </div>
    </div>
  )
}

export default Menu
