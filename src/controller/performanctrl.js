const Performance = require("../models/performanceModel");
exports.renderAddForm = (req, res) => {
  res.render("addperformance", { msg: null });
};



// Add new performance
exports.addPerformance = async (req, res) => {
  try {
    await Performance.add(req.body);
    res.redirect("addperformance");
  } catch (err) {
    console.error(err);
    res.send("Error adding performance");
  }
};

// Show all performances
exports.listPerformances = async (req, res) => {
  try {
    const performances = await Performance.getAll();
    res.render("performanceList", { performances });
  } catch (err) {
    console.error(err);
    res.send("Error fetching performances");
  }
};
