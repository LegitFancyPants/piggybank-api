import { supabase } from "../config/supabaseClient.js";

export const TransactionModel = {
  async getAll(deviceId, type = null) {
    let query = supabase
      .from("transactions")
      .select("*")
      .eq("device_id", deviceId)
      .order("id", { ascending: false });

    if (type === "income" || type === "expense") {
      query = query.eq("type", type);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getById(id, deviceId) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id)
      .eq("device_id", deviceId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("transactions")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, deviceId, payload) {
    const { data, error } = await supabase
      .from("transactions")
      .update(payload)
      .eq("id", id)
      .eq("device_id", deviceId)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }
    return data;
  },

  async remove(id, deviceId) {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id)
      .eq("device_id", deviceId);

    if (error) throw error;
    return true;
  },
};
