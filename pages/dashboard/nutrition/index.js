import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './nutrition.module.scss'

const Nutrition = () => {
  return (
    <div className={'flex flex-wrap ' + styles.container}>
      <div className={'h-full text-3xl'}>Nutrition</div>
    </div>
  )
}
export default Nutrition

Nutrition.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
