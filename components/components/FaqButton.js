import Image from 'next/image'
import nextButtonPinkIcon from 'public/images/faq-arrow-right.svg'
import styles from 'components/components/FaqButton.module.scss'

const FaqButton = props => {
  const { onClick, mobile } = props

  return (
    <div>
      {mobile ? (
        <div className={styles.faqButton}>
          <button className={styles.m_nextButton} onClick={onClick}>
            <span className={styles.faqString}>FAQ</span>
            <Image src={nextButtonPinkIcon} alt="" width={20} height={15} />
          </button>
        </div>
      ) : (
        <div className={styles.faqButton}>
          <button className={styles.nextButton} onClick={onClick}>
            <span className={styles.faqString}>FAQ</span>
            <Image src={nextButtonPinkIcon} alt="" width={20} height={15} />
          </button>
        </div>
      )}
    </div>
  )
}

export default FaqButton
