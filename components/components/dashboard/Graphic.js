import React from 'react'
import Image from 'next/image'
import CommonButton from 'components/components/purchase/CommonButton'
import CommonText from 'components/components/purchase/CommonText'
import User from 'assets/images/team-member-01.png'
import styles from './Graphic.module.scss'
import measureGraphic from 'public/images/measure-graphic.svg'
import measureEdit from 'public/images/measure-edit.svg'

const Graphic = props => {
  const { handleClickTab } = props

  return (
    <div className={'px-20 py-8 ' + styles.container}>
      <div className="flex justify-start items-center">
        <div
          className={'flex justify-between items-center ' + styles.measureGraphic}
          onClick={() => handleClickTab('health')}
        >
          <Image src={measureEdit} width={38} height={34} />
        </div>
      </div>
      <div className={'w-full my-6 ' + styles.divider} />
    </div>
  )
}

export default Graphic
