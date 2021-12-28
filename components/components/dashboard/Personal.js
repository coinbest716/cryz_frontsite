import React from 'react'
import PurchaseAvatar from 'components/components/purchase/PurchaseAvatar'
import CommonButton from 'components/components/purchase/CommonButton'
import CommonText from 'components/components/purchase/CommonText'
import styles from './Personal.module.scss'
import moment from 'moment'

const Personal = props => {
  const {
    handleSave,
    handleDiscard,
    handleChangePersonal,
    handleChangeShipping,
    handleDeleteAccount,
    personalInfo,
    shippingInfo,
    handleChangeAvatar,
  } = props
  const genderList = ['WOMAN', 'MAN']
  const meetList = ['INSTAGRAM', 'FACEBOOK', 'PRENSA']

  return (
    <div className={'w-full h-full'}>
      <div className={'px-24 py-8 ' + styles.container}>
        <div className={'flex justify-between items-center'}>
          <div className={'flex justify-between items-center'}>
            <PurchaseAvatar avatar={personalInfo.avatar || ''} handleChangeAvatar={handleChangeAvatar} />
            <div className={'pl-5'}>
              <div className={styles.profileName}>{personalInfo.name + ' ' + personalInfo.surname}</div>
              <div className={styles.profileCounry}>
                {shippingInfo.province ? shippingInfo.province + ', ' + shippingInfo.country : shippingInfo.country}
              </div>
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
                disabled={true}
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
                list={genderList}
                handleChange={e => handleChangePersonal(e, 'gender')}
                type={'select'}
                value={personalInfo.gender}
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
                label={'Cómo nos conoció…'}
                placeholder={''}
                type={'select'}
                list={meetList}
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
                disabled={true}
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
                type={'date'}
                value={moment(personalInfo.birthday).format('YYYY-MM-DD')}
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
                value={shippingInfo.name}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangeShipping(e, 'address')}
                label={'Dirección'}
                placeholder={''}
                type={'text'}
                value={shippingInfo.address}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangeShipping(e, 'town')}
                label={'Ciudad'}
                placeholder={''}
                type={'text'}
                value={shippingInfo.town}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangeShipping(e, 'country')}
                label={'País'}
                placeholder={''}
                type={'text'}
                value={shippingInfo.country}
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
                value={shippingInfo.aliasAddress}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangeShipping(e, 'cp')}
                label={'CP'}
                placeholder={''}
                type={'text'}
                value={shippingInfo.cp}
              />
            </div>
            <div className={'py-2'}>
              <CommonText
                handleChange={e => handleChangeShipping(e, 'province')}
                label={'Provincia'}
                placeholder={''}
                type={'text'}
                value={shippingInfo.province}
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
