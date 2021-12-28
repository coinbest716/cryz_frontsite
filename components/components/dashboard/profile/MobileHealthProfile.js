import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

import ProfileHealthItem from './ProfileHealthItem'
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
      <div className={'p-5 mb-28 ' + styles.container}>
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/2 mr-2">
            <ProfileHealthItem
              value={healthInfo.fatPercentage}
              handleChange={e => handleChangeHealth(e, 'fatPercentage')}
              label={'Porcentaje grasa'}
            />
          </div>
          <div className="w-1/2 ml-2">
            <ProfileHealthItem
              value={healthInfo.visceralFat}
              handleChange={e => handleChangeHealth(e, 'visceralFat')}
              label={'Grasa visceral'}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/2 mr-2">
            <ProfileHealthItem
              value={healthInfo.boneMass}
              handleChange={e => handleChangeHealth(e, 'boneMass')}
              label={'Ìndice Masa Òsea'}
            />
          </div>
          <div className="w-1/2 ml-2">
            <ProfileHealthItem
              value={healthInfo.bodyMass}
              handleChange={e => handleChangeHealth(e, 'bodyMass')}
              label={'Ìndice Masa Corporal'}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/2 mr-2">
            <ProfileHealthItem
              value={healthInfo.waterPercentage}
              handleChange={e => handleChangeHealth(e, 'waterPercentage')}
              label={'Porcentaje agua'}
            />
          </div>
          <div className="w-1/2 ml-2">
            <ProfileHealthItem
              value={healthInfo.muscleMass}
              handleChange={e => handleChangeHealth(e, 'muscleMass')}
              label={'Índice Masa Muscular'}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/2 mr-2">
            <ProfileHealthItem
              value={healthInfo.metabolicExpense}
              handleChange={e => handleChangeHealth(e, 'metabolicExpense')}
              label={'Gasto Metabólico'}
            />
          </div>
          <div className="w-1/2 ml-2">
            <ProfileHealthItem
              value={healthInfo.metabolicAge}
              handleChange={e => handleChangeHealth(e, 'metabolicAge')}
              label={'Edad Metabólica'}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/2 mr-2">
            <ProfileHealthItem
              value={healthInfo.weight}
              handleChange={e => handleChangeHealth(e, 'weight')}
              label={'Peso(kg)'}
            />
          </div>
          <div className="w-1/2 ml-2">
            <ProfileHealthItem
              value={healthInfo.height}
              handleChange={e => handleChangeHealth(e, 'height')}
              label={'Altura'}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/2 mr-2">
            <ProfileHealthItem
              value={healthInfo.waist}
              handleChange={e => handleChangeHealth(e, 'waist')}
              label={'Cintura'}
            />
          </div>
          <div className="w-1/2 ml-2">
            <ProfileHealthItem
              value={healthInfo.arm}
              handleChange={e => handleChangeHealth(e, 'arm')}
              label={'Brazo'}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/2 mr-2">
            <ProfileHealthItem
              value={healthInfo.hips}
              handleChange={e => handleChangeHealth(e, 'hips')}
              label={'Cadera'}
            />
          </div>
          <div className="w-1/2 ml-2">
            <ProfileHealthItem
              value={healthInfo.thigh}
              handleChange={e => handleChangeHealth(e, 'thigh')}
              label={'Muslo'}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/2 mr-2">
            <ProfileHealthItem
              value={healthInfo.twin}
              handleChange={e => handleChangeHealth(e, 'twin')}
              label={'Gemelo'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default MobileHealthProfile
