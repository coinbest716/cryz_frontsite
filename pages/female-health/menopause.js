import PrimaryLayout from 'components/Layout/PrimaryLayout'

const Menopause = () => {
  return <div>Menopause</div>
}
export default Menopause

Menopause.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
