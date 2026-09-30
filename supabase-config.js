// Supabase Credentials
const SUPABASE_URL = "https://pckocwvuxeseumynslwv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBja29jd3Z1eGVzZXVteW5zbHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NDc3OTAsImV4cCI6MjEwNjIyMzc5MH0.0VBGW9lgZDritQa7XDoPncu5bl9M6J5W9eup0KSLXIc";

// Initialize Supabase Client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 1. User Sign Up Function
async function registerUser(fullName, email, phone, password, secretPin) {
    try {
        // Generate UUID on the client side
        const newUserId = crypto.randomUUID();

        const { data, error } = await supabase
            .from('user')
            .insert([
                {
                    id: newUserId, // UUID Explicitly sent
                    full_name: fullName,
                    email: email,
                    phone: phone,
                    password: password,
                    secret_pin: secretPin,
                    created_at: new Date().toISOString()
                }
            ])
            .select();

        if (error) throw error;

        if (data && data.length > 0) {
            localStorage.setItem('user_id', data[0].id);
            return { success: true, user: data[0] };
        }
        return { success: false, error: 'Registration failed' };
    } catch (error) {
        console.error("Sign up error:", error.message);
        return { success: false, error: error.message };
    }
}

// 2. User Login Function
async function loginUser(email, password) {
    try {
        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .single();

        if (error) throw error;

        if (data) {
            localStorage.setItem('user_id', data.id);
            return { success: true, user: data };
        } else {
            return { success: false, error: 'Invalid email or password' };
        }
    } catch (error) {
        console.error("Login error:", error.message);
        return { success: false, error: error.message };
    }
}

// 3. Fetch logged in user profile
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
        console.error("Error fetching profile:", error.message);
        return { success: false, error: error.message };
    }
}

// 4. Update user password
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
