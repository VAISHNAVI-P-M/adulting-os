import supabase from "../config/supabase.js";

// PUT /api/profile (onboarding + updates)
export const updateProfile = async (req, res) => {
  const {
    age,
    occupation,
    monthly_salary,
    current_savings,
    goals,
  } = req.body;

  const { data, error } = await supabase
    .from("profiles")
    .update({
      age,
      occupation,
      monthly_salary,
      current_savings,
      goals,
      updated_at: new Date(),
    })
    .eq("id", req.user.id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ profile: data });
};

// GET /api/profile
export const getProfile = async (req, res) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", req.user.id)
    .single();

  if (error) {
    return res.status(404).json({ error: "Profile not found" });
  }

  res.json({ profile: data });
};