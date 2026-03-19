
const Candidate = require('../models/Candidate');
const PDFDocument = require('pdfkit');
const reportStructure = require("../utils/reportStructure");


// ==============================
// GET ALL REPORTS
// ==============================
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
// GET ADMIN REPORT
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

        // -----------------------------
        // Score Calculation
        // -----------------------------
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


        // -----------------------------
        // Performance Calculation
        // -----------------------------
        let level;
        let strengths;
        let weaknesses;

        if (totalScore <= 5) {
            level = "Beginner";
            strengths = "Basic understanding";
            weaknesses = "Needs strong practice";
        } 
        else if (totalScore <= 10) {
            level = "Intermediate";
            strengths = "Good conceptual clarity";
            weaknesses = "Needs advanced problem solving";
        } 
        else {
            level = "Expert";
            strengths = "Strong domain knowledge";
            weaknesses = "Minor improvements needed";
        }

        const performanceSummary = {
            level,
            strengths,
            weaknesses
        };


        // -----------------------------
        // Risk Analysis
        // -----------------------------
        let riskScore = 0;

        if (candidate.monitoringLogs && candidate.monitoringLogs.length > 0) {

            candidate.monitoringLogs.forEach(log => {

                if (log.includes("Phone")) {
                    riskScore += 30;
                }

                if (log.includes("Tab Switch")) {
                    riskScore += 20;
                }

                if (log.includes("Multiple Person")) {
                    riskScore += 50;
                }

            });

        }

        let riskLevel;

        if (riskScore < 30) {
            riskLevel = "Low";
        }
        else if (riskScore < 60) {
            riskLevel = "Medium";
        }
        else {
            riskLevel = "High";
        }

        const riskAnalysis = {
            riskScore,
            riskLevel
        };


        // -----------------------------
        // Final Recommendation
        // -----------------------------
        let recommendation;

        if (riskLevel === "High") {
            recommendation = "Review Required";
        }
        else if (totalScore >= 10 && riskLevel === "Low") {
            recommendation = "Selected";
        }
        else {
            recommendation = "Rejected";
        }


        res.status(200).json({
            success: true,
            data: {
                ...candidate.toObject(),
                scoreSummary,
                performanceSummary,
                riskAnalysis,
                recommendation
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

        // Score calculation
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

        // Performance
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

        // Risk analysis
        let riskScore = 0;

        if (candidate.monitoringLogs) {
            candidate.monitoringLogs.forEach(log => {

                if (log.includes("Phone")) riskScore += 30;
                if (log.includes("Tab Switch")) riskScore += 20;
                if (log.includes("Multiple Person")) riskScore += 50;

            });
        }

        let riskLevel;

        if (riskScore < 30) riskLevel = "Low";
        else if (riskScore < 60) riskLevel = "Medium";
        else riskLevel = "High";

        let recommendation;

        if (riskLevel === "High") {
            recommendation = "Review Required";
        }
        else if (totalScore >= 10 && riskLevel === "Low") {
            recommendation = "Selected";
        }
        else if (totalScore >= 6 && riskLevel !== "High") {
            recommendation = "Consider for Next Round";
        }
        else {
            recommendation = "Rejected";
        }

        // Create PDF
        const doc = new PDFDocument();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=Report_${candidateId}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(18).text("Admin Report", { align: "center" });
        doc.moveDown();

        doc.fontSize(12).text(`Candidate ID: ${candidate.candidateId}`);
        doc.text(`Name: ${candidate.name}`);
        doc.text(`Email: ${candidate.email}`);
        doc.text(`Domain: ${candidate.domain}`);
        doc.moveDown();

        // ==============================
        // QUESTIONS & ANSWERS SECTION
        // ==============================

        doc.text("Questions & Answers:", { underline: true });
        doc.moveDown();

        if (candidate.questions && candidate.questions.length > 0) {

            candidate.questions.forEach((q, index) => {

                doc.text(`${index + 1}. Question: ${q.question}`);
                doc.text(`Answer: ${q.answer}`);
                doc.text(`Score: ${q.score}`);
                doc.text(`Status: ${q.status}`);
                doc.moveDown();

            });

        } else {

            doc.text("No questions available");

        }

        doc.moveDown();

        // ==============================
        // SCORE SUMMARY
        // ==============================

        doc.text("Score Summary:", { underline: true });
        doc.text(`Total Score: ${totalScore}`);
        doc.text(`Correct: ${correct}`);
        doc.text(`Wrong: ${wrong}`);
        doc.text(`Skipped: ${skipped}`);
        doc.moveDown();

        doc.text("Performance Summary:", { underline: true });
        doc.text(`Level: ${level}`);
        doc.text(`Strengths: ${strengths}`);
        doc.text(`Weaknesses: ${weaknesses}`);
        doc.moveDown();

        doc.text("Monitoring Logs:", { underline: true });

        if (candidate.monitoringLogs) {
            candidate.monitoringLogs.forEach(log => {
                doc.text(`- ${log}`);
            });
        }

        doc.moveDown();

        doc.text("Risk Analysis:", { underline: true });
        doc.text(`Risk Score: ${riskScore}`);
        doc.text(`Risk Level: ${riskLevel}`);
        doc.moveDown();

        doc.text("Final Recommendation:", { underline: true });
        doc.text(`${recommendation}`);

        doc.end();

    } catch (error) {

        console.error(error);

        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: "Error generating report"
            });
        }

    }
};

// ==============================
// STRUCTURED REPORT API
// ==============================
const getCandidateReport = async (req, res) => {

    try {

        const { candidateId } = req.params;

        const candidate = await Candidate.findOne({ candidateId });

        if (!candidate) {
            return res.status(404).json({
                message: "Candidate not found"
            });
        }

        const report = {
            ...reportStructure,
            candidateInfo: {
                candidateId: candidate.candidateId,
                name: candidate.name,
                email: candidate.email,
                domain: candidate.domain
            },
            evaluation: {
                score: candidate.score || "N/A",
                feedback: candidate.feedback || "N/A"
            }
        };

        res.json(report);

    } catch (error) {

        res.status(500).json({
            message: "Error generating report",
            error
        });

    }

};

// Admin Dashboard Statistics
const getAdminDashboard = async (req, res) => {
    try {

        const reports = await AdminReport.find();

        const totalCandidates = reports.length;

        const averageScore =
            reports.reduce((sum, r) => sum + r.totalScore, 0) /
            (reports.length || 1);

        const highRiskCandidates =
            reports.filter(r => r.riskLevel === "High").length;

        const selectedCandidates =
            reports.filter(r => r.recommendation === "Selected").length;

        res.json({
            totalCandidates,
            averageScore,
            highRiskCandidates,
            selectedCandidates
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCandidateReport,
    getAdminReport,
    createCandidateReport,
    updateCandidateReport,
    deleteCandidateReport,
    downloadCandidateReport,
    getAllReports,
    getAdminDashboard
};

