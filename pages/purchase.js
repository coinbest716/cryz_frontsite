import React, { useEffect, useState } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from 'pages/purchase.module.scss'
import Link from 'next/link'
import router from 'next/router'
import ShoppingCart from 'components/components/purchaseLogin/ShoppingCart'
import shoppingCartData from 'assets/data/ShoppingCartData'
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
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

const Purchase = () => {
  const [cartData, setCartData] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const [birthday, setBirthday] = useState(new Date())
  const [name, setName] = useState('')
  const [password, setPasssword] = useState('')
  const [surname, setSurname] = useState('')
  const [meet, setMeet] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [country, setCountry] = useState('')
  const [emergencyPhone, setEmergencyPhone] = useState('')
  const [address, setAddress] = useState('')
  const [code, setCode] = useState('')
  const [town, setTown] = useState('')
  const [gender, setGender] = useState('')
  const list = ['male', 'female']

  const [frameType, setFrameType] = useState('frame1')
  const [nameBilling, setNameBilling] = useState('')
  const [titleBilling, setTitleBilling] = useState('')
  const [emailBilling, setEmailBilling] = useState('')
  const [codeBilling, setCodeBilling] = useState('')
  const [addressBilling, setAddressBilling] = useState('')
  const [phoneBilling, setPhoneBilling] = useState('')
  const [countryBilling, setCountryBilling] = useState('')
  const [postalBilling, setPostalBilling] = useState('')

  const [paymentType, setPaymentType] = useState('')
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvc: '' })

  useEffect(() => {
    setCartData(shoppingCartData)
  }, [])

  const handleRemoveCart = index => {
    let array = [...cartData]
    array.splice(index, 1)
    setCartData(array)
  }

  const handleDiscard = () => {}
  const handleSave = () => {}
  const handleContinue = () => {
    setTabIndex(1)
  }

  const handleChangeBirthday = event => {
    setBirthday(event.target.value)
  }
  const handleChangeGender = event => {
    setGender(event.target.value)
  }

  const handleChangeName = event => {
    setName(event.target.value)
  }
  const handleChangePassword = event => {
    setPasssword(event.target.value)
  }
  const handleChangeSurname = event => {
    setSurname(event.target.value)
  }
  const handleChangeMeet = event => {
    setMeet(event.target.value)
  }
  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }
  const handleChangeTelephone = event => {
    setTelephone(event.target.value)
  }
  const handleChangeCountry = event => {
    setCountry(event.target.value)
  }
  const handleChangeEmergencyPhone = event => {
    setEmergencyPhone(event.target.value)
  }
  const handleChangeAddress = event => {
    setAddress(event.target.value)
  }
  const handleChangeCode = event => {
    setCode(event.target.value)
  }
  const handleChangeTown = event => {
    setTown(event.target.value)
  }

  const handleChangeFrame = event => {
    setFrameType(event.target.name)
  }
  const handleChangeNameBilling = event => {
    setNameBilling(event.target.value)
  }
  const handleChangeTitleBilling = event => {
    setTitleBilling(event.target.value)
  }
  const handleChangeEmailBilling = event => {
    setEmailBilling(event.target.value)
  }
  const handleChangeCodeBilling = event => {
    setCodeBilling(event.target.value)
  }
  const handleChangeAddressBilling = event => {
    setAddressBilling(event.target.value)
  }
  const handleChangePhoneBilling = event => {
    setPhoneBilling(event.target.value)
  }
  const handleChangeCountryBilling = event => {
    setCountryBilling(event.target.value)
  }
  const handleChangePostalBilling = event => {
    setPostalBilling(event.target.value)
  }
  const handleDeleteBilling = () => {}
  const handleSaveBilling = () => {}
  const handleChangePrevious = () => {
    setTabIndex(0)
  }
  const handleContinueBilling = () => {
    setTabIndex(2)
  }

  const handleChangePaymentType = event => {
    setPaymentType(event.target.name)
  }
  const handleChangeCardData = (name, value) => {
    console.log(name, value)
    setCardData({ ...cardData, [name]: value })
  }
  const handleChangeBillingPage = () => {
    setTabIndex(1)
  }
  const handleFinishBilling = () => {}

  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className="grid grid-cols-12 gap-4 ">
            <div className="col-span-12 md:col-span-8 sm:col-span-12 pt-5 pb-20 px-5">
              <div>
                <Tabs
                  selectedIndex={tabIndex}
                  onSelect={index => setTabIndex(index)}
                  className={styles.tabs}
                  selectedTabClassName={styles.selectedTab}
                >
                  <TabList className={styles.tabsList}>
                    <Tab>01 INFORMACIÓN</Tab>
                    <Tab>02 DIRECCIONES FACTURACIÓN</Tab>
                    <Tab>03 MÉTODO DE PAGO</Tab>
                  </TabList>
                  <TabPanel>
                    <div className="p-4 pt-16">
                      <div className="flex justify-between gap-8">
                        <div className="w-full">
                          <div className={styles.tabTitle}>Información general</div>
                          <div className="w-full flex justify-between items-center pt-10">
                            <PurchaseAvatar avatar={''} />
                            <div className="pl-5">
                              <div className={styles.profileName}>Mariano Pérez Fanjul</div>
                              <div className={styles.profileCounry}>Madrid, Spain</div>
                            </div>
                            <CommonButton label={'Descartar'} handleClick={handleSave} type={'outline'} />
                            <CommonButton label={'Aprobar cambios'} handleClick={handleDiscard} type={'fill'} />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between gap-8 pt-16">
                        <div className="w-3/5">
                          <CommonText
                            handleChange={handleChangeName}
                            label={'Nombre'}
                            placeholder={''}
                            type={'text'}
                            value={name}
                          />
                        </div>
                        <div className="w-2/5">
                          <CommonText
                            handleChange={handleChangePassword}
                            label={'Contraseña'}
                            placeholder={''}
                            type={'password'}
                            value={password}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between gap-8 pt-4">
                        <div className="w-3/5">
                          <CommonText
                            handleChange={handleChangeSurname}
                            label={'Surnames'}
                            placeholder={''}
                            type={'text'}
                            value={surname}
                          />
                        </div>
                        <div className="w-2/5">
                          <CommonText
                            handleChange={handleChangeMeet}
                            label={'Como nos conoció…'}
                            placeholder={''}
                            type={'password'}
                            value={meet}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between gap-8 pt-4">
                        <div className="w-3/5">
                          <CommonText
                            handleChange={handleChangeEmail}
                            label={'Email'}
                            placeholder={''}
                            type={'email'}
                            value={email}
                          />
                        </div>
                        <div className="w-2/5">
                          <CommonText
                            handleChange={handleChangeTelephone}
                            label={'Teléfono'}
                            placeholder={''}
                            type={'tel'}
                            value={telephone}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between gap-8 pt-4">
                        <div className="w-3/5">
                          <CommonText
                            handleChange={handleChangeCountry}
                            label={'Pais'}
                            placeholder={''}
                            type={'text'}
                            value={country}
                          />
                        </div>
                        <div className="w-2/5">
                          <CommonText
                            handleChange={handleChangeEmergencyPhone}
                            label={'Teléfono emergencia'}
                            placeholder={''}
                            type={'tel'}
                            value={emergencyPhone}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between gap-8 pt-4">
                        <div className="w-3/5">
                          <CommonText
                            handleChange={handleChangeAddress}
                            label={'Dirección'}
                            placeholder={''}
                            type={'text'}
                            value={address}
                          />
                        </div>
                        <div className="w-2/5">
                          <CommonText
                            handleChange={handleChangeCode}
                            label={'DNI'}
                            placeholder={''}
                            type={'text'}
                            value={code}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between gap-8 pt-4">
                        <div className="w-3/5">
                          <CommonText
                            handleChange={handleChangeTown}
                            label={'Ciudad'}
                            placeholder={''}
                            type={'text'}
                            value={town}
                          />
                        </div>
                        <div className="w-2/5">
                          <CommonText
                            label={'Sexo'}
                            list={list}
                            handleChange={handleChangeGender}
                            value={gender}
                            type={'select'}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between gap-8 pt-4">
                        <div className="w-3/5">
                          <CommonText
                            handleChange={handleChangeBirthday}
                            label={'Fecha de nacimiento'}
                            placeholder={''}
                            type={'date'}
                            value={birthday}
                          />
                        </div>
                        <div className="w-2/5"></div>
                      </div>
                      <div className={'w-full mt-20 ' + styles.divider} />
                      <div className="pt-24 flex justify-end">
                        <CommonButton label={'CONTINUAR'} handleClick={handleContinue} type={'continue'} />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="p-4 pt-16">
                      <div className={styles.tabTitle}>Direcciones facturación</div>
                      <div className="flex justify-between gap-8 pt-10">
                        <div className="w-1/2">
                          <BillingDoc handleChangeFrame={handleChangeFrame} frameType={'frame1'} value={frameType} />
                        </div>
                        <div className="w-1/2">
                          <BillingDoc handleChangeFrame={handleChangeFrame} frameType={'frame2'} value={frameType} />
                        </div>
                      </div>
                      <div className={'pt-6 ' + styles.newAddress}>Nueva dirección</div>
                      <div className="flex justify-between gap-8 pt-6">
                        <div className="w-7/12">
                          <CommonText
                            handleChange={handleChangeNameBilling}
                            label={'Nombre completo'}
                            placeholder={''}
                            type={'text'}
                            value={nameBilling}
                          />
                        </div>
                        <div className="w-5/12 flex justify-end">
                          <div className="w-2/3">
                            <CommonText
                              handleChange={handleChangeTitleBilling}
                              label={'Titulo'}
                              placeholder={''}
                              type={'text'}
                              value={titleBilling}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between gap-8 pt-6">
                        <div className="w-7/12">
                          <CommonText
                            handleChange={handleChangeEmailBilling}
                            label={'Email'}
                            placeholder={''}
                            type={'email'}
                            value={emailBilling}
                          />
                        </div>
                        <div className="w-5/12">
                          <CommonText
                            handleChange={handleChangeCodeBilling}
                            label={'NIF/NIE'}
                            placeholder={''}
                            type={'password'}
                            value={codeBilling}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between gap-8 pt-6">
                        <div className="w-7/12">
                          <CommonText
                            handleChange={handleChangeAddressBilling}
                            label={'Dirección facturación'}
                            placeholder={''}
                            type={'text'}
                            value={addressBilling}
                          />
                        </div>
                        <div className="w-5/12">
                          <CommonText
                            handleChange={handleChangePhoneBilling}
                            label={'Teléfono'}
                            placeholder={''}
                            type={'text'}
                            value={phoneBilling}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between gap-8 pt-6">
                        <div className="w-7/12">
                          <CommonText
                            handleChange={handleChangeCountryBilling}
                            label={'Pais'}
                            placeholder={''}
                            type={'text'}
                            value={countryBilling}
                          />
                        </div>
                        <div className="w-5/12">
                          <CommonText
                            handleChange={handleChangePostalBilling}
                            label={'CP'}
                            placeholder={''}
                            type={'number'}
                            value={postalBilling}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-8 pt-6">
                        <CommonButton label={'Borrar dirección'} handleClick={handleDeleteBilling} type={'icon'} />
                        <CommonButton label={'Aceptar cambios'} handleClick={handleSaveBilling} type={'fill'} />
                      </div>
                      <div className={'w-full mt-20 ' + styles.divider} />
                      <div className="pt-24 flex justify-between items-center">
                        <div>
                          <PreviousButton handleChangePrevious={handleChangePrevious} label={'Volver a Información'} />
                        </div>
                        <CommonButton label={'CONTINUAR'} handleClick={handleContinueBilling} type={'continue'} />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="p-4 pt-16">
                      <div className={styles.tabTitle}>Método de pago</div>
                      <div className="pt-9">
                        <Credit
                          handleChangePaymentType={handleChangePaymentType}
                          value={paymentType}
                          handleChangeCardData={handleChangeCardData}
                        />
                      </div>
                      <div className="pt-5">
                        <Transfer handleChangePaymentType={handleChangePaymentType} value={paymentType} />
                      </div>
                    </div>
                    <div className="pt-24 flex justify-between items-center">
                      <div>
                        <PreviousButton
                          handleChangePrevious={handleChangeBillingPage}
                          label={'Volver a Direcciones facturación'}
                        />
                      </div>
                      <CommonButton label={'TERMINAR PEDIDO'} handleClick={handleFinishBilling} type={'continue'} />
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 sm:col-span-12">
              <ShoppingCart data={cartData} handleRemoveCart={handleRemoveCart} />
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
