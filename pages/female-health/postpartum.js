import PrimaryLayout from 'components/Layout/PrimaryLayout'

const Postpartum = () => {
  return <div>Postpartum</div>
}
export default Postpartum

Postpartum.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
