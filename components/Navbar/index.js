import { useState } from 'react'
import Link from 'next/link'
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

const Navbar = () => {
  const [isOn, setIsOn] = useState(false)

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
      <div className="md:hidden">
        <div className="fixed inset-0 flex z-40">
          <div className="fixed inset-0">
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>

          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-14 p-1">
              <button
                className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                aria-label="Close sidebar"
              >
                <svg className="h-6 w-6 text-gray-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <img className="h-8 w-auto" src="/images/off.svg" alt="Workflow" />
              </div>
              <nav className="mt-5 px-2">
                <Link href="/PropertyWatch/redevelopment">
                  <a className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150">
                    <svg
                      className="mr-4 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Dashboard
                  </a>
                </Link>

                <Link href="/PropertyWatch/bargains">
                  <a className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-gray-600 hover:bg-gray-700 focus:outline-none focus:text-gray-600 focus:bg-gray-700 transition ease-in-out duration-150">
                    <svg
                      className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    Bargain Hunting
                  </a>
                </Link>

                <a
                  href="#"
                  className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-gray-600 hover:bg-gray-700 focus:outline-none focus:text-gray-600 focus:bg-gray-700 transition ease-in-out duration-150"
                >
                  <svg
                    className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  Projects
                </a>
                <a
                  href="#"
                  className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-gray-600 hover:bg-gray-700 focus:outline-none focus:text-gray-600 focus:bg-gray-700 transition ease-in-out duration-150"
                >
                  <svg
                    className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Calendar
                </a>
                <a
                  href="#"
                  className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-gray-600 hover:bg-gray-700 focus:outline-none focus:text-gray-600 focus:bg-gray-700 transition ease-in-out duration-150"
                >
                  <svg
                    className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  Documents
                </a>
                <a
                  href="#"
                  className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-gray-600 hover:bg-gray-700 focus:outline-none focus:text-gray-600 focus:bg-gray-700 transition ease-in-out duration-150"
                >
                  <svg
                    className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Reports
                </a>
              </nav>
            </div>
            <div className="flex-shrink-0 flex bg-gray-700 p-4">
              <Link href="/account/user">
                <a className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base leading-6 font-medium text-gray-600">Tom Cook</p>
                      <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0 w-14"></div>
        </div>
      </div>

      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-56 bg-white h-screen">
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
                  <a className="flex items-center px-10 py-3 my-2 rounded-md hover:bg-gray-100 focus:bg-gray-100 transition ease-in-out duration-100">
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
    </>
  )
}

export default Navbar
