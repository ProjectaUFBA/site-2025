"use client"

import { PrismicRichText, SliceZone } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { components } from "@/slices";

import { useFormik } from "formik";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import * as yup from "yup";

import styles from "./contactComponent.module.scss";
import { ContactDocumentData, ServiceItemHighlightSlice } from "../../../../prismicio-types";
import { ImageField } from "@prismicio/client";
import Image from "next/image";
import { useState } from "react";

export default function ContactComponent({ 
  page, 
  heroImage, 
  servicesData 
}: { 
  page: ContactDocumentData, 
  heroImage: ImageField,
  servicesData: ServiceItemHighlightSlice[]
}) {

  const [success, setSuccess] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_URL || '';
  const apiKeyRd = process.env.NEXT_PUBLIC_API_RD_URL || '';

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };
  const center = {
    lat: page.geopoint.latitude,
    lng: page.geopoint.longitude
  };
  
  const validationSchema = yup.object({
    name: yup.string().required("Campo obrigatório"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("Campo obrigatório"),
    phone: yup.string().required("Campo obrigatório").min(5, "Telefone inválido"),
    service: yup.string().required("Campo obrigatório").notOneOf(["Selecione"], "Campo obrigatório"),
    message: yup.string().required("Campo obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: 0,
      service: "Selecione",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSuccess(true);
      formik.resetForm();
      // do post to RDStation
    },
  });

  interface Option {
    option: string;
  }

  const itemTemplate = (option: Option) => {
    return (
      <section className={styles.itemTemplate}>
        <p>{option.option}</p>
      </section>
    );
  }

  // Função para extrair títulos dos serviços dos dados do Prismic
  const extractServiceTitles = (servicesData: ServiceItemHighlightSlice[]) => {
    return servicesData.map((service) => {
      // Extrair o texto do título do campo RichText
      const titleText = service.primary.serviceTitle
        .map((block) => {
          if (block.type === 'heading2' && 'text' in block) {
            return block.text || '';
          }
          return '';
        })
        .join('')
        .trim();
      
      return { option: titleText || 'Serviço sem título' };
    }).filter(service => service.option !== 'Serviço sem título'); // Filtrar serviços sem título
  };

  const options = extractServiceTitles(servicesData);

  return (
    <main className={styles.contactWrapper}>
      <section className={styles.internWrapper}>
        {/* [AI Generated] Data: 19/01/2025
             Descrição: Adição da imagem do hero como background escurecido e borrado
             Gerado por: Cursor AI
             Versão: React 18, Next.js 14, TypeScript 5 */}
        {/* AI_GENERATED_CODE_START */}
        <div className={styles.backgroundImage}>
          <PrismicNextImage 
            className={styles.heroBackground} 
            field={heroImage} 
            fallback={heroImage.alt ?? "Background"} 
          />
        </div>
        {/* AI_GENERATED_CODE_END */}
        <section className={styles.formWrapper}>
          <div className={styles.wrapperSocialTitle}>
            <div className={styles.titleDiv}>
              <h1 className={styles.title}>
                <span className={styles.titlePrefix}>
                  <PrismicRichText field={page.pageTitlePrefix} />
                </span>
                <span className={styles.titleYellow}>
                  <PrismicRichText field={page.pageTitle} />
                </span>
                <span className={styles.titleSufix}>
                  <PrismicRichText field={page.pageTitleSufix} />
                </span>
              </h1>
              <div className={styles.pageDescription}>
              <PrismicRichText field={page.pageDescription} />
              </div>
              <div className={styles.socialMedia}>
                  <SliceZone slices={page.slices} components={components} />
              </div>
            </div>
          </div>
          <div className={styles.formDiv}>
            <form name="Form Contato" className={styles.contactForm} onSubmit={formik.handleSubmit}>
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
              <div className={styles.wrapperMoreInputs}>
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
                <label>
                    <p>Serviço</p>
                    <Dropdown
                      panelClassName={styles.panelWrapper}
                      name="cf_service"
                      options={options}
                      value={formik.values.service}
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        const service = e.target.value;
                        formik.setFieldValue("service", service.option);
                      }}
                      optionLabel="option"
                      placeholder={formik.values.service}
                      itemTemplate={itemTemplate}
                      className={
                        formik.errors.service && formik.touched.service
                        ? `${styles.fieldError} ${styles.dropdown}`
                        : `${styles.dropdown}`
                      }
                    />
                    {formik.touched.service && formik.errors.service && (
                      <span className={styles.error}>{formik.errors.service}</span>
                    )}
                    {
                      //Hiding the input to get the value of the dropdown
                    }
                    <input
                      name="Serviço Escolhido"
                      type="text"
                      value={formik.values.service}
                      placeholder="Insira o Serviço"
                      onChange={() => {formik.handleChange}}
                      onBlur={formik.handleBlur}
                      className={styles.hiddenServiceInput}
                    />
                </label>
              </div>
              <label>
                  <p>Mensagem</p>
                  <textarea
                      name="message"
                      value={formik.values.message}
                      placeholder="Deixe aqui sua mensagem"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                      formik.errors.message && formik.touched.message
                          ? `${styles.field} ${styles.fieldError}`
                          : `${styles.field}`
                      }
                  />
                  {formik.touched.message && formik.errors.message && (
                      <span className={styles.error}>{formik.errors.message}</span>
                  )}
              </label>
              <button type="submit" className={styles.submitButton}>Enviar</button>
                
              {success && (
                <div className={styles.successDiv}>
                  <p className={styles.successMessage}>Formulário enviado com sucesso!</p>
                </div>
              )}

            </form>
          </div>
        </section>
      </section>
      <section className={styles.internMapWrapper}>
          <section className={styles.mapWrapper}>
            <div className={styles.mapDiv}>
            <LoadScript googleMapsApiKey={apiKey} >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
              >
                  <Marker position={center}  />
              </GoogleMap>
            </LoadScript>
            </div>
            <div className={styles.textMapDiv}>
              <Image src="/mapPin.svg" alt="Mapa" width={35} height={33}/>
              <div className={styles.addressWrapper}>
                <h2>Onde estamos</h2>
                <div className={styles.addressText}>
                  <span>Endereço</span>
                  <p>Rua Caetano Moura, 121 - Federação, Salvador - BA</p>
                </div>
                <div className={styles.phoneDiv}>
                  <PrismicRichText field={page.email} />
                  <PrismicRichText field={page.phone} />
                </div>
              </div>
            </div>
          </section>
      </section>
    </main>
  );
}