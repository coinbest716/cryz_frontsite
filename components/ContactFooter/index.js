import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import router from 'next/router'

// custom components
import SocialButtonGroup from 'components/SocialButtonGroup'

// images
// import ArrowLeftIcon from 'assets/images/arrow-left.svg'
import ArrowLeftIcon from 'assets/images/arrow-right-up.svg'

// json data
import SocialURLData from 'assets/data/SocialURLData'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'components/ContactFooter/ContactFooter.module.scss'

const ContactFooter = () => {
  // variables
  const [viewport, setViewport] = useState('desktop') // mobile, ipad, desktop

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

  return (
    <div
      className={
        'w-full flex flex-wrap justify-center items-center' +
        (viewport === 'mobile' ? ' ' : ' divide-y divide-gray-400 ') +
        styles.footerArea
      }
    >
      <div className={'w-full flex flex-wrap justify-center items-center'}>
        <div className={globalStyles.container + (viewport === 'mobile' ? ' pb-3' : ' pb-7')}>
          {viewport === 'mobile' ? (
            <div className={'w-full justify-center'}>
              <div className={'w-full flex justify-center'}>
                <button
                  className={styles.workWithUsButton + ' flex justify-between'}
                  onClick={() => router.push('work-with-us')}
                >
                  <p className={'mr-4'}>Trabaja con nosotros</p>
                  <Image src={ArrowLeftIcon} alt="" width={23} height={22} />
                </button>
              </div>
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
              <SocialButtonGroup color="gray" socialURL={SocialURLData[0]} />
            </div>
          )}
        </div>
      </div>

      <div className={'w-full flex flex-wrap justify-center items-center'}>
        <div className={globalStyles.container + (viewport === 'mobile' ? ' ' : ' pt-7')}>
          <div
            className={'w-full flex items-center' + (viewport === 'mobile' ? ' justify-center' : ' justify-between')}
          >
            <div className={styles.text}>
              <Link href={'/docs/terms'} passHref>
                <p>Terminos y Condiciones</p>
              </Link>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Link href={'/docs/privacy-policy'} passHref>
                <p>Politica Privacidad</p>
              </Link>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Link href={'/docs/legal'} passHref>
                <p>Legal</p>
              </Link>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Link href={'/docs/cookies'} passHref>
                <p>Cookies</p>
              </Link>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Link href={'/docs/sale'} passHref>
                <p>Venta</p>
              </Link>
            </div>

            {viewport !== 'mobile' && <div className={styles.text}>CrysDyaz&Co © Todos los derechos reservados</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactFooter
