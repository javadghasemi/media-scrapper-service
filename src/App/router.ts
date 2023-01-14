import {ScraperController} from "./Controller/scraper.controller";

import {Router} from 'express';

const router: Router = Router();

/*
 * Initialize controllers
 */
const scraperController = new ScraperController();


router.get('/scraper@1/info', scraperController.info.bind(scraperController));
router.post('/scraper@1/download', scraperController.download.bind(scraperController));



export default router;