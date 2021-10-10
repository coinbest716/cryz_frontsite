import PrimaryLayout from 'components/Layout/PrimaryLayout'

const Pregnancy = () => {
  return <div>Pregnancy</div>
}
export default Pregnancy

Pregnancy.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
