import { VALIDATION } from '_types/*';
import * as Yup from 'yup';

export const establishmentValidationSchema = Yup.object({
  nom: Yup.string()
    .trim()
    .min(3, 'Le nom est trop court')
    .max(150, 'Le nom est trop long')
    .required("Le nom de l'établissement est obligatoire"),

  sigle: Yup.string()
    .trim()
    .uppercase()
    .min(2, 'Le sigle est trop court')
    .max(20, 'Le sigle est trop long')
    .required('Le sigle est obligatoire'),

  email: Yup.string()
    .trim()
    .email("L'adresse email est invalide")
    .required("L'adresse email est obligatoire"),

  telephone: VALIDATION.phoneSchema({ required: true }),

  adresse: Yup.string()
    .trim()
    .min(5, "L'adresse est trop courte")
    .max(255, "L'adresse est trop longue")
    .required("L'adresse est obligatoire"),

  ville: Yup.array()
    .of(Yup.string().required())
    .min(1, 'La ville est obligatoire.')
    .test('not-empty', 'La ville est obligatoire.', (arr) => arr && arr[0] !== ''),

  libelle: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "Le format doit être du type '2025-2026'")
    .required("Le libellé de l'année scolaire est obligatoire"),

  date: Yup.array()
    .of(Yup.mixed().required())
    .length(2, 'Veuillez sélectionner une période')
    .required("La période de l'année scolaire est obligatoire"),
});
