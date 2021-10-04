import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

// styles
import globalStyles from 'styles/GlobalStyle.module.scss'
import styles from 'components/Menu/Menu.module.scss'

// images
import PinterestIcon from 'assets/images/pinterest.svg'
import FacebookIcon from 'assets/images/facebook.svg'
import TwitterIcon from 'assets/images/twitter.svg'
import LinkedinIcon from 'assets/images/linkedin.svg'

/**
 * rightBar: desktop
 * ribbon: mobile
 */

const BurgerIcon = ({ visibilty, setVisibility, router }) => {
  return (
    <div className={`${styles.burgerIcon01} ${visibilty && styles.show}`} onClick={() => setVisibility(prev => !prev)}>
      <span className={`${styles.topLine}`} />
      <span className={`${styles.middleLine}`} />
      <span className={`${styles.bottomLine}`} />
    </div>
  )
}

export default function Menu({ mobileStyle, rightBar = 'green', ribbon = 'green' }) {
  const [visibility, setVisibility] = useState()
  const [hoverExpertise, setHoverExpertise] = useState(0)
  const [hoverSub, setHoverSub] = useState(0)
  const router = useRouter()

  return (
    <>
      <BurgerIcon visibilty={visibility} setVisibility={setVisibility} router={router} />

      <div className={visibility === true ? styles.menuOpen : visibility === false ? styles.menuClose : styles.menu}>
        <div className={globalStyles.container + ' mx-auto'}>
          <div className={`${styles.menuItems} mt-32 sm:mt-64 sm:mb-10`}>
            <Link href="/academy">
              <a id="academy">
                <div className={`${styles.number} invisible sm:visible mx-1`}>01</div>
                Academy
              </a>
            </Link>
            <Link href="/news">
              <a id="news">
                News
                <div className={`${styles.number} invisible sm:visible mx-1`}>02</div>
              </a>
            </Link>
          </div>

          <div className={`${styles.socials} flex flex-wrap mr-4`}>
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
            <div className={`w-full flex justify-end ${styles.copyright}`}>
              CrysDyaz&Co © Todos los derechos reservados
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
