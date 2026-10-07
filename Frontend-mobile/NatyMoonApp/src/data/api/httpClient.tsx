import { API_URL } from './config';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type FetchOptions = {
  method?: Method;
  body?: any;
  token?: string;
  query?: Record<string, string | number>;
};


let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {

  const { method = 'GET', body, token, query } = options;

  let url = `${API_URL}${path}`;

  if (query) {
    const params = new URLSearchParams(
      Object.entries(query).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    url += `?${params}`;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.');
  }

  const raw = await response.text();
  const data = raw ? safeParse(raw) : null;

  if (!response.ok) {
    const message =
      (data && (data.mensaje || data.error || data.message)) ||
      raw ||
      'Ocurrió un error al comunicarse con el servidor';


    if (response.status === 401 && token) {
      onUnauthorized?.();
    }

    throw new Error(message);
  }

  return data as T;
}

const safeParse = (raw: string) => {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};
