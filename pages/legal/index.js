import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/legal/index.module.scss'

const Legal = () => {
  return (
    <div className="flex justify-center">
      <div className={globalStyles.container}>
        <div className={styles.title}>Aviso legal</div>
        <div className={styles.divider} />
        <div className={styles.text + ' mb-10'}>
          En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de
          Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), el propietario de la web , le
          informa de lo siguiente:
          <br />
          <br />
          Denominación social: Crody Salud S.L.
          <br />
          <br />
          NIF: B01907781
          <br />
          <br />
          Domicilio: C/ Azalea, 1, Locales A y 2, Edificio F, Polígono Empresarial Minipark, 28109 – Alcobendas (Madrid)
          <br />
          <br />
          Inscrita en el Registro Mercantil de Madrid al Tomo 40773, folio 160, sección 8, hoja número 723347,
          inscripción 1
          <br />
          <br />
          Con los límites establecidos en la ley, Crody Salud S.L. no asume ninguna responsabilidad derivada de la falta
          de veracidad, integridad, actualización y precisión de los datos o informaciones que contienen sus páginas
          web.
          <br />
          <br />
          Los contenidos e información no vinculan a Crody Salud S.L. ni constituyen opiniones, consejos o asesoramiento
          legal de ningún tipo pues se trata meramente de un servicio ofrecido con carácter informativo y divulgativo.
          <br />
          <br />
          Las páginas de Internet de Crody Salud S.L. pueden contener enlaces (links) a otras páginas de terceras partes
          que Crody Salud S.L. no puede controlar. Por lo tanto, Crody Salud S.L. no puede asumir responsabilidades por
          el contenido que pueda aparecer en páginas de terceros.
          <br />
          <br />
          Los textos, imágenes, sonidos, animaciones, software y el resto de contenidos incluidos en este website son
          propiedad exclusiva de Crody Salud S.L. o sus licenciantes. Cualquier acto de transmisión, distribución,
          cesión, reproducción, almacenamiento o comunicación pública total o parcial, deberá contar con el
          consentimiento expreso de Crody Salud S.L..
          <br />
          <br />
          Asimismo, para acceder a algunos de los servicios que Crody Salud S.L. ofrece a través del sitio web, deberá
          proporcionar algunos datos de carácter personal. En cumplimiento de lo establecido en el Reglamento (UE)
          2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las
          personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos
          le informamos que, mediante la cumplimentación de los presentes formularios, sus datos personales quedarán
          incorporados y serán tratados en los ficheros de Crody Salud S.L. con el fin de poderle prestar y ofrecer
          nuestros servicios así como para informarle de las mejoras del sitio Web.
          <br />
          <br />
          Le informamos también de que tendrá la posibilidad en todo momento de ejercer los derechos de acceso,
          rectificación, cancelación, oposición, limitación y portabilidad de sus datos de carácter personal, de manera
          gratuita mediante email a: administracion@crysdyazandco.com o en la dirección: C/ Azalea, 1, Locales A y 2,
          Edificio F, Polígono Empresarial Minipark, 28109 – Alcobendas (Madrid).
          <br />
          <br />
          REV: 20.3009
        </div>
      </div>
    </div>
  )
}
export default Legal

Legal.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
