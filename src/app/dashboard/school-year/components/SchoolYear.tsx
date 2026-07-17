'use client';

import {
  BaseContainer,
  BaseTag,
  BaseText,
  convertArrayDate,
  DataTableContainer,
  BaseModal,
  Icons,
  ColumnsDataTable,
} from '_components/custom';
import { SchoolYearModule, EstablishmentModule } from '_store/state-management';
import { convertDateFormat, getTimeValue } from 'rise-core-frontend';
import { ENUM, MODELS } from '_types/*';
import { useState } from 'react';
import { SchoolTermsForm } from './SchoolTermsForm';
import { ActiveYear } from './ActiveYear';
import { SchoolYearForm } from './SchoolYearForm';
import { DeleteYearModal } from './DeleteYearModal';

export const SchoolYear = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openLock, setOpenLock] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [selectedSchoolTerms, setSelectedSchoolTerms] = useState<MODELS.ISchoolTerms | null>(null);
  const [selectedSchoolYear, setSelectedSchoolYear] = useState<MODELS.ISchoolYears | null>(null);

  const { data: establishmentList, isFetching: isEstablishmentLoad } =
    EstablishmentModule.listQueries({});
  const { data: schoolYearList, isFetching, refetch } = SchoolYearModule.schoolYearListQueries({});
  const { mutateAsync: updateTerms, isPending } = SchoolYearModule.updateTermsMutation({
    mutationOptions: {
      onSuccess: async () => {
        await refetch();
        setOpenEdit(false);
      },
    },
  });
  const { mutateAsync: createYear, isPending: creating } =
    SchoolYearModule.createSchoolYearMutation({
      mutationOptions: {
        onSuccess: async () => {
          await refetch();
          setOpenCreate(false);
        },
      },
    });

  const { mutateAsync: deleteYear, isPending: deleting } =
    SchoolYearModule.deleteSchoolYearMutation({
      mutationOptions: {
        onSuccess: async () => {
          await refetch();
          setOpenDelete(false);
        },
      },
    });

  const handleUpdateTerms = async (values: { date: [] }) => {
    const [start, end] = convertArrayDate(values?.date);
    const request: MODELS.IUpdateTerms = {
      date_debut: start,
      date_fin: end,
      nom: selectedSchoolTerms?.nom,
    };
    await updateTerms({ payload: request, params: { trimestre_id: selectedSchoolTerms?.id! } });
  };

  const handleCreateYear = async (values: { date: []; libelle: string; school_id: string }) => {
    const [start, end] = convertArrayDate(values?.date);
    const request: MODELS.ICreateSchoolYear = {
      date_debut: start,
      date_fin: end,
      school_id: values?.school_id?.[0],
      libelle: values.libelle,
    };
    await createYear({ payload: request });
  };

  const handleDeleteYear = async () => {
    const request: MODELS.IDeleteSchoolYear = {
      school_id: selectedSchoolYear?.etablissement_id!,
      year_id: selectedSchoolYear?.id!,
    };
    await deleteYear({ payload: request });
  };

  const schoolColumns: ColumnsDataTable[] = [
    { header: 'Libelle', accessor: 'libelle' },
    {
      header: 'Debut',
      accessor: 'date_debut',
      cell: (date) => convertDateFormat(date),
    },
    {
      header: 'Fin',
      accessor: 'date_fin',
      cell: (date) => convertDateFormat(date),
    },
    {
      header: 'Créé le',
      accessor: 'created_at',
      cell: (date) => {
        return (
          <BaseText>
            {convertDateFormat(date)} à {getTimeValue(date)}
          </BaseText>
        );
      },
    },
    {
      header: 'Statut',
      accessor: 'active',
      cell: (status) => {
        return <BaseTag status={status ? ENUM.Status.ACTIVE : ENUM.Status.INACTIVE} />;
      },
    },

    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'delete',
          isLoading: deleting,
          handleClick: (data: MODELS.ISchoolYears) => {
            setSelectedSchoolYear(data);
            setOpenDelete(true);
          },
        },
      ],
    },
  ];

  return (
    <BaseContainer
      title={'Années scolaires'}
      description={'Ouvrez, clôturez et archivez les années scolaires et leurs périodes.'}
      border="none"
      withActionButtons
      actionsButtonProps={{
        validateTitle: 'Nouvelle année',
        onClick() {
          setOpenCreate(true);
        },
        onReload: async () => {
          await refetch();
        },
      }}
    >
      <ActiveYear
        data={schoolYearList}
        setOpenLock={setOpenLock}
        setOpenEdit={setOpenEdit}
        setSelectedValues={setSelectedSchoolTerms}
        isLoading={isFetching}
      />

      <DataTableContainer
        isLoading={isFetching}
        data={schoolYearList ?? []}
        columns={schoolColumns}
        hidePagination
      />

      <BaseModal
        title="Modification impossible"
        isOpen={openLock}
        onChange={() => setOpenLock(false)}
        icon={<Icons.Lock />}
        iconBackgroundColor={'red'}
        size={'xs'}
        buttonSaveTitle={''}
        buttonCancelTitle={'Fermer'}
      >
        Ce trimestre a déjà commencé ou a été verrouillé. Ses dates ne peuvent plus être modifiées.
      </BaseModal>

      <SchoolTermsForm
        data={selectedSchoolTerms}
        onChange={() => setOpenEdit(false)}
        isOpen={openEdit}
        isLoading={isPending}
        callback={handleUpdateTerms}
      />
      <SchoolYearForm
        onChange={() => setOpenCreate(false)}
        isOpen={openCreate}
        isLoading={creating}
        callback={handleCreateYear}
        establishmentList={establishmentList}
        isEstablishmentLoad={isEstablishmentLoad}
      />
      <DeleteYearModal
        onChange={() => setOpenDelete(false)}
        isOpen={openDelete}
        isLoading={deleting}
        callback={handleDeleteYear}
      />
    </BaseContainer>
  );
};
