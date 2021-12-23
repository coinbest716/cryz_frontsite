import React from 'react'
import styles from './Transfer.module.scss'
import Check from './Check'

const GiftCard = props => {
  const { handleSelectGiftCard, value } = props

  return (
    <div className={'px-10 py-8 ' + styles.creditSection}>
      <div>
        <Check handleChangeType={handleSelectGiftCard} type={'giftcard'} value={value} label={'Tarjeta Regalo'} />
      </div>
      <div className={'pl-8 pt-2 ' + styles.creditDescription}>
        Marca esta casilla si tu compra es un REGALO. Al hacerlo, se te enviará un email con la tarjeta regalo adjunta y
        las instrucciones de uso. Además, nuestro equipo se pondrá en contacto contigo para confirmar cómo lo tienes que
        gestionar.
        <br />
        <br />
        ¡Y RECUERDA! Es importante que los datos facilitados a la hora de realizar el pedido sean los tuyos y no los de
        la persona a la que va dirigido el regalo para que siga siendo una sorpresa.
      </div>
    </div>
  )
}

export default GiftCard
