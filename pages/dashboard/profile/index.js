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

import moment from 'moment'

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
  const [getAnthropmetryByDashboard, { data: healthData, loading: healthLoading, error: healthError }] = useLazyQuery(
    graphql.queries.getAnthropmetryByDashboard
  )
  const [updatePatientByDashboard] = useMutation(graphql.mutations.updatePatientByDashboard)
  const [deletePatientByDashboard] = useMutation(graphql.mutations.deletePatientByDashboard)
  const [updatePatientHealthByDashboard] = useMutation(graphql.mutations.updatePatientHealthByDashboard)

  const [email, setEmail] = useState('')
  const [activeTab, setActiveTab] = useState({ personal: true, health: false, graphic: false })
  const [uploadFile, setUploadFile] = useState(null)
  const [personalInfo, setPersonalInfo] = useState({
    id: -1,
    avatar: '',
    name: '',
    surname: '',
    email: email || '',
    password: '',
    meet: 'INSTAGRAM',
    telephone: '',
    emergencyPhone: '',
    birthday: new Date(),
    code: '',
    gender: 'WOMAN',
  })
  const [healthInfo, setHealthInfo] = useState({
    fatPercentage: '', // grasa %
    visceralFat: '', //  visceral %
    boneMass: '', // osea %
    bodyMass: '', // imc
    waterPercentage: '', // agua %
    muscleMass: '', // muscular %
    metabolicExpense: '', // basal kcal
    metabolicAge: '', // edad años
    weight: '', // peso  kg
    height: '', // altura cm
    waist: '', // cintura cm
    arm: '', // brazo
    hips: '', // cadera cm
    thigh: '', // muslo cm
    // twin: '', //
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
  const healthItemList = [
    { name: 'grasa', key: 'fatPercentage' },
    { name: 'visceral', key: 'visceralFat' },
    { name: 'osea', key: 'boneMass' },
    { name: 'imc', key: 'bodyMass' },
    { name: 'agua', key: 'waterPercentage' },
    { name: 'basal', key: 'metabolicExpense' },
    { name: 'edad', key: 'metabolicAge' },
    { name: 'peso', key: 'weight' },
    { name: 'altura', key: 'height' },
    { name: 'cintura', key: 'waist' },
    { name: 'brazo', key: 'arm' },
    { name: 'cadera', key: 'hips' },
    { name: 'muslo', key: 'thigh' },
  ]

  // handlers
  useEffect(() => {
    let _email = ''
    Auth.currentAuthenticatedUser()
      .then(response => {
        if (response?.attributes?.email) {
          _email = response.attributes.email
          const _personalInfo = { ...personalInfo, email: _email }
          setPersonalInfo(_personalInfo)
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
    if (activeTab.health) {
      if (personalInfo.id > 0) {
        getAnthropmetryByDashboard({ variables: { patient_id: personalInfo.id } })
      }
    }
  }, [])

  useEffect(() => {
    if (activeTab.health) {
      if (personalInfo.id > 0) {
        getAnthropmetryByDashboard({ variables: { patient_id: personalInfo.id } })
      }
    }
  }, [activeTab])

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
      const data = personalData.getPatientByEmail
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

  useEffect(() => {
    if (!healthError && healthData && healthData.getAnthropmetryByDashboard) {
      const data = healthData.getAnthropmetryByDashboard
      let _healthInfo = { ...healthInfo }
      data.map((item, index) => {
        let tempValue = ''
        healthItemList.map(healthItem => {
          if (item.name === healthItem.name) {
            if (item.data.length > 0) {
              tempValue = item.data[0].value
            }
            _healthInfo = { ..._healthInfo, [healthItem.key]: tempValue }
          }
        })
      })
      setHealthInfo(_healthInfo)
    }
  }, [healthLoading, healthData, healthError])

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
    if (personalInfo.name === '' || personalInfo.surname === '') {
      toast.error('Please input data!')
      return
    }
    dispatch({ type: 'set', isLoading: true })
    let _personalInfo = { ...personalInfo }
    _personalInfo = { ..._personalInfo, imageFile: uploadFile }
    const variables = {
      email: email,
      name: personalInfo.name,
      lastname: personalInfo.surname,
      dni: personalInfo.code,
      mobile: personalInfo.telephone,
      eg_number: personalInfo.emergencyPhone,
      known_us: personalInfo.meet,
      avatar: uploadFile,
      genre: personalInfo.gender,
      birth_date: new Date(personalInfo.birthday),
      bill_alias: shippingInfo.aliasAddress,
      bill_name: shippingInfo.name,
      bill_address: shippingInfo.address,
      bill_province: shippingInfo.province,
      bill_town: shippingInfo.town,
      bill_postal_code: shippingInfo.cp,
      bill_country: shippingInfo.country,
    }

    updatePatientByDashboard({
      variables: variables,
    })
      .then(response => {
        if (response.data.updatePatientByDashboard) {
          getPatientByEmail({ variables: { email: email } })
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
        email: email,
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
    deletePatientByDashboard({ variables: { patient_id: personalInfo.id } })
      .then(response => {
        if (response.data.deletePatientByDashboard) {
          setPersonalInfo({
            id: -1,
            avatar: '',
            name: '',
            surname: '',
            email: email || '',
            password: '',
            meet: 'INSTAGRAM',
            telephone: '',
            emergencyPhone: '',
            birthday: new Date(),
            code: '',
            gender: 'WOMAN',
          })
          setShippingInfo({
            name: '',
            address: '',
            town: '',
            country: '',
            aliasAddress: '',
            cp: '',
            province: '',
          })
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
    setHealthInfo({
      fatPercentage: '', // grasa %
      visceralFat: '', //  visceral %
      boneMass: '', // osea %
      bodyMass: '', // imc
      waterPercentage: '', // agua %
      muscleMass: '', // muscular %
      metabolicExpense: '', // basal kcal
      metabolicAge: '', // edad años
      weight: '', // peso  kg
      height: '', // altura cm
      waist: '', // cintura cm
      arm: '', // brazo
      hips: '', // cadera cm
      thigh: '', // muslo cm
    })
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
            healthInfo={healthInfo}
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
