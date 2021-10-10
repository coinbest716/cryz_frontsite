import PrimaryLayout from 'components/Layout/PrimaryLayout'

const PelvicFloor = () => {
  return <div>PelvicFloor</div>
}
export default PelvicFloor

PelvicFloor.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
