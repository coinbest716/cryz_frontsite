import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './training.module.scss'
import backGrayIcon from 'assets/images/arrow-left-gray.svg'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Training = () => {
  const router = useRouter()

  const handleClickBack = () => {
    router.push('/services')
  }

  return (
    <div className={styles.container}>
      <div className="flex flex-wrap justify-center">
        <div className={globlaStyle.container}>
          <div className="mt-9">
            <button className="flex justify-between items-center" onClick={handleClickBack}>
              <Image src={backGrayIcon} alt="" width={20} height={15} />
              <p className={styles.back}>&nbsp;&nbsp;Volver</p>
            </button>
          </div>
          <div className={styles.topTitle}>Entrenamiento</div>
        </div>
      </div>
    </div>
  )
}
export default Training

Training.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
