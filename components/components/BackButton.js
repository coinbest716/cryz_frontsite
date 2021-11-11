import React from 'react'
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import router from 'next/router'

// images
import backGrayIcon from 'public/images/arrow-left-gray.svg'

// styles
import styles from 'components/components/BackButton.module.scss'

const BackButton = () => {
  // loading part
  const dispatch = useDispatch()

  const handleGotoBack = () => {
    dispatch({ type: 'set', isLoading: true })
    router.back()
  }

  return (
    <button
      className={'flex justify-between items-center hover:bg-gray-300 px-2 py-1 z-10'}
      onClick={() => handleGotoBack()}
    >
      <Image src={backGrayIcon} alt="" width={20} height={15} />
      <p className={styles.back + ' z-10'}>Volver</p>
    </button>
  )
}

export default BackButton
