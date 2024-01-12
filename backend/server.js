const stripe = require('./stripe'); // Make sure the path to stripe.js is correct
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./User'); // Make sure the path to User.js is correct

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
mongoose.connect('mongodb+srv://badboujiestore:D7uXqfcMLXEDBcZo@cluster0.ulx3r3o.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    // Create a Stripe customer
    const customer = await stripe.customers.create({
      email: req.body.email,
      // You can include additional information here if needed
    });

    // Add the Stripe customer ID to the user object
    user.stripeCustomerId = customer.id;

    // Save the user with the Stripe customer ID in your database
    const newUser = await user.save();

    res.status(201).json({ userId: newUser._id, stripeCustomerId: newUser.stripeCustomerId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      // User authenticated, create a token
      const token = jwt.sign({ userId: user._id }, 'Uv38ByGCZU8WP18PmmIdcpVmx00QA3xNe7sEB9Hixkk8qZ5JZG7ILh4vH8pD5TC0', { expiresIn: '24h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});