import React, { useState } from 'react'
import ContactLayout from 'components/Layout/ContactLayout'
import CircularMark from 'components/components/CircularMark'
import MapContainer from 'components/components/contact/MapContainer'
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from 'pages/contact/contact.module.scss'
import Image from 'next/image'
import phoneIcon from 'public/images/phone.svg'
import emailIcon from 'public/images/email.svg'
import addressIcon from 'public/images/address.svg'
import whatsapp from 'public/images/whatsapp.svg'

const Contact = () => {
  const locations = [
    {
      name: 'Crys Dyaz & Co',
      location: {
        lat: 40.5186797,
        lng: -3.6508627,
      },
    },
  ]

  const handleClickWhatsapp = () => {
    console.log('handleClickWhatsapp')
  }

  const handleClickEmail = address => {
    window.open(`mailto:${address}`, '_blank')
  }

  return (
    <div className="flex flex-wrap justify-center pt-20">
      <div className={globlaStyle.container}>
        <div className="flex justify-between pt-24">
          <div>
            <div className={styles.topTitle}>Contacto</div>
            <div className={styles.topDash} />
            <div className={styles.topDescription + ' pt-9'}>
              ¡HOY ES EL DIA, <br />
              AHORA EL MOMENTO!
            </div>
          </div>
          <div className={'z-10'}>
            <CircularMark />
          </div>
        </div>
        <div style={{ height: '433px', width: '100%', paddingTop: '10px' }}>
          <MapContainer locations={locations} />
        </div>
      </div>
      <div className={styles.container + ' relative'}>
        <div className="absolute -top-9 right-9 cursor-pointer">
          <Image src={whatsapp} alt="" width={69} height={69} onClick={handleClickWhatsapp} />
        </div>
        <div className={globlaStyle.container}>
          <div className="grid grid-cols-12 gap-4 text-center">
            <div className="col-span-12 md:col-span-4 sm:col-span-12 pt-12">
              <Image src={phoneIcon} alt="" width={35} height={35} />
              <div className={'pt-5 ' + styles.lowTitle}>Phone</div>
              <div className={'pt-6 pb-14 ' + styles.lowDescription}>
                <div className="cursor-pointer">
                  <a href="tel:+690148244">690 148 244</a>
                </div>
                <div className="cursor-pointer">
                  <a href="tel:+910467034">91 046 70 34</a>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 sm:col-span-12 pt-12">
              <Image src={emailIcon} alt="" width={41} height={35} />
              <div className={'pt-5 ' + styles.lowTitle}>E-mail Address</div>
              <div className={'pt-6 pb-14 ' + styles.lowDescription}>
                <div className="cursor-pointer" onClick={() => handleClickEmail('info@crysdyazandco.com')}>
                  info@crysdyazandco.com
                </div>
                <div className="cursor-pointer" onClick={() => handleClickEmail('colaboraciones@crysdyazandco.com')}>
                  colaboraciones@crysdyazandco.com
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 sm:col-span-12 pt-12">
              <Image src={addressIcon} alt="" width={30} height={35} />
              <div className={'pt-5 ' + styles.lowTitle}>Office Address</div>
              <div className={'pt-6 pb-14 ' + styles.lowDescription}>
                C\ Azalea 1 Miniparc I
                <br />
                28109, Alcobendas, Madrid
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

Contact.getLayout = function getLayout(page) {
  return <ContactLayout>{page}</ContactLayout>
}
