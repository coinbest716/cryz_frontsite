import React from 'react'

// next components
import Image from 'next/image'

// images
import ArrowRightPink from 'assets/images/arrow-right-pink.svg'
import ArrowRightWhite from 'assets/images/arrow-right-white.svg'

// styles
import styles from 'components/components/BuyCard.module.scss'

const BuyCard = props => {
  const { data, index, handleClickBuy } = props

  console.log(data)
  return (
    <div className={'block'}>
      <div
        className={
          'flex ' +
          (index % 3 === 0 ? 'justify-start' : index % 3 === 1 ? 'justify-center' : 'justify-end') +
          ' ' +
          styles.title
        }
      >
        {data.service_type === 'personal' ? 'Personal' : ''}
        {data.service_type === 'online' ? 'Planes Online' : ''}
        {data.service_type === 'streaming' ? '1 to 1 en Streaming' : ''}
      </div>
      <div className={styles.card}>
        <div className={'flex'}>
          <div className={styles.cardTitle}>{data.web_name}</div>
          <Image src={ArrowRightPink} alt="" width={26} height={20} />
        </div>
        <div className={styles.cardDescription}>{data.description}</div>
      </div>

      <button
        disabled={data.plazas_used >= data.plazas && data.plazas !== 0}
        className={styles.button}
        onClick={() => handleClickBuy(data.id, data.web_name, data.price)}
      >
        <div className={'flex justify-start'}>
          <div className={styles.buttonText}>
            {data.plazas_used >= data.plazas && data.plazas !== 0 ? (
              `Plazas agotadas`
            ) : (
              <>
                Comprar por <b>{data.price} €</b>
              </>
            )}
          </div>
        </div>
        <Image src={ArrowRightWhite} alt="" width={26} height={20} />
      </button>
    </div>
  )
}

export default BuyCard
