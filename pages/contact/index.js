import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'

// custom components
import ContactLayout from 'components/Layout/ContactLayout'
import CircularMark from 'components/components/CircularMark'
import MapContainer from 'components/components/contact/MapContainer'

// styles
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from 'pages/contact/contact.module.scss'

// images
import phoneIcon from 'public/images/phone.svg'
import emailIcon from 'public/images/email.svg'
import addressIcon from 'public/images/address.svg'
import whatsapp from 'public/images/whatsapp.svg'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Contact = () => {
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
  const locations = [
    {
      name: 'Crys Dyaz & Co',
      location: {
        lat: 40.5186797,
        lng: -3.6508627,
      },
    },
  ]

  const [emailOne, setEmailOne] = useState('')
  const [emailTwo, setEmailTwo] = useState('')
  const [phoneOne, setPhoneOne] = useState('')
  const [phoneTwo, setPhoneTwo] = useState('')

  const [getContactInfo, { data: contactData, loading: contactLoading, error: contactError }] = useLazyQuery(
    graphql.queries.getContactInfo
  )

  // handlers
  useEffect(() => {
    getContactInfo()
  }, [getContactInfo])

  useEffect(() => {
    if (!contactError && contactData && contactData.getContactInfo) {
      setEmailOne(contactData.getContactInfo.email_one)
      setEmailTwo(contactData.getContactInfo.email_two)
      setPhoneOne(contactData.getContactInfo.phone_one)
      setPhoneTwo(contactData.getContactInfo.phone_two)
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [contactLoading, contactData, contactError])

  const handleClickWhatsapp = () => {
    console.log('handleClickWhatsapp')
  }

  return (
    <div className={'flex flex-wrap justify-center pt-20'}>
      <div className={globlaStyle.container}>
        <div className={'flex justify-between pt-24'}>
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
        <div className={'absolute -top-9 right-9 cursor-pointer'}>
          <Image src={whatsapp} alt="" width={69} height={69} onClick={handleClickWhatsapp} />
        </div>
        <div className={globlaStyle.container}>
          <div className={'grid grid-cols-12 gap-4 text-center'}>
            <div className={'col-span-12 md:col-span-4 sm:col-span-12 pt-12'}>
              <Image src={phoneIcon} alt="" width={35} height={35} />
              <div className={'pt-5 ' + styles.lowTitle}>Teléfonos</div>
              <div className={'pt-6 pb-14 ' + styles.lowDescription}>
                <div className={'cursor-pointer'}>
                  <a href={'tel:+' + phoneOne}>{phoneOne}</a>
                </div>
                <div className={'cursor-pointer'}>
                  <a href={'tel:+' + phoneTwo}>{phoneTwo}</a>
                </div>
              </div>
            </div>
            <div className={'col-span-12 md:col-span-4 sm:col-span-12 pt-12'}>
              <Image src={emailIcon} alt="" width={41} height={35} />
              <div className={'pt-5 ' + styles.lowTitle}>Direcciones de E-mail</div>
              <div className={'pt-6 pb-14 ' + styles.lowDescription}>
                <div className={'cursor-pointer'}>
                  <a href={'mailto:' + emailOne}>{emailOne}</a>
                </div>
                <div className={'cursor-pointer'}>
                  <a href={'mailto:' + emailTwo}>{emailTwo}</a>
                </div>
              </div>
            </div>
            <div className={'col-span-12 md:col-span-4 sm:col-span-12 pt-12'}>
              <Image src={addressIcon} alt="" width={30} height={35} />
              <div className={'pt-5 ' + styles.lowTitle}>Dirección centro</div>
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
