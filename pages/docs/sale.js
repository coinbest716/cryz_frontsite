import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/docs/index.module.scss'

const Sale = props => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const { viewport } = props

  return (
    <div className={'flex justify-center'}>
      <div className={globalStyles.container}>
        <div className={viewport === 'mobile' ? styles.mobileTitle : styles.title}>Condiciones de venta</div>
        <div className={viewport === 'mobile' ? styles.mobileDivider : styles.divider} />
        <div className={viewport === 'mobile' && styles.mobileContent}>
          <div className={styles.text}>Titular: Crody Salud S.L.</div>
          <br />
          <div className={styles.text}>
            Domicilio social: C/ Azalea, 1, Locales A y 2, Edificio F, Polígono Empresarial Minipark. – 28109 –
            Alcobendas (Madrid)
          </div>
          <br />
          <div className={styles.text}>CIF/NIF: B01907781</div>
          <br />
          <div className={styles.text}>
            Registro Público: Inscrita en el Registro Mercantil de Madrid Tomo 40773, Folio 160, Sección 8ª, Hoja
            723347, Inscripción 1ª.
          </div>
          <br />
          <div className={styles.text}>Teléfono: 650148244</div>
          <br />
          <div className={styles.text}>E-mail: administracion@crysdyazandco.com</div>
          <br />
          <div className={styles.text}>OBJETO</div>
          <br />
          <div className={styles.text}>
            <p>
              Mediante el presente texto ponemos a disposición de todos los usuarios y clientes las condiciones de uso y
              registro que son de aplicación a&nbsp;
              <a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a> y a los servicios que prestamos,
              quedando reflejados en éste todos los derechos y obligaciones que asisten a las partes.
            </p>
          </div>
          <br />
          <div className={styles.text}>
            Todos los usuarios que visitan o acceden a nuestra plataforma y/o que utilizan alguno de los servicios que
            ponemos a disposición, aceptan las condiciones de uso y la política de privacidad, así como las diferentes
            modificaciones y/o textos legales adicionales que sean incluidas en el futuro. En caso de no estar de
            acuerdo con alguna de las condiciones, puedes darte de baja del servicio en cualquier momento o en caso de
            no ser usuario registrado, abandonar la plataforma.
          </div>
          <br />
          <div className={styles.text}>
            Junto a las presentes condiciones, cada uno de los servicios prestados puede quedar regulado por condiciones
            de uso y registro de carácter particular, siendo obligatorio en todo caso que el usuario acepte las mismas
            expresamente antes de su utilización y/o contratación.
          </div>
          <br />
          <div className={styles.text}>CONTRATACIÓN ELECTRÓNICA</div>
          <br />
          <div className={styles.text}>1. INFORMACIÓN PREVIA APLICABLE A LA CONTRATACIÓN ELECTRÓNICA</div>
          <br />
          <div className={styles.text}>
            De conformidad con lo dispuesto en el artículo 23 y siguientes de la Ley 34/2002 de servicios de la sociedad
            de la información y de comercio electrónico, los contratos celebrados por vía electrónica producirán todos
            los efectos previstos por el ordenamiento jurídico, siempre que concurra el consentimiento de ambas partes y
            éste pueda ser acreditado.
          </div>
          <br />
          <div className={styles.text}>
            A estos efectos, se entenderá que el seguimiento de todas las fases del proceso de registro y en su caso, el
            abono de la cantidad económica correspondiente, implica necesariamente la prestación del consentimiento
            expreso requerido para la contratación del servicio.
          </div>
          <br />
          <div className={styles.text}>
            Del mismo modo, y atendiendo a lo dispuesto en el artículo 27 de la Ley 34/2002 de servicios de la sociedad
            de la información y de comercio electrónico, se pone a disposición de los usuarios, de forma previa al
            inicio del procedimiento de contratación toda la información relativa al mismo.
          </div>
          <br />
          <div className={styles.text}>
            <p>
              Las condiciones de contratación indicadas a continuación son de aplicación directa a la contratación de
              todos los servicios puestos a disposición a través del portal web&nbsp;
              <a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a>, salvo que expresamente se disponga
              lo contrario.
            </p>
          </div>
          <br />
          <div className={styles.text}>PROCEDIMIENTO DE CONTRATACIÓN</div>
          <br />
          <div className={styles.text}>
            El procedimiento de contratación de se lleva a cabo de forma completamente electrónica a través de nuestra
            plataforma, sin que exista en ningún momento presencia física de las partes y/o transacción física externa.
          </div>
          <br />
          <div className={styles.text}>
            Cualquier persona con acceso a Internet puede llevar a cabo la contratación.
          </div>
          <br />
          <div className={styles.text}>
            Las fases del procedimiento de contratación son visibles para los usuarios a lo largo de todo el
            procedimiento de contratación. Pueden diferenciarse 3 fases:
          </div>
          <br />
          <div className={styles.text}>Identificación del usuario.</div>
          <br />
          <div className={styles.text}>Selección del servicio y forma de pago.</div>
          <br />
          <div className={styles.text}>Confirmación del servicio.</div>
          <br />
          <div className={styles.text}>
            El usuario únicamente debe seleccionar el servicio o prodcuto que desea adquirir y pulsar el botón de compra
            dispuesto al efecto. De esta forma, dará comienzo el procedimiento de contratación que seguirá siempre los
            pasos anteriormente indicados para todos los servicios disponibles.
          </div>
          <br />
          <div className={styles.text}>
            Una vez seleccionado el servicio o producto, la cantidad, los impuestos aplicables, el precio total y el
            medio de pago, la plataforma mostrará al usuario un resumen de la contratación realizada, junto a las
            condiciones de contratación aplicables, que en todo caso deberán ser expresamente aceptadas por el usuario
            para poder seguir el proceso de contratación.
          </div>
          <br />
          <div className={styles.text}>
            <p>
              Una vez marcada la casilla de aceptación de las condiciones de contratación, en caso de haber seleccionado
              como forma de pago alguno de los medios electrónicos, el usuario será directamente redireccionado a la
              plataforma de pago externa correspondiente para realizar el pago, sin que&nbsp;
              <a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a>&nbsp;tenga posibilidad de acceder en
              ningún momento a los datos de tarjetas de crédito y/o sistemas de pago del usuario.
            </p>
          </div>
          <br />
          <div className={styles.text}>
            La seguridad del procedimiento de pago se encuentra garantizada por parte de la entidad financiera.
          </div>
          <br />
          <div className={styles.text}>
            Una vez finalizada la contratación del servicio, se mostrará una pantalla resumen de la contratación
            realizada.
          </div>
          <br />
          <div className={styles.text}>
            En caso de haberse seleccionado el pago mediante tarjeta de crédito, éste se llevará a cabo a través de la
            TPV del banco, plataforma completamente ajena e independiente del prestador.
          </div>
          <br />
          <div className={styles.text}>
            En el plazo máximo de 24 horas, el contratante del servicio recibirá un correo electrónico en el que se
            mostrará toda la información relativa a la contratacion. Este documento es la confirmación de que la
            contratación se ha realizado con éxito, siendo válida como medio de acreditación para cualquier tipo de
            reclamación, siempre y cuando se adjunte el justificante del pago correspondiente.
          </div>
          <br />
          <div className={styles.text}>
            El prestador informa al usuario de que todas las contrataciones realizadas quedarán registradas en un
            fichero para el control y gestión de contrataciones, en el que quedarán reflejados junto a la información de
            los servicios contratados, información adicional para garantizar la seguridad y evidencia de la correcta
            realización del procedimiento.
          </div>
          <br />
          <div className={styles.text}>DERECHO DE DESISTIMIENTO DE LA CONTRATACIÓN</div>
          <br />
          <div className={styles.text}>
            De conformidad con lo dispuesto en el Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se
            aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios y otras leyes
            complementarias, junto con el artículo 45 de la Ley 7/1996, del Comercio Minorista, el usuario tiene derecho
            a desistir del contrato durante el plazo de desde el momento en que se ha contratado el servicio.
          </div>
          <br />
          <div className={styles.text}>
            Para ejercer el derecho al desistimiento, el usuario simplemente deberá solicitarlo por escrito a cualquiera
            de las direcciones mencionadas a continuación, indicando expresamente su solicitud de ejercicio del derecho
            de desistimiento:
          </div>
          <br />
          <div className={styles.text}>
            Dirección Postal: C/ Azalea, 1, Locales A y 2, Edificio F, Polígono Empresarial Minipark. – 28109 –
            Alcobendas (Madrid)
          </div>
          <br />
          <div className={styles.text}>Correo electrónico: administracion@crysdyazandco.com</div>
          <br />
          <div className={styles.text}>
            En cualquier caso, corresponde al consumidor y usuario probar que ha ejercitado su derecho de desistimiento
            conforme a lo dispuesto en este capítulo.
          </div>
          <br />
          <div className={styles.text}>
            Una vez recibida la solicitud de ejercicio del derecho de desistimiento, procederemos a restituir la
            cantidad económica abonada (sin que en ningún caso se incluyan los gastos de envío y de gestión que se
            hubieran podido abonar inicialmente) en el plazo máximo de 30 días desde el momento de la recepción del
            desistimiento y siempre a través del medio utilizado para abonar el servicio, o en su defecto mediante
            transferencia bancaria.
          </div>
          <br />
          <div className={styles.text}>
            El ejercicio del derecho de desistimiento requiere en todo momento que el usuario no haya consumido o
            disfrutado de ninguno de los servicios contratados. En caso de que hubiera consumido alguno de dichos
            servicios, no será posible ejercer el derecho de desistimiento.
          </div>
          <br />
          <div className={styles.text}>
            En base a lo dispuesto en el art. 103 de la Ley General para la Defensa de los Consumidores y Usuarios, se
            excluye el derecho de desistimiento en los siguientes casos :
          </div>
          <br />
          <div className={styles.text}>
            Servicio ya iniciado y pérdida del derecho de desistimiento una vez ejecutado por completo.
          </div>
          <br />
          <div className={styles.text}>
            Bienes o productos confeccionados conforme a las especificaciones del consumidor o personalizados.
          </div>
          <br />
          <div className={styles.text}>Productos que pueden caducar con rapidez.</div>
          <br />
          <div className={styles.text}>
            Productos precintados y no aptos para ser devueltos por razones de higiene, que pueden desprecintarse tras
            la entrega.
          </div>
          <br />
          <div className={styles.text}>Productos mezclados de forma indisociable con otros tras la entrega.</div>
          <br />
          <div className={styles.text}>
            Suministro de grabaciones sonoras o de vídeo precintadas o de programas informáticos que pueden ser
            desprecintados tras la entrega.
          </div>
          <br />
          <div className={styles.text}>
            Suministro de contenido digital que no se presta en un soporte material, habiendo comenzado la ejecución del
            servicio.
          </div>
          <br />
          <div className={styles.text}>FORMULARIO DE DESISTIMIENTO</div>
          <br />
          <div className={styles.text}>
            (Sólo deberá cumplimentar y enviar el presente formulario si desea desistir del contrato o servicio
            contratado).
          </div>
          <br />
          <div className={styles.text}>
            A la atención de (aquí deberá insertar el nombre de la empresa, dirección completa y, si dispone de ellos,
            el número de teléfono, fax y correo electrónico):
          </div>
          <br />
          <div className={styles.text}>
            Por la presente le comunico/comunicamos(*) que desisto de mi/desistimos de nuestro(*) contrato de venta del
            siguiente bien/prestación del siguiente servicio(*).
          </div>
          <br />
          <div className={styles.text}>Pedido el/solicitado el día(*).</div>
          <br />
          <div className={styles.text}>
            Nombre y domicilio del consumidor y usuario o de los consumidores y usuarios.
          </div>
          <br />
          <div className={styles.text}>Fecha y firma del consumidor y usuario o de los consumidores y usuarios.</div>
          <br />
          <div className={styles.text}>
            Para solicitar un cambio de producto en caso de que este llegase roto ,en mal estado o recibiese un producto
            equivocado, el cliente debe contactar con atención al cliente dentro de las 24 horas posteriores a la
            recepción del pedido.
          </div>
          <br />
          <div className={styles.text}>
            En ese caso, nosotros asumiremos los costes de recogida y devolución del pedido.
          </div>
          <br />
          <div className={styles.text}>
            En caso de que desee cambiar su producto por otro y el producto a cambiar tenga un precio mayor al
            anteriormente comprado, el cliente deberá abonar la diferencia del valor.
          </div>
          <br />
          <div className={styles.text}>
            Si por contra, el nuevo producto tiene un precio menor al anteriormente comprado, no se devolverá la
            diferencia del importe en efectivo, sino que se realizará en forma de cheque regalo para utilizar en su
            próxima compra.
          </div>
          <br />
          <div className={styles.text}>
            <p>
              Para gestionar cualquier tipo de devolución o cambio de productos comprados en&nbsp;
              <a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a>&nbsp;el cliente debe ponerse en
              contacto con nuestro servicio de Atención al Cliente.
            </p>
          </div>
          <br />
          <div className={styles.text}>
            El cliente deberá indicarnos el número de pedido y le diremos exactamente todos los pasos a seguir.
          </div>
          <br />
          <div className={styles.text}>
            Le informamos también de que no aceptaremos cambios o devoluciones que no hayan sido previamente comunicados
            por las vías indicadas.
          </div>
          <br />
          <div className={styles.text}>CANCELACIONES</div>
          <br />
          <div className={styles.text}>
            El cliente o usuario podrá cancelar su pedido, siempre y cuando éste no haya salido de nuestros almacenes.
            En tal caso, deberá ponerse en contacto a través del correo electrónico o de los canales de Atención al
            Cliente, comunicando sus datos identificativos y número de referencia del pedido. En caso de cancelaciones
            se procederá a la devolución de los importes abonados previamente por el usuario o cliente, a través del
            mismo medio empleado para la transacción inicial.
          </div>
          <br />
          <div className={styles.text}>FORMAS DE PAGO</div>
          <br />
          <div className={styles.text}>Todos nuestros productos incluyen el IVA aplicable:</div>
          <br />
          <div className={styles.text}>Admitimos los siguientes metodos de pago:</div>
          <br />
          <div className={styles.text}>Tarjeta de crédito</div>
          <br />
          <div className={styles.text}>Transferencia bancaria</div>
          <br />
          <div className={styles.text}>Paypal</div>
          <br />
          <div className={styles.text}>Bizum</div>
          <br />
          <div className={styles.text}>COSTES Y ENVÍOS</div>
          <br />
          <div className={styles.text}>
            Realizamos envíos exclusivamente en península, si desea que envíemos su producto a Canarias o fuera de
            España, rogamos contacten con Atención al cliente.
          </div>
          <br />
          <div className={styles.text}>Los costes de envío son:</div>
          <br />
          <div className={styles.text}>Envío ordinario: 5,50 Euros.</div>
          <br />
          <div className={styles.text}>PLAZOS DE ENTREGA</div>
          <br />
          <div className={styles.text}>
            Una vez tramitado y enviado su pedido enviaremos un email de confirmacion del envío.
          </div>
          <br />
          <div className={styles.text}>
            Todos nuestros productos se envían en un plazo de 48/72 horas desde su tramitación. A excepción de los bonos
            y el contenido digital, que recibirá en 24 horas.
          </div>
          <br />
          <div className={styles.text}>
            Si realiza su pedido mas allá de las 19:00 o en fin de semana, tramitaremos su pedido el proximo día
            laborable.
          </div>
          <br />
          <div className={styles.text}>OBLIGACIONES DEL USUARIO</div>
          <br />
          <div className={styles.text}>El usuario, se compromete durante la vigencia del presente contrato a:</div>
          <br />
          <div className={styles.text}>
            No utilizar la plataforma o cualquiera de los elementos que la integren, para desarrollar operaciones de
            tiempo compartido, constituirse en proveedor de servicios de aplicaciones software en la medida en que
            estuvieren orientados a hacer posible el acceso de terceros a la plataforma o a cualquiera de sus
            componentes, a través de operaciones de alquiler, servicios administrativos o cualesquiera otros de análoga
            consideración, compartiéndolos o poniéndolos a disposición de terceros.
          </div>
          <br />
          <div className={styles.text}>
            No someter la plataforma o cualesquiera de sus elementos, a actividades encaminadas, directa o
            indirectamente a la descompilación de su software, que impliquen su sometimiento a operaciones de naturaleza
            inversa a las que determinaron su construcción o que, en último término, constituyan o puedan constituir
            operaciones de ingeniería inversa, descompilación o desensamblado. Ninguno de los apartados del presente
            contrato podrá entenderse como una autorización de acceso al código fuente de la plataforma.
          </div>
          <br />
          <div className={styles.text}>
            No publicar la plataforma, ni utilizarla como sistema de gestión e intercambio de información y/o
            documentación ilegal, contraria a la moral o al orden público, contraria a los derechos de autor y/o de
            propiedad industrial.
          </div>
          <br />
          <div className={styles.text}>
            No someter a la plataforma a cargas de trabajo orientadas a la desestabilización de la misma, encontrándose
            entre éstas, ataques de denegación de servicio (DDoS) o situaciones semejantes. En caso de detectarse este
            tipo de situaciones, el nivel de servicio acordado, no será de aplicación, siendo considerada una situación
            de emergencia, no asumiendo por tanto Crody Salud S.L. responsabilidad alguna por la falta de disponibilidad
            del servicio.
          </div>
          <br />
          <div className={styles.text}>
            <p>
              No realizar actos de ingeniería inversa, toma de requisitos y demás actividades encaminadas a desarrollar
              una plataforma online idéntica o semejante a la puesta a disposición por parte de&nbsp;
              <a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a>, pudiendo ser considerada esta
              actividad como un acto de competencia desleal y vulneración de los derechos de propiedad intelectual e
              industrial que el prestador ostenta sobre la plataforma.
            </p>
          </div>
          <br />
          <div className={styles.text}>
            No traducir, adaptar, mejorar, transformar, modificar ni corregir la plataforma o cualquiera de los
            elementos que la integren, no pudiendo incorporar la misma a otros software o portales propios o provistos
            por terceros.
          </div>
          <br />
          <div className={styles.text}>
            No retirar, suprimir, alterar, manipular ni en modo alguno modificar aquellas notas, leyendas, indicaciones
            o símbolos que el prestador, como legítimo titular de los derechos, incorpore a sus propiedades en materia
            de propiedad intelectual o industrial (como por ejemplo, copyright, ©, ® y TM, etc.) ya fuera en la propia
            plataforma como en el material asociado.
          </div>
          <br />
          <div className={styles.text}>
            <p>
              Aceptar que&nbsp; <a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a>&nbsp;pueda
              introducir en el sitio web publicidad contextualizada o no.
            </p>
          </div>
          <br />
          <div className={styles.text}>
            Abonar las cantidades económicas expresamente indicadas en el presente contrato en tiempo y forma.
          </div>
          <br />
          <div className={styles.text}>
            Poner en conocimiento del prestador cualquier hecho o situación que hubiera ocurrido que pudiera poner en
            riesgo la seguridad en el acceso por parte de usuarios autorizados.
          </div>
          <br />
          <div className={styles.text}>
            Queda prohibido forzar fallos o buscar brechas de seguridad en la plataforma.
          </div>
          <br />
          <div className={styles.text}>GARANTÍAS Y RESPONSABILIDADES</div>
          <br />
          <div className={styles.text}>
            Estamos profundamente comprometidos con que nuestros servicios funcionen correctamente y conforme a las
            condiciones acordadas con nuestros usuarios. No obstante, en ocasiones es posible que se produzcan,
            especialmente por la intervención de terceros mal intencionados, situaciones que pudieran provocar
            responsabilidades.
          </div>
          <br />
          <div className={styles.text}>
            En este sentido, a continuación os indicamos aquellas situaciones en las que no nos hacemos responsables de
            las actuaciones de los usuarios, asumiendo éstos todas las responsabilidades derivadas:
          </div>
          <br />
          <div className={styles.text}>
            En caso de que aparezca publicada en la plataforma información que no hubiera sido alojada por nuestra parte
            o que en su caso hubiera sido publicada por un tercero ajeno a la organización.
          </div>
          <br />
          <div className={styles.text}>
            En caso de que la plataforma no se encuentre operativa por razones técnicas imputables a terceros o causas
            imprevisibles y/o de fuerza mayor.
          </div>
          <br />
          <div className={styles.text}>
            En caso de que el usuario almacene o cualquier tercero, difunda, publique o distribuya en la plataforma
            cualquier tipo de material difamatorio, injurioso, discriminatorio, que incite a la violencia o que vaya
            contra la moral, el orden público, los derechos fundamentales, las libertas públicas, el honor, la intimidad
            o la imagen de terceros.
          </div>
          <br />
          <div className={styles.text}>
            En caso de que el usuario o cualquier tercero utilice la plataforma para introducir datos, virus, código
            malicioso, hardware o cualquier otro instrumento o dispositivo electrónico o físico, y se causen daños a los
            sistemas de otros usuarios.
          </div>
          <br />
          <div className={styles.text}>
            En caso de que cualquiera de los contenidos accesibles a través de la plataforma fueran contrarios a la
            normativa vigente, nos comprometemos a proceder a su retirada inmediata, tan pronto tengamos conocimiento y
            corroboremos los hechos.
          </div>
          <br />
          <div className={styles.text}>DERECHOS DE PROPIEDAD INTELECTUAL E INDUSTRIAL</div>
          <br />
          <div className={styles.text}>
            <p>
              Desde&nbsp;<a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a>&nbsp;estamos
              profundamente comprometidos con la protección de los derechos de propiedad intelectual. Es por ello que
              hemos establecido las siguientes condiciones y políticas:
            </p>
          </div>
          <br />
          <div className={styles.text}>1. RELATIVOS A LA PLATAFORMA ONLINE</div>
          <br />
          <div className={styles.text}>
            El prestador garantiza al usuario que es el legítimo propietario de la plataforma y que ésta no se encuentra
            inmersa en ningún tipo de disputa legal previa a la firma del presente contrato.
          </div>
          <br />
          <div className={styles.text}>
            El usuario reconoce expresamente que el prestador ostenta todo derecho, título e interés sobre la plataforma
            y los desarrollos informáticos asociados al servicio, así como sobre todos sus módulos, modificaciones y
            actualizaciones y sobre cualquier elemento y/o funcionalidad que fuera desarrollada sobre la misma, con
            independencia de si éste ha sido solicitado por el usuario o no. A estos efectos, se incluye sin limitación
            alguna, el reconocimiento de la titularidad del prestador de todos los derechos de autor, propiedad
            intelectual, y/o industrial, pudiendo explotar la plataforma, sin restricción alguna de naturaleza temporal,
            territorial, relativa a medios de difusión o modalidades de explotación y sin más limitaciones que las
            establecidas en las leyes.
          </div>
          <br />
          <div className={styles.text}>
            La estructura, características, códigos, métodos de trabajo, sistemas de información e intercambio de la
            misma, herramientas de desarrollo, know-how, metodologías, procesos, tecnologías o algoritmos que
            constituyan y/o puedan constituir la plataforma, son propiedad exclusiva del prestador, encontrándose
            debidamente protegidos por las leyes nacionales e internacionales de propiedad intelectual y/o industrial,
            no pudiendo ser objeto de ulterior modificación, copia, alteración, reproducción, adaptación o traducción
            por parte del usuario, sin que exista el previo consentimiento expreso por parte del prestador.
          </div>
          <br />
          <div className={styles.text}>
            Del mismo modo, todos los manuales de uso, textos, dibujos gráficos, bases de datos, que complementan la
            plataforma y/o los materiales asociados a ésta, son propiedad del prestador, sin que pueda ser objeto de
            ulterior modificación, copia, alteración, reproducción, adaptación o traducción por parte del usuario.
          </div>
          <br />
          <div className={styles.text}>
            La puesta a disposición en modo servicio de la plataforma o el mero acceso por parte del usuario no implica,
            en ningún caso, la cesión de su titularidad, ni la concesión de un derecho de uso a favor del usuario
            distinto del expresado en estas condiciones.
          </div>
          <br />
          <div className={styles.text}>
            Con el fin de que el usuario pueda utilizar la plataforma, propiedad exclusiva del prestador, ésta cede en
            virtud del presente contrato una licencia de uso a favor del usuario de carácter no exclusivo, de ámbito
            temporal limitado a cada periodo de conexión, de ámbito espacial ilimitado en la medida en que puede
            accederse desde cualquier equipo con Internet, intransferible, revocable y no sublicenciable.
          </div>
          <br />
          <div className={styles.text}>
            En cualquier caso, queda absolutamente prohibida cualquier tipo de reproducción, imitación, transmisión,
            traducción, modificación, elaboración de obra derivada y/o comunicación pública, con independencia del medio
            empleado para ello, asumiendo en caso contrario el usuario infractor todas las responsabilidades directas o
            derivadas que pudieran llegar a producirse.
          </div>
          <br />
          <div className={styles.text}>
            Para cualquier aspecto que no se encuentre expresamente reconocido en el presente contrato, se entenderá
            reservados todos los derechos a favor del prestador siendo necesaria la autorización escrita por parte de
            éste para poder llevarlo a cabo.
          </div>
          <br />
          <div className={styles.text}>2. RELATIVOS A LOS CONTENIDOS E INFORMACIÓN DE LOS USUARIOS</div>
          <br />
          <div className={styles.text}>
            <p>
              Todos los contenidos e informaciones publicadas o gestionados por parte de los usuarios en la plataforma
              son propiedad exclusiva de éste, siendo&nbsp;
              <a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a>&nbsp;un mero prestador de servicios
              de la sociedad de la información encargado del almacenamiento de datos.
            </p>
          </div>
          <br />
          <div className={styles.text}>
            El prestador no recibe ningún tipo de derecho de propiedad intelectual por el hecho de que el usuario los
            aloje o gestione en su plataforma, por lo que en ningún caso podrá tratarlos para fines diferentes a los
            directamente relacionados con la prestación de los servicios efectivamente contratados.
          </div>
          <br />
          <div className={styles.text}>CONFIDENCIALIDAD Y PROTECCIÓN DE DATOS</div>
          <br />
          <div className={styles.text}>
            De conformidad con lo dispuesto por el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27
            de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de
            datos personales y a la libre circulación de estos, todos los datos de carácter personal facilitados durante
            la utilización de la plataforma y durante la prestación de los servicios serán tratados de conformidad con
            lo dispuesto en la Política de Privacidad, que todo usuario debe aceptar expresamente y de forma previa para
            poder registrarse.
          </div>
          <br />
          <div className={styles.text}>
            Todo usuario que acepte las presentes condiciones de uso, aceptan de forma informada, expresa e inequívoca
            nuestra Política de Privacidad, asistiéndole en este sentido los derechos de acceso, rectificación,
            cancelación y oposición respecto a sus datos de carácter personal, pudiendo ejercerlos según se informa en
            la mencionada Política de Privacidad.
          </div>
          <br />
          <div className={styles.text}>CONDICIONES TEMPORALES</div>
          <br />
          <div className={styles.text}>
            Las presentes condiciones entrarán en vigor en la fecha de la contratación del servicio y tendrán una
            duración de un año, renovándose de forma tácita por períodos anuales.
          </div>
          <br />
          <div className={styles.text}>
            Cualquiera de las partes podrá dar por finalizado el presente contrato mediante comunicación expresa y
            escrita a la otra parte, al menos con 30 días de antelación al inicio del período siguiente.
          </div>
          <br />
          <div className={styles.text}>
            No obstante, aquellos servicios que sean de consumo y que sean contratados en paquetes o promociones, podrán
            tener una duración determinada y específica inferior a la indicada, que en todo caso será mostrada antes de
            proceder a la contratación.
          </div>
          <br />
          <div className={styles.text}>CONDICIONES ECONÓMICAS</div>
          <br />
          <div className={styles.text}>
            Las tarifas aplicables a cada uno de los servicios ofrecidos a través de la plataforma serán única y
            exclusivamente aquellas que se encuentren publicadas en la plataforma online, siendo éstas las únicamente
            válidas, salvo error tipográfico o de transcripción, caso en el que el prestador se compromete a
            modificarlas inmediatamente.
          </div>
          <br />
          <div className={styles.text}>
            En caso de que la modalidad de pago sea mediante domiciliación bancaria, el usuario acepta expresamente que
            el prestador realice periódicamente en los plazos indicados, los cargos económicos correspondientes en la
            cuenta bancaria del usuario.
          </div>
          <br />
          <div className={styles.text}>
            El prestador se reserva el derecho a anular las contrataciones realizadas durante el plazo de 7 días desde
            el momento de su realización en caso de que detecte la existencia de errores tipográficos o de transcripción
            en el precio y/o los impuestos aplicados a la transacción.
          </div>
          <br />
          <div className={styles.text}>
            El prestador se reserva el derecho a realizar cualquier tipo de modificación sobre las tarifas de cada
            servicio, comprometiéndose éste a publicarlas en la plataforma de forma visible para los usuarios. Salvo
            disposición en contrario, la modificación de tarifas no tendrá carácter retroactivo.
          </div>
          <br />
          <div className={styles.text}>
            Todos los servicios contratados serán debidamente facturados y abonados de forma previa a la prestación de
            los servicios o a mes vencido, dependiendo de la modalidad de contratación empleada.
          </div>
          <br />
          <div className={styles.text}>
            Las cantidades económicas únicamente podrán ser abonadas mediante domiciliación bancaria o mediante tarjeta
            de crédito, no contando en ningún momento el prestador con acceso a ningún dato bancario o de las tarjetas
            de crédito.
          </div>
          <br />
          <div className={styles.text}>
            Todas las tarifas se verán incrementadas con el importe correspondiente a los impuestos vigentes en la fecha
            de emisión de la factura, quedando debidamente reflejados en el resumen de cada compra.
          </div>
          <br />
          <div className={styles.text}>SERVICIO DE ATENCIÓN AL CLIENTE</div>
          <br />
          <div className={styles.text}>Horario: 9:00 a 14:00 y de 16:00 a 19:00 De lunes a viernes</div>
          <br />
          <div className={styles.text}>Teléfono: 650148244</div>
          <br />
          <div className={styles.text}>Email: administracion@crysdyazandco.com</div>
          <br />
          <div className={styles.text}>RESOLUCION EXTRAJUDICIAL DE CONFLICTOS</div>
          <br />
          <div className={styles.text}>
            <p className={'break-words'}>
              Asimismo, en los términos que se recogen en el artículo 14 del Reglamento UE 524/2013, sobre resolución de
              litigios en materia de consumo, se proporciona un enlace directo a la plataforma de resolución de litigios
              en línea:&nbsp;
              <a href={'https://ec.europa.eu/consumers/odr/main/index.cfm'}>
                https://ec.europa.eu/consumers/odr/main/index.cfm
              </a>
            </p>
          </div>
          <br />
          <div className={styles.text}>LEY APLICABLE Y JURISDICCIÓN</div>
          <br />
          <div className={styles.text}>
            Para cualquier controversia o conflicto que pudiera surgir, derivado de estos términos o condiciones,
            resultará de aplicación la Ley Española. La resolución de los conflictos judiciales se someterá a la
            competencia de los Juzgados y Tribunales del domicilio del usuario o cliente.
          </div>
          <br />
          <div className={styles.text + ' mb-10'}>REV: 11/2/2021</div>
        </div>
      </div>
    </div>
  )
}
export default Sale

Sale.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
