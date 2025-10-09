const performanceModel = require('../models/performanceModel');

// ----------------------------
// Helper function: Calculate predicted percentage
// ----------------------------
function calculatePrediction(performance) {
    const totalScore = performance.attendance * 0.1 +
                       performance.assignments_completed * 0.1 +
                       performance.machine_test_marks * 0.2 +
                       performance.aptitude_test_marks * 0.2 +
                       performance.mock_interview_score * 0.2;
    return Math.round(totalScore * 10); // scale to 100%
}

// ----------------------------
// Render Add/Update Performance Form
// ----------------------------
exports.renderAddForm = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const performance = await performanceModel.getPerformanceByUserId(user_id);
        res.render('addPerformance', { user_id, performance });
    } catch (err) {
        console.error(err);
        res.send("Error loading performance form.");
    }
};

// ----------------------------
// Handle Add/Update Submission
// ----------------------------
exports.addPerformance = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const data = { ...req.body, user_id }; // merge user_id into form data

        const existing = await performanceModel.getPerformanceByUserId(user_id);
        const predicted_percentage = calculatePrediction(data);

        if (existing) {
            await performanceModel.updatePerformance(data, user_id);
            await performanceModel.updatePrediction(user_id, predicted_percentage);
        } else {
            await performanceModel.addPerformance(data);
            await performanceModel.addPrediction(user_id, predicted_percentage);
        }

        res.redirect('/admin/performance-list');
    } catch (err) {
        console.error(err);
        res.send("Error occurred while saving performance.");
    }
};

// ----------------------------
// List All Performances (Admin)
// ----------------------------
exports.listPerformances = async (req, res) => {
    try {
        const performances = await performanceModel.getAllPerformances();
        res.render('viewperformancelist.ejs', { performances });
    } catch (err) {
        console.error(err);
        res.send("Error fetching performance list.");
    }
};
