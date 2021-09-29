import React, { useEffect, useState } from 'react'
import Image from 'next/image'

// images
import MainImage from 'assets/images/main.png'

// styles
import styles from 'components/Home/MainSection.module.scss'

const MainSection = () => {
  return (
    <div className={'w-full p-0 relative'}>
      <div className={'relative w-full p-0 m-0 h-screen -z-10'}>
        <Image src={MainImage} alt="" width={1440} height={898} layout="fill" objectFit="cover" />
      </div>
      <div id="topToBottom" className={styles.topToBottom}>
        Tus metas
      </div>
      <div id="bottomToTop" className={styles.bottomToTop}>
        Alcanza
      </div>
    </div>
  )
}

export default MainSection
