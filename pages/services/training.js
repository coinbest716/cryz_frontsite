import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './training.module.scss'
import backGrayIcon from 'public/images/arrow-left-gray.svg'
import forwardGrayIcon from 'public/images/arrow-right-gray.svg'
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
          <div className={styles.topDash} />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 sm:col-span-12 ">
              <div className={styles.topDescription + ' mt-10 pb-20'}>
                Entrenamiento 1 to 1 en streaming: Entrenamientos personalizados de una hora con tu entrenador, desde
                nuestra plataforma. <br />
                <br />
                Entrenamiento presencial de una hora en el centro de Crys Dyaz o en el domicilio del paciente. <br />
                <br />
                Planes online personalizados, basado en videos de ejercicios, al cual el paciente accederá por medio de
                la plataforma online <br />
                <br />
              </div>
            </div>
            {/* <div className={'col-span-12 md:col-span-8 sm:col-span-12 ' + styles.verticalBottom}> */}
            <div className="col-span-12 md:col-span-8 sm:col-span-12 ">
              <div className={styles.verticalBottom}>
                <div className={styles.sortStart}>
                  {/* <div className={'w-1/3 flex justify-center ' + styles.verticalText}> */}
                  <div className={'w-1/3 ' + styles.verticalText}>
                    <span className={styles.number}>01&nbsp;&nbsp;</span>
                    <span className={styles.typograph}>Presencial&nbsp;</span>
                    <img src={'/images/arrow-right-gray.svg'} alt="" className={styles.arrowIcon} />
                  </div>
                  {/* <div className={'w-1/3 flex justify-center ' + styles.verticalText}> */}
                  <div className={'w-1/3 ' + styles.verticalText}>
                    <span className={styles.number}>02&nbsp;&nbsp;</span>
                    <span className={styles.typograph}>Planes online&nbsp;</span>
                    <img src={'/images/arrow-right-gray.svg'} alt="" className={styles.arrowIcon} />
                  </div>
                  {/* <div className={'w-1/3 flex justify-center ' + styles.verticalText}> */}
                  <div className={'w-1/3 ' + styles.verticalText}>
                    <span className={styles.number}>03&nbsp;&nbsp;</span>
                    <span className={styles.typograph}>1 to 1 en streaming&nbsp;</span>
                    <img src={'/images/arrow-right-gray.svg'} alt="" className={styles.arrowIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Training

Training.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
