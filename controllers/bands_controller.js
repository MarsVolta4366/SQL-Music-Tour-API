// On 2nd activity module 6, just did including set times, insert set times to test in insomnia
const bands = require("express").Router()

// Only grabs index.js in models but gives you access to all models
const db = require("../models")
const { Band, MeetGreet, Event, SetTime } = db
const { Op } = require("sequelize")

// GET ALL BANDS
bands.get("/", async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND BAND BY NAME
bands.get("/:name", async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: MeetGreet,
                    as: "meet_greets",
                    include: {
                        model: Event,
                        as: "event",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ""}%` } }
                    }
                },
                {
                    model: SetTime,
                    as: "set_times",
                    include: {
                        model: Event,
                        as: "event",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ""}%` } }
                    }
                }
            ]
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// POST BAND
bands.post("/", async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: "Successfully inserted a band",
            data: newBand
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// PUT BAND
bands.put("/:id", async (req, res) => {
    try {
        const updatedBand = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBand} band`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE BAND
bands.delete("/:id", async (req, res) => {
    try {
        const deletedBand = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBand} band`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = bands