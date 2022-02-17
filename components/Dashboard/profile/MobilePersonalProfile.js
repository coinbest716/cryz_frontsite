import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'
import Image from 'next/image'
import ArrowLeftWhite from 'public/images/arrow-left-white.svg'

// custom components
import ProfileCommonText from 'components/Dashboard/profile/ProfileCommonText'

import moment from 'moment'

// styles
import styles from './MobilePersonalProfile.module.scss'

const MobilePersonalProfile = props => {
  const { handleSavePersonal, personalInfo, shippingInfo, handleChangePersonal, handleChangeShipping } = props
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

  const genderList = ['WOMAN', 'MAN']
  const meetList = ['INSTAGRAM', 'FACEBOOK', 'PRENSA']

  const handleClickBack = () => {
    router.push('/dashboard/profile#main', undefined, { shallow: true })
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
          <div className={styles.backString + ' ml-2'}>Perfil</div>
        </div>
        <div className="flex justify-end" onClick={handleSavePersonal}>
          <div className={styles.saveButton}>Aceptar cambios</div>
        </div>
        <div className={styles.title}>Datos</div>
      </div>
      <div className={'flex justify-center ' + styles.container}>
        <div className="p-5 mb-32 mt-32">
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangePersonal(e, 'name')}
              label={'Nombre'}
              placeholder={''}
              type={'text'}
              value={personalInfo.name}
            />
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangePersonal(e, 'surname')}
              label={'Apellidos'}
              placeholder={''}
              type={'text'}
              value={personalInfo.surname}
            />
          </div>

          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangePersonal(e, 'birthday')}
              label={'Fecha nacimiento'}
              placeholder={''}
              type={'date'}
              value={moment(personalInfo.birthday).format('YYYY-MM-DD')}
            />
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangePersonal(e, 'meet')}
              label={'Cómo nos conoció…'}
              placeholder={''}
              type={'select'}
              list={meetList}
              value={personalInfo.meet}
            />
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangePersonal(e, 'code')}
              label={'DNI'}
              placeholder={''}
              type={'text'}
              value={personalInfo.code}
            />
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangePersonal(e, 'email')}
              label={'Email'}
              placeholder={''}
              type={'email'}
              value={personalInfo.email}
              disabled={true}
            />
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangePersonal(e, 'telephone')}
              label={'Teléfono'}
              placeholder={''}
              type={'tel'}
              value={personalInfo.telephone}
            />
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangePersonal(e, 'emergencyPhone')}
              label={'Teléfono emergencia'}
              placeholder={''}
              type={'tel'}
              value={personalInfo.emergencyPhone}
            />
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              label={'Sexo'}
              list={genderList}
              handleChange={e => handleChangePersonal(e, 'gender')}
              type={'select'}
              value={personalInfo.gender}
            />
          </div>
          <div className="flex justify-between items-center my-9 w-full">
            <div className={styles.shippingData}>DATOS DE ENVIO</div>
            <div className={styles.divider + ' my-3'}></div>
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeShipping(e, 'name')}
              label={'Nombre'}
              placeholder={''}
              type={'text'}
              value={shippingInfo.name}
            />
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeShipping(e, 'aliasAddress')}
              label={'Alias de la dirección ( ej. casa, trabajo…)'}
              placeholder={''}
              type={'text'}
              value={shippingInfo.aliasAddress}
            />
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeShipping(e, 'address')}
              label={'Dirección'}
              placeholder={''}
              type={'text'}
              value={shippingInfo.address}
            />
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeShipping(e, 'town')}
              label={'Población'}
              placeholder={''}
              type={'text'}
              value={shippingInfo.town}
            />
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeShipping(e, 'cp')}
              label={'CP'}
              placeholder={''}
              type={'text'}
              value={shippingInfo.cp}
            />
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeShipping(e, 'province')}
              label={'Provincia'}
              placeholder={''}
              type={'text'}
              value={shippingInfo.province}
            />
          </div>
          <div className={'pt-1 py-3'}>
            <ProfileCommonText
              handleChange={e => handleChangeShipping(e, 'country')}
              label={'País'}
              placeholder={''}
              type={'text'}
              value={shippingInfo.country}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default MobilePersonalProfile
