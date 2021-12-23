import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// custom components
import SocialButtonGroup from 'components/SocialButtonGroup'

// json data
import SocialURLData from 'assets/data/SocialURLData'

// next components
import Image from 'next/image'

// custom components
import ContactLayout from 'components/Layout/ContactLayout'
import CircularMark from 'components/components/CircularMark'
import MapContainer from 'components/components/contact/MapContainer'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
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
  const [viewport, setViewport] = useState('desktop') // mobile, ipad, desktop
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
    if (window.innerWidth > 1024) {
      setViewport('desktop')
    } else if (window.innerWidth === 1024) {
      setViewport('ipad')
    } else {
      setViewport('mobile')
    }
  }, [])

  useEffect(() => {
    const resizeFunction = () => {
      if (window.innerWidth > 1024) {
        setViewport('desktop')
      } else if (window.innerWidth === 1024) {
        setViewport('ipad')
      } else {
        setViewport('mobile')
      }
    }
    window.addEventListener('resize', resizeFunction)
  }, [])
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
      <div className={globalStyles.container}>
        <div className={'flex justify-between' + (viewport === 'mobile' ? ' pt-4' : ' pt-24')}>
          <div className={'px-4'}>
            <div className={styles.topTitle}>Contacto</div>
            <div className={styles.topDash} />
            <div className={styles.topDescription + (viewport === 'mobile' ? ' pt-4' : ' pt-9')}>
              ¡HOY ES EL DIA, <br />
              AHORA EL MOMENTO!
            </div>
          </div>
          {viewport !== 'mobile' && (
            <div className={'z-10'}>
              <CircularMark />
            </div>
          )}
        </div>
        <div
          style={{
            position: 'relative',
            height: viewport === 'mobile' ? '380px' : '433px',
            width: '100%',
            marginTop: viewport === 'mobile' ? '20px' : '10px',
          }}
        >
          <MapContainer viewport={viewport} locations={locations} />
          <div
            style={{
              position: 'absolute',
              width: '100%',
              background: 'rgba(143, 161, 165, 0.84)',
              bottom: '0px',
            }}
          >
            {viewport === 'mobile' && (
              <div className={globalStyles.container}>
                <div className={'grid grid-cols-12 text-center px-4 pt-5 pb-2'}>
                  <div
                    className={'col-span-4'}
                    style={{ border: '1px solid #fff', borderRight: 'none', paddingTop: '10px' }}
                  >
                    <Image src={phoneIcon} alt="" width={15} height={15} />
                    <div className={'pt-2 ' + styles.lowDescription}>
                      <div className={'cursor-pointer'}>
                        <a href={'tel:+' + phoneOne}>{phoneOne}</a>
                      </div>
                      <div className={'cursor-pointer'}>
                        <a href={'tel:+' + phoneTwo}>{phoneTwo}</a>
                      </div>
                    </div>
                  </div>
                  <div className={'col-span-4'} style={{ border: '1px solid #fff', paddingTop: '10px' }}>
                    <Image src={emailIcon} alt="" width={20} height={15} />
                    <div className={'pt-2 ' + styles.lowDescription}>
                      <div className={'cursor-pointer'}>
                        <a target="_blank" href={'mailto:' + emailOne} rel="noopener noreferrer">
                          {emailOne.split('@')[0]}
                        </a>
                      </div>
                      <div className={'cursor-pointer'}>
                        <a target="_blank" href={'mailto:' + emailTwo} rel="noopener noreferrer">
                          {emailTwo.split('@')[0]}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className={'col-span-4'}
                    style={{ border: '1px solid #fff', borderLeft: 'none', paddingTop: '10px' }}
                  >
                    <Image src={addressIcon} alt="" width={12} height={15} />
                    <div className={'pt-2 ' + styles.lowDescription}>
                      Azalea 1 Miniparc I
                      <br />
                      Alcobendas
                      <br />
                      Madrid
                    </div>
                  </div>
                </div>
                <div className={'pb-2'}>
                  <SocialButtonGroup color="white" socialURL={SocialURLData[0]} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {viewport === 'mobile' ? (
        <div className={'cursor-pointer'} style={{ position: 'fixed', zIndex: 999, right: '10px', bottom: '0px' }}>
          <Image src={whatsapp} alt="" width={53} height={53} onClick={handleClickWhatsapp} />
        </div>
      ) : (
        <div className={styles.container + ' relative'}>
          <div className={'absolute -top-9 right-9 cursor-pointer'}>
            <Image src={whatsapp} alt="" width={69} height={69} onClick={handleClickWhatsapp} />
          </div>
          <div className={globalStyles.container}>
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
                    <a target="_blank" href={'mailto:' + emailOne} rel="noopener noreferrer">
                      {emailOne}
                    </a>
                  </div>
                  <div className={'cursor-pointer'}>
                    <a target="_blank" href={'mailto:' + emailTwo} rel="noopener noreferrer">
                      {emailTwo}
                    </a>
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
      )}
    </div>
  )
}

export default Contact

Contact.getLayout = function getLayout(page) {
  return <ContactLayout>{page}</ContactLayout>
}
