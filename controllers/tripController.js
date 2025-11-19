export const createTrip = async (req, res) => {
  res.status(201).json({
    message: "Trip created",
    received: req.body
  });
};

export const updateTrip = async (req, res) => {
  res.json({
    message: "Trip updated",
    tripId: req.params.id,
    received: req.body
  });
};

export const deleteTrip = async (req, res) => {
  res.json({
    message: "Trip deleted",
    tripId: req.params.id
  });
};