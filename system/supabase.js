import { createClient } from "@supabase/supabase-js";
import { global } from "../settings.js";

const supabaseUrl = global.supabaseUrl;
const supabaseKey = global.supabaseKey;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase