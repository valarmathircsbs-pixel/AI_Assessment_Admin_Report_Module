const mongoose = require('mongoose');
const Candidate = require('./models/Candidate');

mongoose.connect('mongodb://127.0.0.1:27017/ai_assessment');

const seedData = async () => {

    await Candidate.create({
        candidateId: "999",
        name: "Valar Test",
        email: "valar@test.com",
        domain: "AI/ML",
        questions: [
            {
                question: "Introduce yourself",
                answer: "I am passionate about backend development",
                score: 5,
                status: "Correct"
            }
        ],
        scoreSummary: {
            totalScore: 5,
            correct: 1,
            wrong: 0,
            skipped: 0
        },
        performanceSummary: {
            level: "Beginner",
            strengths: "Good basics",
            weaknesses: "Needs practice"
        },
        monitoringLogs: ["No suspicious activity"]
    });

    console.log("Data Inserted Successfully");
    process.exit();
};

seedData();