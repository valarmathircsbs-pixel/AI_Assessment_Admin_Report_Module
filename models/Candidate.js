const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    candidateId:{
        type:String,
        required:true,
        unique:true
    },  

    name: String,
    email: String,
    domain: String,

    questions: [
        {
            question: String,
            answer: String,
            score: Number,
            status: String
        }
    ],

    scoreSummary: {
        totalScore: Number,
        correct: Number,
        wrong: Number,
        skipped: Number
    },

    performanceSummary: {
        level: String,
        strengths: String,
        weaknesses: String
    },

    monitoringLogs: [String]
});

module.exports = mongoose.model('Candidate', candidateSchema);