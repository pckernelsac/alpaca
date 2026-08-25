import { useState } from 'react';
import type { FormEvent } from 'react';

import { PageHero } from '../components/site/PageHero';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Field';
import { IconChat, IconClock, IconMail, IconPhone, IconPin } from '../components/ui/Icon';
import { Alert } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { useReveal } from '../hooks/useReveal';
import { ApiRequestError, contactApi } from '../lib/api';
import { EMPRESA } from '../lib/empresa';
import { useToast } from '../providers/ToastProvider';
import styles from './Contacto.module.css';
import pagina from './Pagina.module.css';

interface Campos {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const VACIO: Campos = { name: '', email: '', subject: '', message: '' };

/**
 * Se valida acá con las mismas reglas que el backend (`ContactCreate`).
 * Duplicarlas no es ideal, pero mandar el formulario para que vuelva un 422 y
 * traducirlo campo por campo es peor experiencia por un error evitable.
 */
function validar(campos: Campos): Partial<Record<keyof Campos, string>> {
  const errores: Partial<Record<keyof Campos, string>> = {};

  if (campos.name.trim().length < 2) errores.name = 'Contanos cómo te llamás';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.trim())) {
    errores.email = 'Revisá el correo, no parece válido';
  }
  if (campos.subject.trim().length < 2) errores.subject = 'Poné un asunto';
  if (campos.message.trim().length < 5) errores.message = 'Escribinos un poco más';

  return errores;
}

export function Contacto() {
  usePageTitle('Contacto');
  useReveal();

  const toast = useToast();
  const [campos, setCampos] = useState<Campos>(VACIO);
  const [errores, setErrores] = useState<Partial<Record<keyof Campos, string>>>({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  function cambiar(campo: keyof Campos, valor: string) {
    setCampos((actual) => ({ ...actual, [campo]: valor }));
    // El error se borra al corregir, no al reenviar: dejarlo puesto mientras
    // se escribe la corrección se lee como si el formulario no reaccionara.
    setErrores((actual) => ({ ...actual, [campo]: undefined }));
  }

  async function enviar(event: FormEvent) {
    event.preventDefault();

    const encontrados = validar(campos);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    setEnviando(true);
    try {
      await contactApi.send({
        name: campos.name.trim(),
        email: campos.email.trim(),
        subject: campos.subject.trim(),
        message: campos.message.trim(),
      });
      setEnviado(true);
      setCampos(VACIO);
      toast.success('Recibimos tu consulta');
    } catch (error) {
      toast.error(
        error instanceof ApiRequestError ? error.message : 'No pudimos enviar tu consulta',
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Escribinos"
        lead={`Respondemos de ${EMPRESA.horario.toLowerCase()}. Si es por un pedido en curso, incluí el número y vamos directo al grano.`}
      />

      <section className={pagina.seccion}>
        <div className="container">
          <div className={styles.grilla}>
            <div>
              {enviado && (
                <Alert tone="success" className={styles.aviso}>
                  Gracias por escribirnos. Te respondemos al correo que dejaste, normalmente dentro
                  del mismo día hábil.
                </Alert>
              )}

              <form className={styles.formulario} onSubmit={enviar} noValidate>
                <div className={styles.fila}>
                  <Input
                    label="Nombre"
                    value={campos.name}
                    onChange={(event) => cambiar('name', event.target.value)}
                    error={errores.name}
                    autoComplete="name"
                    required
                  />
                  <Input
                    label="Correo"
                    type="email"
                    value={campos.email}
                    onChange={(event) => cambiar('email', event.target.value)}
                    error={errores.email}
                    autoComplete="email"
                    required
                  />
                </div>

                <Input
                  label="Asunto"
                  value={campos.subject}
                  onChange={(event) => cambiar('subject', event.target.value)}
                  error={errores.subject}
                  required
                />

                <Textarea
                  label="Mensaje"
                  rows={7}
                  value={campos.message}
                  onChange={(event) => cambiar('message', event.target.value)}
                  error={errores.message}
                  hint="Si es por mayoreo, contanos qué volumen y para cuándo."
                  required
                />

                <Button type="submit" loading={enviando}>
                  Enviar consulta
                </Button>
              </form>
            </div>

            <aside className={styles.datos} data-reveal>
              <h2 className={styles.datosTitulo}>Dónde encontrarnos</h2>

              <ul className={styles.lista}>
                <li>
                  <IconPin size={18} className={styles.listaIcono} />
                  <span>
                    {EMPRESA.direccion}
                    <br />
                    {EMPRESA.ciudad}
                  </span>
                </li>
                <li>
                  <IconMail size={18} className={styles.listaIcono} />
                  <a href={`mailto:${EMPRESA.correo}`}>{EMPRESA.correo}</a>
                </li>
                <li>
                  <IconPhone size={18} className={styles.listaIcono} />
                  <a href={`tel:${EMPRESA.telefono.replace(/\s/g, '')}`}>{EMPRESA.telefono}</a>
                </li>
                <li>
                  <IconClock size={18} className={styles.listaIcono} />
                  <span>{EMPRESA.horario}</span>
                </li>
              </ul>

              <a
                className={styles.whatsapp}
                href={`https://wa.me/${EMPRESA.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                <IconChat size={18} />
                Escribir por WhatsApp
              </a>

              <p className={styles.ruc}>
                {EMPRESA.nombre} · RUC {EMPRESA.ruc}
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
