const MLR = require("ml-regression").MultivariateLinearRegression;

const categorize = (score) => {
  if (score >= 80) return "High Ready";
  if (score >= 50) return "Ready";
  return "Not Ready";
};

const getSuggestion = (score) => {
  if (score >= 80) return "Excellent performance, keep it up!";
  if (score >= 50) return "Good progress, but there’s room for improvement.";
  return "Needs significant improvement. Focus on weak areas.";
};

exports.runLinearRegression = (historical, latest) => {
  const allRecords = [...historical, latest];
  const X = [];
  const Y = [];
  allRecords.forEach((r) => {
    const attendance = Number(r.attendance) || 0;
    const machine = Number(r.machine_test_marks) || 0;
    const mcq = Number(r.aptitude_test_marks) || 0;
    const mock = Number(r.mock_interview_score) || 0;
    const percentage = Number(r.theory_performance + r.practice_performance + r.communication_score + r.behavior_score) / 4;
    if (attendance + machine + mcq + mock === 0) return;
    X.push([attendance, machine, mcq, mock]);
    Y.push(percentage);
  });
  if (X.length === 0) {
    const fallbackScore = Number(latest?.percentage) || 0;
    return {
      latest: {
        prediction: fallbackScore,
        readiness_level: categorize(fallbackScore),
        shortlisted: fallbackScore >= 50 ? 1 : 0,
        suggestion: getSuggestion(fallbackScore),
      },
      historical: [],
    };
  }
  if (X.length === 1) {
    const fallbackScore = Y[0];
    return {
      latest: {
        prediction: fallbackScore,
        readiness_level: categorize(fallbackScore),
        shortlisted: fallbackScore >= 50 ? 1 : 0,
        suggestion: getSuggestion(fallbackScore),
      },
      historical: allRecords.map((r, idx) => ({
        per_id: r.performance_id,
        prediction: Y[idx],
        readiness_level: categorize(Y[idx]),
        shortlisted: Y[idx] >= 50 ? 1 : 0,
        suggestion: getSuggestion(Y[idx]),
      })),
    };
  }
  let mlr;
  try {
    mlr = new MLR(X, Y);
  } catch (err) {
    console.error("⚠ Regression failed, fallback:", err.message);
    const fallbackScore = Number(latest?.percentage) || 0;
    return {
      latest: {
        prediction: fallbackScore,
        readiness_level: categorize(fallbackScore),
        shortlisted: fallbackScore >= 50 ? 1 : 0,
        suggestion: getSuggestion(fallbackScore),
      },
      historical: [],
    };
  }
  const historicalResults = allRecords.map((r) => {
    const features = [
      Number(r.attendance) || 0,
      Number(r.machine_test_marks) || 0,
      Number(r.aptitude_test_marks) || 0,
      Number(r.mock_interview_score) || 0,
    ];
    const prediction = mlr.predict(features);
    return {
      per_id: r.performance_id,
      prediction,
      readiness_level: categorize(prediction),
      shortlisted: prediction >= 50 ? 1 : 0,
      suggestion: getSuggestion(prediction),
    };
  });
  return {
    latest: historicalResults[historicalResults.length - 1],
    historical: historicalResults,
  };
};
