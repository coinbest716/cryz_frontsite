import React from 'react'
import PurchaseAvatar from 'components/components/purchase/PurchaseAvatar'
import CommonButton from 'components/components/purchase/CommonButton'
import CommonText from 'components/components/purchase/CommonText'
import styles from './Personal.module.scss'

const Personal = props => {
  const {
    handleSave,
    handleDiscard,
    handleChangePersonal,
    handleChangeShipping,
    handleDeleteAccount,
    personalInfo,
    handleChangeAvatar,
  } = props
  const list = ['male', 'female']

  return (
    <div className={'w-full h-full'}>
      <div className={'px-24 py-8 ' + styles.container}>
        <div className={'flex justify-between items-center'}>
          <div className={'flex justify-between items-center'}>
            <PurchaseAvatar avatar={personalInfo.avatar} handleChangeAvatar={handleChangeAvatar} />
            <div className={'pl-5'}>
              <div className={styles.profileName}>Mariano Pérez Fanjul</div>
              <div className={styles.profileCounry}>Madrid, Spain</div>
            </div>
          </div>
          <div className={'flex justify-between items-center gap-6'}>
            <CommonButton label={'Descartar'} handleClick={handleDiscard} type={'outline'} />
            <CommonButton label={'Aprobar cambios'} handleClick={handleSave} type={'fill'} />
          </div>
        </div>
        <div className={styles.divider + ' my-9'}></div>
        <div className={'grid grid-cols-12 gap-12'}>
          <div className={'col-span-12 md:col-span-6 sm:col-span-12'}>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangePersonal(e, 'name')}
                label={'Nombre'}
                placeholder={''}
                type={'text'}
                value={personalInfo.name}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangePersonal(e, 'password')}
                label={'Contraseña'}
                placeholder={''}
                type={'password'}
                value={personalInfo.password}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangePersonal(e, 'code')}
                label={'DNI'}
                placeholder={''}
                type={'text'}
                value={personalInfo.code}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangePersonal(e, 'telephone')}
                label={'Teléfono'}
                placeholder={''}
                type={'tel'}
                value={personalInfo.telephone}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                label={'Sexo'}
                list={list}
                handleChange={e => handleChangePersonal(e, 'gender')}
                type={'select'}
                value={personalInfo.gender}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangePersonal(e, 'date')}
                label={'Fecha de nacimiento'}
                placeholder={''}
                type={'date'}
                value={personalInfo.date}
              />
            </div>
          </div>
          <div className={'col-span-12 md:col-span-6 sm:col-span-12'}>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangePersonal(e, 'surname')}
                label={'Apellidos'}
                placeholder={''}
                type={'text'}
                value={personalInfo.surname}
              />
            </div>

            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangePersonal(e, 'meet')}
                label={'Como nos conoció…'}
                placeholder={''}
                type={'password'}
                value={personalInfo.meet}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangePersonal(e, 'email')}
                label={'Email'}
                placeholder={''}
                type={'email'}
                value={personalInfo.email}
              />
            </div>

            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangePersonal(e, 'emergencyPhone')}
                label={'Teléfono emergencia'}
                placeholder={''}
                type={'tel'}
                value={personalInfo.emergencyPhone}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangePersonal(e, 'birthday')}
                label={'Fecha nacimiento'}
                placeholder={''}
                type={'birthday'}
                value={personalInfo.birthday}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center my-9">
          <div className={styles.shippingData}>DATOS DE ENVIO</div>
          <div className={styles.divider + ' my-9'}></div>
        </div>
        <div className={'grid grid-cols-12 gap-12'}>
          <div className={'col-span-12 md:col-span-6 sm:col-span-12'}>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangeShipping(e, 'name')}
                label={'Nombre'}
                placeholder={''}
                type={'text'}
                value={personalInfo.name}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangeShipping(e, 'address')}
                label={'Dirección'}
                placeholder={''}
                type={'text'}
                value={personalInfo.address}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangeShipping(e, 'town')}
                label={'Ciudad'}
                placeholder={''}
                type={'text'}
                value={personalInfo.town}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangeShipping(e, 'country')}
                label={'Pais'}
                placeholder={''}
                type={'text'}
                value={personalInfo.country}
              />
            </div>
          </div>
          <div className={'col-span-12 md:col-span-6 sm:col-span-12'}>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangeShipping(e, 'aliasAddress')}
                label={'Alias de la dirección ( ej. casa, trabajo…)'}
                placeholder={''}
                type={'text'}
                value={personalInfo.aliasAddress}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangeShipping(e, 'cp')}
                label={'CP'}
                placeholder={''}
                type={'text'}
                value={personalInfo.cp}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangeShipping(e, 'province')}
                label={'Provincia'}
                placeholder={''}
                type={'text'}
                value={personalInfo.province}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={'flex justify-end pt-4'}>
        <CommonButton label={'Borrar Cuenta'} handleClick={handleDeleteAccount} type={'icon'} />
      </div>
    </div>
  )
}

export default Personal
