

import mongoose from 'mongoose'

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  
  
  // 1. About Section
  about: {
    description: { type: String }, // Long text
    highlights: [{ type: String }] // Array of strings
  },

  // 2. Configurations
  configurations: [{
    type: { type: String },      
    area: { type: String },      
    price: { type: String },     
    image: { type: String }      
  }],

  // 3. Amenities
  amenities: [{ type: String }], 

  // 4. Developer Info
  developer: {
    name: { type: String },
    logo: { type: String },
    description: { type: String },
    stats: {
      projects: { type: Number, default: 0 },
      years: { type: Number, default: 0 },
      ongoing: { type: Number, default: 0 }
    }
  },

  // 5. Locality
  mapUrl: { type: String }, 

  // Standard fields
  image: { type: String }, 
  propertyType: { type: String },
  transactionType: { type: String },
  featured: { type: Boolean, default: false },

  // --- ADDED STATUS FIELD ---
  status: {
    type: String,
    enum: ["Near Possession", "Mid Stage", "Ready", "New Launch"], // Added New Launch as it's common
    default: "Mid Stage"
  },
  // --------------------------

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Property", PropertySchema);