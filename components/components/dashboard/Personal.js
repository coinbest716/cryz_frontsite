import React from 'react'
import PurchaseAvatar from 'components/components/purchase/PurchaseAvatar'
import CommonButton from 'components/components/purchase/CommonButton'
import CommonText from 'components/components/purchase/CommonText'
import styles from './Personal.module.scss'

const Personal = props => {
  const { handleSave, handleDiscard, handleChangePersonal, handleDeleteAccount } = props
  const list = ['male', 'female']

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
        <div className="grid grid-cols-12 gap-12 pt-16">
          <div className="col-span-12 md:col-span-8 sm:col-span-12">
            <div className="py-2">
              <CommonText
                handleChange={e => handleChangePersonal(e, 'name')}
                label={'Nombre'}
                placeholder={''}
                type={'text'}
              />
            </div>
            <div className="py-2">
              <CommonText
                handleChange={e => handleChangePersonal(e, 'surname')}
                label={'Apellidos'}
                placeholder={''}
                type={'text'}
              />
            </div>
            <div className="py-2">
              <CommonText
                handleChange={e => handleChangePersonal(e, 'email')}
                label={'Email'}
                placeholder={''}
                type={'email'}
              />
            </div>
            <div className="py-2">
              <CommonText
                handleChange={e => handleChangePersonal(e, 'country')}
                label={'Pais'}
                placeholder={''}
                type={'text'}
              />
            </div>

            <div className="py-2">
              <CommonText
                handleChange={e => handleChangePersonal(e, 'address')}
                label={'Dirección'}
                placeholder={''}
                type={'text'}
              />
            </div>

            <div className="py-2">
              <CommonText
                handleChange={e => handleChangePersonal(e, 'town')}
                label={'Ciudad'}
                placeholder={''}
                type={'text'}
              />
            </div>

            <div className="py-2">
              <CommonText
                handleChange={e => handleChangePersonal(e, 'date')}
                label={'Fecha de nacimiento'}
                placeholder={''}
                type={'date'}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 sm:col-span-12">
            <div className="py-2">
              <CommonText
                handleChange={e => handleChangePersonal(e, 'password')}
                label={'Contraseña'}
                placeholder={''}
                type={'password'}
              />
            </div>

            <div className="py-2">
              <CommonText
                handleChange={e => handleChangePersonal(e, 'meet')}
                label={'Como nos conoció…'}
                placeholder={''}
                type={'password'}
              />
            </div>

            <div className="py-2">
              <CommonText
                handleChange={e => handleChangePersonal(e, 'telephone')}
                label={'Teléfono'}
                placeholder={''}
                type={'tel'}
              />
            </div>

            <div className="py-2">
              <CommonText
                handleChange={e => handleChangePersonal(e, 'emergencyPhone')}
                label={'Teléfono emergencia'}
                placeholder={''}
                type={'tel'}
              />
            </div>

            <div className="py-2">
              <CommonText
                handleChange={e => handleChangePersonal(e, 'code')}
                label={'DNI'}
                placeholder={''}
                type={'text'}
              />
            </div>

            <div className="py-2">
              <CommonText
                label={'Sexo'}
                list={list}
                handleChange={e => handleChangePersonal(e, 'gender')}
                type={'select'}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <CommonButton label={'Borrar Cuenta'} handleClick={handleDeleteAccount} type={'icon'} />
      </div>
    </div>
  )
}

export default Personal
