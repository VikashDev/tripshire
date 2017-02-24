var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GuidelineSchema = new Schema({
    guidelines: {

        question: { type: [String]},
		ans: { type: [String]}
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Guidelines', GuidelineSchema);