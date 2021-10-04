import Image from 'next/image'
import nextButtonPinkIcon from 'assets/images/arrow-right-pink.svg'
import styles from 'components/components/FaqButton.module.scss'

const FaqButton = () => {
  return (
    <div className={styles.faqButton}>
      <button className={styles.nextButton}>
        <span className={styles.faqString}>FAQ</span>
        <Image src={nextButtonPinkIcon} alt="" width={20} height={15} />
      </button>
    </div>
  )
}

export default FaqButton
