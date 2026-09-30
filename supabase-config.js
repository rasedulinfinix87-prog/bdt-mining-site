// Supabase Credentials (আপনার প্রজেক্টের URL এবং Anon Key বসান)
const SUPABASE_URL = "https://pckocwvuxeseumynslwv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBja29jd3Z1eGVzZXVteW5zbHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NDc3OTAsImV4cCI6MjEwNjIyMzc5MH0.0VBGW9lgZDritQa7XDoPncu5bl9M6J5W9eup0KSLXIc";

// Initialize Supabase Client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fetch logged in user profile from 'user' table
async function fetchUserProfile(userId) {
    try {
        const { data, error } = await supabase
            .from('user')
            .select('id, full_name, email, phone, secret_pin')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
        return { success: false, error: error.message };
    }
}

// Update user password in 'user' table
async function updateUserPassword(userId, newPassword) {
    try {
        const { data, error } = await supabase
            .from('user')
            .update({ 
                password: newPassword,
                updated_at: new Date().toISOString()
            })
            .eq('id', userId);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error("Error updating password:", error.message);
        return { success: false, error: error.message };
    }
}
