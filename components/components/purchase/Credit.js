import React from 'react'
import Image from 'next/image'
import styles from './Credit.module.scss'
import cards from 'public/images/cards.png'
import Radio from './Radio'
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from './utils'

const Credit = props => {
  const { handleChangePaymentType, value, handleChangeCardData } = props

  const handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value)
    }
    handleChangeCardData(target.name, target.value)
  }

  return (
    <div className={'px-10 py-8 ' + styles.creditSection}>
      <div className="flex justify-between items-center">
        <div>
          <Radio handleChangeType={handleChangePaymentType} type={'card'} value={value} label={'Tarjeta bancaria'} />
        </div>
        <Image src={cards} alt="" width={110} height={22} />
      </div>
      <div className={'pl-8 pt-2 ' + styles.creditDescription}>
        Paga con tarjeta de forma segura con :: Visa, Maestro, Discover, <br /> American Express.
      </div>
      <div>
        <div className={'pt-7 pb-1.5 ' + styles.label}>Número tarjeta</div>
        <input
          type="tel"
          name="number"
          placeholder="Card Number"
          pattern="[\d| ]{16,22}"
          required
          onChange={handleInputChange}
          className={styles.formControl}
          disabled={value === 'card' ? false : true}
        />
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-1/2">
          <div className={'pt-7 pb-1.5 ' + styles.label}>Nombre completo</div>
          <input
            type="text"
            name="name"
            placeholder="Name on Card"
            required
            onChange={handleInputChange}
            className={styles.formControl}
            disabled={value === 'card' ? false : true}
          />
        </div>
        <div className="w-1/4">
          <div className={'pt-7 pb-1.5 ' + styles.label}>fecha expiración</div>
          <input
            type="tel"
            name="expiry"
            placeholder="MM/YY"
            pattern="\d\d/\d\d"
            required
            onChange={handleInputChange}
            className={styles.formControl}
            disabled={value === 'card' ? false : true}
          />
        </div>
        <div className="w-1/4">
          <div className={'pt-7 pb-1.5 ' + styles.label}>CVV CODE</div>
          <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            pattern="\d{3,4}"
            required
            onChange={handleInputChange}
            className={styles.formControl}
            disabled={value === 'card' ? false : true}
          />
        </div>
      </div>
    </div>
  )
}

export default Credit
