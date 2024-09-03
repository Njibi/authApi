export interface userInterface{
    email: string,
    firstName: string,
    lastName: string,
    resetToken?: string;
    verificationToken?: string;
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePasswords(password: string): Promise<Boolean>
    getSignedToken(): string;
  }