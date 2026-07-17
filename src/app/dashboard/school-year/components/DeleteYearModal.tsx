import { BaseModal, Icons, ModalOpenProps } from '_components/custom';
import { Alert } from '@chakra-ui/react';

export const DeleteYearModal = ({
  isOpen,
  isLoading,
  onChange,
  callback = () => {},
}: ModalOpenProps) => {
  return (
    <BaseModal
      title="Supprimer l'année scolaire"
      description={
        "La suppression d'une année scolaire est définitive et entraîne la suppression de toutes les données qui lui sont associées."
      }
      icon={<Icons.Trash />}
      onChange={(value) => {
        onChange(value);
      }}

      isOpen={isOpen}
      isLoading={isLoading}
      onClick={callback}
      modalType={'alertdialog'}
    >
      <Alert.Root status="error" borderRadius="md">
        <Alert.Indicator />

        <Alert.Content>
          <Alert.Title>Attention : suppression définitive</Alert.Title>
          <Alert.Description>
            Cette action supprimera définitivement :
            <br />
            • Les trimestres associés à cette année scolaire.
            <br />
            • Les notes saisies pour les élèves.
            <br />
            • Les bulletins générés.
            <br />
            • Les frais scolaires liés à cette année.
            <br />
            • Les classes et données pédagogiques rattachées.
            <br />
            <br />
            Cette opération est irréversible. Vérifiez que cette année scolaire n'est plus utilisée
            avant de continuer.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    </BaseModal>
  );
};
