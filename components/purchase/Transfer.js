import React from 'react'
import styles from './Transfer.module.scss'
import Radio from './Radio'

const Transfer = props => {
  const { handleChangePaymentType, value } = props

  return (
    <div className={'px-10 py-8 ' + styles.creditSection}>
      <div>
        <Radio
          handleChangeType={handleChangePaymentType}
          type={'transfer'}
          value={value}
          label={'Transferencia bancaria'}
        />
      </div>
      <div className={'pl-8 pt-2 ' + styles.creditDescription}>
        Realiza tu pago directamente en nuestra cuenta bancaria. Por favor, usa el número del pedido como referencia de
        pago. Tu pedido no se procesará hasta que se haya recibido el importe en nuestra cuenta.
      </div>
    </div>
  )
}

export default Transfer
