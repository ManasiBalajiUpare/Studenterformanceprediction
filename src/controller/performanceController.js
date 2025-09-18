// const Performance = require("../models/performanceModel");

// // Render Add Performance Form
 exports.renderAddForm = (req, res) => {
  const { user_id } = req.params; // Get user_id from URL
 res.render("addperformance", { msg: null, user_id });
};
exports.addPerformance = async (req, res) => {
  try {
    const data = req.body;
    console.log("Received req.body:", data);

    if (!data.user_id) {
      return res.status(400).send("Missing user_id");
    }

    const performance_id = await PerformanceModel.insertPerformance(data);

    const historicalRecords = await PerformanceModel.getPerformanceByUser(data.user_id);

    const latestRecord = historicalRecords.find(
      (r) => r.performance_id === performance_id
    );

    const predictionResult = runLinearRegression(historicalRecords, latestRecord);

    await PredictionModel.insertPrediction(data.user_id, predictionResult.latest.prediction);

    res.redirect("/performance/list");
  } catch (err) {
    console.error("Add Performance Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updatePerformance = async (req, res) => {
  try {
    const { performance_id } = req.params;
    const data = req.body;

    await PerformanceModel.updatePerformance(performance_id, data);

    const latestRecord = await PerformanceModel.getPerformanceById(performance_id);
    const historicalRecords = await PerformanceModel.getPerformanceByUser(latestRecord.user_id);

    const predictionResult = runLinearRegression(historicalRecords, latestRecord);

    await PredictionModel.updatePrediction(latestRecord.user_id, predictionResult.latest.prediction);

    res.redirect("/performance/list");
  } catch (err) {
    console.error("Update Performance Error:", err);
    res.status(500).send("Internal Server Error");
  }
};
// // List all performances with user info
// exports.listPerformances = async (req, res) => {
//   try {
//     const performances = await Performance.getAll(); // Get all performance records
//     res.render("viewperformancelist", { performances });
//   } catch (err) {
//     console.error("Error fetching performances:", err);
//     res.send("Error fetching performances");
//   }
// };
// //m
