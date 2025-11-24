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
      cityId: req.body.cityId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      creator: req.user._id,
      participants: [req.user._id],  
    });

    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export async function getTrip(req, res) {
  try {
    const trip = await Trip.findById(req.params.id).populate(
      "creator",
      "username"
    );

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export async function updateTrip(req, res) {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTrip);
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

export async function joinTrip(req, res) {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (trip.participants.includes(req.user._id)) {
      return res.json({ message: "Already joined", trip });
    }

    trip.participants.push(req.user._id);
    await trip.save();

    res.json({ success: true, trip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function leaveTrip(req, res) {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.participants = trip.participants.filter(
      (id) => id.toString() !== req.user._id.toString()
    );

    await trip.save();
    res.json({ success: true, trip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getTripsByCity(req, res) {
  try {
    const trips = await Trip.find({ cityId: req.params.cityId })
      .populate("creator", "username")
      .populate("participants", "username");

    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}