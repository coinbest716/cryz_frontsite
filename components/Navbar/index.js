import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './navbar.module.scss'
import Image from 'next/image'
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

const Navbar = () => {
  const router = useRouter()
  const [isOn, setIsOn] = useState(false)

  const handlClickResize = () => {
    setIsOn(!isOn)
  }

  const items = [
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
      title: 'Plans online',
    },
  ]

  return (
    <>
      <div className={isOn ? 'sticky top-0' : 'md:hidden sticky top-0'}>
        <div className={'absolute top-24 -right-4 cursor-pointer ' + styles.resize} onClick={handlClickResize}>
          <Image src={resizeIcon} alt="" width={33} height={26} />
        </div>
        <div className={'flex flex-col h-screen ' + styles.hideSection}>
          <div className="h-0 flex-1 flex flex-col pt-10 pb-4">
            <div className="flex justify-center items-center flex-shrink-0 px-4">
              <Link href={'/'} passHref>
                <div>
                  <p className={styles.logo}>CRYS</p>
                  <p className={'pt-1 ' + styles.logoSmall}>DYAZ & CO</p>
                </div>
              </Link>
            </div>
            <nav className="mt-10 flex-1 px-2 bg-white">
              {items.map((item, index) => (
                <Link href={item.href} key={index}>
                  {router.pathname.split('/')[2] === item.href.split('/')[2] && item.href !== '/' ? (
                    <a className="flex items-center px-8 py-3 my-2 rounded-md hover:font-bold hover:bg-gray-100 focus:bg-gray-100 transition ease-in-out duration-100 bg-gray-100">
                      <Image src={item.iconBlack} alt="" width={21} height={21} />
                    </a>
                  ) : (
                    <a className="flex items-center px-8 py-3 my-2 rounded-md hover:font-bold hover:bg-gray-100 focus:bg-gray-100 transition ease-in-out duration-100">
                      <Image src={item.icon} alt="" width={21} height={21} />
                    </a>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex p-4">
            <Link href={'/'}>
              <a className="flex items-center px-5 py-3 my-2 rounded-md hover:bg-gray-100 focus:bg-gray-100 transition ease-in-out duration-100">
                <Image src={logoutIcon} alt="" width={30} height={30} />
              </a>
            </Link>
          </div>
        </div>
      </div>
      {!isOn && (
        <div className="hidden md:flex md:flex-shrink-0 sticky top-0">
          <div className={'absolute top-24 -right-4 cursor-pointer ' + styles.resize} onClick={handlClickResize}>
            <Image src={resizeIcon} alt="" width={33} height={26} />
          </div>
          <div className="flex flex-col w-56 bg-white h-screen">
            <div className="h-0 flex-1 flex flex-col pt-10 pb-4">
              <div className="flex items-center flex-shrink-0 px-10">
                <Link href={'/'} passHref>
                  <div>
                    <p className={styles.logo}>CRYS</p>
                    <p className={'pt-1 ' + styles.logoSmall}>DYAZ & CO</p>
                  </div>
                </Link>
              </div>
              <nav className="mt-10 flex-1 px-2 bg-white">
                {items.map((item, index) => (
                  <Link href={item.href} key={index}>
                    {router.pathname.split('/')[2] === item.href.split('/')[2] && item.href !== '/' ? (
                      <a className="flex items-center px-8 py-3 my-2 rounded-md hover:font-bold hover:bg-gray-100 focus:bg-gray-100 transition ease-in-out duration-100 bg-gray-100">
                        <Image src={item.iconBlack} alt="" width={20} height={20} />
                        <p className={'pl-3 ' + styles.activeLabel}>{item.title}</p>
                      </a>
                    ) : (
                      <a className="flex items-center px-8 py-3 my-2 rounded-md hover:font-bold hover:bg-gray-100 focus:bg-gray-100 transition ease-in-out duration-100">
                        <Image src={item.icon} alt="" width={20} height={20} />
                        <p className={'pl-3 ' + styles.itemLabel}>{item.title}</p>
                      </a>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex p-4">
              <Link href={'/'}>
                <a className="flex items-center px-10 py-3 my-2 rounded-md hover:bg-gray-100 focus:bg-gray-100 transition ease-in-out duration-100">
                  <Image src={logoutIcon} alt="" width={30} height={30} />
                  <p className={'pl-3 ' + styles.logoutLabel}>Log Out</p>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
