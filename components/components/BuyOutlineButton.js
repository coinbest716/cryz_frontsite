import React from 'react'

// next components
import Image from 'next/image'

// images
import ArrowRightPink from 'assets/images/arrow-right-pink.svg'

// styles
import styles from 'components/components/BuyOutlineButton.module.scss'

const BuyOutlineButton = props => {
  const { title, link, onClick } = props
  return (
    <button
      className={'flex justify-between items-center px-2 my-2 ' + styles.outlineButton}
      onClick={() => onClick(link)}
    >
      <p className={'mr-4'}>{title}</p>
      <Image src={ArrowRightPink} alt="" width={12} height={10} />
    </button>
  )
}

export default BuyOutlineButton
