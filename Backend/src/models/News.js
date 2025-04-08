// src/models/News.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'News title is required'],
    trim: true 
  },
  slug: {
    type: String,
    unique: true
  },
  content: { 
    type: String, 
    required: [true, 'News content is required'] 
  },
  excerpt: {
    type: String,
    required: [true, 'News excerpt is required']
  },
  imageUrl: { 
    type: String,
    required: [true, 'News image is required']
  },
  author: { 
    type: String, 
    required: [true, 'Author name is required'] 
  },
  publishDate: { 
    type: Date, 
    default: Date.now 
  },
  tags: [{ 
    type: String 
  }],
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create slug from title before saving
newsSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  next();
});

module.exports = mongoose.model('News', newsSchema);