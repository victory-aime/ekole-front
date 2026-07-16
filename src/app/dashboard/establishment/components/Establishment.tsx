'use client';

import {
  BaseButton,
  BaseContainer,
  BaseText,
  CustomSkeletonLoader,
  Icons,
} from '_components/custom';
import { EstablishmentModule } from '_store/state-management';
import { DisplayInfoRow } from '../../../components/DisplayInfoRow';
import { DetailsContainer } from '../../../components/DetailsContainer';
import { Flex, For, Stack, SimpleGrid, HStack } from '@chakra-ui/react';
import { Avatar } from '_components/ui/avatar';
import { useState } from 'react';
import { EstablishmentForm } from './EstablishmentForm';
import { FormikValues } from 'formik';
import { MODELS } from '_types/*';
import { getLocalTimeZone } from '@internationalized/date';

export default function Establishment() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { data, isFetching: isLoading, refetch } = EstablishmentModule.listQueries({});

  const { mutateAsync: createEstablishment, isPending } =
    EstablishmentModule.createEstablishmentMutation({
      mutationOptions: {
        onSuccess: async () => {
          setOpenForm(false);
          await refetch();
        },
      },
    });

  const handleCreate = async (values: FormikValues) => {
    const [start, end] = values.date;
    const startDate = start.toDate(getLocalTimeZone());
    const endDate = end.toDate(getLocalTimeZone());

    const request = {
      ...values,
      annees_scolaires: {
        libelle: values?.libelle,
        date_debut: startDate,
        date_fin: endDate,
      },
      ville: values?.ville && values?.ville[0],
    };
    await createEstablishment({
      payload: request as MODELS.ICreateEstablishment,
    });
  };

  return (
    <BaseContainer
      title={'Etablissements'}
      description={'Gerez les differents sites de votre groupe scolaire'}
      border={'none'}
      withActionButtons
      actionsButtonProps={{
        validateTitle: 'Nouvel établissement',
        onClick() {
          setOpenForm(true);
        },
        onReload: async () => {
          await refetch();
        },
      }}
    >
      {isLoading ? (
        <SimpleGrid columns={{ base: 1, sm: 2 }} width="full" gap={4} mt={'30px'}>
          {Array.from({ length: 4 }).map(() => (
            <CustomSkeletonLoader type="FORM" width={'full'} />
          ))}
        </SimpleGrid>
      ) : (
        <HStack gap={3} width={'full'}>
          <For each={data}>
            {(item, idx) => (
              <DetailsContainer key={idx} width={'full'} mt={'30px'}>
                <Flex alignItems={'flex-start'} justifyContent={'space-between'} mb={8}>
                  <Stack>
                    <BaseText>{item.nom}</BaseText>
                    <BaseText color={'gray.500'}>
                      Sigle : {item.sigle} - {'Année scolaire '} - {item.annee_scolaire.libelle} -
                      {item.annee_scolaire.total_eleves ?? 0} élèves
                    </BaseText>
                  </Stack>
                  <Avatar fallback={item.sigle} size={'lg'} />
                </Flex>
                <DisplayInfoRow icon={Icons.MapPin} label="Adresse">
                  {item.adresse}
                </DisplayInfoRow>
                <DisplayInfoRow icon={Icons.Phone} label="Telephone">
                  {item.telephone}
                </DisplayInfoRow>
                <DisplayInfoRow icon={Icons.Mail} label="Email">
                  {item.email}
                </DisplayInfoRow>
              </DetailsContainer>
            )}
          </For>
        </HStack>
      )}
      <EstablishmentForm
        isOpen={openForm}
        onChange={setOpenForm}
        isLoading={isPending}
        callback={handleCreate}
      />
    </BaseContainer>
  );
}
