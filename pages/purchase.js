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
import CommonSelect from 'components/components/purchase/CommonSelect'

const Purchase = () => {
  const [cartData, setCartData] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const [value, setValue] = useState('')
  const [date, setDate] = useState(new Date())
  const [gender, setGender] = useState('')
  const list = ['mail', 'female']

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
  const handleContinue = () => {}
  const handleChange = event => {
    console.log(event.target.velue)
    setValue(event.target.value)
  }
  const handleChangeDate = event => {
    setDate(event.target.value)
  }
  const handleChangeGender = event => {
    setGender(event.target.value)
  }

  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className="grid grid-cols-12 gap-4 ">
            <div className="col-span-12 md:col-span-8 sm:col-span-12 pt-5 pb-44 px-5">
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
                    <CommonButton label={'sdfsdf'} handleClick={handleDiscard} type={'fill'} />
                    <CommonButton label={'sdfsdf'} handleClick={handleSave} type={'outline'} />
                    <CommonButton label={'sdfsdf'} handleClick={handleContinue} type={'continue'} />
                    <CommonText
                      handleChange={handleChange}
                      label={'label'}
                      placeholder={'placeholder'}
                      type={'text'}
                      value={value}
                    />
                    <CommonText
                      handleChange={handleChange}
                      label={'password'}
                      placeholder={'password'}
                      type={'password'}
                      value={value}
                    />
                    <CommonText
                      handleChange={handleChange}
                      label={'tele'}
                      placeholder={'tele'}
                      type={'tel'} // number
                      value={value}
                    />
                    <CommonText
                      handleChange={handleChangeDate}
                      label={'date'}
                      placeholder={'date'}
                      type={'date'}
                      value={date}
                    />
                    <CommonSelect list={list} handleChange={handleChangeGender} value={gender} />
                  </TabPanel>
                  <TabPanel>2222df</TabPanel>
                  <TabPanel>11111</TabPanel>
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
