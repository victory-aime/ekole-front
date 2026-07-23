interface IEstablishment {
  adresse: string;
  created_at: string;
  email: string;
  id: string;
  logo_url: null;
  nom: string;
  telephone: string;
  sigle: string;
  annee_scolaire: {
    libelle: string;
    total_eleves: number;
  };
  updated_at: string;
  ville: string;
}

interface ICreateEstablishment {
  adresse: string;
  email: string;
  nom: string;
  telephone: string;
  ville: string;
  sigle: string;
  annees_scolaires: {
    libelle: string;
    date_debut: Date;
    date_fin: Date;
    active?: boolean;
  };
}

export type { IEstablishment, ICreateEstablishment };
