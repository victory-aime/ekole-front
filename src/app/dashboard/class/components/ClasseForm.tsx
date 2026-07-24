import { BaseModal, FormSelect, FormTextInput, ModalOpenProps } from '_components/custom';
import { Formik } from 'formik';
import { HStack, VStack } from '@chakra-ui/react';

export const ClasseForm = ({
  callback = () => {},
  isLoading,
  onChange,
  isOpen,
}: ModalOpenProps) => {
  return (
    <Formik initialValues={{}} onSubmit={callback}>
      {({ resetForm, handleSubmit, setFieldValue }) => (
        <BaseModal
          isOpen={isOpen}
          onChange={(value) => {
            onChange(value);
            resetForm();
          }}
          title={'Nouvelle classe'}
          description={"Créez une nouvelle classe pour l'année en cours."}
          onClick={() => handleSubmit()}
          buttonSaveTitle={'Enregistrer'}
          isLoading={isLoading}
          size={'md'}
        >
          <VStack width={'full'} gap={3}>
            <HStack width={'full'}>
              <FormTextInput name={'nom'} required label={'Libellé'} placeholder={'5ème C'} />
              <FormTextInput
                name={'effectif_max'}
                required
                label={'Effectif max'}
                placeholder={'100'}
              />
            </HStack>
            <FormSelect
              name={'niveau'}
              label={'Niveau'}
              required
              listItems={[]}
              setFieldValue={setFieldValue}
            />
            <FormTextInput
              name={'professeur_titulaire'}
              label={'Enseignant titulaire'}
              placeholder={'Enseignant titulaire'}
            />
          </VStack>
        </BaseModal>
      )}
    </Formik>
  );
};
