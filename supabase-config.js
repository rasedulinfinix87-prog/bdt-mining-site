// supabase-config.js

const SUPABASE_URL = "https://pckocwvuxeseumynslwv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBja29jd3Z1eGVzZXVteW5zbHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NDc3OTAsImV4cCI6MjEwNjIyMzc5MH0.0VBGW9lgZDritQa7XDoPncu5bl9M6J5W9eup0KSLXIc";

// Supabase Client ইনিশিয়ালাইজ করে গ্লোবালি এক্সপোর্ট করা
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
