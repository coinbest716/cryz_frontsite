import React, { useState } from 'react'

// next components
import Image from 'next/image'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './Accordian.module.scss'

// images and icons
import PlusIcon from 'assets/images/plus.svg'
import MinusIcon from 'assets/images/minus.svg'

const Accordian = props => {
  const { title, description, mobile } = props
  const [defaultIcon, setDefautIcon] = useState(PlusIcon)
  const [flag, setFalg] = useState(false)
  const handleClick = () => {
    if (flag) {
      setDefautIcon(PlusIcon)
    } else {
      setDefautIcon(MinusIcon)
    }
    setFalg(!flag)
  }

  return (
    <div>
      <div className={styles.accordianSection}>
        <div className={mobile ? styles.m_title : styles.title}>{title}</div>
        <button className={styles.button} onClick={handleClick}>
          <Image src={defaultIcon} alt="" width={35} height={35} />
        </button>
      </div>
      {flag ? (
        <div className={globalStyles.tinyMCEClass}>
          <div className={styles.description + ' tinymce-class'} dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      ) : (
        <div className={styles.collapse} />
      )}
    </div>
  )
}

export default Accordian
