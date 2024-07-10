import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id_tag?: string;
}

export const getIdTagFromToken = (token: string): string | null => {
  try {
    
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);

    if (decoded && decoded.id_tag) {
      return decoded.id_tag;
    } else {
      console.error('id_tag no encontrado en el token decodificado');
      return null;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
