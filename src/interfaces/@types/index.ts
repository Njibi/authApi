import { Types } from 'mongoose';
import { userInterface } from '../userInterface';


declare global {
  namespace Express {
    interface Request {
      user?: userInterface  & { _id: string | Types.ObjectId };  
    //   session? : session
    }
  }
}