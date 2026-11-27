import { TransactionModel } from "../models/transactionModel.js";

export const TransactionController = {
  async getAll(req, res) {
    try {
      const { type } = req.query;
      const data = await TransactionModel.getAll(req.deviceId, type);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await TransactionModel.getById(id, req.deviceId);

      if (!data) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { title, amount, type, category, date, note = "" } = req.body;

      if (
        !title ||
        amount === undefined ||
        amount === null ||
        amount === "" ||
        !type ||
        !category ||
        !date
      ) {
        return res.status(400).json({
          error: "Fields title, amount, type, category, and date are required",
        });
      }

      const numericAmount = Number(amount);
      if (Number.isNaN(numericAmount)) {
        return res.status(400).json({ error: "Field amount must be a valid number" });
      }

      const created = await TransactionModel.create({
        device_id: req.deviceId,
        title,
        amount: numericAmount,
        type,
        category,
        date,
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
      delete payload.id;
      delete payload.device_id;

      if (payload.amount !== undefined) {
        const numericAmount = Number(payload.amount);
        if (Number.isNaN(numericAmount)) {
          return res.status(400).json({ error: "Field amount must be a valid number" });
        }
        payload.amount = numericAmount;
      }

      const updated = await TransactionModel.update(id, req.deviceId, payload);

      if (!updated) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      await TransactionModel.remove(id, req.deviceId);
      res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
