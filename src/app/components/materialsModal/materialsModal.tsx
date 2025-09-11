"use client"

import Image from 'next/image';
import { useFormik } from 'formik';
import * as yup from "yup";

import styles from './materialsModal.module.scss'
import { InputMask } from 'primereact/inputmask';

import { LinkToMediaField } from '@prismicio/client';
import { useState } from 'react';
import { PrismicNextLink } from '@prismicio/next';

export default function MaterialsModal({onClose, download}: {onClose: () => void, download: LinkToMediaField}) {
  const apiKeyRd = process.env.NEXT_PUBLIC_API_RD_URL || '';

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const validationSchema = yup.object({
    name: yup.string().required("Campo obrigatório"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("Campo obrigatório"),
    phone: yup.string().required("Campo obrigatório").min(5, "Telefone inválido"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let data = {
        name: values.name,
        email: values.email,
        phone: values.phone.toString().replace(/\D/g, ""),
      }
      setIsFormSubmitted(true);
    },
  });
  return (
    <section className={styles.wrapperModal}>
      <section className={styles.internModal}>
        <div className={styles.logoOrange}>
          <Image className={styles.projectaLogo} src="/projectaLogo.png" width={144} height={144} alt='Projecta'/>
          <div className={styles.closeDiv}>
            <Image onClick={onClose} src="/closeMaterials.svg" width={19.5} height={19.5} alt='Fechar'/>
          </div>
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.formTitle}>
            {isFormSubmitted ? <p>TUDO PRONTO!</p> : <p>OPA!</p>}
            {isFormSubmitted ? <h3>Seu novo e-book está pronto para baixar. Boa Leitura!</h3> : <h3>Para concluir o download, preencha os seguintes dados:</h3>}
            {isFormSubmitted && <PrismicNextLink target="_blank" field={download}><button className={styles.submitButton}>Baixar</button></PrismicNextLink>}
          </div>
          {!isFormSubmitted &&
          <form name="Form Materiais" className={styles.formIntern} onSubmit={formik.handleSubmit}>
            <script type="text/javascript" async src={`${apiKeyRd}`} ></script>
            <label>
                <p>Nome</p>
                <input
                    name="name"
                    type="text"
                    value={formik.values.name}
                    placeholder="Insira seu nome"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                    formik.errors.name && formik.touched.name
                        ? `${styles.field} ${styles.fieldError}`
                        : `${styles.field}`
                    }
                />
                {formik.touched.name && formik.errors.name && (
                    <span className={styles.error}>{formik.errors.name}</span>
                )}
            </label>
            <label>
                <p>E-mail</p>
                <input
                    name="email"
                    type="text"
                    placeholder="Insira seu e-mail"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                    formik.errors.email && formik.touched.email
                        ? `${styles.fieldError}`
                        : ''
                    }
                />
                {formik.touched.email && formik.errors.email && (
                    <span className={styles.error}>{formik.errors.email}</span>
                )}
            </label>
            <label>
                <p>Telefone</p>
                <InputMask
                  name="phone"
                  placeholder="Insira seu telefone"
                  mask="(99) 99999-9999"
                  value={formik.values.phone.toString()}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.phone && formik.touched.phone
                      ? `${styles.fieldError}`
                      : ''
                  }
                />
                {formik.touched.phone && formik.errors.phone && (
                    <span className={styles.error}>{formik.errors.phone}</span>
                )}
              </label>
            <button type="submit" className={styles.submitButton}>Enviar</button>
          </form>
          }
        </div>
      </section>
    </section>
  );
}