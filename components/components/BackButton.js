import React, { useEffect, useState } from 'react'

// third party components
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import router from 'next/router'

// images
import backGrayIcon from 'assets/images/arrow-left-gray.svg'
import backBlackIcon from 'assets/images/arrow-left-black.svg'

// styles
import styles from 'components/components/BackButton.module.scss'

const BackButton = () => {
  // loading part
  const dispatch = useDispatch()

  const handleGotoBack = () => {
    dispatch({ type: 'set', isLoading: true })
    router.back()
  }

  // variables
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

  return (
    <button
      className={'flex justify-between items-center hover:bg-gray-300 pr-2 py-1 z-10'}
      onClick={() => handleGotoBack()}
    >
      <Image src={viewport === 'mobile' ? backBlackIcon : backGrayIcon} alt="" width={20} height={15} />
      <p className={styles.back + ' z-10'}>{viewport === 'mobile' ? '' : 'Volver'}</p>
    </button>
  )
}

export default BackButton
