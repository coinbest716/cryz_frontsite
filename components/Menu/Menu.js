import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

// custom components
import SocialButtonGroup from 'components/SocialButtonGroup'

// images
import AcademyImage from 'assets/images/team-member-01.png'

// json data
import SocialURLData from 'assets/data/SocialURLData'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'components/Menu/Menu.module.scss'

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

  const [selectedMenu, setSelectedMenu] = useState({ id: '' })

  const handleSetItem = id => {
    setSelectedMenu(selectedMenu => ({ ...selectedMenu, id: id }))
  }

  const handleGotoLink = link => {
    setVisibility(false)
    router.push(link)
  }

  return (
    <>
      <BurgerIcon visibilty={visibility} setVisibility={setVisibility} router={router} />

      <div className={visibility === true ? styles.menuOpen : visibility === false ? styles.menuClose : styles.menu}>
        <div className={globalStyles.container + ' mx-auto h-screen flex flex-wrap content-between'}>
          <div className={styles.menuItems + ' w-full mt-32 sm:mt-48'}>
            <div className="grid grid-cols-2 flex items-center h-full">
              <div
                className="relative cursor-pointer"
                onMouseOver={() => handleSetItem('academy')}
                onClick={() => handleGotoLink('/academy')}
              >
                <div className={'opacity-75 -z-10 w-full flex justify-center ' + styles.imageArea}>
                  {selectedMenu.id === 'academy' ? <Image src={AcademyImage} alt="" width={482} height={482} /> : <></>}
                </div>
                <div className="absolute inset-y-1/4 w-full flex justify-center">
                  <a id="academy">
                    <div className={`${styles.number} invisible sm:visible mx-1`}>01</div>
                    Academy
                  </a>
                </div>
              </div>
              <div
                className="relative cursor-pointer"
                onMouseOver={() => handleSetItem('news')}
                onClick={() => handleGotoLink('/news')}
              >
                <div className={'opacity-75 -z-10 w-full flex justify-center ' + styles.imageArea}>
                  {selectedMenu.id === 'news' ? <Image src={AcademyImage} alt="" width={482} height={482} /> : <></>}
                </div>
                <div className="absolute inset-y-1/4 w-full flex justify-center">
                  <a id="news">
                    News
                    <div className={`${styles.number} invisible sm:visible mx-1`}>02</div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.socials} w-full flex flex-wrap mr-4`}>
            <div className="w-full flex justify-end">
              <SocialButtonGroup color="white" socialURL={SocialURLData[0]} />
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
