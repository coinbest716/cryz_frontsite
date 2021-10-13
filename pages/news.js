import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from 'pages/news.module.scss'

const News = () => {
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
            <div className="h-1/3 flex items-start justify-center">
              <div className="w-3/5">
                <div className="h-3/5 flex items-start justify-center relative">
                  <img src="/images/news.svg" style={{ opacity: 0.84, zIndex: 10, position: 'absolute' }} />
                  <img
                    src="/images/newsColor.svg"
                    style={{ top: 'calc(50% + 8px)', opacity: 0.55, zIndex: 9, position: 'absolute' }}
                  />
                  <img
                    src="/images/newsColor.svg"
                    style={{ top: 'calc(50% + 16px)', opacity: 0.29, zIndex: 8, position: 'absolute' }}
                  />
                  <img
                    src="/images/newsColor.svg"
                    style={{ top: 'calc(50% + 24px)', opacity: 0.09, zIndex: 7, position: 'absolute' }}
                  />
                </div>
                <div className=" h-2/5 flex items-end justify-center relative">
                  <div className={styles.description + ' absolute'}>
                    Un espacio exclusivo donde poder consultar todas las novedades y ultimas <br /> publicaciones de
                    Crys & Co
                  </div>
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
export default News

News.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
