
const express = require('express');
const router = express.Router();

const {
    getCandidateReport,
    getAdminReport,
    createCandidateReport,
    updateCandidateReport,
    deleteCandidateReport,
    downloadCandidateReport,
    getAllReports,
    getAdminDashboard
} = require('../controllers/adminReportController');

const adminAuth = require('../middleware/adminMiddleware');

router.get('/report', getAllReports);
router.get("/report/:candidateId", getCandidateReport);


router.post('/report', createCandidateReport);
router.put('/report/:candidateId', updateCandidateReport);
router.delete('/report/:candidateId', deleteCandidateReport);


// 🔥 Protected route
router.get('/report/:candidateId/download',adminAuth, downloadCandidateReport);



router.get('/dashboard', getAdminDashboard);

module.exports = router;