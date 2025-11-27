import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || "lavshah";
const ACCESS_TOKEN_EXPIRY = '7d';

export function generateToken(id: string): string {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

export const verifyToken = (token: string): any => {
  // console.log("inside verifyToken",token);
const decoded = (jwt.verify(token, JWT_SECRET )as {
    id: string;
  });
  console.log(decoded,"decoded");
  return decoded;
};