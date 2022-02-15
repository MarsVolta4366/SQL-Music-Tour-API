const stages = require("express").Router()
const db = require("../models")
const { Stage, Event } = db

// GET ALL STAGES
stages.get("/", async (__req, res) => {
    try {
        const foundStages = await Stage.findAll()
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET STAGE BY ID
stages.get("/:name", async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_name: req.params.name },
            include: {
                model: Event,
                as: "events"
            }
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

// POST STAGE
stages.post("/", async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: "Successfully inserted a new stage",
            data: newStage
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// PUT STAGE BY ID
stages.put("/:id", async (req, res) => {
    try {
        const updatedStage = await Stage.update(req.body, {
            where: { stage_id: req.params.id }
        })
        res.status(200).json({ message: `Successfully updated ${updatedStage} stage` })
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE STAGE BY ID
stages.delete("/:id", async (req, res) => {
    try {
        const deletedStage = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStage} stage`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = stages