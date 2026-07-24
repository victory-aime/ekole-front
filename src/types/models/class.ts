interface IClass {
  annee_scolaire: {
    id: string;
    created_at: Date;
    updated_at: Date;
    libelle: string;
    date_debut: Date;
    date_fin: Date;
    active: boolean;
    etablissement_id: string;
  };
  niveau: {
    id: string;
    nom: string;
    created_at: Date;
    updated_at: Date;
    cycle: string;
    ordre: number;
  };
  professeur_principal: {
    id: string;
    nom: string;
    created_at: Date;
    updated_at: Date;
    matricule: string;
    prenom: string;
    telephone: string | null;
    email: string | null;
    poste: string;
    dateEmbauche: Date;
    statut: string;
    photoUrl: string | null;
  } | null;
}

interface IClassFilter {
  professeur_principal: string;
  nom: string;
  cycle: string;
}
export type { IClass, IClassFilter };
