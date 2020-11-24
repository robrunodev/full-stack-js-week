import { Router } from 'express';
import linksRoutes from './links-routes';

const routes  = Router();

routes.use('/links', linksRoutes);

export default routes;