import { GoalModel } from "../models/goalModel.js";

export const GoalController = {
  async getAll(req, res) {
    try {
      const data = await GoalModel.getAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await GoalModel.getById(id);

      if (!data) {
        return res.status(404).json({ error: "Savings goal not found" });
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const {
        name,
        target_amount,
        current_amount = 0,
        deadline = "",
        note = "",
      } = req.body;

      if (
        !name ||
        target_amount === undefined ||
        target_amount === null ||
        target_amount === ""
      ) {
        return res.status(400).json({
          error: "Fields name and target_amount are required",
        });
      }

      const numericTarget = Number(target_amount);
      const numericCurrent = Number(current_amount);

      if (Number.isNaN(numericTarget) || Number.isNaN(numericCurrent)) {
        return res.status(400).json({
          error: "Fields target_amount and current_amount must be valid numbers",
        });
      }

      const created = await GoalModel.create({
        name,
        target_amount: numericTarget,
        current_amount: numericCurrent,
        deadline,
        note,
      });

      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const payload = { ...req.body };

      if (payload.target_amount !== undefined) {
        const numericTarget = Number(payload.target_amount);
        if (Number.isNaN(numericTarget)) {
          return res.status(400).json({
            error: "Field target_amount must be a valid number",
          });
        }
        payload.target_amount = numericTarget;
      }

      if (payload.current_amount !== undefined) {
        const numericCurrent = Number(payload.current_amount);
        if (Number.isNaN(numericCurrent)) {
          return res.status(400).json({
            error: "Field current_amount must be a valid number",
          });
        }
        payload.current_amount = numericCurrent;
      }

      const updated = await GoalModel.update(id, payload);

      if (!updated) {
        return res.status(404).json({ error: "Savings goal not found" });
      }

      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      await GoalModel.remove(id);
      res.status(200).json({ message: "Savings goal deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
