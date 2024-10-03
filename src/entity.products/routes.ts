import express from 'express';

import Controller from './controller';

// -- User protected routes --
export const userProtectedRoutes = express
  .Router()
  .get('/products', Controller.get)
  .get('/products/:id', Controller.get)

// -- Admin protected routes --
export const adminProtectedRoutes = express
  .Router()
  .post('/products/register', Controller.register)
  .put('/products/update', Controller.update)
  .delete('/products/:id', Controller.delete)



