import { BaseTag, BaseText, CustomSkeletonLoader, Icons } from '_components/custom';
import { DetailsContainer } from '../../../components/DetailsContainer';
import {
  Box,
  Flex,
  For,
  SimpleGrid,
  Stack,
  VStack,
  IconButton,
  createListCollection,
} from '@chakra-ui/react';
import { hexToRGB } from '_theme/colors';
import { convertDateFormat } from 'rise-core-frontend';
import { MODELS, ENUM } from '_types/';
import { BaseSelect } from '_components/custom/select/BaseSelect';
import { useMemo, useState } from 'react';

export const ActiveYear = ({
  data,
  setOpenLock,
  setOpenEdit,
  setSelectedValues,
  isLoading,
}: {
  data: MODELS.ISchoolYears[] | undefined;
  setOpenLock: (value: boolean) => void;
  setOpenEdit: (value: boolean) => void;
  setSelectedValues: (value: MODELS.ISchoolTerms) => void;
  isLoading: boolean;
}) => {
  const [selectedItems, setSelectedItems] = useState<string | undefined>(data?.[0].id);

  const listCollection = createListCollection({
    items:
      data?.map((l) => ({
        value: l.id,
        label: l.libelle,
      })) || [],
  });

  const selectedYear = useMemo(() => {
    if (!data?.length) return undefined;

    if (!selectedItems) {
      return data.find((y) => y.active) ?? data[0];
    }

    return data.find((y) => y.id === selectedItems);
  }, [data, selectedItems]);

  return isLoading ? (
    <Box mt={3} width={'full'}>
      <CustomSkeletonLoader type={'FORM'} width={'full'} />
    </Box>
  ) : (
    <DetailsContainer width={'full'}>
      <Flex alignItems={'center'} justifyContent={'space-between'} width="full">
        <Stack gap={0} width={'full'}>
          <BaseText> Année active </BaseText>
          <BaseText fontSize={'sm'}>
            Configurez les trimestres et jalons pédagogiques de l'année en cours.
          </BaseText>
        </Stack>
        <BaseSelect
          width={'1/2'}
          value={[selectedItems ?? data?.[0].id!]}
          listItems={listCollection}
          placeholder="Changer l'année académique"
          isClearable={false}
          onChangeFunc={(value) => {
            setSelectedItems(value?.[0]);
          }}
        />
      </Flex>

      <VStack width={'full'} align={'flex-start'} mt={8}>
        <Flex
          px={6}
          py={4}
          width={'full'}
          borderWidth={1}
          justifyContent={'space-between'}
          borderColor={selectedYear?.active ? 'primary.400' : 'red.100'}
          bg={selectedYear?.active ? hexToRGB('primary', 0.1, 400) : 'red.200'}
          rounded={'lg'}
        >
          <Stack gap={0}>
            <BaseText fontSize={'lg'} fontWeight={'bold'}>
              {selectedYear?.libelle}
            </BaseText>
            <BaseText fontSize={'sm'}>
              Du {convertDateFormat(selectedYear?.date_debut)} au{' '}
              {convertDateFormat(selectedYear?.date_fin)}{' '}
            </BaseText>
          </Stack>
          <Box>
            <BaseTag
              size="sm"
              label={selectedYear?.active ? 'En cours' : 'Inactif'}
              colorPalette={selectedYear?.active ? 'blue' : 'red'}
            />
          </Box>
        </Flex>
        <SimpleGrid columns={{ base: 1, sm: 3 }} gap={'2'} width={'full'}>
          <For each={selectedYear?.trimestres}>
            {(item: MODELS.ISchoolTerms, idx) => (
              <DetailsContainer
                key={idx}
                mt={4}
                px={3}
                py={2}
                width={'full'}
                borderWidth={1}
                justifyContent={'space-between'}
                borderColor={item?.actif ? 'success.500' : 'inherit'}
                bg={item?.actif ? hexToRGB('success', 0.1) : 'none'}
                rounded={'lg'}
              >
                <VStack width={'full'} align={'flex-start'} gap={0}>
                  <Flex width={'full'} alignItems={'center'} justifyContent={'space-between'}>
                    <BaseText fontSize={'sm'}>{item.nom}</BaseText>
                    {item.actif && <BaseTag status={ENUM.Status.ACTIVE} />}

                    {!item.actif && (
                      <IconButton
                        colorPalette={item.verrouille ? 'red' : 'blue'}
                        variant="surface"
                        size="xs"
                        onClick={() => {
                          setSelectedValues(item);

                          if (item.verrouille) {
                            setOpenLock(true);
                          } else {
                            setOpenEdit(true);
                          }
                        }}
                      >
                        {item.verrouille ? <Icons.Lock size={15} /> : <Icons.Edit size={15} />}
                      </IconButton>
                    )}
                  </Flex>

                  <BaseText fontSize={'sm'} mt={1}>
                    Du {convertDateFormat(item.date_debut)} au {convertDateFormat(item.date_fin)}
                  </BaseText>
                </VStack>
              </DetailsContainer>
            )}
          </For>
        </SimpleGrid>
      </VStack>
    </DetailsContainer>
  );
};
