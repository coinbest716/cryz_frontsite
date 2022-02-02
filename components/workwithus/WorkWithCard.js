import React from 'react'

// next components
import Image from 'next/image'

import ArrowRightWhite from 'public/images/arrow-right-white.svg'
// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './WorkWithCard.module.scss'

const WorkWithCard = props => {
  const { item, handleClickOffer } = props
  let title = ''
  title =
    item.title.replace(/(<([^>]+)>)/gi, '').slice(0, 50) +
    (item.title.replace(/(<([^>]+)>)/gi, '').length > 50 ? '...' : '')

  return (
    <div style={{ maxWidth: '365px' }}>
      <div className={styles.textContainer + ' p-5'} style={{ minHeight: '217px' }}>
        <div className={styles.title}>{title}</div>
        <div className={globalStyles.tinyMCEClass + ' mt-9'}>
          <div
            className={styles.description + ' tinymce-class'}
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
        {/* <div className={styles.description + ' mt-9'}>{item.description}</div> */}
      </div>
      <div
        className={styles.btContainer + ' flex justify-between items-center cursor-pointer mt-2 w-full px-7 py-3'}
        onClick={() => handleClickOffer(item.id)}
      >
        <div className={styles.btTitle + ' mr-2'}>Ver detalle de oferta</div>
        <Image src={ArrowRightWhite} width={23} height={22} alt="" />
      </div>
    </div>
  )
}

export default WorkWithCard
