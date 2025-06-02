// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Sua URL do Projeto Supabase
const supabaseUrl = 'https://tznesehofpthhuquaklf.supabase.co';

// Sua Chave Anon Pública Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6bmVzZWhvZnB0aGh1cXVha2xmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MjgxODMsImV4cCI6MjA2NDQwNDE4M30.opavultL4BaRINNu8OQ4uSMHkfdpLmvTUp_X-cF4RFE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);