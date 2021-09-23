import PrimaryLayout from 'components/Layout/PrimaryLayout'
import styles from 'styles/Home.module.scss'

const Shop = () => {
  return <div className={styles.container}>Shop page content</div>
}
export default Shop

Shop.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
