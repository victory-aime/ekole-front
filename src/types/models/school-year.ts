interface ISchoolTerms {
  id: string;
  date_debut: Date;
  date_fin: Date;
  numero: number;
  nom: string;
  actif: boolean;
  verrouille: boolean;
  annee_scolaire_id: string;
}

interface ISchoolYears {
  trimestres: ISchoolTerms[];
  id: string;
  libelle: string;
  date_debut: Date;
  date_fin: Date;
  active: boolean;
  etablissement_id: string;
  created_at: Date;
  updated_at: Date;
}

interface IUpdateTerms {
  nom?: string;
  date_debut?: Date;
  date_fin?: Date;
}

interface ICreateSchoolYear {
  school_id: string;
  libelle: string;
  date_debut: Date;
  date_fin: Date;
}

interface IDeleteSchoolYear {
  school_id: string;

  year_id: string;
}

export type { ISchoolYears, ISchoolTerms, IUpdateTerms, ICreateSchoolYear, IDeleteSchoolYear };
