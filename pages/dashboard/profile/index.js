import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

import client from 'utils/apolloclient'
import { Auth } from 'aws-amplify'

// next components
import { useRouter } from 'next/router'
import Image from 'next/image'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/Dashboard/NotificationButton'
import MobileMainProfile from 'components/Dashboard/profile/MobileMainProfile'
import MobilePersonalProfile from 'components/Dashboard/profile/MobilePersonalProfile'
import MobileGraphicProfile from 'components/Dashboard/profile/MobileGraphicProfile'
import MobileHealthProfile from 'components/Dashboard/profile/MobileHealthProfile'

// import Profile from 'components/Dashboard/Profile'
import Personal from 'components/Dashboard/Personal'
import Health from 'components/Dashboard/Health'
import Graphic from 'components/Dashboard/Graphic'

// styles
import styles from './profile.module.scss'
// graphql
import { useMutation, useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import CloseIcon from 'public/images/close.svg'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.6)',
  },
}

const Profile = props => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const { viewport } = props

  useEffect(() => {
    setIsMounted(true)
    Modal.setAppElement('#main')
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
  const [email, setEmail] = useState('')
  const [getPatientByEmail, { data: personalData, loading: personalLoading, error: personalError }] = useLazyQuery(
    graphql.queries.getPatientByEmail
  )
  const [getAnthropmetryByDashboard, { data: healthData, loading: healthLoading, error: healthError }] = useLazyQuery(
    graphql.queries.getAnthropmetryByDashboard
  )
  const [
    getAnthroDetailDataByDashboard,
    { data: healthGraphicData, loading: healthGraphicLoading, error: healthGraphicError },
  ] = useLazyQuery(graphql.queries.getAnthroDetailDataByDashboard)
  const [updatePatientByDashboard] = useMutation(graphql.mutations.updatePatientByDashboard)
  const [deletePatientByDashboard] = useMutation(graphql.mutations.deletePatientByDashboard)
  const [updateAnthropometry] = useMutation(graphql.mutations.updateAnthropometry)

  const [profilePercentage, setProfilePercentage] = useState(0)
  const [activeTab, setActiveTab] = useState({ personal: true, health: false, graphic: false, main: true })
  const [uploadFile, setUploadFile] = useState(null)
  const date = new Date()
  const currentMonthIndex = date.getMonth()
  const [monthData, setMonthData] = useState([])
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  const [personalInfo, setPersonalInfo] = useState({
    id: -1,
    avatar: '',
    name: '',
    surname: '',
    email: '',
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
    twin: '', // gemelo
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
  const [graphicInfo, setGraphicInfo] = useState({
    fatPercentage: [], // grasa %
    visceralFat: [], //  visceral %
    boneMass: [], // osea %
    bodyMass: [], // imc
    waterPercentage: [], // agua %
    muscleMass: [], // muscular %
    metabolicExpense: [], // basal kcal
    metabolicAge: [], // edad años
    weight: [], // peso  kg
    height: [], // altura cm
    waist: [], // cintura cm
    arm: [], // brazo
    hips: [], // cadera cm
    thigh: [], // muslo cm
    twin: [], // gemelo
  })

  const healthItemList = [
    { name: 'grasa', key: 'fatPercentage' },
    { name: 'visceral', key: 'visceralFat' },
    { name: 'osea', key: 'boneMass' },
    { name: 'imc', key: 'bodyMass' },
    { name: 'agua', key: 'waterPercentage' },
    { name: 'muscular', key: 'muscleMass' },
    { name: 'basal', key: 'metabolicExpense' },
    { name: 'edad', key: 'metabolicAge' },
    { name: 'peso', key: 'weight' },
    { name: 'altura', key: 'height' },
    { name: 'cintura', key: 'waist' },
    { name: 'brazo', key: 'arm' },
    { name: 'cadera', key: 'hips' },
    { name: 'muslo', key: 'thigh' },
    { name: 'gemelo', key: 'twin' },
  ]
  const nowDate = new Date()
  const month = ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ag', 'Sep', 'Oct', 'Now', 'Dic']
  const [monthList, setMonthList] = useState([])

  // handlers
  useEffect(() => {
    // bar chart option start
    let _monthList = []
    for (let i = 0; i < 12; i++) {
      _monthList.push(month[(nowDate.getMonth() + 1 + i) % 12])
    }
    setMonthList(_monthList)
    // bar chart option end

    const _email = localStorage.getItem('email')
    setPersonalInfo({ ...personalInfo, email: _email })
    setEmail(_email)
    getPatientByEmail({
      variables: {
        email: _email,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getProfilePercentage = (_personalInfo, _shippingInfo) => {
    let fillCount = -3
    Object.values(_personalInfo).map(item => {
      if (item !== '') {
        fillCount += 1
      }
    })
    Object.values(_shippingInfo).map(item => {
      if (item !== '') {
        fillCount += 1
      }
    })
    const temp = (fillCount / 14) * 100
    const percentage = Math.ceil(temp / 5) * 5
    if (percentage <= 0) {
      setProfilePercentage(0)
    } else if (percentage >= 100) {
      setProfilePercentage(100)
    } else {
      setProfilePercentage(percentage)
    }
  }

  useEffect(() => {
    if (activeTab.health) {
      if (personalInfo.id > 0) {
        getAnthropmetryByDashboard({ variables: { patient_id: personalInfo.id } })
      }
    } else if (activeTab.graphic) {
      getAnthroDetailDataByDashboard({ variables: { patient_id: personalInfo.id } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  useEffect(() => {
    const currentState = router.asPath.split('#')
    if (viewport === 'mobile') {
      setActivePageForMobile()
    } else {
      setActivePageForDesktop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (viewport === 'mobile') {
      setActivePageForMobile()
    } else {
      setActivePageForDesktop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, viewport])

  const setActivePageForMobile = () => {
    const currentState = router.asPath.split('#')
    if (currentState[1] === 'health') {
      setActiveTab({ personal: false, health: true, graphic: false, main: false })
    } else if (currentState[1] === 'graphic') {
      setActiveTab({ personal: false, health: false, graphic: true, main: false })
    } else if (currentState[1] === 'personal') {
      setActiveTab({ personal: true, health: false, graphic: false, main: false })
    } else {
      setActiveTab({ personal: false, health: false, graphic: false, main: true })
    }
  }

  const setActivePageForDesktop = () => {
    const currentState = router.asPath.split('#')
    if (currentState[1] === 'health') {
      setActiveTab({ personal: false, health: true, graphic: false, main: false })
    } else if (currentState[1] === 'graphic') {
      setActiveTab({ personal: false, health: false, graphic: true, main: false })
    } else {
      setActiveTab({ personal: true, health: false, graphic: false, main: false })
    }
  }

  useEffect(() => {
    if (!personalError && personalData && personalData.getPatientByEmail) {
      const data = personalData.getPatientByEmail
      localStorage.setItem('patient_id', data.id)
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
      getProfilePercentage(_personalInfo, _shippingInfo)
      getAnthropmetryByDashboard({ variables: { patient_id: data.id } })
      getAnthroDetailDataByDashboard({ variables: { patient_id: data.id } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalLoading, personalData, personalError])

  useEffect(() => {
    if (!healthError && healthData && healthData.getAnthropmetryByDashboard) {
      const data = healthData.getAnthropmetryByDashboard
      let _healthInfo = { ...healthInfo }
      data.map(item => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [healthLoading, healthData, healthError])

  useEffect(() => {
    if (!healthGraphicError && healthGraphicData && healthGraphicData.getAnthroDetailDataByDashboard) {
      const data = healthGraphicData.getAnthroDetailDataByDashboard
      let _graphicInfo = { ...graphicInfo }
      data.map(item => {
        healthItemList.map(healthItem => {
          if (item.type === healthItem.name) {
            _graphicInfo = { ..._graphicInfo, [healthItem.key]: item.data }
          }
        })
      })
      setGraphicInfo(_graphicInfo)
      // line chart info
      let _monthData = []
      ;[...Array(12)].forEach((_, i) => {
        let newArr = []
        newArr.push(
          _graphicInfo.arm[i],
          _graphicInfo.waist[i],
          _graphicInfo.hips[i],
          _graphicInfo.thigh[i],
          _graphicInfo.twin[i]
        )
        _monthData.push(newArr)
      })
      setMonthData(_monthData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [healthGraphicLoading, healthGraphicData, healthGraphicError])

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
      email: personalInfo.email,
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
    closeModal()
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
        } else {
          toast.error('Server Error!')
          dispatch({ type: 'set', isLoading: false })
        }
      })
      .catch(error => {
        toast.error(error.message)
        dispatch({ type: 'set', isLoading: false })
      })
  }

  const handleSaveMeasure = () => {
    const variables = {
      patient_id: personalInfo.id,
      grasa: healthInfo.fatPercentage.toString(), // grasa %
      visceral: healthInfo.visceralFat.toString(), //  visceral %
      osea: healthInfo.boneMass.toString(), // osea %
      imc: healthInfo.bodyMass.toString(), // imc
      agua: healthInfo.waterPercentage.toString(), // agua %
      muscular: healthInfo.muscleMass.toString(), // muscular %
      basal: healthInfo.metabolicExpense.toString(), // basal kcal
      edad: healthInfo.metabolicAge.toString(), // edad años
      peso: healthInfo.weight.toString(), // peso  kg
      altura: healthInfo.height.toString(), // altura cm
      cintura: healthInfo.waist.toString(), // cintura cm
      brazo: healthInfo.arm.toString(), // brazo
      cadera: healthInfo.hips.toString(), // cadera cm
      muslo: healthInfo.thigh.toString(), // muslo cm
      gemelo: healthInfo.twin.toString(), // gemelo
    }

    dispatch({ type: 'set', isLoading: true })
    updateAnthropometry({ variables: variables })
      .then(response => {
        if (response.data.updateAnthropometry) {
          getAnthropmetryByDashboard({ variables: { patient_id: personalInfo.id } })
          toast.success('Successfully saved anthropometric!')
          dispatch({ type: 'set', isLoading: false })
        }
      })
      .catch(error => {
        toast.error(error.message)
        dispatch({ type: 'set', isLoading: false })
      })
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
      twin: '', // gemelo cm
    })
  }

  const handleChangeHealth = (event, key) => {
    setHealthInfo({ ...healthInfo, [key]: event.target.value })
  }

  const handleClickProfileItem = path => {
    if (path === 'personal' || path === 'graphic') {
      setActiveTab({ [path]: true })
      router.push(`/dashboard/profile#${path}`, undefined, { shallow: true })
    } else {
      router.push('/dashboard/' + path)
    }
  }

  const handleClickMainButton = async type => {
    if (type === 'logout') {
      dispatch({ type: 'set', isLoading: true })
      await client.resetStore()
      await client.clearStore()
      await Auth.signOut()
      localStorage.clear()
      router.push('/')
    }
    if (type === 'deleteAccount') {
      openModal()
    }
  }

  return (
    <div id="main">
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="p-2 w-auto">
          <div className="mb-2 flex justify-end cursor-pointer" onClick={closeModal}>
            <Image src={CloseIcon} alt={''} width={16} height={16} />
          </div>
          <div className={styles.modalTitle}>¿Estas seguro que deseas borrar tu cuenta?</div>
          <div className={'mt-2 ' + styles.modalDescription}>
            Recuerda que no hay vuelta atrás para esto, tus datos e historial no se guardarán
            <br /> en el caso que quieras retomar los servicios.
          </div>
          <div className={'flex justify-end mt-5'}>
            <div className={'cursor-pointer ' + styles.modalButton} onClick={closeModal}>
              Descartar
            </div>
            <div className={'cursor-pointer ml-3 ' + styles.modalButton} onClick={handleDeleteAccount}>
              Suprimir cuenta
            </div>
          </div>
        </div>
      </Modal>
      {viewport === 'mobile' ? (
        <>
          {activeTab.main && (
            <MobileMainProfile
              handleClickProfileItem={handleClickProfileItem}
              personalInfo={personalInfo}
              handleClickMainButton={handleClickMainButton}
              shippingInfo={shippingInfo}
              handleChangeAvatar={handleChangeAvatar}
            />
          )}
          {activeTab.personal && (
            <MobilePersonalProfile
              handleSavePersonal={handleSavePersonal}
              personalInfo={personalInfo}
              shippingInfo={shippingInfo}
              handleChangePersonal={handleChangePersonal}
              handleChangeShipping={handleChangeShipping}
            />
          )}
          {activeTab.health && (
            <MobileHealthProfile
              healthInfo={healthInfo}
              handleSaveMeasure={handleSaveMeasure}
              handleChangeHealth={handleChangeHealth}
            />
          )}
          {activeTab.graphic && (
            <MobileGraphicProfile
              graphicInfo={graphicInfo}
              monthData={monthData}
              currentMonthIndex={currentMonthIndex}
              monthList={monthList}
              month={month}
            />
          )}
        </>
      ) : (
        <div className={'relative pt-10 pb-24 px-24 ' + styles.container}>
          <div className={'flex justify-between'}>
            <div>
              <div className={styles.highBoldLabel}>Perfil</div>
              <div className={'pt-2 ' + styles.mediumLabel}>{profilePercentage}% Perfil Completado</div>
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
                handleDeleteAccount={openModal}
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
            {activeTab.graphic && (
              <Graphic
                handleClickTab={handleClickTab}
                graphicInfo={graphicInfo}
                monthData={monthData}
                currentMonthIndex={currentMonthIndex}
                monthList={monthList}
                month={month}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default Profile

Profile.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Perfil">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
