import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './home.module.scss'

const Home = () => {
  return (
    <div className={'flex flex-wrap ' + styles.container}>
      <div className="h-full text-3xl">Home</div>
    </div>
  )
}
export default Home

Home.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
