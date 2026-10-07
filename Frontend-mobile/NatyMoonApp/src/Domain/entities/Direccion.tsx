export type DireccionResponse = {
  id: number;
  usuario: { id: number };
  alias: string | null;
  destinatario: string;
  telefonoContacto: string | null;
  calle: string;
  numero: string | null;
  ciudad: string;
  departamento: string | null;
  codigoPostal: string | null;
  pais: string;
  esPrincipal: boolean;
};

export type DireccionInput = {
  alias?: string;
  destinatario: string;
  telefonoContacto?: string;
  calle: string;
  numero?: string;
  ciudad: string;
  departamento?: string;
  codigoPostal?: string;
  pais?: string;
  esPrincipal?: boolean;
};
