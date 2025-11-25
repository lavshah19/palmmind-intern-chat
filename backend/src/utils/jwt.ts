import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || "fallbackSecret";
const ACCESS_TOKEN_EXPIRY = '7d';

export function generateToken(id: string): string {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

// export const generateToken = (id: string): string => {
//   return jwt.sign({ id }, process.env.JWT_SECRET as string, {
//     expiresIn: process.env.JWT_EXPIRE || '7d'
//   });
// };

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};