import PrimaryLayout from 'components/Layout/PrimaryLayout'

const PreparationForChildbirth = () => {
  return <div>PreparationForChildbirth</div>
}
export default PreparationForChildbirth

PreparationForChildbirth.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
