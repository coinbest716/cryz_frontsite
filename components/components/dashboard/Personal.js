import React from 'react'
import Image from 'next/image'
import PurchaseAvatar from 'components/components/purchase/PurchaseAvatar'
import CommonButton from 'components/components/purchase/CommonButton'
import styles from './Personal.module.scss'

const Personal = props => {
  const { handleSave, handleDiscard } = props

  return (
    <div className="w-full h-full ">
      <div className={'px-24 py-8 ' + styles.container}>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <PurchaseAvatar avatar={''} />
            <div className="pl-5">
              <div className={styles.profileName}>Mariano Pérez Fanjul</div>
              <div className={styles.profileCounry}>Madrid, Spain</div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-6">
            <CommonButton label={'Descartar'} handleClick={handleSave} type={'outline'} />
            <CommonButton label={'Aprobar cambios'} handleClick={handleDiscard} type={'fill'} />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 pt-16">
          <div className="col-span-12 md:col-span-8 sm:col-span-12">sdfsdfsdf</div>
          <div className="col-span-12 md:col-span-4 sm:col-span-12">sdfsdfsdf</div>
        </div>
      </div>
      button
    </div>
  )
}

export default Personal
