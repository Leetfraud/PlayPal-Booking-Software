const express = require("express");
const db = require("../db");
const router = express.Router();

/**
 * 1. Initiate Booking & Temporary Slot Hold
 * Logic: A slot can be held if it is 'available' OR if it was 'held' 
 * but the 10-minute timer (held_until) has expired.
 */
router.post("/hold", (req, res) => {
    const { user_id, venue_id, slot_id } = req.body;
    
    // IMPORTANT: Check your terminal to see if this says 'undefined'
    console.log("Attempting to hold slot:", slot_id, "for user:", user_id);

    const holdUntil = new Date(Date.now() + 10 * 60000); 

    // 1. We change 'held' to 'pending' to match your frontend logic
    const holdSlotSql = `
        UPDATE time_slots 
        SET status = 'pending', held_until = ? 
        WHERE slot_id = ? 
        AND (status = 'available' OR (status = 'pending' AND held_until < NOW()))
    `;

    db.query(holdSlotSql, [holdUntil, slot_id], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Database error" });
        }
        
        // If this is 0, the slot_id was wrong or the status wasn't 'available'
        if (result.affectedRows === 0) {
            return res.status(400).json({ 
                message: "This slot is no longer available. Please refresh." 
            });
        }

        const bookingSql = `INSERT INTO bookings (user_id, slot_id, status) VALUES (?, ?, 'pending')`;
        db.query(bookingSql, [user_id, slot_id], (err, bookingResult) => {
            if (err) return res.status(500).json({ message: "Failed to create booking" });
            
            res.json({ 
                message: "Slot held! Please pay within 10 minutes.",
                booking_id: bookingResult.insertId 
            });
        });
    });
});
/**
 * 2. Confirm Booking (After Payment)
 * Logic: Call this after your payment screen confirms success.
 */
router.post("/confirm", (req, res) => {
    const { booking_id, slot_id } = req.body;

    const confirmSql = `UPDATE bookings SET status = 'confirmed' WHERE booking_id = ?`;
    const finalizeSlotSql = `UPDATE time_slots SET status = 'booked', held_until = NULL WHERE slot_id = ?`;

    db.query(confirmSql, [booking_id], (err) => {
        if (err) return res.status(500).json({ message: "Failed to confirm booking" });
        
        db.query(finalizeSlotSql, [slot_id], (err) => {
            if (err) return res.status(500).json({ message: "Failed to finalize slot" });
            res.json({ message: "Booking confirmed successfully!" });
        });
    });
});



module.exports = router;