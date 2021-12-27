import React from 'react'

import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import styles from './leccion.module.scss'

const Planes = props => {
  const { viewport } = props

  return (
    <>
      {viewport === 'mobile' ? (
        <div className={'w-full ' + styles.container}>
          <div className={'grid grid-cols-12'}>
            <div className={'col-span-12 lg:col-span-8 pb-16 lg:py-16 px-0 lg:px-9'}>
              <div>
                <div className={styles.highBoldLabel}>Leccion</div>
              </div>
              {/* aqui va el resto de la maqueta mobil  */}
            </div>
          </div>
        </div>
      ) : (
        <div className={'w-full ' + styles.container}>
          <div className={'grid grid-cols-12'}>
            <div className={'col-span-12 lg:col-span-8 pb-16 lg:py-16 px-0 lg:px-9'}>
              <div>
                <div className={styles.highBoldLabel}>Leccion</div>
              </div>
              {/* aqui va el resto de la maqueta desktop  */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Planes

Planes.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Planes online">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
