import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Accordian.module.scss'
import PlusIcon from 'assets/images/plus.svg'
import MinusIcon from 'assets/images/minus.svg'

const Accordian = props => {
  const { title, description } = props
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
        <div className={styles.title}>{title}</div>
        <button className={styles.button} onClick={handleClick}>
          <Image src={defaultIcon} alt="" width={35} height={35} />
        </button>
      </div>
      {flag && <div className={styles.description}>{description}</div>}
    </div>
  )
}

export default Accordian
