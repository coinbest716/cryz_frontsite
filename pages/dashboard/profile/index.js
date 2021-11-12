import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import ProfileInfo from 'components/components/dashboard/Profile'
import Personal from 'components/components/dashboard/Personal'
import Health from 'components/components/dashboard/Health'
import Graphic from 'components/components/dashboard/Graphic'

// styles
import styles from './profile.module.scss'

const Profile = () => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  React.useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const router = useRouter()
  const [activeTab, setActiveTab] = useState({ personal: true, health: false, graphic: false })
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    surname: '',
    email: '',
    country: '',
    address: '',
    town: '',
    data: '',
    password: '',
    meet: '',
    telephone: '',
    emergencyPhone: '',
    code: '',
    gender: '',
  })
  const [healthInfo, setHealthInfo] = useState({
    fatPercentage: '',
    visceralFat: '',
    boneMass: '',
    bodyMass: '',
    waterPercentage: '',
    muscleMass: '',
    metabolicExpense: '',
    metabolicAge: '',
    weight: '',
    height: '',
    waist: '',
    arm: '',
    hips: '',
    thigh: '',
    twin: '',
  })

  // handlers
  useEffect(() => {
    const currentState = router.asPath.split('#')
    if (currentState[1] === 'health') {
      setActiveTab({ personal: false, health: true, graphic: false })
    } else {
      router.push('/dashboard/profile#personal', undefined, { shallow: true })
    }
  }, [router])

  const handleClickTab = tabType => {
    setActiveTab({ [tabType]: true })
    router.push(`/dashboard/profile#${tabType}`, undefined, { shallow: true })
  }

  const handleSavePersonal = () => {
    console.log('handleSavePersonal')
  }

  const handleDiscardPersonal = () => {
    console.log('handleDiscardPersonal')
  }

  const handleChangePersonal = (event, key) => {
    setPersonalInfo({ ...personalInfo, [key]: event.target.value })
  }

  const handleDeleteAccount = () => {
    console.log('handleDeleteAccount')
  }

  const handleSaveMeasure = () => {
    console.log('handleSaveMeasure')
  }

  const handleDiscardMeasure = () => {
    console.log('handleDiscardMeasure')
  }

  const handleClickMeasureGraphic = tabType => {
    console.log('handleClickMeasureGraphic')
    setActiveTab({ [tabType]: true })
  }

  const handleChangeHealth = (event, key) => {
    setHealthInfo({ ...healthInfo, [key]: event.target.value })
  }

  return (
    <div className={'pt-10 pb-24 px-24 ' + styles.container}>
      <div className={'flex justify-between'}>
        <div>
          <div className={styles.highBoldLabel}>Perfil</div>
          <div className={'pt-2 ' + styles.mediumLabel}>80% Perfil Completado</div>
        </div>
        <div className={'flex justify-end items-center'}>
          <div className={'pr-4'}>
            <NotificationButton />
          </div>
          <ProfileInfo />
        </div>
      </div>
      <div className={'my-8 ' + styles.divider} />
      <div className={'flex'}>
        <div
          className={'mr-10 ' + (activeTab.personal ? styles.activeTab : styles.deactiveTab)}
          onClick={() => handleClickTab('personal')}
        >
          Personales
        </div>
        <div
          className={activeTab.health || activeTab.graphic ? styles.activeTab : styles.deactiveTab}
          onClick={() => handleClickTab('health')}
        >
          Antropométricos
        </div>
      </div>
      <div className={'pt-7'}>
        {activeTab.personal && (
          <Personal
            handleSave={handleSavePersonal}
            handleDiscard={handleDiscardPersonal}
            handleChangePersonal={handleChangePersonal}
            handleDeleteAccount={handleDeleteAccount}
          />
        )}
        {activeTab.health && (
          <Health
            handleSave={handleSaveMeasure}
            handleDiscard={handleDiscardMeasure}
            handleClickTab={handleClickTab}
            handleChangeHealth={handleChangeHealth}
          />
        )}
        {activeTab.graphic && <Graphic handleClickTab={handleClickTab} />}
      </div>
    </div>
  )
}
export default Profile

Profile.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
