import { supabase } from "../config/supabaseClient.js";

export const GoalModel = {
  async getAll(deviceId) {
    const { data, error } = await supabase
      .from("savings_goals")
      .select("*")
      .eq("device_id", deviceId)
      .order("id", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(id, deviceId) {
    const { data, error } = await supabase
      .from("savings_goals")
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
      .from("savings_goals")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, deviceId, payload) {
    const { data, error } = await supabase
      .from("savings_goals")
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
      .from("savings_goals")
      .delete()
      .eq("id", id)
      .eq("device_id", deviceId);

    if (error) throw error;
    return true;
  },
};
