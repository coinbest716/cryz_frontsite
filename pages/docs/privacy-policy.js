import React from 'react'

// redux
import { useDispatch } from 'react-redux'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/docs/index.module.scss'

const PrivacyPolicy = () => {
  // loading part
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  React.useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted])

  return (
    <div className={'flex justify-center'}>
      <div className={globalStyles.container}>
        <div className={styles.title}>Politica privacidad</div>
        <div className={styles.divider} />
        <div className={styles.text}>Protección de datos de carácter personal según el RGPD</div>
        <br />
        <div className={styles.text}>
          <p>
            Crody Salud S.L., en aplicación de la normativa vigente en materia de protección de datos de carácter
            personal, informa que los datos personales que se recogen a través de los formularios del Sitio web:&nbsp;
            <a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a>, se incluyen en los ficheros
            automatizados específicos de usuarios de los servicios de Crody Salud S.L.
          </p>
        </div>
        <br />
        <div className={styles.text}>
          La recogida y tratamiento automatizado de los datos de carácter personal tiene como finalidad el mantenimiento
          de la relación comercial y el desempeño de tareas de información, formación, asesoramiento y otras actividades
          propias de Crody Salud S.L.
        </div>
        <br />
        <div className={styles.text}>
          Estos datos únicamente serán cedidos a aquellas entidades que sean necesarias con el único objetivo de dar
          cumplimiento a la finalidad anteriormente expuesta.
        </div>
        <br />
        <div className={styles.text}>
          Crody Salud S.L. adopta las medidas necesarias para garantizar la seguridad, integridad y confidencialidad de
          los datos conforme a lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27
          de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos
          personales y a la libre circulación de los mismos, y derogando la antigua LOPD, la nueva Ley Orgánica 3/2018,
          de 5 diciembre, de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD).
        </div>
        <br />
        <div className={styles.text}>
          El usuario podrá en cualquier momento ejercitar los derechos de acceso, oposición, rectificación, cancelación,
          limitación y portabilidad reconocidos en el citado Reglamento (UE). El ejercicio de estos derechos puede
          realizarlo el propio usuario a través de email a: administracion@crysdyazandco.com o en la dirección: C/
          Azalea, 1, Locales A y 2, Edificio F, Polígono Empresarial Minipark, C.P. 28109 – Alcobendas (Madrid).
        </div>
        <br />
        <div className={styles.text}>
          El usuario manifiesta que todos los datos facilitados por él son ciertos y correctos, y se compromete a
          mantenerlos actualizados, comunicando los cambios a Crody Salud S.L.
        </div>
        <br />
        <div className={styles.text}>Finalidad del tratamiento de los datos personales:</div>
        <br />
        <div className={styles.text}>¿Con qué finalidad trataremos tus datos personales?</div>
        <br />
        <div className={styles.text}>
          <p>
            En Crody Salud S.L., trataremos tus datos personales recabados a través del Sitio Web:&nbsp;
            <a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a>, con las siguientes finalidades:
          </p>
        </div>
        <br />
        <div className={styles.text}>
          Dar cumplimiento de las obligaciones, comerciales, laborales, corporativas y contables de la empresa.
        </div>
        <br />
        <div className={styles.text}>
          Prestar sus servicios de acuerdo con las necesidades particulares de los clientes, con el fin de cumplir los
          contratos suscritos por la misma.
        </div>
        <br />
        <div className={styles.text}>
          Envío de información comercial y boletines sobre nuevos servicios ofrecidos en la web y del sector.
        </div>
        <br />
        <div className={styles.text}>
          Cumplir con los procesos internos de la empresa en materia de administración de proveedores y contratistas.
        </div>
        <br />
        <div className={styles.text}>
          El proceso de archivo, de actualización de los sistemas, de protección y custodia de información y bases de
          datos de la empresa.
        </div>
        <br />
        <div className={styles.text}>
          La transmisión de datos a terceros con los cuales se hayan celebrado contratos con este objeto, para fines
          comerciales, contractuales, administrativos, de mercadeo y/o operativos.
        </div>
        <br />
        <div className={styles.text}>Con propósitos de seguridad o prevención de fraude.</div>
        <br />
        <div className={styles.text}>Ejecutar un contrato suscrito a distancia con el usuario.</div>
        <br />
        <div className={styles.text}>Adquirir los productos ofrecidos a través de la página web.</div>
        <br />
        <div className={styles.text}>Prestar los servicios contratados por el usuario.</div>
        <br />
        <div className={styles.text}>Enviar información promocional vía electrónica.</div>
        <br />
        <div className={styles.text}>
          Facilitar la información solicitada por el usuario a través del formulario de contacto.
        </div>
        <br />
        <div className={styles.text}>
          Te recordamos que puedes oponerte al envío de comunicaciones comerciales por cualquier vía y en cualquier
          momento, remitiendo un correo electrónico a la dirección anteriormente indicada.
        </div>
        <br />
        <div className={styles.text}>
          Los campos de dichos registros son de cumplimentación obligatoria, siendo imposible realizar las finalidades
          expresadas si no se aportan esos datos.
        </div>
        <br />
        <div className={styles.text}>¿Por cuánto tiempo se conservan los datos personales recabados?</div>
        <br />
        <div className={styles.text}>
          Los datos personales proporcionados se conservarán mientras se mantenga la relación comercial o no solicites
          su supresión y durante el plazo por el cuál pudieran derivarse responsabilidades legales por los servicios
          prestados.
        </div>
        <br />
        <div className={styles.text}>Legitimación:</div>
        <br />
        <div className={styles.text}>
          El tratamiento de tus datos se realiza con las siguientes bases jurídicas que legitiman el mismo:
        </div>
        <br />
        <div className={styles.text}>
          La solicitud de información y/o la contratación de los servicios de Crody Salud S.L., cuyos términos y
          condiciones se pondrán a tu disposición en todo caso, de forma previa a una eventual contratación.
        </div>
        <br />
        <div className={styles.text}>
          El consentimiento libre, específico, informado e inequívoco, en tanto que te informamos poniendo a tu
          disposición la presente política de privacidad, que tras la lectura de la misma, en caso de estar conforme,
          puedes aceptar mediante una declaración o una clara acción afirmativa, como el marcado de una casilla
          dispuesta al efecto.
        </div>
        <br />
        <div className={styles.text}>
          En caso de que no nos facilites tus datos o lo hagas de forma errónea o incompleta, no podremos atender tu
          solicitud, resultando del todo imposible proporcionarte la información solicitada o llevar a cabo la
          contratación de los servicios.
        </div>
        <br />
        <div className={styles.text}>Destinatarios:</div>
        <br />
        <div className={styles.text}>
          Los datos no se comunicarán a ningún tercero ajeno a Crody Salud S.L., salvo obligación legal.
        </div>
        <br />
        <div className={styles.text}>Datos recopilados por usuarios de los servicios</div>
        <br />
        <div className={styles.text}>
          En los casos en que el usuario incluya ficheros con datos de carácter personal en los servidores de
          alojamiento compartido, Crody Salud S.L. no se hace responsable del incumplimiento por parte del usuario del
          RGPD.
        </div>
        <br />
        <div className={styles.text}>
          <p>
            Derechos propiedad intelectual <a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a>
          </p>
        </div>
        <br />
        <div className={styles.text}>
          <p>
            Crody Salud S.L. es titular de todos los derechos de autor, propiedad intelectual, industrial, “know how” y
            cuantos otros derechos guardan relación con los contenidos del sitio web&nbsp;
            <a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a> y los servicios ofertados en el mismo,
            así como de los programas necesarios para su implementación y la información relacionada.
          </p>
        </div>
        <br />
        <div className={styles.text}>
          <p>
            No se permite la reproducción, publicación y/o uso no estrictamente privado de los contenidos, totales o
            parciales, del sitio web&nbsp;<a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a> sin el
            consentimiento previo y por escrito.
          </p>
        </div>
        <br />
        <div className={styles.text}>Propiedad intelectual del software</div>
        <br />
        <div className={styles.text}>
          El usuario debe respetar los programas de terceros puestos a su disposición por Crody Salud S.L., aún siendo
          gratuitos y/o de disposición pública.
        </div>
        <br />
        <div className={styles.text}>
          Crody Salud S.L. dispone de los derechos de explotación y propiedad intelectual necesarios del software.
        </div>
        <br />
        <div className={styles.text}>
          El usuario no adquiere derecho alguno o licencia por el servicio contratado, sobre el software necesario para
          la prestación del servicio, ni tampoco sobre la información técnica de seguimiento del servicio, excepción
          hecha de los derechos y licencias necesarios para el cumplimiento de los servicios contratados y únicamente
          durante la duración de los mismos.
        </div>
        <br />
        <div className={styles.text}>
          Para toda actuación que exceda del cumplimiento del contrato, el usuario necesitará autorización por escrito
          por parte de Crody Salud S.L., quedando prohibido al usuario acceder, modificar, visualizar la configuración,
          estructura y ficheros de los servidores propiedad de Crody Salud S.L., asumiendo la responsabilidad civil y
          penal derivada de cualquier incidencia que se pudiera producir en los servidores y sistemas de seguridad como
          consecuencia directa de una actuación negligente o maliciosa por su parte.
        </div>
        <br />
        <div className={styles.text}>Propiedad intelectual de los contenidos alojados</div>
        <br />
        <div className={styles.text}>
          Se prohíbe el uso contrario a la legislación sobre propiedad intelectual de los servicios prestados por Crody
          Salud S.L. y, en particular de:
        </div>
        <br />
        <div className={styles.text}>
          La utilización que resulte contraria a las leyes españolas o que infrinja los derechos de terceros.
        </div>
        <br />
        <div className={styles.text}>
          La publicación o la transmisión de cualquier contenido que, a juicio de Crody Salud S.L., resulte violento,
          obsceno, abusivo, ilegal, racial, xenófobo o difamatorio.
        </div>
        <br />
        <div className={styles.text}>
          Los cracks, números de serie de programas o cualquier otro contenido que vulnere derechos de la propiedad
          intelectual de terceros.
        </div>
        <br />
        <div className={styles.text}>
          La recogida y/o utilización de datos personales de otros usuarios sin su consentimiento expreso o
          contraviniendo lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de
          abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos
          personales y a la libre circulación de los mismos.
        </div>
        <br />
        <div className={styles.text}>
          La utilización del servidor de correo del dominio y de las direcciones de correo electrónico para el envío de
          correo masivo no deseado.
        </div>
        <br />
        <div className={styles.text}>
          El usuario tiene toda la responsabilidad sobre el contenido de su web, la información transmitida y
          almacenada, los enlaces de hipertexto, las reivindicaciones de terceros y las acciones legales en referencia a
          propiedad intelectual, derechos de terceros y protección de menores.
        </div>
        <br />
        <div className={styles.text}>
          El usuario es responsable respecto a las leyes y reglamentos en vigor y las reglas que tienen que ver con el
          funcionamiento del servicio online, comercio electrónico, derechos de autor, mantenimiento del orden público,
          así como principios universales de uso de Internet.
        </div>
        <br />
        <div className={styles.text}>
          El usuario indemnizará a Crody Salud S.L. por los gastos que generara la imputación de Crody Salud S.L. en
          alguna causa cuya responsabilidad fuera atribuible al usuario, incluidos honorarios y gastos de defensa
          jurídica, incluso en el caso de una decisión judicial no definitiva.
        </div>
        <br />
        <div className={styles.text}>Protección de la información alojada</div>
        <br />
        <div className={styles.text}>
          Crody Salud S.L. realiza copias de seguridad de los contenidos alojados en sus servidores, sin embargo no se
          responsabiliza de la pérdida o el borrado accidental de los datos por parte de los usuarios. De igual manera,
          no garantiza la reposición total de los datos borrados por los usuarios, ya que los citados datos podrían
          haber sido suprimidos y/o modificados durante el periodo del tiempo transcurrido desde la última copia de
          seguridad.
        </div>
        <br />
        <div className={styles.text}>
          Los servicios ofertados, excepto los servicios específicos de backup, no incluyen la reposición de los
          contenidos conservados en las copias de seguridad realizadas por Crody Salud S.L., cuando esta pérdida sea
          imputable al usuario; en este caso, se determinará una tarifa acorde a la complejidad y volumen de la
          recuperación, siempre previa aceptación del usuario.
        </div>
        <br />
        <div className={styles.text}>
          La reposición de datos borrados sólo está incluida en el precio del servicio cuando la pérdida del contenido
          sea debida a causas atribuibles a Crody Salud S.L..
        </div>
        <br />
        <div className={styles.text}>Comunicaciones comerciales</div>
        <br />
        <div className={styles.text}>
          En aplicación de la LSSI. Crody Salud S.L. no enviará comunicaciones publicitarias o promocionales por correo
          electrónico u otro medio de comunicación electrónica equivalente que previamente no hubieran sido solicitadas
          o expresamente autorizadas por los destinatarios de las mismas.
        </div>
        <br />
        <div className={styles.text}>
          En el caso de usuarios con los que exista una relación contractual previa, Crody Salud S.L. sí está autorizado
          al envío de comunicaciones comerciales referentes a productos o servicios de Crody Salud S.L. que sean
          similares a los que inicialmente fueron objeto de contratación con el cliente.
        </div>
        <br />
        <div className={styles.text}>
          En todo caso, el usuario, tras acreditar su identidad, podrá solicitar que no se le haga llegar más
          información comercial a través de los canales de Atención al Cliente.
        </div>
        <br />
        <div className={styles.text + ' mb-10'}>REV: 20.3009</div>
      </div>
    </div>
  )
}
export default PrivacyPolicy

PrivacyPolicy.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
