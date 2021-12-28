import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'
import Image from 'next/image'
import ArrowLeftWhite from 'public/images/arrow-left-white.svg'

// styles
import styles from './MobileHealthProfile.module.scss'

const MobileHealthProfile = props => {
  const { healthInfo, handleSaveMeasure, handleChangeHealth } = props
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
  const router = useRouter()

  const handleClickBack = () => {
    router.push('/dashboard/profile#graphic', undefined, { shallow: true })
  }

  return (
    <div>
      <div className={styles.header + ' p-4'}>
        <div
          className="flex justify-start items-center w-fit cursor-pointer"
          style={{ width: 'fit-content' }}
          onClick={handleClickBack}
        >
          <Image src={ArrowLeftWhite} width={18} height={15} alt="" />
          <div className={styles.backString + ' ml-2'}>Gráficos</div>
        </div>
        <div className="flex justify-end" onClick={handleSaveMeasure}>
          <div className={styles.saveButton}>Aceptar cambios</div>
        </div>
        <div className={styles.title}>Editar información</div>
      </div>
    </div>
  )
}
export default MobileHealthProfile
