import React, { createRef, useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './confirm.module.scss'

// images
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

  // variables
  const fileRef = createRef()

  // handlers
  const handleAttachFile = event => {}

  const onClickAttachFile = () => {
    fileRef.current.click()
  }

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container + ' my-20'}>
          <div className={'w-full flex justify-center ' + styles.title}>
            ¡Gracias por querer formar parte del equipo de Crys Dyaz!
          </div>
          <div className={'w-full flex justify-center'}>
            <Image src={ConfirmImage} alt="" width={270} height={220} />
          </div>
          <div className="w-full text-cetner">
            <div className={'w-full ' + styles.textOne}>¡Tu solicitud ha sido recibida con éxito!</div>
            <div className={'w-full ' + styles.textTwo}>Si nos encaja tu perfil, nos pondremos en contacto contigo</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm

Confirm.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
