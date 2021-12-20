import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Image from 'next/image'

// third party components
import { Tab, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import toast from 'react-hot-toast'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CommonButton from 'components/components/purchase/CommonButton'
import CommonText from 'components/components/purchase/CommonText'
import PurchaseAvatar from 'components/components/purchase/PurchaseAvatar'
import BillingDoc from 'components/components/purchase/BillingDoc'
import PreviousButton from 'components/components/purchase/PreviousButton'
import Credit from 'components/components/purchase/Credit'
import Transfer from 'components/components/purchase/Transfer'
import ShoppingCart from 'components/components/purchaseLogin/ShoppingCart'
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from 'components/components/purchase/utils'

// json data
import shoppingCartData from 'assets/data/ShoppingCartData'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './purchase.module.scss'
// graphql
import { useMutation, useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

import { Auth } from 'aws-amplify'
import moment from 'moment'

const Tabs = dynamic(
  import('react-tabs').then(mod => mod.Tabs),
  { ssr: false }
) // disable ssr

const Purchase = () => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const [mobile, setMobile] = useState(null)

  const listGrey = '/images/list-grey.svg'
  const listWhite = '/images/list-white.svg'
  const docGrey = '/images/doc-grey.svg'
  const docWhite = '/images/doc-white.svg'
  const logoRedSys = '/images/logo-redsys.svg'

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    setMobile(isMobile)
  }, [setMobile])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const [Checkout] = useMutation(graphql.mutations.Checkout)
  const [getPatientIdByDashboard, { data: patientData, loading: patientLoading, error: patientError }] = useLazyQuery(
    graphql.queries.getPatientIdByDashboard
  )
  const [getPatientBillByDashboard, { data: billData, loading: billLoading, error: billError }] = useLazyQuery(
    graphql.queries.getPatientBillByDashboard
  )
  const [createPatientBillByDashboard] = useMutation(graphql.mutations.createPatientBillByDashboard)
  const [updatePatientByDashboard] = useMutation(graphql.mutations.updatePatientByDashboard)
  const [getPatientByEmail, { data: personalData, loading: personalLoading, error: personalError }] = useLazyQuery(
    graphql.queries.getPatientByEmail
  )

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const [session, setSession] = useState({})
  const [cartData, setCartData] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const [uploadFile, setUploadFile] = useState(null)
  const [email, setEmail] = useState('')
  const [shoppingInfo, setShoppingInfo] = useState({
    image: '',
    description: '',
    price: '',
  })
  const personalKey = [
    'name',
    'surname',
    // 'meet',
    //'email',
    //'telephone',
    // 'country',
    // 'emergencyPhone',
    // 'address',
    // 'code',
    // 'town',
    // 'gender',
    // 'birthday',
  ]
  const [personalInfo, setPersonalInfo] = useState({
    id: -1,
    avatar: '',
    name: '',
    password: '',
    surname: '',
    meet: 'INSTAGRAM',
    email: '',
    telephone: '',
    country: '',
    emergencyPhone: '',
    address: '',
    code: '',
    town: '',
    gender: 'WOMAN',
    birthday: new Date(),
  })
  const billingAddressKey = [
    'addressAlias',
    'surname',
    'email',
    'population',
    'postalCode',
    'name',
    'cif',
    'address',
    'province',
    'country',
  ]
  const [billingAddress, setBillingAddress] = useState({
    addressAlias: '',
    surname: '',
    email: '',
    population: '',
    postalCode: '',
    name: '',
    cif: '',
    address: '',
    province: '',
    country: '',
  })
  const billingAddressLeftInfo = [
    {
      value: 'addressAlias',
      type: 'text',
      label: 'Alias de la dirección ( ej. casa, trabajo…)',
    },
    {
      value: 'surname',
      type: 'text',
      label: 'Apellidos',
    },
    {
      value: 'email',
      type: 'enauk',
      label: 'Email',
    },
    {
      value: 'population',
      type: 'text',
      label: 'Población',
    },
    {
      value: 'postalCode',
      type: 'text',
      label: 'CP',
    },
  ]
  const billingAddressRightInfo = [
    {
      value: 'name',
      type: 'text',
      label: 'Nombre',
    },
    {
      value: 'cif',
      type: 'text',
      label: 'DNI/NIF',
    },
    {
      value: 'address',
      type: 'text',
      label: 'Dirección facturación',
    },
    {
      value: 'province',
      type: 'text',
      label: 'Provincia',
    },
    {
      value: 'country',
      type: 'text',
      label: 'País',
    },
  ]
  const genderList = ['WOMAN', 'MAN']
  const meetList = ['INSTAGRAM', 'FACEBOOK', 'PRENSA']

  const [frameType, setFrameType] = useState(-1)
  const [billDataList, setBillDataList] = useState([])

  const [redsys, setRedsys] = useState(false)
  const [paymentType, setPaymentType] = useState('card')
  const [cardInfo, setCardInfo] = useState({ number: '', name: '', expiry: '', cvc: '' })

  // handlers
  useEffect(() => {
    setCartData(shoppingCartData)
    setRedsys(false)
    getPatientIdByDashboard({
      variables: {
        email: localStorage.getItem('email'),
      },
    })
    getPatientByEmail({
      variables: {
        email: localStorage.getItem('email'),
      },
    })
    setEmail(localStorage.getItem('email'))
    setPersonalInfo({ ...personalInfo, email: localStorage.getItem('email') })
    Auth.currentAuthenticatedUser()
      .then(() => {
        setIsAuthenticated(true)
      })
      .catch(() => {
        router.push('/purchase-login')
        setIsAuthenticated(false)
      })
  }, [])

  useEffect(() => {
    let _shoppingInfo = { ...shoppingInfo }

    if (router.query.image) {
      _shoppingInfo = { ..._shoppingInfo, image: decodeURIComponent(JSON.parse(`"${router.query.image}"`)) }
    }
    if (router.query.description) {
      _shoppingInfo = { ..._shoppingInfo, description: decodeURIComponent(JSON.parse(`"${router.query.description}"`)) }
    }
    if (router.query.price) {
      _shoppingInfo = { ..._shoppingInfo, price: Number(router.query.price) }
    }
    setShoppingInfo(_shoppingInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    if (!patientError && patientData && patientData.getPatientIdByDashboard) {
      const patient_id = patientData.getPatientIdByDashboard
      localStorage.setItem('patient_id', patient_id)
      getPatientBillByDashboard({ variables: { patient_id: patient_id } })
      if (patient_id > -1) {
        setTabIndex(1)
      } else {
        setTabIndex(0)
      }
    }
  }, [patientLoading, patientData, patientError])

  useEffect(() => {
    if (!billError && billData && billData.getPatientBillByDashboard) {
      let _billDataList = []
      const billInfo = billData.getPatientBillByDashboard
      billInfo.map(item => {
        const _name = item.name.split(' ')
        const _billItem = {
          id: item.id,
          name: _name[0],
          surname: _name[1],
          cif: item.cif,
          addressAlias: item.title,
          email: item.email,
          population: item.population,
          address: item.address,
          province: item.province,
          country: item.country,
          postalCode: item.postal_code,
        }
        _billDataList.push(_billItem)
      })
      setBillDataList(_billDataList)
    }
  }, [billLoading, billData, billError])

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
        address: data.bill_address,
        town: data.bill_town,
        country: data.bill_country,
      }
      setPersonalInfo(_personalInfo)
    }
  }, [personalLoading, personalData, personalError])

  useEffect(() => {
    if (Number(router.query.tab) === 0) {
      setTabIndex(0)
    } else if (Number(router.query.tab) === 1) {
      setTabIndex(1)
    } /*else if (Number(router.query.tab) === 2) {
      setTabIndex(2)
    }*/
  }, [router.query])

  const handleRemoveCart = index => {
    let array = [...cartData]
    array.splice(index, 1)
    setCartData(array)
  }

  const handleDiscard = () => {
    getPatientByEmail({
      variables: {
        email: email,
      },
    })
  }

  const handleChangeAvatar = event => {
    const newImage = event.target.files[0]
    setUploadFile(newImage)
    if (newImage) {
      setPersonalInfo({ ...personalInfo, avatar: URL.createObjectURL(newImage) })
    }
  }

  const handleSave = () => {
    console.log('personalInfo')
    let emptyField = false
    personalKey.map(key => {
      if (personalInfo[key] === '') {
        emptyField = true
        return
      }
    })
    if (emptyField) {
      toast.error('Please input data!')
      return
    }
    dispatch({ type: 'set', isLoading: true })
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
      bill_address: personalInfo.address,
      bill_town: personalInfo.town,
      bill_country: personalInfo.country,
      bill_alias: '',
      bill_name: '',
      bill_province: '',
      bill_postal_code: '',
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
  const handleContinue = tabIndex => {
    let query = { tab: tabIndex }
    if (router.query.service_id) {
      query = { ...query, service_id: router.query.service_id }
    }
    // handleSave()
    router.push({ pathname: '/purchase', query: query }, undefined, { shallow: true })
  }

  const handleChangeInfo = (event, key) => {
    setPersonalInfo({ ...personalInfo, [key]: event.target.value })
  }

  const handleChangeBillingAddress = (event, key) => {
    setBillingAddress({ ...billingAddress, [key]: event.target.value })
  }
  const [selectedDoc, setSelectedDoc] = useState(null)
  const handleChangeFrame = event => {
    setFrameType(event.target.name)
    billDataList.map(item => {
      if (item.id == event.target.name) {
        setSelectedDoc(item)
      }
    })
  }

  const handleDeleteBilling = () => {}
  const handleSaveBilling = () => {
    let empty = false
    billingAddressKey.map(key => {
      if (billingAddress[key] === '') {
        empty = true
        return
      }
    })
    if (empty) {
      toast.error('Please input data!')
      return
    }
    dispatch({ type: 'set', isLoading: true })
    const variables = {
      patient_id: Number(localStorage.getItem('patient_id')),
      type: 'bill',
      title: billingAddress.addressAlias,
      name: billingAddress.name + ' ' + billingAddress.surname,
      cif: billingAddress.cif,
      email: billingAddress.email,
      mobile: '',
      address: billingAddress.address,
      province: billingAddress.province,
      population: billingAddress.population,
      postal_code: billingAddress.postalCode,
      country: billingAddress.country,
    }
    createPatientBillByDashboard({
      variables: variables,
    })
      .then(response => {
        if (response.data.createPatientBillByDashboard) {
          toast.success('Successfully save bill information!')
          getPatientBillByDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
        }
        dispatch({ type: 'set', isLoading: false })
      })
      .catch(error => {
        dispatch({ type: 'set', isLoading: false })
        toast.error(error.message)
      })
  }

  const handleChangePaymentType = event => {
    setPaymentType(event.target.name)
  }
  const handleChangeCardData = (name, value) => {
    setCardInfo({ ...cardInfo, [name]: value })
  }
  const handleFinishBilling = () => {
    if (paymentType === '') {
      toast.error('You should select payment type!')
      router.push('/purchase/order-failed')
      return
    } else if (paymentType === 'card') {
      if (!router.query.service_id) {
        toast.error('You did not select any Service!')
        return
      }
      if (!cardInfo.name || !cardInfo.number || !cardInfo.expiry || !cardInfo.cvc) {
        toast.error('You should input Card information!')
        return
      }
      try {
        dispatch({ type: 'set', isLoading: true })
        window.Stripe.setPublishableKey(process.env.NEXT_PUBLIC_STRIPE_KEY)

        const exp_month = cardInfo.expiry.split('/')[0]
        const exp_year = cardInfo.expiry.split('/')[1]
        const card_info = {
          number: cardInfo.number,
          exp_month: exp_month,
          exp_year: exp_year,
          cvc: cardInfo.cvc,
        }

        window.Stripe.createToken(card_info, async (req, res) => {
          if (res.error) {
            if (res.error.code === 'invalid_number' || res.error.code === 'incorrect_number')
              toast.error(res.error.message)
            if (res.error.code === 'incorrect_cvc' || res.error.code === 'invaild_cvc') toast.error(res.error.message)
            if (res.error.code === 'invalid_expiry_month' || res.error.code === 'invalid_expiry_year')
              toast.error(res.error.message)
            dispatch({ type: 'set', isLoading: false })
          } else if (res.id) {
            dispatch({ type: 'set', isLoading: true })
            Checkout({
              variables: {
                serviceId: Number(router.query.service_id),
                ccToken: res.id,
                paymentType: paymentType,
              },
            })
              .then(response => {
                if (response.data.Checkout) {
                  const checkoutData = response.data.Checkout
                  setSession(checkoutData)
                  toast.success('Successfully buy Service!')
                  dispatch({ type: 'set', isLoading: false })
                  if (checkoutData.next?.redirect_to_url.url) {
                    window.open(checkoutData.next?.redirect_to_url.url, '_self')
                  } else {
                    router.push(
                      `/purchase/order?payment_intent=${checkoutData.stripe_payment_intent_id}&subscription_id=${checkoutData.stripe_subscription_id}`
                    )
                  }
                }
              })
              .catch(error => {
                toast.error(error.message)
                dispatch({ type: 'set', isLoading: false })
              })
          }
        })
      } catch (err) {
        dispatch({ type: 'set', isLoading: false })
        toast.error(err.message)
      }
    } else if (paymentType === 'transfer') {
      try {
        dispatch({ type: 'set', isLoading: true })
        Checkout({
          variables: {
            serviceId: Number(router.query.service_id),
            ccToken: 'none',
            paymentType: paymentType,
          },
        })
          .then(response => {
            if (response.data.Checkout) {
              const checkoutData = response.data.Checkout
              setSession(checkoutData)
              toast.success('Successfully buy Service!')
              dispatch({ type: 'set', isLoading: false })
              //router.push('/purchase/transfer-success')
              router.push(`/purchase/order?&purchase_id=${checkoutData.id}`)
            }
          })
          .catch(error => {
            toast.error(error.message)
            dispatch({ type: 'set', isLoading: false })
          })
      } catch (err) {
        dispatch({ type: 'set', isLoading: false })
        toast.error(err.message)
      }
    }
  }

  const handleAcceptDiscount = () => {}

  const onClickTab = tabType => {
    let query = { tab: tabType }
    if (router.query.service_id) {
      query = {
        ...query,
        service_id: router.query.service_id,
        image: router.query.image,
        description: router.query.description,
        price: router.query.price,
      }
    }

    router.push(
      {
        pathname: '/purchase',
        query: query,
      },
      undefined,
      { shallow: true }
    )
  }

  const handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value)
    }
    handleChangeCardData(target.name, target.value)
  }

  return isAuthenticated ? (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container + ' pt-20'}>
          <div className={'grid grid-cols-12 gap-4 '}>
            <div className={'col-span-12 md:col-span-9 sm:col-span-12 pt-5 pb-20'}>
              {mobile ? (
                <div>
                  {tabIndex === 0 ? (
                    <>
                      <div className={'pt-3.5 flex items-center justify-between'}>
                        <button
                          className={'w-8 h-8 rounded-full flex justify-center items-center ' + styles.activeTabIcon}
                        >
                          <Image src={listWhite} alt={''} width={16} height={16} />
                        </button>
                        <div className={styles.directionLine} />
                        <button
                          className={'w-8 h-8 rounded-full flex justify-center items-center ' + styles.inactiveTabIcon}
                          onClick={() => onClickTab(1)}
                        >
                          <Image src={docGrey} alt={''} width={16} height={16} />
                        </button>
                      </div>
                      <div className={styles.mobileTabTitle + ' pt-3.5'}>Datos</div>
                      <div className={'pt-4'}>
                        <div className={styles.formLabel}>Nombre</div>
                        <input
                          type="text"
                          name="name"
                          placeholder=""
                          onChange={e => handleChangeInfo(e, 'name')}
                          className={styles.formControl}
                          value={personalInfo.name}
                        />
                      </div>
                      <div className={'pt-4'}>
                        <div className={styles.formLabel}>Apellidos</div>
                        <input
                          type="text"
                          name="surname"
                          placeholder=""
                          onChange={e => handleChangeInfo(e, 'surname')}
                          className={styles.formControl}
                          value={personalInfo.surname}
                        />
                      </div>
                      <button
                        className={'flex justify-between items-center pt-4 ' + styles.finishButton}
                        onClick={() => handleContinue(1)}
                      >
                        <p className={styles.finishButtonLabel}>Siguiente paso</p>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className={'pt-3.5 flex items-center justify-between'}>
                        <button
                          className={'w-8 h-8 rounded-full flex justify-center items-center ' + styles.inactiveTabIcon}
                          onClick={() => onClickTab(0)}
                        >
                          <Image src={listGrey} alt={''} width={16} height={16} />
                        </button>
                        <div className={styles.directionLine} />
                        <button
                          className={'w-8 h-8 rounded-full flex justify-center items-center ' + styles.activeTabIcon}
                        >
                          <Image src={docWhite} alt={''} width={16} height={16} />
                        </button>
                      </div>
                      <div className={styles.mobileTabTitle + ' pt-3.5'}>Datos de pago</div>
                      <div className={'flex justify-between pt-3.5'}>
                        <div
                          className={
                            paymentType === 'card' ? styles.activeCard + ' pt-2' : styles.inactiveCard + ' pt-2'
                          }
                          onClick={() => setPaymentType('card')}
                        >
                          <span className={styles.mobileTabTitle}>Tarjeta bancaria</span>
                          <Image src={logoRedSys} alt={''} width={78} height={38} />
                        </div>
                        <div
                          className={paymentType === 'transfer' ? styles.activeCard : styles.inactiveCard}
                          onClick={() => setPaymentType('transfer')}
                        >
                          <span className={styles.mobileTabTitle + ' text-center'}>
                            Transferencia <br />
                            bancaria
                          </span>
                        </div>
                      </div>
                      {paymentType === 'card' ? (
                        <div>
                          <div className={'pt-4'}>
                            <div className={styles.formLabel}>Numero de tarjeta</div>
                            <input
                              type="tel"
                              name="number"
                              placeholder="Card Number"
                              pattern="[\d| ]{16,22}"
                              required
                              onChange={handleInputChange}
                              className={styles.formControl}
                            />
                          </div>
                          <div className={'pt-4'}>
                            <div className={styles.formLabel}>Nombre completo</div>
                            <input
                              type="text"
                              name="name"
                              placeholder="Name on Card"
                              pattern="[\d| ]{16,22}"
                              required
                              onChange={handleInputChange}
                              className={styles.formControl}
                            />
                          </div>
                          <div className={'pt-4'}>
                            <div className={styles.formLabel}>Fecha expiración</div>
                            <input
                              type="tel"
                              name="expiry"
                              placeholder="MM/YY"
                              pattern="\d\d/\d\d"
                              required
                              onChange={handleInputChange}
                              className={styles.formControl}
                            />
                          </div>
                          <div className={'pt-4'}>
                            <div className={styles.formLabel}>CVV CODE</div>
                            <input
                              type="tel"
                              name="cvc"
                              placeholder="CVC"
                              pattern="\d{3,4}"
                              required
                              onChange={handleInputChange}
                              className={styles.formControl}
                            />
                          </div>
                          <button
                            className={'flex justify-between items-center pt-4 ' + styles.finishButton}
                            onClick={handleFinishBilling}
                          >
                            <p className={styles.finishButtonLabel}>Finalizar</p>
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className={'text-center mt-16 ' + styles.transferDetail}>
                            Realiza tu pago directamente en nuestra cuenta bancaria. Por favor, usa el número del pedido
                            como referencia de pago. Tu pedido no se procesará hasta que se haya recibido el importe en
                            nuestra cuenta.
                          </div>
                          <button
                            className={'flex justify-between items-center pt-4 ' + styles.finishButton}
                            onClick={handleFinishBilling}
                          >
                            <p className={styles.finishButtonLabel}>Finalizar</p>
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className={'pt-3.5'}>
                  <Tabs
                    selectedIndex={tabIndex}
                    onSelect={index => setTabIndex(index)}
                    className={styles.tabs}
                    selectedTabClassName={styles.selectedTab}
                  >
                    <TabList className={styles.tabsList}>
                      <Tab onClick={() => onClickTab(0)}>01 INFORMACIÓN</Tab>
                      {/*<Tab onClick={() => onClickTab(1)}>02 DIRECCIONES FACTURACIÓN</Tab>*/}
                      <Tab onClick={() => onClickTab(1)}>02 MÉTODO DE PAGO</Tab>
                    </TabList>
                    <TabPanel>
                      <div className={'p-4 pt-16'}>
                        <div className={'flex justify-between gap-8'}>
                          <div className={'w-full'}>
                            <div className={styles.tabTitle}>Información general</div>
                            <div className={'w-full flex justify-between items-center pt-10'}>
                              {/* <div className={'flex flex-wrap justify-start items-center'}>
                            <PurchaseAvatar
                              avatar={personalInfo.avatar || ''}
                              handleChangeAvatar={handleChangeAvatar}
                            />
                            <div className={'pl-5'}>
                              <div className={styles.profileName}>
                                {personalInfo.name + ' ' + personalInfo.surname}
                              </div>
                              <div className={styles.profileCounry}>
                                {personalInfo.town
                                  ? personalInfo.town + ', ' + personalInfo.country
                                  : personalInfo.country}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap">
                            <CommonButton label={'Descartar'} handleClick={handleDiscard} type={'outline'} />
                            <div className="ml-5">
                              <CommonButton label={'Aprobar cambios'} handleClick={handleSave} type={'fill'} />
                            </div>
                          </div>*/}
                            </div>
                          </div>
                        </div>
                        <div className={'flex justify-between gap-8 pt-16'}>
                          <div className={'w-3/5'}>
                            <CommonText
                              handleChange={e => handleChangeInfo(e, 'name')}
                              label={'Nombre'}
                              placeholder={''}
                              type={'text'}
                              value={personalInfo.name}
                            />
                          </div>
                          {/*<div className={'w-2/5'}>
                        <CommonText
                          handleChange={e => handleChangeInfo(e, 'password')}
                          label={'Contraseña'}
                          placeholder={''}
                          type={'password'}
                          value={personalInfo.password}
                        />
                      </div>*/}
                        </div>
                        <div className={'flex justify-between gap-8 pt-4'}>
                          <div className={'w-3/5'}>
                            <CommonText
                              handleChange={e => handleChangeInfo(e, 'surname')}
                              label={'Apellidos'}
                              placeholder={''}
                              type={'text'}
                              value={personalInfo.surname}
                            />
                          </div>
                          {/*<div className={'w-2/5'}>
                        <CommonText
                          handleChange={e => handleChangeInfo(e, 'meet')}
                          label={'Como nos conoció…'}
                          list={meetList}
                          type={'select'}
                          value={personalInfo.meet}
                        />
                      </div>*/}
                        </div>
                        {/* <div className={'flex justify-between gap-8 pt-4'}>
                       <div className={'w-3/5'}>
                        <CommonText
                          handleChange={e => handleChangeInfo(e, 'email')}
                          label={'Email'}
                          placeholder={''}
                          type={'email'}
                          value={personalInfo.email}
                          disabled={true}
                        />
                      </div>
                       <div className={'w-2/5'}>
                        <CommonText
                          handleChange={e => handleChangeInfo(e, 'telephone')}
                          label={'Teléfono'}
                          placeholder={''}
                          type={'tel'}
                          value={personalInfo.telephone}
                        />
                      </div>
                    </div> */}
                        <div className={'flex justify-between gap-8 pt-4'}>
                          {/*<div className={'w-3/5'}>
                        <CommonText
                          handleChange={e => handleChangeInfo(e, 'country')}
                          label={'País'}
                          placeholder={''}
                          type={'text'}
                          value={personalInfo.country}
                        />
                      </div>*/}
                          {/* <div className={'w-2/5'}>
                        <CommonText
                          handleChange={e => handleChangeInfo(e, 'emergencyPhone')}
                          label={'Teléfono emergencia'}
                          placeholder={''}
                          type={'tel'}
                          value={personalInfo.emergencyPhone}
                        />
                      </div>*/}
                        </div>
                        <div className={'flex justify-between gap-8 pt-4'}>
                          {/*<div className={'w-3/5'}>
                        <CommonText
                          handleChange={e => handleChangeInfo(e, 'address')}
                          label={'Dirección'}
                          placeholder={''}
                          type={'text'}
                          value={personalInfo.address}
                        />
                      </div>*/}
                          {/*<div className={'w-2/5'}>
                        <CommonText
                          handleChange={e => handleChangeInfo(e, 'code')}
                          label={'DNI'}
                          placeholder={''}
                          type={'text'}
                          value={personalInfo.code}
                        />
                      </div>*/}
                        </div>
                        <div className={'flex justify-between gap-8 pt-4'}>
                          {/*<div className={'w-3/5'}>
                        <CommonText
                          handleChange={e => handleChangeInfo(e, 'town')}
                          label={'Provincia'}
                          placeholder={''}
                          type={'text'}
                          value={personalInfo.town}
                        />
                      </div>*/}
                          {/*<div className={'w-2/5'}>
                        <CommonText
                          handleChange={e => handleChangeInfo(e, 'gender')}
                          label={'Sexo'}
                          list={genderList}
                          type={'select'}
                          value={personalInfo.gender}
                        />
                      </div>*/}
                        </div>
                        <div className={'flex justify-between gap-8 pt-4'}>
                          {/*<div className={'w-3/5'}>
                        <CommonText
                          handleChange={e => handleChangeInfo(e, 'birthday')}
                          label={'Fecha de nacimiento'}
                          placeholder={''}
                          type={'date'}
                          value={moment(personalInfo.birthday).format('YYYY-MM-DD')}
                        />
                      </div>*/}
                          <div className={'w-2/5'}></div>
                        </div>
                        <div className={'w-full mt-20 ' + styles.divider} />
                        <div className={'pt-24 flex justify-end'}>
                          <CommonButton label={'CONTINUAR'} handleClick={() => handleContinue(1)} type={'continue'} />
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className={'p-4 pt-16'}>
                        <div className={styles.tabTitle}>Método de pago</div>
                        <div className={'pt-9'}>
                          <Credit
                            handleChangePaymentType={handleChangePaymentType}
                            value={paymentType}
                            handleChangeCardData={handleChangeCardData}
                            redsys={redsys}
                          />
                        </div>
                        <div className={'pt-5'}>
                          <Transfer handleChangePaymentType={handleChangePaymentType} value={paymentType} />
                        </div>
                      </div>
                      <div className={'pt-24 flex justify-between items-center'}>
                        <div>
                          <PreviousButton
                            handleChangePrevious={() => handleContinue(1)}
                            label={'Volver a Direcciones facturación'}
                          />
                        </div>
                        <CommonButton label={'TERMINAR PEDIDO'} handleClick={handleFinishBilling} type={'continue'} />
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              )}
            </div>
            <div className={'col-span-12 md:col-span-3 sm:col-span-12'}>
              <ShoppingCart shoppingInfo={shoppingInfo} docData={selectedDoc} handleChangeFrame={() => {}} />
              {/* <ShoppingCart
                data={cartData}
                handleRemoveCart={handleRemoveCart}
                handleAcceptDiscount={handleAcceptDiscount}
                tabIndex={tabIndex}
                docData={selectedDoc}
              />*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
export default Purchase

Purchase.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
