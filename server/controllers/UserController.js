const Contact = require('../models/ContactModules');
const User = require('../models/UserModule');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendResetEmail = require('../utils/sendEmail');
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {

    try {
        const { name, email, phone, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ phone }, { email }] });

        if (existingUser) {
            return res.status(400).json({ message: "user alredy exists" });
        }
        const hashedpassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            phone,
            password: hashedpassword,
            authProvider: "local",
            role: "user"
        });

        return res.status(201).json({ message: "User registered Successfully", userId: newUser._id });

    } catch (error) {
        return res.status(500).json({ message: "Registration failed", error });
    }
}

exports.loginUser = async (req, res) => {

    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(400).json({ message: "User not found or invalid password or number", error });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "invalid credentials", error });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

        res.status(201).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error });
    }
}


exports.forgotPassword = async (req, res) => {
    const { phone } = req.body;

    try {
        const user = await User.findOne({ phone });
        console.log(user.email);
        if (!user) {
            return res.status(404).json({ message: "User not found with this phone number" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const expiryTime = Date.now() + 1000 * 60 * 15

        user.resetToken = resetToken;
        user.resetTokenExpiry = expiryTime;
        await user.save();

        const resetLink = `http://localhost:5000/api/v1/auth/resetPassword${resetToken}`;
        await sendResetEmail(user.email, resetLink);


        res.status(200).json({ message: "We have sent a reset link to your email." });

    } catch (error) {
        res.status(500).json({ message: "Error in forgot password", error });
    }
}

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        const hashedpassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedpassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        res.status(500).json({ message: "Error in resetting password", error });
    }
}



exports.createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, message } = req.body;

        const newContact = await Contact.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            message,
        });

        await sendEmail({
            to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
            subject: "New Contact Form Submission",
            html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
        });

        res.status(201).json({
            message: "Contact form submitted and email sent successfully",
            contact: newContact,
        });
    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({
            message: "Error submitting contact form",
            error: error.message,
        });
    }
};

exports.getAllContact = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(500).json({ message: "Error submitting contact form", error });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('name email phone role authProvider createdAt updatedAt');

        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
};