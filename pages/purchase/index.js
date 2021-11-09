import React, { useEffect, useState } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from './purchase.module.scss'
import Link from 'next/link'
import router from 'next/router'
import ShoppingCart from 'components/components/purchaseLogin/ShoppingCart'
import shoppingCartData from 'assets/data/ShoppingCartData'
import 'react-tabs/style/react-tabs.css'
import dynamic from 'next/dynamic'
const Tabs = dynamic(
  import('react-tabs').then(mod => mod.Tabs),
  { ssr: false }
) // disable ssr
import { Tab, TabList, TabPanel } from 'react-tabs'
import CommonButton from 'components/components/purchase/CommonButton'
import CommonText from 'components/components/purchase/CommonText'
import PurchaseAvatar from 'components/components/purchase/PurchaseAvatar'
import BillingDoc from 'components/components/purchase/BillingDoc'
import PreviousButton from 'components/components/purchase/PreviousButton'
import Credit from 'components/components/purchase/Credit'
import Transfer from 'components/components/purchase/Transfer'
import toast from 'react-hot-toast'

const Purchase = () => {
  const [cartData, setCartData] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    password: '',
    surname: '',
    meet: '',
    email: '',
    telephone: '',
    country: '',
    emergencyPhone: '',
    address: '',
    code: '',
    town: '',
    gender: '',
    birthday: new Date(),
  })
  const [billingAddress, setBillingAddress] = useState({
    addressAlias: '',
    surname: '',
    email: '',
    town: '',
    postal: '',
    name: '',
    code: '',
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
      value: 'town',
      type: 'text',
      label: 'Población',
    },
    {
      value: 'postal',
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
      value: 'code',
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
      label: 'Pais',
    },
  ]
  const list = ['Hombre', 'Mujer']
  const meetList = ['Instagram', 'Facebook', 'Prensa', 'Por un amigo', 'Otros']

  const [frameType, setFrameType] = useState('frame1')

  const [redsys, setRedsys] = useState(false)
  const [paymentType, setPaymentType] = useState('')
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvc: '' })

  useEffect(() => {
    setCartData(shoppingCartData)
    setRedsys(false)
    const currentState = router.asPath.split('#')
    if (currentState[1] === 'address') {
      setTabIndex(1)
      router.push('/purchase#address', undefined, { shallow: true })
    } else {
      router.push('/purchase#information', undefined, { shallow: true })
    }
  }, [])

  const handleRemoveCart = index => {
    let array = [...cartData]
    array.splice(index, 1)
    setCartData(array)
  }

  const handleDiscard = () => {}
  const handleSave = () => {}
  const handleContinue = tabIndex => {
    setTabIndex(tabIndex)
    switch (tabIndex) {
      case 0:
        router.push('/purchase#information', undefined, { shallow: true })
        break

      case 1:
        router.push('/purchase#address', undefined, { shallow: true })
        break
      case 2:
        router.push('/purchase#payment', undefined, { shallow: true })
        break
    }
  }

  const handleChangeInfo = (event, key) => {
    setPersonalInfo({ ...personalInfo, [key]: event.target.value })
  }

  const handleChangeBillingAddress = (event, key) => {
    setBillingAddress({ ...billingAddress, [key]: event.target.value })
  }

  const handleChangeFrame = event => {
    setFrameType(event.target.name)
  }

  const handleDeleteBilling = () => {}
  const handleSaveBilling = () => {}

  const handleChangePaymentType = event => {
    setPaymentType(event.target.name)
  }
  const handleChangeCardData = (name, value) => {
    console.log(name, value)
    setCardData({ ...cardData, [name]: value })
  }
  const handleFinishBilling = () => {
    if (paymentType === '') {
      toast.error('You should select payment type!')
      return
    } else if (paymentType === 'card') {
      router.push('/purchase/credit-success')
    } else if (paymentType === 'transfer') {
      router.push('/purchase/transfer-success')
    }
  }

  const handleAcceptDiscount = () => {}

  const onClickTab = tabType => {
    router.push(`/purchase#${tabType}`, undefined, { shallow: true })
  }

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className={'grid grid-cols-12 gap-4 '}>
            <div className={'col-span-12 md:col-span-9 sm:col-span-12 pt-5 pb-20 px-5'}>
              <div className={'pt-3.5'}>
                <Tabs
                  selectedIndex={tabIndex}
                  onSelect={index => setTabIndex(index)}
                  className={styles.tabs}
                  selectedTabClassName={styles.selectedTab}
                >
                  <TabList className={styles.tabsList}>
                    <Tab onClick={() => onClickTab('information')}>01 INFORMACIÓN</Tab>
                    <Tab onClick={() => onClickTab('address')}>02 DIRECCIONES FACTURACIÓN</Tab>
                    <Tab onClick={() => onClickTab('payment')}>03 MÉTODO DE PAGO</Tab>
                  </TabList>
                  <TabPanel>
                    <div className={'p-4 pt-16'}>
                      <div className={'flex justify-between gap-8'}>
                        <div className={'w-full'}>
                          <div className={styles.tabTitle}>Información general</div>
                          <div className={'w-full flex justify-between items-center pt-10'}>
                            <div className={'flex justify-start items-center'}>
                              <PurchaseAvatar avatar={''} />
                              <div className={'pl-5'}>
                                <div className={styles.profileName}>Mariano Pérez Fanjul</div>
                                <div className={styles.profileCounry}>Madrid, Spain</div>
                              </div>
                            </div>
                            <CommonButton label={'Descartar'} handleClick={handleSave} type={'outline'} />
                            <CommonButton label={'Aprobar cambios'} handleClick={handleDiscard} type={'fill'} />
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
                        <div className={'w-2/5'}>
                          <CommonText
                            handleChange={e => handleChangeInfo(e, 'password')}
                            label={'Contraseña'}
                            placeholder={''}
                            type={'password'}
                            value={personalInfo.password}
                          />
                        </div>
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
                        <div className={'w-2/5'}>
                          <CommonText
                            handleChange={e => handleChangeInfo(e, 'meet')}
                            label={'Como nos conoció…'}
                            list={meetList}
                            type={'select'}
                            value={personalInfo.meet}
                          />
                        </div>
                      </div>
                      <div className={'flex justify-between gap-8 pt-4'}>
                        <div className={'w-3/5'}>
                          <CommonText
                            handleChange={e => handleChangeInfo(e, 'email')}
                            label={'Email'}
                            placeholder={''}
                            type={'email'}
                            value={personalInfo.email}
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
                      </div>
                      <div className={'flex justify-between gap-8 pt-4'}>
                        <div className={'w-3/5'}>
                          <CommonText
                            handleChange={e => handleChangeInfo(e, 'country')}
                            label={'Pais'}
                            placeholder={''}
                            type={'text'}
                            value={personalInfo.country}
                          />
                        </div>
                        <div className={'w-2/5'}>
                          <CommonText
                            handleChange={e => handleChangeInfo(e, 'emergencyPhone')}
                            label={'Teléfono emergencia'}
                            placeholder={''}
                            type={'tel'}
                            value={personalInfo.emergencyPhone}
                          />
                        </div>
                      </div>
                      <div className={'flex justify-between gap-8 pt-4'}>
                        <div className={'w-3/5'}>
                          <CommonText
                            handleChange={e => handleChangeInfo(e, 'address')}
                            label={'Dirección'}
                            placeholder={''}
                            type={'text'}
                            value={personalInfo.address}
                          />
                        </div>
                        <div className={'w-2/5'}>
                          <CommonText
                            handleChange={e => handleChangeInfo(e, 'code')}
                            label={'DNI'}
                            placeholder={''}
                            type={'text'}
                            value={personalInfo.code}
                          />
                        </div>
                      </div>
                      <div className={'flex justify-between gap-8 pt-4'}>
                        <div className={'w-3/5'}>
                          <CommonText
                            handleChange={e => handleChangeInfo(e, 'town')}
                            label={'Ciudad'}
                            placeholder={''}
                            type={'text'}
                            value={personalInfo.town}
                          />
                        </div>
                        <div className={'w-2/5'}>
                          <CommonText
                            handleChange={e => handleChangeInfo(e, 'gender')}
                            label={'Sexo'}
                            list={list}
                            type={'select'}
                            value={personalInfo.gender}
                          />
                        </div>
                      </div>
                      <div className={'flex justify-between gap-8 pt-4'}>
                        <div className={'w-3/5'}>
                          <CommonText
                            handleChange={e => handleChangeInfo(e, 'birthday')}
                            label={'Fecha de nacimiento'}
                            placeholder={''}
                            type={'date'}
                            value={personalInfo.birthday}
                          />
                        </div>
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
                      <div className={styles.tabTitle}>Direcciones facturación</div>
                      <div className="grid grid-cols-12 gap-4 pt-8">
                        <div className="col-span-12 md:col-span-6 sm:col-span-12 ">
                          <BillingDoc handleChangeFrame={handleChangeFrame} frameType={'frame1'} value={frameType} />
                        </div>
                        <div className="col-span-12 md:col-span-6 sm:col-span-12 ">
                          <BillingDoc handleChangeFrame={handleChangeFrame} frameType={'frame2'} value={frameType} />
                        </div>
                      </div>
                      <div className={'pt-6 ' + styles.newAddress}>Nueva dirección</div>
                      <div className="grid grid-cols-12 gap-4 pt-8">
                        <div className="col-span-12 md:col-span-7 sm:col-span-12">
                          {billingAddressLeftInfo.map((item, index) => (
                            <div className="py-2" key={index}>
                              <CommonText
                                handleChange={e => handleChangeBillingAddress(e, item.value)}
                                label={item.label}
                                placeholder={''}
                                type={item.type}
                                value={billingAddress[item.value]}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="col-span-12 md:col-span-5 sm:col-span-12 ">
                          {billingAddressRightInfo.map((item, index) => (
                            <div className="py-2" key={index}>
                              <CommonText
                                handleChange={e => handleChangeBillingAddress(e, item.value)}
                                label={item.label}
                                placeholder={''}
                                type={item.type}
                                value={billingAddress[item.value]}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={'flex justify-end gap-8 pt-6'}>
                        <CommonButton label={'Borrar dirección'} handleClick={handleDeleteBilling} type={'icon'} />
                        <CommonButton label={'Aceptar cambios'} handleClick={handleSaveBilling} type={'fill'} />
                      </div>
                      <div className={'w-full mt-20 ' + styles.divider} />
                      <div className={'pt-24 flex justify-between items-center'}>
                        <div>
                          <PreviousButton
                            handleChangePrevious={() => handleContinue(0)}
                            label={'Volver a Información'}
                          />
                        </div>
                        <CommonButton label={'CONTINUAR'} handleClick={() => handleContinue(2)} type={'continue'} />
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
            </div>
            <div className={'col-span-12 md:col-span-3 sm:col-span-12'}>
              <ShoppingCart
                data={cartData}
                handleRemoveCart={handleRemoveCart}
                handleAcceptDiscount={handleAcceptDiscount}
                tabIndex={tabIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Purchase

Purchase.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
