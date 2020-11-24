import { request, response, Router } from 'express';
import { Link } from '../models/link';
import { v4 } from 'uuid';
import LinkController from '../controllers/links-controller';

const linksRoutes = Router();
const linkController = new LinkController();

linksRoutes.post('/', linkController.postLink);

linksRoutes.get('/:code', linkController.hitLink);

linksRoutes.get('/:code/stats', linkController.getLink);

export default linksRoutes;