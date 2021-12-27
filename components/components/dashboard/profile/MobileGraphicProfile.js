import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'
import Image from 'next/image'
import ArrowLeftWhite from 'public/images/arrow-left-white.svg'
import measureEdit from 'public/images/measure-edit.svg'

// styles
import styles from './MobileGraphicProfile.module.scss'

const MobileGraphicProfile = () => {
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
    router.push('/dashboard/profile#main', undefined, { shallow: true })
  }

  const handleClickEdit = () => {
    router.push('/dashboard/profile#health', undefined, { shallow: true })
  }

  return (
    <>
      <div className={styles.header + ' p-4'}>
        <div
          className="flex justify-start items-center w-fit cursor-pointer"
          style={{ width: 'fit-content' }}
          onClick={handleClickBack}
        >
          <Image src={ArrowLeftWhite} width={18} height={15} alt="" />
          <div className={styles.backString + ' ml-2'}>Perfil</div>
        </div>
        <div className="flex justify-end">
          <div className={styles.saveButton} onClick={handleClickEdit}>
            <Image src={measureEdit} alt="" width={25} height={25} />
          </div>
        </div>
        <div className={styles.title}>Datos antropométricos</div>
      </div>
    </>
  )
}
export default MobileGraphicProfile
