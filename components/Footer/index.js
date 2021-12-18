import React, { useEffect, useState } from 'react'

// next components
import Image from 'next/image'
import Link from 'next/link'
import router from 'next/router'
import { isMobile } from 'react-device-detect'

// custom components
import SocialButtonGroup from 'components/SocialButtonGroup'

// images
import ArrowLeftIcon from 'assets/images/arrow-left.svg'
import whatsapp from 'public/images/whatsapp.svg'

// json data
import SocialURLData from 'assets/data/SocialURLData'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'components/Footer/Footer.module.scss'

const Footer = () => {
  const [mobile, setMobile] = useState(null)

  useEffect(() => {
    setMobile(isMobile)
  }, [setMobile])

  const handleClickWhatsapp = () => {
    console.log('handleClickWhatsapp')
  }

  return (
    <div
      className={
        'w-full flex flex-wrap justify-center items-center' +
        (mobile ? ' ' : ' divide-y divide-gray-400 ') +
        styles.footerArea
      }
    >
      <div className={'w-full flex flex-wrap justify-center items-center'}>
        <div className={globalStyles.container + (mobile ? ' ' : ' pb-7')}>
          {mobile ? (
            <div className={'w-full justify-center'}>
              <SocialButtonGroup color="white" socialURL={SocialURLData[0]} />
            </div>
          ) : (
            <div className={'w-full flex justify-between items-center'}>
              <button
                className={styles.workWithUsButton + ' flex justify-between'}
                onClick={() => router.push('work-with-us')}
              >
                <p className={'mr-4'}>Trabaja con nosotros</p>
                <Image src={ArrowLeftIcon} alt="" width={23} height={22} />
              </button>
              <Link href={'/'} passHref>
                <button className={styles.logo}>
                  <p className={styles.logo}>CRYS DYAZ & CO</p>
                </button>
              </Link>
              <SocialButtonGroup color="white" socialURL={SocialURLData[0]} />
            </div>
          )}
        </div>
      </div>
      <div className={'w-full flex flex-wrap justify-center items-center'}>
        <div className={globalStyles.container + (mobile ? ' pt-4' : ' pt-7')}>
          <div className={'w-full flex flex-wrap justify-between items-center ' + styles.text}>
            <div className={'flex flex-wrap justify-between'} style={{ width: '500px' }}>
              <Link href={'/docs/terms'} passHref>
                <p>Terminos y Condiciones</p>
              </Link>
              &nbsp;|&nbsp;
              <Link href={'/docs/privacy-policy'} passHref>
                <p>Politica Privacidad</p>
              </Link>
              &nbsp;|&nbsp;
              <Link href={'/docs/legal'} passHref>
                <p>Legal</p>
              </Link>
              &nbsp;|&nbsp;
              <Link href={'/docs/cookies'} passHref>
                <p>Cookies</p>
              </Link>
              &nbsp;|&nbsp;
              <Link href={'/docs/sale'} passHref>
                <p>Venta</p>
              </Link>
            </div>
            {!mobile && <div className={styles.text}>CrysDyaz&Co © Todos los derechos reservados</div>}
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', width: '100%', height: '42px', background: '#fff', marginTop: '24px' }}>
        <div className={'cursor-pointer'} style={{ position: 'absolute', right: '10px', bottom: '0px' }}>
          <Image src={whatsapp} alt="" width={53} height={53} onClick={handleClickWhatsapp} />
        </div>
      </div>
    </div>
  )
}

export default Footer
