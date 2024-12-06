// Utils/TokenDecode.ts
import {jwtDecode} from "jwt-decode";

interface CustomJwtPayload {
  user_role: string; // Adjust according to your JWT structure
  user_Name: string;
  exp: number; // Include expiration
}

export const decodedToken = (token: string): CustomJwtPayload => {
  return jwtDecode<CustomJwtPayload>(token);
}
