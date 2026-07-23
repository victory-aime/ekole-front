import { Formik } from 'formik';
import { BaseDrawer, FormDatePicker, Icons, ModalOpenProps } from '_components/custom';
import { VStack, Alert } from '@chakra-ui/react';
import { MODELS } from '_types/';

export const SchoolTermsForm = ({
  isOpen,
  data,
  isLoading,
  onChange,
  callback = () => {},
}: ModalOpenProps & { data: MODELS.ISchoolTerms | null }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ date: [data?.date_debut, data?.date_fin] }}
      onSubmit={callback}
    >
      {({ resetForm, handleSubmit }) => (
        <BaseDrawer
          title={'Modifier les dates du trimestre'}
          description={
            "Vous pouvez modifier les dates de ce trimestre tant qu'il n'a pas commencé. Les nouvelles dates doivent rester comprises dans l'année scolaire et ne pas chevaucher les autres trimestres."
          }
          icon={<Icons.Calendar />}
          onChange={(value) => {
            resetForm();
            onChange(value);
          }}
          size={'sm'}
          isOpen={isOpen}
          isLoading={isLoading}
          callback={() => handleSubmit()}
        >
          <VStack gap={4}>
            <FormDatePicker name={'date'} mode={'range'} />
            <Alert.Root status="warning" borderRadius="md">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Modification des dates du trimestre</Alert.Title>
                <Alert.Description>
                  Modifier les dates d'un trimestre peut impacter la planification de l'année
                  scolaire, les périodes de saisie des notes et les bulletins. Vérifiez que les
                  nouvelles dates restent cohérentes avec les autres trimestres.
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          </VStack>
        </BaseDrawer>
      )}
    </Formik>
  );
};
