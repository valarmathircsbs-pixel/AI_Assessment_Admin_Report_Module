const Candidate = require('../models/Candidate');
const PDFDocument = require('pdfkit');


const getAllReports = async (req, res) => {
    try {
        const candidates = await Candidate.find();

        res.status(200).json({
            success: true,
            data: candidates
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ==============================
// GET REPORT
// ==============================
const getAdminReport = async (req, res) => {
    try {
        const candidateId = req.params.candidateId;

        const candidate = await Candidate.findOne(
            { candidateId },
            { _id: 0, __v: 0, "questions._id": 0 }
        );

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
        }

        // 🔥 Score Calculation
        let totalScore = 0;
        let correct = 0;
        let wrong = 0;
        let skipped = 0;

        candidate.questions.forEach(q => {
            totalScore += q.score;

            if (q.status === "Correct") correct++;
            else if (q.status === "Wrong") wrong++;
            else if (q.status === "Skipped") skipped++;
        });

        const scoreSummary = {
            totalScore,
            correct,
            wrong,
            skipped
        };

        // 🔥 Performance Calculation
        let level;
        let strengths;
        let weaknesses;

        if (totalScore <= 5) {
            level = "Beginner";
            strengths = "Basic understanding";
            weaknesses = "Needs strong practice";
        } else if (totalScore <= 10) {
            level = "Intermediate";
            strengths = "Good conceptual clarity";
            weaknesses = "Needs advanced problem solving";
        } else {
            level = "Expert";
            strengths = "Strong domain knowledge";
            weaknesses = "Minor improvements needed";
        }

        const performanceSummary = {
            level,
            strengths,
            weaknesses
        };

        res.status(200).json({
            success: true,
            data: {
                ...candidate.toObject(),
                scoreSummary,
                performanceSummary
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// ==============================
// CREATE REPORT
// ==============================
const createCandidateReport = async (req, res) => {
    try {
        const newCandidate = new Candidate(req.body);
        await newCandidate.save();

        res.status(201).json({
            success: true,
            message: "Candidate report created successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating candidate report"
        });
    }
};


// ==============================
// UPDATE REPORT
// ==============================
const updateCandidateReport = async (req, res) => {
    try {
        const candidateId = req.params.candidateId;

        const updatedCandidate = await Candidate.findOneAndUpdate(
            { candidateId },
            req.body,
            { new: true }
        );

        if (!updatedCandidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Candidate report updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating candidate report"
        });
    }
};


// ==============================
// DELETE REPORT
// ==============================
const deleteCandidateReport = async (req, res) => {
    try {
        const candidateId = req.params.candidateId;

        const deletedCandidate = await Candidate.findOneAndDelete({ candidateId });

        if (!deletedCandidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Candidate report deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting candidate report"
        });
    }
};


// ==============================
// DOWNLOAD PDF REPORT
// ==============================
const downloadCandidateReport = async (req, res) => {
    try {
        const candidateId = req.params.candidateId;

        const candidate = await Candidate.findOne({ candidateId });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
        }

        // 🔥 Score Calculation
        let totalScore = 0;
        let correct = 0;
        let wrong = 0;
        let skipped = 0;

        candidate.questions.forEach(q => {
            totalScore += q.score;

            if (q.status === "Correct") correct++;
            else if (q.status === "Wrong") wrong++;
            else if (q.status === "Skipped") skipped++;
        });

        // 🔥 Performance Calculation
        let level;
        let strengths;
        let weaknesses;

        if (totalScore <= 5) {
            level = "Beginner";
            strengths = "Basic understanding";
            weaknesses = "Needs strong practice";
        } else if (totalScore <= 10) {
            level = "Intermediate";
            strengths = "Good conceptual clarity";
            weaknesses = "Needs advanced problem solving";
        } else {
            level = "Expert";
            strengths = "Strong domain knowledge";
            weaknesses = "Minor improvements needed";
        }

        // Create PDF
        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=Report_${candidateId}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(18).text('Admin Report', { align: 'center' });
        doc.moveDown();

        doc.fontSize(12).text(`Candidate ID: ${candidate.candidateId}`);
        doc.text(`Name: ${candidate.name}`);
        doc.text(`Email: ${candidate.email}`);
        doc.text(`Domain: ${candidate.domain}`);
        doc.moveDown();

        doc.text('Questions:', { underline: true });
        doc.moveDown();

        candidate.questions.forEach((q, index) => {
            doc.text(`${index + 1}. ${q.question}`);
            doc.text(`Answer: ${q.answer}`);
            doc.text(`Score: ${q.score}`);
            doc.text(`Status: ${q.status}`);
            doc.moveDown();
        });

        doc.moveDown();
        doc.text('Score Breakdown:', { underline: true });
        doc.text(`Total Score: ${totalScore}`);
        doc.text(`Correct: ${correct}`);
        doc.text(`Wrong: ${wrong}`);
        doc.text(`Skipped: ${skipped}`);

        doc.moveDown();
        doc.text('Final Summary:', { underline: true });
        doc.text(`Level: ${level}`);
        doc.text(`Strengths: ${strengths}`);
        doc.text(`Weaknesses: ${weaknesses}`);

        doc.moveDown();
        doc.text('Monitoring Logs:', { underline: true });
        doc.moveDown();

        candidate.monitoringLogs.forEach(log => {
            doc.text(`- ${log}`);
        });

        doc.end();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error generating report"
        });
    }
};


module.exports = {
    getAdminReport,
    createCandidateReport,
    updateCandidateReport,
    deleteCandidateReport,
    downloadCandidateReport,
    getAllReports
};