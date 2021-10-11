import React, { useState } from 'react'
import ContactLayout from 'components/Layout/ContactLayout'
import CircularMark from 'components/components/CircularMark'
import MapContainer from 'components/components/contact/MapContainer'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from 'pages/contact/contact.module.scss'

const Contact = () => {
  const locations = [
    {
      name: 'Location 1',
      location: {
        lat: 41.3954,
        lng: 2.162,
      },
    },
    {
      name: 'Location 2',
      location: {
        lat: 41.3917,
        lng: 2.1649,
      },
    },
  ]

  return (
    <div className="flex flex-wrap justify-center pt-20">
      <div className={globlaStyle.container}>
        <div className="flex justify-between pt-24">
          <div>
            <div className={styles.topTitle}>Contacto</div>
            <div className={styles.topDash} />
            <div className={styles.topDescription + ' pt-9'}>
              ¡HOY ES EL DIA, <br />
              AHORA EL MOMENTO!
            </div>
          </div>
          <div className={'z-10'}>
            <CircularMark />
          </div>
        </div>
        <div style={{ height: '433px', width: '100%', paddingTop: '10px' }}>
          <MapContainer locations={locations} />
        </div>
      </div>
      <div className={styles.container}>sdfsdfsdf</div>
    </div>
  )
}

export default Contact

Contact.getLayout = function getLayout(page) {
  return <ContactLayout>{page}</ContactLayout>
}
