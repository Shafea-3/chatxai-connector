// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://glhvjaxordlbspaopxai.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsaHZqYXhvcmRsYnNwYW9weGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2ODY4MzksImV4cCI6MjA0OTI2MjgzOX0.LS3U9uD3cyFpshSjrRZKDBTpWV49hhxpbXxyHzV0SS8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);