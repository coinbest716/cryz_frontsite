import React from 'react'
import Image from 'next/image'
import CommonButton from 'components/components/purchase/CommonButton'
import CommonText from 'components/components/purchase/CommonText'
import styles from './Health.module.scss'
import measureGraphic from 'public/images/measure-graphic.svg'

const Health = props => {
  const { handleSave, handleDiscard, handleChangeHealth, handleClickTab, healthInfo } = props

  return (
    <div className={'px-20 py-8 ' + styles.container}>
      <div className={'flex justify-between items-center'}>
        <div
          className={'flex justify-between items-center ' + styles.measureGraphic}
          onClick={() => handleClickTab('graphic')}
        >
          <Image src={measureGraphic} alt="" width={38} height={34} />
        </div>
        <div className={'flex justify-between items-center gap-6'}>
          <CommonButton label={'Descartar'} handleClick={handleDiscard} type={'outline'} />
          <CommonButton label={'Aprobar cambios'} handleClick={handleSave} type={'fill'} />
        </div>
      </div>
      <div className={'w-full my-6 ' + styles.divider} />
      <div className={'grid grid-cols-12 gap-4 px-10 gap-12'}>
        <div className={'col-span-12 md:col-span-6 sm:col-span-12'}>
          <div className={'py-2'}>
            <CommonText
              value={healthInfo.fatPercentage}
              handleChange={e => handleChangeHealth(e, 'fatPercentage')}
              label={'Porcentaje grasa'}
              placeholder={''}
              type={'text'}
            />
          </div>
          <div className={'py-2'}>
            <CommonText
              value={healthInfo.visceralFat}
              handleChange={e => handleChangeHealth(e, 'visceralFat')}
              label={'Grasa visceral'}
              placeholder={''}
              type={'text'}
            />
          </div>
          <div className={'py-2'}>
            <CommonText
              value={healthInfo.boneMass}
              handleChange={e => handleChangeHealth(e, 'boneMass')}
              label={'Ìndice Masa Òsea'}
              placeholder={''}
              type={'text'}
            />
          </div>
          <div className={'py-2'}>
            <CommonText
              value={healthInfo.bodyMass}
              handleChange={e => handleChangeHealth(e, 'bodyMass')}
              label={'Ìndice Masa Corporal'}
              placeholder={''}
              type={'text'}
            />
          </div>
        </div>
        <div className={'col-span-12 md:col-span-6 sm:col-span-12'}>
          <div className={'py-2'}>
            <CommonText
              value={healthInfo.waterPercentage}
              handleChange={e => handleChangeHealth(e, 'waterPercentage')}
              label={'Porcentaje agua'}
              placeholder={''}
              type={'text'}
            />
          </div>
          <div className={'py-2'}>
            <CommonText
              value={healthInfo.muscleMass}
              handleChange={e => handleChangeHealth(e, 'muscleMass')}
              label={'Índice Masa Muscular'}
              placeholder={''}
              type={'text'}
            />
          </div>
          <div className={'py-2'}>
            <CommonText
              value={healthInfo.metabolicExpense}
              handleChange={e => handleChangeHealth(e, 'metabolicExpense')}
              label={'Gasto Metabólico'}
              placeholder={''}
              type={'text'}
            />
          </div>
          <div className={'py-2'}>
            <CommonText
              value={healthInfo.metabolicAge}
              handleChange={e => handleChangeHealth(e, 'metabolicAge')}
              label={'Edad Metabólica'}
              placeholder={''}
              type={'text'}
            />
          </div>
        </div>
      </div>
      <div className={'grid grid-cols-12 gap-4 px-10 py-2'}>
        <div className={'col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6'}>
          <CommonText
            value={healthInfo.weight}
            handleChange={e => handleChangeHealth(e, 'weight')}
            label={'Peso(kg)'}
            placeholder={''}
            type={'text'}
          />
        </div>
        <div className={'col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6'}>
          <CommonText
            value={healthInfo.height}
            handleChange={e => handleChangeHealth(e, 'height')}
            label={'Altura'}
            placeholder={''}
            type={'text'}
          />
        </div>
      </div>
      <div className={'grid grid-cols-12 gap-4 px-10 py-2'}>
        <div className={'col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6'}>
          <CommonText
            value={healthInfo.waist}
            handleChange={e => handleChangeHealth(e, 'waist')}
            label={'Cintura'}
            placeholder={''}
            type={'text'}
          />
        </div>
        <div className={'col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6'}>
          <CommonText
            value={healthInfo.arm}
            handleChange={e => handleChangeHealth(e, 'arm')}
            label={'Brazo'}
            placeholder={''}
            type={'text'}
          />
        </div>
        <div className={'col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6'}>
          <CommonText
            value={healthInfo.hips}
            handleChange={e => handleChangeHealth(e, 'hips')}
            label={'Cadera'}
            placeholder={''}
            type={'text'}
          />
        </div>
        <div className={'col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6'}>
          <CommonText
            value={healthInfo.thigh}
            handleChange={e => handleChangeHealth(e, 'thigh')}
            label={'Muslo'}
            placeholder={''}
            type={'text'}
          />
        </div>
        <div className={'col-span-2 md:col-span-2 sm:col-span-4 xs:col-span-6'}>
          <CommonText
            value={healthInfo.twin}
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
