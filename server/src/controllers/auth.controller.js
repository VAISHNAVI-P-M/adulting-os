import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import supabase from "../config/supabase.js";

const generateToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

// POST /api/auth/register
export const register = async (req, res) => {
  const { email, password, full_name } = req.body;

  if (!email || !password || !full_name) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    const { error } = await supabase.from("profiles").insert({
      id: userId,
      email,
      password: hashedPassword,
      full_name,
    });

    if (error) throw error;

    const token = generateToken({ id: userId, email });

    res.status(201).json({
      token,
      user: {
        id: userId,
        email,
        full_name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
      },
      onboardingComplete: !!user.age,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/auth/me
export const me = async (req, res) => {
  const { data: user, error } = await supabase
    .from("profiles")
    .select(
      "id, email, full_name, age, occupation, monthly_salary, current_savings, goals, life_readiness_score, current_level"
    )
    .eq("id", req.user.id)
    .single();

  if (error) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ user });
};