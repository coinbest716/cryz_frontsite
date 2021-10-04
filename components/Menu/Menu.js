import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

// styles
import globalStyles from 'styles/GlobalStyle.module.scss'
import styles from 'components/Menu/Menu.module.scss'

// images
import AcademyImage from 'assets/images/team-member-01.png'
import PinterestIcon from 'assets/images/pinterest.svg'
import FacebookIcon from 'assets/images/facebook.svg'
import TwitterIcon from 'assets/images/twitter.svg'
import LinkedinIcon from 'assets/images/linkedin.svg'

const BurgerIcon = ({ visibilty, setVisibility, router }) => {
  return (
    <div className={`${styles.burgerIcon01} ${visibilty && styles.show}`} onClick={() => setVisibility(prev => !prev)}>
      <span className={`${styles.topLine}`} />
      <span className={`${styles.middleLine}`} />
      <span className={`${styles.bottomLine}`} />
    </div>
  )
}

const Menu = () => {
  const [visibility, setVisibility] = useState()
  const router = useRouter()

  return (
    <>
      <BurgerIcon visibilty={visibility} setVisibility={setVisibility} router={router} />

      <div className={visibility === true ? styles.menuOpen : visibility === false ? styles.menuClose : styles.menu}>
        <div className={globalStyles.container + ' mx-auto h-screen flex flex-wrap content-between'}>
          <div className={styles.menuItems + ' w-full mt-32 sm:mt-48'}>
            <div className="grid grid-cols-2 cursor-pointer flex items-center h-full">
              <div className="relative">
                <div className="opacity-75 -z-10">
                  <Image src={AcademyImage} alt="" width={482} height={482} />
                </div>
                <div className="absolute inset-y-1/4 w-full flex justify-center">
                  <Link href="/academy">
                    <a id="academy">
                      <div className={`${styles.number} invisible sm:visible mx-1`}>01</div>
                      Academy
                    </a>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="opacity-75 -z-10">
                  <Image src={AcademyImage} alt="" width={482} height={482} />
                </div>
                <div className="absolute inset-y-1/4 w-full flex justify-center">
                  <Link href="/news">
                    <a id="news">
                      News
                      <div className={`${styles.number} invisible sm:visible mx-1`}>02</div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.socials} w-full flex flex-wrap mr-4`}>
            <div className="w-full flex justify-end">
              <div className="mx-1">
                <Link href={'https://www.pinterest.com/'}>
                  <button>
                    <Image src={PinterestIcon} alt="" with={24} height={24} />
                  </button>
                </Link>
              </div>
              <div className="mx-1">
                <Link href={'https://www.facebook.com/'}>
                  <button>
                    <Image src={FacebookIcon} alt="" with={24} height={24} />
                  </button>
                </Link>
              </div>
              <div className="mx-1">
                <Link href={'https://www.twitter.com/'}>
                  <button>
                    <Image src={TwitterIcon} alt="" with={24} height={24} />
                  </button>
                </Link>
              </div>
              <div className="mx-1">
                <Link href={'https://www.linkedin.com/'}>
                  <button>
                    <Image src={LinkedinIcon} alt="" with={24} height={24} />
                  </button>
                </Link>
              </div>
            </div>
            <div className={styles.whiteLine}></div>
            <div className={`w-full flex justify-end mb-10 ${styles.copyright}`}>
              CrysDyaz&Co © Todos los derechos reservados
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
