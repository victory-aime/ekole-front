import { Formik } from 'formik';
import {
  ActionsButton,
  FormSelect,
  FormTextInput,
  Icons,
  ModalOpenProps,
} from '_components/custom';
import React from 'react';
import { createListCollection, HStack } from '@chakra-ui/react';
import { CLASS_GRADE_CYCLE } from '../../../../types/constants';
import { MODELS } from '_types/';

export const ClasseFilter = ({
  data,
  isLoading,
  onChange,
  callback = () => {},
}: ModalOpenProps) => {
  const cycleList = createListCollection({
    items: CLASS_GRADE_CYCLE.map((c) => ({
      label: c.label,
      value: c.value,
    })),
  });

  return (
    <Formik initialValues={{} as MODELS.IClassFilter} onSubmit={callback}>
      {({ setFieldValue, resetForm, handleSubmit }) => (
        <HStack gap={4}>
          <FormTextInput
            name="nom"
            placeholder="Rechercher une classe"
            leftAccessory={<Icons.Search />}
          />
          <FormTextInput
            name="professeur_principal"
            placeholder="Rechercher un enseignant"
            leftAccessory={<Icons.Search />}
          />
          <FormSelect name="cycle" listItems={cycleList} setFieldValue={setFieldValue} />
          <ActionsButton
            onCancel={() => {
              resetForm();
              onChange();
            }}
            onClick={() => handleSubmit()}
            icon={<Icons.Search />}
            cancelTitle="COMMON.CLEAR_FILTER"
            validateTitle="COMMON.SEARCH"
            cancelVariant="outline"
            cancelColor="neutral"
            cancelShow={!!data}
            isLoading={isLoading}
          />
        </HStack>
      )}
    </Formik>
  );
};
