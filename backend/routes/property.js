


import express from "express";
import Property from "../models/Property.js";
import { verifyAdmin } from "../middleware/auth.js"

const router = express.Router();


router.post("/", verifyAdmin, async (req, res) => {
  try {
    const {
      title,
      city,
      location,
      price,
      image,
      propertyType,
      transactionType,
      amenities,
      mapUrl,
      about,
      developer,
      configurations
    } = req.body;

   
    if (
      !title ||
      !city ||
      !location ||
      !price ||
      !image ||
      !propertyType
    ) {
      return res.status(400).json({
        message: "Please fill all required top-level fields (Title, City, Location, Price, Image)",
      });
    }

    if (!configurations || configurations.length === 0) {
      return res.status(400).json({ message: "At least one configuration (e.g. 2 BHK) is required" });
    }

    const newProperty = new Property({
      title,
      city,
      location,
      price,
      image,
      propertyType: propertyType || "Residential",
      transactionType: transactionType || "For Sale",
      mapUrl,
      
      amenities: amenities || [],
      about: about || {},
      developer: developer || {},
      configurations: configurations || [],
      
      createdBy: req.user._id,
    });

    await newProperty.save();

    res.status(201).json({
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { city, propertyType, transactionType, minPrice, maxPrice, featured } = req.query;

    let filters = {};

    if (city) filters.city = { $regex: city, $options: "i" }; // Case-insensitive match
    if (propertyType) filters.propertyType = propertyType;
    if (transactionType) filters.transactionType = transactionType;

    if (featured) {
      filters.featured = featured === 'true'; 
    }
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filters).sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
