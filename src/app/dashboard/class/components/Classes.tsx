'use client';

import { BaseContainer, ColumnsDataTable, DataTableContainer } from '_components/custom';
import { ClassStatsCard } from './ClassStatsCard';
import { ClassModule } from '_store/state-management';
import { CLASS_GRADE_CYCLE } from '../../../../types/constants';
import { HStack, Progress } from '@chakra-ui/react';
import React, { useState, useMemo } from 'react';
import { ClasseForm } from './ClasseForm';
import { ClasseFilter } from './ClasseFilter';
import { MODELS } from '_types/';
import { FormikValues } from 'formik';

export const Classes = () => {
  const [openForm, setOpenForm] = useState(false);
  const [filterValues, setFilterValues] = useState<MODELS.IClassFilter | null>(null);

  const queryPayload = useMemo(
    () => ({
      params: { data: filterValues },
    }),
    [filterValues],
  );

  const { data, isFetching, refetch } = ClassModule.classListQueries(queryPayload);

  const handleFilter = async (values: FormikValues) => {
    const hasNom = values?.nom?.trim().length > 0;
    const hasProf = values?.professeur_principal?.trim().length > 0;
    const hasCycle = values?.cycle[0]?.trim().length > 0;

    if (!hasNom && !hasProf && !hasCycle) return;

    setFilterValues({
      nom: values?.nom,
      professeur_principal: values?.professeur_principal,
      cycle: values?.cycle && values?.cycle[0],
    });
  };

  const classColumns: ColumnsDataTable[] = [
    { header: 'Classe', accessor: 'nom' },
    {
      header: 'Cycle',
      accessor: 'fullObject',
      cell: (data) => CLASS_GRADE_CYCLE.find((c) => data?.niveau?.cycle === c.value)?.label,
    },
    {
      header: 'Enseignant Principal',
      accessor: 'fullObject',
      cell: (data) => data?.professeur_principal?.nom + ' ' + data?.professeur_principal?.prenom,
    },
    {
      header: 'Effectif',
      accessor: 'fullObject',
      cell: (data) => data?.eleves + '/' + data?.effectif_max,
    },
    {
      header: "Taux d'occupation",
      accessor: 'fullObject',
      cell: (data) => {
        return (
          <Progress.Root
            defaultValue={0}
            value={(data.eleves / data.effectif_max) * 100}
            size={'xs'}
          >
            <HStack width={'full'}>
              <Progress.Track width={'full'} bgColor={'primary.200'} rounded={'lg'}>
                <Progress.Range bgColor={'primary.500'} />
              </Progress.Track>
              <Progress.ValueText />
            </HStack>
          </Progress.Root>
        );
      },
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'view',
          handleClick: () => {},
        },
      ],
    },
  ];

  return (
    <BaseContainer
      title={'Classes'}
      description={'Organisez les classes'}
      border={'none'}
      withActionButtons
      isFilterActive={true}
      actionsButtonProps={{
        validateTitle: 'Nouvelle classe',
        onClick: () => {
          setOpenForm(true);
        },
        onReload: async () => {
          await refetch();
        },
      }}
      filterComponent={
        <ClasseFilter
          data={!!filterValues}
          onChange={async () => {
            setFilterValues(null);
            await refetch();
          }}
          callback={handleFilter}
          isLoading={isFetching}
        />
      }
    >
      <ClassStatsCard data={data ?? []} isLoading={isFetching} />
      <DataTableContainer
        data={data ?? []}
        columns={classColumns}
        isLoading={isFetching}
        hidePagination
      />
      <ClasseForm onChange={() => setOpenForm(false)} isOpen={openForm} />
    </BaseContainer>
  );
};
