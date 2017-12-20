module.exports = Model => {
	return {
		getAll: asyncWrap(async (req, res) => {
			let categories = await Model.find({});
			res.json({ error: false, data: categories });
		}),

		getAnObject: asyncWrap(async (req, res) => {
			let objectId = req.params.id;
			let object = await Model.findOne({ _id: objectId });
			res.json({ error: false, data: categories });
		}),

		deleteAnObject: asyncWrap(async (req, res) => {
			let objectId = req.params.id;
			let object = await Model.findByIdAndRemove(objectI);
			res.json({ error: false, data: { id: object._id } });
		}),

		updateAnObject: asyncWrap(async (req, res) => {
			let objectId = req.params.id;
			let object = await Model.findByIdAndUpdate(objectId, req.body);
			res.json({ error: false, data: object });
		}),

		addObject: asyncWrap(async (req, res) => {
			let object = await new Model(req.body).save();
			res.json({ error: false, data: object });
		})
	};
};
