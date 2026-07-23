import { HStack, VStack } from '@chakra-ui/react';
import {
  BaseModal,
  FormDatePicker,
  FormPhonePicker,
  FormSelect,
  FormTextInput,
  ModalOpenProps,
} from '_components/custom';
import { cityList } from '_constants/city';
import { MODELS } from '_types/*';
import { Formik } from 'formik';
import { establishmentValidationSchema } from '../validation/validation';

export function EstablishmentForm({
  onChange,
  isOpen,
  isLoading,
  callback = () => {},
}: ModalOpenProps) {
  return (
    <Formik
      enableReinitialize
      initialValues={{} as MODELS.ICreateEstablishment}
      onSubmit={callback}
      validationSchema={establishmentValidationSchema}
    >
      {({ setFieldValue, handleSubmit, resetForm }) => (
        <BaseModal
          title={'Nouvel Etablissement'}
          description="Ajoutez un site a votre groupe scolaire"
          isOpen={isOpen}
          isLoading={isLoading}
          onChange={(value) => {
            onChange(value);
            resetForm();
          }}
          onClick={() => handleSubmit()}
          buttonSaveTitle="Ajouter"
        >
          <VStack gap={6} width={'full'}>
            <FormTextInput required name="nom" label={"Nom de l'établissement"} placeholder="nom" />
            <HStack gap={2} width={'full'}>
              <FormTextInput
                required
                name="sigle"
                label="Sigle / code"
                placeholder="sigle / code"
              />
              <FormTextInput required name="email" label="Email" placeholder="email" />
              <FormPhonePicker
                name="telephone"
                label="Téléphone"
                required
                listAvailableCountries={['cg']}
              />
            </HStack>
            <HStack gap={2} width={'full'}>
              <FormSelect
                required
                name="ville"
                label="Ville"
                listItems={cityList}
                setFieldValue={setFieldValue}
              />
              <FormTextInput required name="adresse" label="Adresse" placeholder="adresse" />
            </HStack>

            <FormTextInput
              required
              name="libelle"
              label="Libellé de l'année academique"
              placeholder="2025-2026"
            />
            <FormDatePicker required name="date" mode="range" label={'Année academique'} />
          </VStack>
        </BaseModal>
      )}
    </Formik>
  );
}
