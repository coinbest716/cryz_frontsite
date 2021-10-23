import React from 'react'
import Image from 'next/image'
import CommonButton from 'components/components/purchase/CommonButton'
import CommonText from 'components/components/purchase/CommonText'
import User from 'assets/images/team-member-01.png'
import styles from './Health.module.scss'
import measureGraphic from 'public/images/measure-graphic.svg'

const Health = props => {
  const { handleSave, handleDiscard, handleChangeHealth, handleClickTab } = props

  return (
    <div className={'px-20 py-8 ' + styles.container}>
      <div className="flex justify-between items-center">
        <div
          className={'flex justify-between items-center ' + styles.measureGraphic}
          onClick={() => handleClickTab('graphic')}
        >
          <Image src={measureGraphic} width={38} height={34} />
        </div>
        <div className="flex justify-between items-center gap-6">
          <CommonButton label={'Descartar'} handleClick={handleDiscard} type={'outline'} />
          <CommonButton label={'Aprobar cambios'} handleClick={handleSave} type={'fill'} />
        </div>
      </div>
      <div className={'w-full my-6 ' + styles.divider} />
      <div className="grid grid-cols-12 gap-4 px-10">
        <div className="col-span-12 md:col-span-6 sm:col-span-12">
          <div className="py-2">
            <CommonText
              handleChange={e => handleChangeHealth(e, 'fatPercentage')}
              label={'Porcentaje grasa'}
              placeholder={''}
              type={'text'}
            />
          </div>
          <div className="py-2">
            <CommonText
              handleChange={e => handleChangeHealth(e, 'visceralFat')}
              label={'Grasa visceral'}
              placeholder={''}
              type={'text'}
            />
          </div>
          <div className="py-2">
            <CommonText
              handleChange={e => handleChangeHealth(e, 'boneMass')}
              label={'Indice Masa Osea'}
              placeholder={''}
              type={'text'}
            />
          </div>
          <div className="py-2">
            <CommonText
              handleChange={e => handleChangeHealth(e, 'bodyMass')}
              label={'Indice Masa Corporal'}
              placeholder={''}
              type={'text'}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 sm:col-span-12">
          <div className="py-2">
            <CommonText
              handleChange={e => handleChangeHealth(e, 'waterPercentage')}
              label={'Porcentaje agua'}
              placeholder={''}
              type={'text'}
            />
          </div>
          <div className="py-2">
            <CommonText
              handleChange={e => handleChangeHealth(e, 'muscleMass')}
              label={'Indice Masa Muscualr'}
              placeholder={''}
              type={'text'}
            />
          </div>
          <div className="py-2">
            <CommonText
              handleChange={e => handleChangeHealth(e, 'metabolicExpense')}
              label={'Gasto Metabólico'}
              placeholder={''}
              type={'text'}
            />
          </div>
          <div className="py-2">
            <CommonText
              handleChange={e => handleChangeHealth(e, 'metabolicAge')}
              label={'Edad Metabolica'}
              placeholder={''}
              type={'text'}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 px-10 py-2">
        <div className="col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6">
          <CommonText
            handleChange={e => handleChangeHealth(e, 'weight')}
            label={'Peso'}
            placeholder={''}
            type={'text'}
          />
        </div>
        <div className="col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6">
          <CommonText
            handleChange={e => handleChangeHealth(e, 'height')}
            label={'Altura'}
            placeholder={''}
            type={'text'}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 px-10 py-2">
        <div className="col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6">
          <CommonText
            handleChange={e => handleChangeHealth(e, 'waist')}
            label={'Cintura'}
            placeholder={''}
            type={'text'}
          />
        </div>
        <div className="col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6">
          <CommonText handleChange={e => handleChangeHealth(e, 'arm')} label={'Brazo'} placeholder={''} type={'text'} />
        </div>
        <div className="col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6">
          <CommonText
            handleChange={e => handleChangeHealth(e, 'hips')}
            label={'Cadera'}
            placeholder={''}
            type={'text'}
          />
        </div>
        <div className="col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6">
          <CommonText
            handleChange={e => handleChangeHealth(e, 'thigh')}
            label={'Muslo'}
            placeholder={''}
            type={'text'}
          />
        </div>
        <div className="col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6">
          <CommonText
            handleChange={e => handleChangeHealth(e, 'twin')}
            label={'Gemelo'}
            placeholder={''}
            type={'text'}
          />
        </div>
      </div>
    </div>
  )
}

export default Health
