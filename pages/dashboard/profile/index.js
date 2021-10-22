import React, { useState } from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './profile.module.scss'
import Image from 'next/image'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import ProfileInfo from 'components/components/dashboard/Profile'
import Personal from 'components/components/dashboard/Personal'
import Health from 'components/components/dashboard/Health'

const Profile = () => {
  const [activeTab, setActiveTab] = useState({ personal: true, health: false })
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

  const handleClickTab = tabType => {
    setActiveTab({ [tabType]: true })
  }
  const handleSavePersonal = () => {}
  const handleDiscardPersonal = () => {}
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

  return (
    <div className={'pt-10 pb-24 px-24 ' + styles.container}>
      <div className="flex justify-between">
        <div>
          <div className={styles.highBoldLabel}>Perfil</div>
          <div className={'pt-2 ' + styles.mediumLabel}>80% Perfil Completado</div>
        </div>
        <div className="flex justify-end items-center">
          <div className="pr-4">
            <NotificationButton />
          </div>
          <ProfileInfo />
        </div>
      </div>
      <div className={'my-8 ' + styles.divider} />
      <div className="flex">
        <div
          className={'mr-10 ' + (activeTab.personal ? styles.activeTab : styles.deactiveTab)}
          onClick={() => handleClickTab('personal')}
        >
          Personales
        </div>
        <div
          className={activeTab.health ? styles.activeTab : styles.deactiveTab}
          onClick={() => handleClickTab('health')}
        >
          Antropométricos
        </div>
      </div>
      <div className="pt-7">
        {activeTab.personal && (
          <Personal
            handleSavePersonal={handleSavePersonal}
            handleDiscardPersonal={handleDiscardPersonal}
            handleChangePersonal={handleChangePersonal}
            handleDeleteAccount={handleDeleteAccount}
          />
        )}
        {activeTab.health && <Health handleSave={handleSaveMeasure} handleDiscard={handleDiscardMeasure} />}
      </div>
    </div>
  )
}
export default Profile

Profile.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
