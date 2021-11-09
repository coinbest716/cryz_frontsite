import React, { useState } from 'react'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// custom components
import SocialButtonGroup from 'components/SocialButtonGroup'

// images
import CandyboxIcon from 'assets/images/candybox.svg'
import CloseIcon from 'assets/images/close.svg'

// json data
import SocialURLData from 'assets/data/SocialURLData'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'components/Menu/Menu.module.scss'

const BurgerIcon = ({ visibilty, setVisibility, router }) => {
  return (
    <div className={`${styles.burgerIcon}`} onClick={() => setVisibility(prev => !prev)}>
      {visibilty === false || visibilty === undefined ? (
        <Image src={CandyboxIcon} alt={''} width={34} height={31} />
      ) : (
        <Image src={CloseIcon} alt={''} width={34} height={31} />
      )}
    </div>
  )
}

const Menu = () => {
  const [visibility, setVisibility] = useState()
  const router = useRouter()

  const academy = '/images/menu/academy.jpg'
  const news = '/images/menu/news.jpg'
  const team = '/images/menu/team.png'

  const [activeImage, setActiveImage] = useState('')
  const [activeHover, setActiveHover] = useState(false)

  const handleGotoLink = link => {
    setVisibility(false)
    router.push(link)
  }

  const handleMouseMover = event => {
    if (activeImage === '') return
    let x = event.clientX - 200
    let y = event.clientY - 200
    let sharp = document.getElementById('sharp')
    sharp.style.left = x + 'px'
    sharp.style.top = y + 'px'
  }

  const handleMouseOver = id => {
    setActiveHover(true)
    switch (id) {
      case 'academyMenu':
        setActiveImage(academy)
        break
      case 'newsMenu':
        setActiveImage(news)
        break
      case 'teamMenu':
        setActiveImage(team)
        break
    }
  }

  const handleMouseLeave = () => {
    setActiveHover(false)
    setActiveImage('')
  }

  return (
    <>
      <BurgerIcon visibilty={visibility} setVisibility={setVisibility} router={router} />

      <div className={visibility === true ? styles.menuOpen : visibility === false ? styles.menuClose : styles.menu}>
        <div className={styles.circleImageCover} id="sharp">
          {activeImage !== '' ? (
            <img src={activeImage} alt="" className={activeHover ? styles.animationImage : styles.circleImage} />
          ) : (
            <></>
          )}
        </div>
        <div
          className={globalStyles.container + ' mx-auto h-screen flex flex-wrap content-between'}
          onMouseMove={handleMouseMover}
        >
          <div className={'h-48 xl:h-96 w-full mt-32 sm:mt-48 ' + styles.menuItems}>
            <div className={'grid grid-cols-2 gap-x-9 flex items-center h-full'}>
              <div
                className={'relative cursor-pointer h-full'}
                onClick={() => handleGotoLink('/academy')}
                onMouseOver={() => handleMouseOver('academyMenu')}
                onMouseLeave={() => handleMouseLeave()}
              >
                <div className={'absolute inset-y-1/4 w-full flex justify-center'}>
                  <a id="academyMenu">
                    <div className={`${styles.number} invisible sm:visible mx-1`}>01</div>
                    Academy
                  </a>
                </div>
              </div>
              <div
                className={'relative cursor-pointer h-full'}
                onClick={() => handleGotoLink('/news')}
                onMouseOver={() => handleMouseOver('newsMenu')}
                onMouseLeave={() => handleMouseLeave()}
              >
                <div className={'absolute inset-y-1/4 w-full flex justify-center'}>
                  <a id="newsMenu">
                    News
                    <div className={`${styles.number} invisible sm:visible mx-1`}>02</div>
                  </a>
                </div>
              </div>
            </div>
            <div className={'block xl:hidden grid grid-cols-1 gap-x-9 flex justify-center h-full'}>
              <div
                className={'relative cursor-pointer h-full'}
                onClick={() => handleGotoLink('/#team')}
                onMouseOver={() => handleMouseOver('teamMenu')}
                onMouseLeave={() => handleMouseLeave()}
              >
                <div className={'absolute inset-y-1/4 w-full flex justify-center'}>
                  <a id="teamMenu">
                    Equipo
                    <div className={`${styles.number} invisible sm:visible mx-1`}>03</div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.socials} w-full flex flex-wrap mr-4`}>
            <div className={'w-full flex justify-end'}>
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
