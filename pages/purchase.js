import React, { useEffect, useState } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from 'pages/purchase.module.scss'
import CommonButton from 'components/components/purchaseLogin/CommonButton'
import Link from 'next/link'
import router from 'next/router'
import ShoppingCart from 'components/components/purchaseLogin/ShoppingCart'
import shoppingCartData from 'assets/data/ShoppingCartData'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

const Purchase = () => {
  const [cartData, setCartData] = useState([])
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    setCartData(shoppingCartData)
  }, [])

  const handleRemoveCart = index => {
    let array = [...cartData]
    array.splice(index, 1)
    setCartData(array)
  }

  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-18'}>
          <div className="grid grid-cols-12 gap-4 ">
            <div className="col-span-12 md:col-span-8 sm:col-span-12 pt-32 pb-44">
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
                <TabPanel>11111</TabPanel>
                <TabPanel>2222df</TabPanel>
                <TabPanel>11111</TabPanel>
              </Tabs>
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
