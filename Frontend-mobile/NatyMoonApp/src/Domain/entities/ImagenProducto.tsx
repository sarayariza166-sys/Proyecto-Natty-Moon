export type ImagenProductoResponse = {
  id: number;
  producto: { id: number };
  url: string;
  esPrincipal?: boolean;
  orden?: number;
};

export type ImagenProductoInput = {
  producto: { id: number };
  url: string;
  esPrincipal?: boolean;
  orden?: number;
};
