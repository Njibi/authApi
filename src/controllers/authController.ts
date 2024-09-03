// auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import userRepository from '../repositories/userRepository'; 
import User from '../models/userModel';
import { userInterface } from '../interfaces/userInterface'; 

class AuthController {
  

  // Signup (register) a new user
  public async signup(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email, password } = req.body;

    try {
      // Check if the user already exists by email
      const existingUser = await userRepository.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'User already exists with this email.' });
        return;
      }

      // Create a new user instance using the model directly
      const newUser = new User( req.body);

     

      // Save the new user to the database using the repository's create method
      const savedUser = await userRepository.create(newUser);

      res.status(201).json({ message: 'User registered successfully.',  savedUser });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  // Login a user
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      // Find the user by email using the repository
      const user = await userRepository.findOne({ email });
      if (!user) {
        res.status(400).json({ message: 'Invalid email or password.' });
        return;
      }

      // Compare the password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid email or password.' });
        return;
      }

      res.status(200).json({ message: 'Login successful.', user});
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
}

export default AuthController;

