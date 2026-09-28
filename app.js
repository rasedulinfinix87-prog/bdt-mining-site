let isLoggedIn = false;
let userBalance = 0;
let currentAuthMode = 'login';

function openAuthModal(mode) {
    currentAuthMode = mode;
    document.getElementById('modalTitle').innerText = mode === 'login' ? 'লগইন করুন' : 'সাইন-আপ করুন';
    document.getElementById('authModal').style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function handleAuthSubmit() {
    const email = document.getElementById('email').value;
    if(!email) {
        alert('অনুগ্রহ করে ইমেইল দিন');
        return;
    }
    
    isLoggedIn = true;
    userBalance = 50000; // টেস্ট ইনভেস্টমেন্টের জন্য প্রাথমিক ডেমো ব্যালেন্স
    
    document.getElementById('authNav').style.display = 'none';
    document.getElementById('userNav').style.display = 'flex';
    document.getElementById('navEmail').innerText = email;
    document.getElementById('navBalance').innerText = '৳ ' + userBalance.toLocaleString();
    
    closeAuthModal();
    alert(currentAuthMode === 'login' ? 'সফলভাবে লগইন হয়েছে!' : 'সাইন-আপ সম্পন্ন হয়েছে!');
}

function handleInvestClick(amount, days, planKey) {
    if(!isLoggedIn) {
        alert('ইনভেস্ট করতে আপনাকে প্রথমে লগইন বা সাইন-আপ করতে হবে!');
        openAuthModal('signup');
        return;
    }

    if(userBalance < amount) {
        alert('আপনার পর্যাপ্ত ব্যালেন্স নেই!');
        return;
    }

    if(confirm(`আপনি কি ৳ ${amount.toLocaleString()} দিয়ে ${days} দিনের প্ল্যানটি শুরু করতে চান?`)) {
        userBalance -= amount;
        document.getElementById('navBalance').innerText = '৳ ' + userBalance.toLocaleString();
        
        // মাইনিং অ্যানিমেশন ও টাইমার চালু
        document.getElementById('activeMiningSection').style.display = 'block';
        document.getElementById('activePlanName').innerText = `${days} দিনের মাইনিং এক্টিভ আছে`;
        document.getElementById('daysCounter').innerText = days;
        document.getElementById('miningProgress').style.width = '10%';
        
        alert('অভিনন্দন! আপনার মাইনিং ইনভেস্টমেন্ট সফলভাবে শুরু হয়েছে।');
    }
}
