import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import { PORT, API_VERSION, CORS_ORIGIN, NODE_ENV } from './environment';
import passport from '../middlewares/auth.mid';
import { errorHandler } from '../middlewares/error.middleware';
import PostgrePool from './postgre.pool';
import * as usersRouter from '../entity.users/routes';
import * as productsRouter from '../entity.products/routes';


export default class Server {
  public app: express.Application;
  private server: any;

  constructor() {
    this.app = express();
    this.database();
    this.middlewares();
    this.routes();
    this.errorHandler();
    this.listen();
  }

  private async database() {
    const db = await PostgrePool.getInstance();
    /*  if (SYNC_DB === 1) {
        try {
          await db.sync();
          console.log('Database synchronized successfully.');
        } catch (err) {
          console.error('Unable to sync the database:', err);
        }
      }
     */
  }

  private middlewares() {
    this.app.use(helmet())
    this.app.use(hpp())
    this.app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false }));
    this.app.use(cors({ origin: CORS_ORIGIN }));
    this.app.use(express.json());

    if (NODE_ENV === 'dev') {
      this.app.use(morgan('dev'));
    }
  }

  private routes() {
    // -- Unprotected routes --
    this.app.use(`/${API_VERSION}`, usersRouter.notProtectedRoutes);

    // -- User protected routes --
    this.app.use(passport.authenticate('userJWT', { session: false }));
    this.app.use(`/${API_VERSION}`, usersRouter.userProtectedRoutes);
    this.app.use(`/${API_VERSION}`, productsRouter.userProtectedRoutes);

    // -- Admin protected routes --
    this.app.use(passport.authenticate('adminJWT', { session: false }));
    this.app.use(`/${API_VERSION}`, usersRouter.adminProtectedRoutes);
    this.app.use(`/${API_VERSION}`, productsRouter.adminProtectedRoutes);

  }

  private errorHandler() {
    this.app.use(errorHandler);
  }

  private listen() {
    this.server = this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

  public close() {
    this.server.close();
  }
}
