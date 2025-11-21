import Trip from "../models/Trip.js";

export async function getAllTrips(req, res) {
  try {
    const trips = await Trip.find().populate("creator", "username");
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function createTrip(req, res) {
  try {
    const trip = await Trip.create({
      place: req.body.place,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      creator: req.user._id,
    });

    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getTrip(req, res) {
  try {
    const trip = await Trip.findById(req.params.id).populate("creator", "username");
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateTrip(req, res) {
  try {
    const updated = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteTrip(req, res) {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: "Trip deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export async function getMyTrips(req, res) {
  try {
    const trips = await Trip.find({ creator: req.user._id });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
