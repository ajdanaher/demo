import express from 'express';

const router = express.Router({ mergeParams: true });
import getPing from '../handlers/PingHandler';

router.route('/app').get(getPing);

export default router;
