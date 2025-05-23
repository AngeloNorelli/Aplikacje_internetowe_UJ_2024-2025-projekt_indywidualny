const { Tender, Offer } = require('../models');
const tenderService = require('../services/tenderService');

exports.showHome = (req, res) => {
  res.render('index', {title: 'Bidding system' });
};

exports.showActiveTenders = async (req, res) => {
  const tenders = await Tender.getAllActive();
  res.render('tenders/list', { tenders });
};

exports.showEndedTenders = async (req, res) => {
  const tenders = await Tender.getEnded();
  res.render('tenders/ended', { tenders });
};

exports.showUserTenders = async (req, res) => {
  if(!req.session.user || req.session.user.type !== 'institution') {
    return res.status(403).send('Unauthorized');
  }

  const tenders = await Tender.getByUserId(req.session.user.id);
  res.render('tenders/myTenders', { tenders });
};

exports.showTenderDetails = async (req, res) => {
  const tender = await Tender.getById(req.params.id);

  if(!tender) {
    return res.status(404).send('Tender not found');
  }

  const offers = await Offer.getByTenderId(req.params.id);
  const isActive = new Date(tender.end_time) > new Date();
  const sortedOffers = tenderService.filterOffers(offers, tender.max_budget);

  res.render('tenders/details', { tender, offers: sortedOffers, isActive });
};

exports.renderTenderForm = (req, res) => {
  res.render('tenders/new');
};

exports.addTender = async (req, res) => {
  if(!req.session.user || request.session.user.type !== 'insitution') {
    return res.status(403).send('Unauthorized');
  }

  const { title, description, start_time, end_time, max_budget } = req.body;

  console.log('Received data:', {
    title,
    description,
    start_time,
    end_time,
    max_budget
  });

  try {
    await Tender.create({
      title,
      description,
      institution_id: req.session.user.id,
      start_time,
      end_time,
      max_budget
    });
    res.redirect('/tenders');
  } catch(error) {
    res.status(500).send('Error creating tender')
  }
};

exports.renderOfferForm = async (req, res) => {
  const tender = await Tender.getById(req.params.id);

  if(!tender || new Date(tender.end_time) < new Date()) {
    return res.send('Tender not found or has ended');
  }

  res.render('tenders/offerForm', { tender });
};

exports.submitOffer = async (req, res) => {
  const tender = await Tender.getById(req.params.id);

  if(!tender || new Date(tender.end_time) < new Date()) {
    return res.send('Tender not found or has ended');
  }

  await Offer.create({ 
    tender_id: req.params.id,
    bidder_name: req.body.bidder_name,
    bid_value: req.body.bid_value
  });
  res.redirect(`/tenders/${req.params.id}`);
};

exports.showUserOffers = async (req, res) => {
  if(!req.session.user || req.session.user.type !== 'company')
    return res.status(403).send('Unauthorized');

  const offers = await Offer.getByUserId(req.session.user.id);
  res.render('offers/myOffers', { offers });
}