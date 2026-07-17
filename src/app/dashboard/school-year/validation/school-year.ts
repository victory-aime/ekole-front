import * as Yup from 'yup';

export const schoolYearValidationSchema = Yup.object({
  school_id: Yup.array()
    .of(Yup.string().required())
    .min(1, "L'établissement est obligatoire.")
    .test('not-empty', "L'établissement est obligatoire.", (arr) => arr && arr[0] !== ''),

  libelle: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "Le format doit être du type '2025-2026'")
    .required("Le libellé de l'année scolaire est obligatoire"),

  date: Yup.array()
    .of(Yup.mixed().required())
    .length(2, 'Veuillez sélectionner une période')
    .required("La période de l'année scolaire est obligatoire"),
});
