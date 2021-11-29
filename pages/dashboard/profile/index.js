import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
// import Profile from 'components/components/dashboard/Profile'
import Personal from 'components/components/dashboard/Personal'
import Health from 'components/components/dashboard/Health'
import Graphic from 'components/components/dashboard/Graphic'

// styles
import styles from './profile.module.scss'
// graphql
import { useMutation, useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import toast from 'react-hot-toast'

import { Auth } from 'aws-amplify'

const Profile = () => {
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
  const [getPatientByEmail, { data: personalData, loading: personalLoading, error: personalError }] = useLazyQuery(
    graphql.queries.getPatientByEmail
  )
  const [updatePatientByDashboard] = useMutation(graphql.mutations.updatePatientByDashboard)
  const [deletePatientByDashboard] = useMutation(graphql.mutations.deletePatientByDashboard)

  const [email, setEmail] = useState('')
  const [activeTab, setActiveTab] = useState({ personal: true, health: false, graphic: false })
  const [uploadFile, setUploadFile] = useState(null)
  const [personalInfo, setPersonalInfo] = useState({
    id: -1,
    avatar: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    meet: '',
    telephone: '',
    emergencyPhone: '',
    birthday: '',
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
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    town: '',
    country: '',
    aliasAddress: '',
    cp: '',
    province: '',
  })

  // handlers
  useEffect(() => {
    let _email = ''
    Auth.currentAuthenticatedUser()
      .then(response => {
        if (response?.attributes?.email) {
          _email = response.attributes.email
          setEmail(_email)
          getPatientByEmail({
            variables: {
              email: _email,
            },
          })
        }
      })
      .catch(error => {
        toast.error(error.message)
      })
  }, [])

  useEffect(() => {
    const currentState = router.asPath.split('#')
    if (currentState[1] === 'health') {
      setActiveTab({ personal: false, health: true, graphic: false })
    } else {
      router.push('/dashboard/profile#personal', undefined, { shallow: true })
    }
  }, [router.pathname])

  useEffect(() => {
    if (!personalError && personalData && personalData.getPatientByEmail) {
      console.log('personal information ', personalData.getPatientByEmail)
      const data = personalData.getPatientByEmail
      // setPersonalInfo(personalData.getPatientByEmail)
      let _personalInfo = {
        ...personalInfo,
        id: data.id,
        avatar: data.avatar,
        name: data.name,
        surname: data.lastname,
        email: data.email,
        meet: data.known_us,
        telephone: data.mobile,
        emergencyPhone: data.eg_number,
        birthday: data.birth_date,
        code: data.dni,
        gender: data.genre,
      }
      setPersonalInfo(_personalInfo)
      let _shippingInfo = {
        ...shippingInfo,
        name: data.bill_name,
        address: data.bill_address,
        town: data.bill_town,
        country: data.bill_country,
        aliasAddress: data.bill_alias,
        cp: data.bill_postal_code,
        province: data.bill_province,
      }
      setShippingInfo(_shippingInfo)
    }
  }, [personalLoading, personalData, personalError])

  const handleClickTab = tabType => {
    setActiveTab({ [tabType]: true })
    router.push(`/dashboard/profile#${tabType}`, undefined, { shallow: true })
  }

  const handleChangeAvatar = event => {
    const newImage = event.target.files[0]
    setUploadFile(newImage)
    if (newImage) {
      setPersonalInfo({ ...personalInfo, avatar: URL.createObjectURL(newImage) })
    }
  }

  const handleSavePersonal = () => {
    console.log('handleSavePersonal', uploadFile)
    if (personalInfo.name === '' || personalInfo.surname === '') {
      toast.error('Please input data!')
      return
    }
    dispatch({ type: 'set', isLoading: true })
    let _personalInfo = { ...personalInfo }
    _personalInfo = { ..._personalInfo, imageFile: uploadFile }
    const variable = {
      id: personalInfo.id,
      email: email,
      name: personalInfo.name,
      lastname: personalInfo.surname,
      dni: personalInfo.code,
      mobile: personalInfo.telephone,
      eg_number: personalInfo.emergencyPhone,
      known_us: personalInfo.meet,
      avatar: uploadFile,
      genre: personalInfo.gender,
      birth_date: personalInfo.birthday,
      bill_alias: shippingInfo.aliasAddress,
      bill_name: shippingInfo.name,
      bill_address: shippingInfo.address,
      bill_province: shippingInfo.province,
      bill_town: shippingInfo.town,
      bill_postal_code: shippingInfo.cp,
      bill_country: shippingInfo.country,
    }
    updatePatientByDashboard({
      variables: variable,
    })
      .then(response => {
        if (response.data.updatePatientByDashboard) {
          getPatientByEmail()
          toast.success('Successfully save personal account!')
          dispatch({ type: 'set', isLoading: false })
        }
      })
      .catch(error => {
        dispatch({ type: 'set', isLoading: false })
        toast.error(error.message)
      })
  }

  const handleDiscardPersonal = () => {
    getPatientByEmail({
      variables: {
        email: _email,
      },
    })
  }

  const handleChangePersonal = (event, key) => {
    setPersonalInfo({ ...personalInfo, [key]: event.target.value })
  }

  const handleChangeShipping = (event, key) => {
    setShippingInfo({ ...shippingInfo, [key]: event.target.value })
  }

  const handleDeleteAccount = () => {
    dispatch({ type: 'set', isLoading: true })
    deletePatientByDashboard()
      .then(response => {
        if (response.data.deletePatientByDashboard) {
          getPatientByEmail()
          toast.success('Successfully delete personal information!')
          dispatch({ type: 'set', isLoading: false })
        }
      })
      .catch(error => {
        toast.error(error.message)
        dispatch({ type: 'set', isLoading: false })
      })
  }

  const handleSaveMeasure = () => {
    console.log('handleSaveMeasure')
  }

  const handleDiscardMeasure = () => {
    console.log('handleDiscardMeasure')
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
          <NotificationButton />
          {/* <Profile /> */}
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
            personalInfo={personalInfo}
            shippingInfo={shippingInfo}
            handleChangeAvatar={handleChangeAvatar}
            handleSave={handleSavePersonal}
            handleDiscard={handleDiscardPersonal}
            handleChangePersonal={handleChangePersonal}
            handleChangeShipping={handleChangeShipping}
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
