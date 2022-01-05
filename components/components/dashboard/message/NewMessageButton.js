import React, { useState } from 'react'

// next components
// import Image from 'next/image'

// images
// import TrashOutlineIcon from 'assets/images/trash-outline.svg'

// styles
import styles from './NewMessageButton.module.scss'

const NewMessageButton = props => {
  const { dropdownButtonHover, onClickButton, viewport } = props
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
  return viewport !== 'mobile' ? (
    <div className={styles.container}>
      <div
        className={dropdownButtonHover ? styles.newMessageButtonHover : styles.newMessageButton}
        onMouseOver={() => onMouseOver(true)}
        onMouseLeave={() => onMouseLeave(false)}
        onClick={() => onClick(true)}
      >
        <div style={{ fontSize: '20px', marginTop: '-5px', marginRight: '5px' }}>+</div>Nuevo mensaje
      </div>
      {/* {viewport !== 'mobile' && (
        <div className={'grid justify-center items-center'}>
          <Image src={TrashOutlineIcon} alt={''} width={31} height={31} />
        </div>
      )} */}
    </div>
  ) : (
    <div className={styles.container}>
      <div
        className={dropdownButtonHover ? styles.mobileNewMessageButtonHover : styles.mobileNewMessageButton}
        onMouseOver={() => onMouseOver(true)}
        onMouseLeave={() => onMouseLeave(false)}
        onClick={() => onClick(true)}
      >
        <div style={{ fontSize: '20px', marginTop: '-5px' }}>+</div>Nuevo mensaje
      </div>
      {/* {viewport !== 'mobile' && (
        <div className={'grid justify-center items-center'}>
          <Image src={TrashOutlineIcon} alt={''} width={31} height={31} />
        </div>
      )} */}
    </div>
  )
}

export default NewMessageButton
