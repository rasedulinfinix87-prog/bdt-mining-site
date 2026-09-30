// Supabase Credentials (আপনার প্রজেক্টের URL এবং Anon Key বসান)
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

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
