import React from 'react'
import Image from 'next/image'
import CommonButton from 'components/components/purchase/CommonButton'
import CommonText from 'components/components/purchase/CommonText'
import User from 'assets/images/team-member-01.png'
import styles from './Health.module.scss'
import measureGraphic from 'public/images/measure-graphic.svg'

const Health = props => {
  const { handleSave, handleDiscard, handleChangeHealth } = props

  return (
    <div className={'px-16 py-8 ' + styles.container}>
      <div className="flex justify-between items-center">
        <div className={'flex justify-between items-center ' + styles.measureGraphic}>
          <Image src={measureGraphic} width={38} height={34} />
        </div>
        <div className="flex justify-between items-center gap-6">
          <CommonButton label={'Descartar'} handleClick={handleSave} type={'outline'} />
          <CommonButton label={'Aprobar cambios'} handleClick={handleDiscard} type={'fill'} />
        </div>
      </div>
      <div className={'w-full my-6 ' + styles.divider} />
      <div className="grid grid-cols-12 gap-12 px-10">
        <div className="col-span-12 md:col-span-6 sm:col-span-12">
          <div className="py-2">
            <CommonText
              handleChange={e => handleChangeHealth(e, 'name')}
              label={'Nombre'}
              placeholder={''}
              type={'text'}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 sm:col-span-12">
          <div className="py-2">
            <CommonText
              handleChange={e => handleChangeHealth(e, 'name')}
              label={'Nombre'}
              placeholder={''}
              type={'text'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Health
