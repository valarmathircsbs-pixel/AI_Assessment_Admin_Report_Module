const reportStructure = {
  candidateInfo: {
    candidateId: "",
    name: "",
    email: "",
    domain: ""
  },

  evaluation: {
    score: "",
    feedback: ""
  },

  monitoring: {
    faceDetected: false,
    phoneDetected: false,
    multiplePersons: false
  },

  riskAnalysis: {
    riskScore: "",
    violations: []
  },

  summary: {
    result: "",
    recommendation: ""
  }
};

module.exports = reportStructure;