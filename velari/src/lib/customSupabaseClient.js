import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsiqcfimygnvfwlsntwn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzaXFjZmlteWdudmZ3bHNudHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDY3MTksImV4cCI6MjA4NzAyMjcxOX0.cXDh4TTjbBl4DU6hh66sD6MWg5YrtuSGtfs9kqH5Mfc';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
