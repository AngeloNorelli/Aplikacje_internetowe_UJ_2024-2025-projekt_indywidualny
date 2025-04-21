const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tenderController');

router.get('/', tenderController.showHome);

router.get('/tenders', tenderController.showActiveTenders);

router.get('/tenders/ended', tenderController.showEndedTenders);

router.get('/tenders/new', tenderController.renderTenderForm);
router.post('/tender/new', tenderController.addTender);

router.get('/tenders/:id', tenderController.showTenderDetails);

router.get('/tenders/:id/offer', tenderController.renderOfferForm);
router.post('/tenders/:id/offer', tenderController.submitOffer);

module.exports = router;