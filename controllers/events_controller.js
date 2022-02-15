const events = require("express").Router()

// Only grabs index.js in models but gives you access to all models
const db = require("../models")
const { Event } = db
const { Op } = require("sequelize")

// INDEX, GET ALL EVENTS ORDERED BY DATE ASC
events.get("/", async (__req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [["date", "ASC"]]
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET EVENT BY ID
events.get("/:name", async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { name: req.params.name },
            include: { all: true }
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// POST EVENT
events.post("/", async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: "Successfully inserted event",
            date: newEvent
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// PUT EVENT
events.put("/:id", async (req, res) => {
    try {
        const updatedEvent = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvent} event`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE EVENT
events.delete("/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvent} event`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = events