import React from 'react'
import PurchaseAvatar from 'components/purchase/PurchaseAvatar'
import ProfileItem from 'components/dashboard/profile/ProfileItem'
import ProfileMainButton from 'components/dashboard/profile/ProfileMainButton'

import ProfileIcon from 'public/images/profile_icon.svg'
import ProfileAntro from 'public/images/profile_antro.svg'
import ProfileBill from 'public/images/profile_bill.svg'
import ProfileCompras from 'public/images/profile_compras.svg'

import styles from './MobileMainProfile.module.scss'

const MobileMainProfile = props => {
  const { personalInfo, handleClickProfileItem, handleClickMainButton, shippingInfo, handleChangeAvatar } = props
  return (
    <div className={styles.mobileContainer}>
      <div className={'flex justify-start items-center mb-10'}>
        <PurchaseAvatar avatar={personalInfo.avatar || ''} handleChangeAvatar={handleChangeAvatar} />
        <div className={'pl-5'}>
          <div className={styles.profileName}>{personalInfo.name + ' ' + personalInfo.surname}</div>
          <div className={styles.profileCounry}>
            {shippingInfo.province ? shippingInfo.province + ', ' + shippingInfo.country : shippingInfo.country}
          </div>
        </div>
      </div>
      <ProfileItem
        image={ProfileIcon}
        title="Datos"
        index={0}
        handleClickProfileItem={() => handleClickProfileItem('personal')}
      />
      <ProfileItem
        image={ProfileAntro}
        title="Antropometría"
        index={1}
        handleClickProfileItem={() => handleClickProfileItem('graphic')}
      />
      <ProfileItem
        image={ProfileCompras}
        title="Compras"
        index={2}
        handleClickProfileItem={() => handleClickProfileItem('shopping')}
      />
      <ProfileItem
        image={ProfileBill}
        title="Direcciones facturación"
        index={3}
        handleClickProfileItem={() => handleClickProfileItem('billing')}
      />
      <div className="mt-16">
        <ProfileMainButton label="LogOut" handleClickMainButton={() => handleClickMainButton('logout')} type="logout" />
      </div>
      <div className="mt-6">
        <ProfileMainButton
          label="Borrar cuenta"
          handleClickMainButton={() => handleClickMainButton('deleteAccount')}
          type="deleteAccount"
        />
      </div>
    </div>
  )
}

export default MobileMainProfile
