import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import router from 'next/router'

// styles
import styles from 'pages/confirm/Confirm.module.scss'

// images
import LoginImage from 'assets/images/login.png'
import CloseIcon from 'assets/images/close.svg'
import ConfirmImage from 'assets/images/confirm.png'

const Confirm = () => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  return (
    <div className={'w-full h-screen flex grid grid-cols-12'}>
      <div className={'w-full col-span-6 flex flex-wrap justify-center items-center ' + styles.whiteArea}>
        <div className={styles.whiteAreaContent}>
          <div styles={'w-full'}>
            <Image src={LoginImage} alt="" width={484} height={416} />
          </div>
          <div className={'w-full text-center ' + styles.title}>El cambio comienza aqui</div>
          <div className={'w-full text-center ' + styles.text}>
            Siéntete mejor y con mayor calidad de vida desde ahora mismo.
          </div>
        </div>
      </div>
      <div className={'w-full col-span-6 flex flex-wrap justify-center items-center relative ' + styles.grayArea}>
        <div className={styles.closeButton}>
          <button
            className={'duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center'}
            onClick={() => router.push('/')}
          >
            <Image src={CloseIcon} alt="" width={19} height={20} />
          </button>
        </div>
        <div className={styles.grayAreaContent}>
          <div className={'w-full flex justify-center'}>
            <Image src={ConfirmImage} alt="" width={167} height={136} />
          </div>
          <div className={'w-full text-center ' + styles.confirmTitle}>Tu cuenta ha sido creada</div>
          <div className={'w-full text-center mt-9 ' + styles.confirmText}>
            Proin in mi maximus, tempus libero vitae, hendrerit nisl. Curabitur posuere, augue a feugiat convallis.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm
