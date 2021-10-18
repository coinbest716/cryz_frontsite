import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './navbar.module.scss'
import Image from 'next/image'
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
import resizeIcon from 'public/images/resize.svg'

const Navbar = () => {
  const router = useRouter()
  const [isOn, setIsOn] = useState(false)

  const handlClickResize = () => {
    setIsOn(!isOn)
  }

  const items = [
    {
      href: '/home',
      icon: homeIcon,
      title: 'Home',
    },
    {
      href: '/dashboard',
      icon: dashboardIcon,
      title: 'Dashboard',
    },
    {
      href: '/shopping',
      icon: shoppingIcon,
      title: 'Compras',
    },
    {
      href: '/message',
      icon: messageIcon,
      title: 'Mensajes',
    },
    {
      href: '/profile',
      icon: profileIcon,
      title: 'Perfil',
    },
    {
      href: '/billing',
      icon: billingIcon,
      title: 'Facturación',
    },
    {
      href: '/calendar',
      icon: calendarIcon,
      title: 'Calendario',
    },
    {
      href: '/nutrition',
      icon: nutritionIcon,
      title: 'Nutrición',
    },
    {
      href: '/plans',
      icon: plansIcon,
      title: 'Planes online',
    },
  ]

  return (
    <>
      <div className={isOn ? '' : 'md:hidden'}>
        <div className={'flex flex-col h-screen ' + styles.hideSection}>
          {isOn && (
            <div
              className={'absolute top-24 cursor-pointer ' + styles.resize}
              style={{ left: '83px' }}
              onClick={handlClickResize}
            >
              <Image src={resizeIcon} alt="" width={33} height={26} />
            </div>
          )}
          <div className="flex-1 h-0 pt-10 pb-4 overflow-y-auto">
            <div className="flex justify-center items-center flex-shrink-0 px-4">
              <Link href={'/home'} passHref>
                <div>
                  <p className={styles.logo}>CRYS</p>
                  <p className={'pt-1 ' + styles.logoSmall}>DYAZ & CO</p>
                </div>
              </Link>
            </div>
            <nav className="mt-10 flex-1 px-2">
              {items.map((item, index) => (
                <Link href={item.href} key={index}>
                  <a className="flex items-center px-8 py-3 my-2 rounded-md hover:bg-gray-100 focus:bg-gray-100 transition ease-in-out duration-100">
                    <Image src={item.icon} alt="" width={20} height={20} />
                  </a>
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
        {/* </div> */}
      </div>
      {!isOn && (
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-56 bg-white h-screen">
            <div className={'absolute top-24 left-52 cursor-pointer ' + styles.resize} onClick={handlClickResize}>
              <Image src={resizeIcon} alt="" width={33} height={26} />
            </div>
            <div className="h-0 flex-1 flex flex-col pt-10 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-12">
                <Link href={'/home'} passHref>
                  <div>
                    <p className={styles.logo}>CRYS</p>
                    <p className={'pt-1 ' + styles.logoSmall}>DYAZ & CO</p>
                  </div>
                </Link>
              </div>
              <nav className="mt-10 flex-1 px-2 bg-white">
                {items.map((item, index) => (
                  <Link href={item.href} key={index}>
                    <a
                      className={
                        'flex items-center px-10 py-3 my-2 rounded-md hover:font-bold hover:bg-gray-100 focus:bg-gray-100 transition ease-in-out duration-100' +
                        `${router.pathname === item.href ? ' bg-gray-100' : ' '}`
                      }
                    >
                      <Image src={item.icon} alt="" width={20} height={20} />
                      <p className={'pl-3 ' + styles.itemLabel}>{item.title}</p>
                    </a>
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
