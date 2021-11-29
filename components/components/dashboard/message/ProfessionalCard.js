import React, { useState } from 'react'

// next components
import Image from 'next/image'

// images
import TrashIcon from 'assets/images/trash.svg'

// styles
import styles from './ProfessionalCard.module.scss'

const ProfessionalCard = props => {
  const { data, dropdownButtonHover, onClickButton } = props
  const [hover, setHover] = useState(false)
  const onMouseOver = () => {
    setHover(true)
  }
  const onMouseLeave = () => {
    if (dropdownButtonHover) {
    } else {
      setHover(false)
    }
  }
  const onClick = () => {
    setHover(!hover)
    onClickButton(true)
  }
  return (
    <div className={styles.container}>
      <div
        className={dropdownButtonHover ? styles.newMessageButtonHover : styles.newMessageButton}
        onMouseOver={() => onMouseOver(true)}
        onMouseLeave={() => onMouseLeave(false)}
        onClick={() => onClick(true)}
      >
        <div style={{ fontSize: '20px', marginTop: '-5px', marginRight: '5px' }}>+</div>Nuevo mensaje
      </div>
      <div className={'grid justify-center items-center'}>
        <Image src={TrashIcon} alt={''} width={31} height={31} />
      </div>
    </div>
  )
}

export default ProfessionalCard
