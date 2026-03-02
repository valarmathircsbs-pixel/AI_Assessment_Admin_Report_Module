
const express = require('express');
const router = express.Router();

const {
    getAdminReport,
    createCandidateReport,
    updateCandidateReport,
    deleteCandidateReport,
    downloadCandidateReport,
    getAllReports
} = require('../controllers/adminReportController');

const adminAuth = require('../middleware/adminMiddleware');

router.get('/report', getAllReports);
router.get('/report/:candidateId', getAdminReport);
router.post('/report', createCandidateReport);
router.put('/report/:candidateId', updateCandidateReport);
router.delete('/report/:candidateId', deleteCandidateReport);


// 🔥 Protected route
router.get('/report/:candidateId/download',adminAuth, downloadCandidateReport);

module.exports = router;