import React from 'react'

// next components
import Image from 'next/image'
import Link from 'next/link'
import router from 'next/router'

// custom components
import SocialButtonGroup from 'components/SocialButtonGroup'

// images
import ArrowLeftIcon from 'assets/images/arrow-left.svg'

// json data
import SocialURLData from 'assets/data/SocialURLData'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'components/Footer/Footer.module.scss'

const Footer = () => {
  return (
    <div className={'w-full flex flex-wrap justify-center items-center divide-y divide-white ' + styles.footerArea}>
      <div className={'w-full flex flex-wrap justify-center items-center'}>
        <div className={globalStyles.container + ' pb-7'}>
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
        </div>
      </div>
      <div className={'w-full flex flex-wrap justify-center items-center'}>
        <div className={globalStyles.container + ' pt-7'}>
          <div className={'w-full flex flex-wrap justify-between items-center ' + styles.text}>
            <div className={'flex flex-wrap justify-between'} style={{ width: '500px' }}>
              <Link href={'/docs/terms'} passHref>
                <p>Terminos y Condiciones</p>
              </Link>
              <Link href={'/docs/privacy-policy'} passHref>
                <p>Politica Privacidad</p>
              </Link>
              <Link href={'/docs/legal'} passHref>
                <p>Legal</p>
              </Link>
              <Link href={'/docs/cookies'} passHref>
                <p>Cookies</p>
              </Link>
              <Link href={'/docs/sale'} passHref>
                <p>Venta</p>
              </Link>
            </div>
            <div className={styles.text}>CrysDyaz&Co © Todos los derechos reservados</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
