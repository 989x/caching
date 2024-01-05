import * as dotenv from 'dotenv'

dotenv.config(); 

export const secretKey = process.env.SECRET_KEY!;

export const validUserCredentials = {
  userId: 'user-77svf7',
  username: 'waltywinner',
  password: 'clu93oab355xgx',
  role: 'tester',
};
