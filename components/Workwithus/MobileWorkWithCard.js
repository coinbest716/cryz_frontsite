import React from 'react'

// next components
import Image from 'next/image'

import ArrowRightGray from 'public/images/arrow-right-gray.svg'
// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './MobileWorkWithCard.module.scss'

const MobileWorkWithCard = props => {
  const { item, handleClickOffer } = props
  let title = ''
  title =
    item.title.replace(/(<([^>]+)>)/gi, '').slice(0, 60) +
    (item.title.replace(/(<([^>]+)>)/gi, '').length > 60 ? '...' : '')

  return (
    <div style={{ maxWidth: '365px', minHeight: '289px' }} className={styles.cardContainer + ' p-4'}>
      <div className={styles.title + ' mt-3'} style={{ minHeight: '42px' }}>
        {title}
      </div>
      <div className={globalStyles.tinyMCEClass + ' mt-4'} style={{ minHeight: '142px' }}>
        <div className={styles.description + ' tinymce-class'} dangerouslySetInnerHTML={{ __html: item.description }} />
      </div>

      <div
        className={styles.btContainer + ' flex justify-between items-center cursor-pointer mt-6 w-full'}
        onClick={() => handleClickOffer(item.id)}
      >
        <div className={styles.btTitle + ' mr-2'}>Ver detalle de oferta</div>
        <Image src={ArrowRightGray} width={10} height={8} alt="" />
      </div>
    </div>
  )
}

export default MobileWorkWithCard
