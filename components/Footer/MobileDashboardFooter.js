import React from 'react'

// next components
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// images
import homeIcon from 'public/images/home.svg'
import calendarIcon from 'public/images/calendar.svg'
import dashboardIcon from 'public/images/dashboard.svg'
import messageIcon from 'public/images/message.svg'
import profileIcon from 'public/images/profile.svg'
import homeBlackIcon from 'public/images/home_black.svg'
import calendarBlackIcon from 'public/images/calendar_black.svg'
import dashboardBlackIcon from 'public/images/dashboard_black.svg'
import messageBlackIcon from 'public/images/message_black.svg'
import profileBlackIcon from 'public/images/profile_black.svg'

// json data
import SocialURLData from 'assets/data/SocialURLData'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'components/Footer/MobileDashboardFooter.module.scss'

const Footer = props => {
  // variables
  const { viewport } = props
  const router = useRouter()

  return (
    <div className={styles.footerArea}>
      <div className={'w-full flex justify-around items-center ' + styles.footerIconArea}>
        <button onClick={() => router.push('/')}>
          <Image src={homeIcon} alt="" width={18} height={20} />
        </button>
        <button onClick={() => router.push('/dashboard/calendar')}>
          {router.pathname.split('/')[2] !== undefined && router.pathname.split('/')[2] === 'calendar' ? (
            <a className={'flex items-center m-2'}>
              <Image src={calendarBlackIcon} alt="" width={18} height={20} />
            </a>
          ) : (
            <a className={'flex items-center m-2'}>
              <Image src={calendarIcon} alt="" width={18} height={20} />
            </a>
          )}
        </button>
        <button onClick={() => router.push('/dashboard')}>
          {router.pathname.split('/')[1] === 'dashboard' && router.pathname.split('/')[2] === undefined ? (
            <a className={'flex items-center m-2'}>
              <Image src={dashboardBlackIcon} alt="" width={18} height={20} />
            </a>
          ) : (
            <a className={'flex items-center m-2'}>
              <Image src={dashboardIcon} alt="" width={18} height={20} />
            </a>
          )}
        </button>
        <button onClick={() => router.push('/dashboard/message')}>
          {router.pathname.split('/')[2] !== undefined && router.pathname.split('/')[2] === 'message' ? (
            <a className={'flex items-center m-2'}>
              <Image src={messageBlackIcon} alt="" width={18} height={20} />
            </a>
          ) : (
            <a className={'flex items-center m-2'}>
              <Image src={messageIcon} alt="" width={18} height={20} />
            </a>
          )}
        </button>
        <button onClick={() => router.push('/dashboard/profile')}>
          {router.pathname.split('/')[2] !== undefined && router.pathname.split('/')[2].split('#')[0] === 'profile' ? (
            <a className={'flex items-center m-2'}>
              <Image src={profileBlackIcon} alt="" width={18} height={20} />
            </a>
          ) : (
            <a className={'flex items-center m-2'}>
              <Image src={profileIcon} alt="" width={18} height={20} />
            </a>
          )}
        </button>
      </div>
    </div>
  )
}

export default Footer
