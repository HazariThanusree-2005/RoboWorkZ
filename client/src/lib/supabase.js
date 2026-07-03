import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://frfvesueuweuofydrizc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyZnZlc3VldXdldW9meWRyaXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwODQxMTQsImV4cCI6MjA5ODY2MDExNH0.li2I7Ld8uksphxWdsR64AiTpC2BYy19qJj9kLu-hde0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
