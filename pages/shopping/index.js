import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './shopping.module.scss'

const Shopping = () => {
  return (
    <div className={'flex flex-wrap ' + styles.container}>
      <div className="h-full text-3xl">Shopping</div>
    </div>
  )
}
export default Shopping

Shopping.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
