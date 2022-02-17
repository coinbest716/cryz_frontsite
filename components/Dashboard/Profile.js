import React from 'react'

// next components
import Image from 'next/image'

// images
import User from 'assets/images/team-member-01.png'

// styles
import styles from './Profile.module.scss'

const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        {User !== undefined ? <Image src={User} alt="" width={32} height={32} /> : <></>}
      </div>
      <div className={styles.name}>Mariano Pérez Fanjul</div>
    </div>
  )
}

export default Profile
