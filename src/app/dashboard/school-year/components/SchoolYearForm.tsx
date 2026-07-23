'use client';

import { Formik } from 'formik';
import {
  BaseDrawer,
  BaseModal,
  FormDatePicker,
  FormSelect,
  FormTextInput,
  Icons,
  ModalOpenProps,
} from '_components/custom';
import { createListCollection, VStack } from '@chakra-ui/react';
import { schoolYearValidationSchema } from '../validation/school-year';
import { MODELS } from '_types/';

export const SchoolYearForm = ({
  isLoading,
  isOpen,
  onChange,
  callback = () => {},
  data,
  establishmentList,
  isEstablishmentLoad,
}: ModalOpenProps) => {
  const list = createListCollection({
    items:
      establishmentList?.map((item: MODELS.IEstablishment) => ({
        label: item.nom,
        value: item.id,
      })) || [],
  });

  return (
    <Formik
      initialValues={{} as MODELS.ICreateSchoolYear}
      onSubmit={callback}
      validationSchema={schoolYearValidationSchema}
    >
      {({ resetForm, handleSubmit, values, setFieldValue }) => (
        <BaseModal
          title={'Nouvelle année'}
          onChange={(value) => {
            onChange(value);
            resetForm();
          }}
          icon={<Icons.Calendar />}
          iconBackgroundColor={'secondary.500'}
          isOpen={isOpen}
          onClick={() => handleSubmit()}
          isLoading={isLoading}
          closeOnInteractOutside={false}
        >
          <VStack gap={3}>
            <FormSelect
              required
              name="school_id"
              label="Etablissement"
              placeholder="mon-ecole"
              listItems={list}
              setFieldValue={setFieldValue}
              isLoading={isEstablishmentLoad}
            />
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
};
