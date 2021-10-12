import React from 'react'

// next components
import Image from 'next/image'

// images
import ArrowRightUpPink from 'assets/images/arrow-right-up-pink.svg'

// styles
import styles from 'components/components/OutlineButton.module.scss'

const OutlineButton = props => {
  const { title, link, onClick } = props
  return (
    <button
      className={'w-full bg-transparent flex justify-center items-center ' + styles.outlineButton}
      onClick={() => onClick(link)}
    >
      <p className={'mr-6'}>{title}</p>
      <Image src={ArrowRightUpPink} alt="" width={36} height={34} />
    </button>
  )
}

export default OutlineButton
