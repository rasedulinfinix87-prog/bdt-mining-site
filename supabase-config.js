// Supabase Credentials
const SUPABASE_URL = "https://pckocwvuxeseumynslwv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBja29jd3Z1eGVzZXVteW5zbHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NDc3OTAsImV4cCI6MjEwNjIyMzc5MH0.0VBGW9lgZDritQa7XDoPncu5bl9M6J5W9eup0KSLXIc";

// Global Supabase Client
var _supabase = null;

// Initialize function
function initSupabase() {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
        _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window._supabase = _supabase;
        console.log("Supabase initialized successfully!");
    } else {
        console.error("Supabase CDN Library not loaded properly!");
    }
}

// Window Load Event
if (document.readyState === 'complete') {
    initSupabase();
} else {
    window.addEventListener('DOMContentLoaded', initSupabase);
}
