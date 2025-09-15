const Performance = require("../models/performanceModel");

// Render Add Performance Form
exports.renderAddForm = (req, res) => {
  const { user_id } = req.params; // Get user_id from URL
  res.render("addperformance", { msg: null, user_id });
};

// Add new performance
exports.addPerformance = async (req, res) => {
  try {
    console.log("Received Performance Data:", req.body); // Debugging

    await Performance.add(req.body); // Insert performance into DB

    res.redirect("/admin/performance/list"); // Redirect to performance list after success
  } catch (err) {
    console.error("Error adding performance:", err);
    res.send("Error adding performance");
  }
};

// List all performances with user info
exports.listPerformances = async (req, res) => {
  try {
    const performances = await Performance.getAll(); // Get all performance records
    res.render("viewperformancelist", { performances });
  } catch (err) {
    console.error("Error fetching performances:", err);
    res.send("Error fetching performances");
  }
};
//m