import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './transfer-success.module.scss'
import Image from 'next/image'
import news from 'public/images/news.svg'

const TransferSuccess = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className="h-full">
            <div className="h-1/3 flex items-center">
              <div>
                <div className={styles.topTitle}>PROXIMAMENTE…</div>
                <div className={styles.topDash + ' mt-4'} />
              </div>
            </div>
            <div className="h-1/3 flex items-center justify-center">
              <div>
                <Image src={news} alt="" />
                <div className={styles.description}>
                  Un espacio exclusivo donde poder consultar todas las novedades y ultimas <br /> publicaciones de Crys
                  & Co
                </div>
              </div>
            </div>
            <div className="h-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TransferSuccess

TransferSuccess.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
