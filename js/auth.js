// دالة التبديل بين واجهة الطالب وواجهة الإدارة
function switchTab(tab) {
    const studentTab = document.getElementById('student-tab');
    const adminTab = document.getElementById('admin-tab');
    const studentForm = document.getElementById('student-form');
    const adminForm = document.getElementById('admin-form');
    const errorMsg = document.getElementById('error-message');

    // تفريغ رسائل الخطأ عند التبديل
    errorMsg.textContent = '';

    if (tab === 'student') {
        studentTab.classList.add('active');
        adminTab.classList.remove('active');
        studentForm.classList.remove('hidden');
        adminForm.classList.add('hidden');
    } else {
        adminTab.classList.add('active');
        studentTab.classList.remove('active');
        adminForm.classList.remove('hidden');
        studentForm.classList.add('hidden');
    }
}

// معالجة تسجيل دخول الإدارة (Admin Login)
document.getElementById('admin-form').addEventListener('submit', function(e) {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    
    const code = document.getElementById('admin-code').value;
    const password = document.getElementById('admin-password').value;
    const secret = document.getElementById('admin-secret').value;
    const errorMsg = document.getElementById('error-message');

    // التحقق من الحساب التجريبي وباص الحماية المزدوجة
    if (code === 'admin' && password === '5656' && secret === '44554455') {
        // تسجيل الدخول بنجاح وحفظ الجلسة لحماية صفحة لوحة التحكم
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        // التوجيه إلى لوحة تحكم الإدارة
        window.location.href = 'admin-dashboard.html';
    } else {
        errorMsg.textContent = 'بيانات الدخول أو باص الحماية غير صحيح!';
    }
});

// معالجة تسجيل دخول الطالب (مؤقتاً للواجهة الأمامية حتى ربطها بـ Google Sheets)
document.getElementById('student-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const code = document.getElementById('student-code').value;
    const password = document.getElementById('student-password').value;
    const errorMsg = document.getElementById('error-message');

    // بمجرد بناء الـ Backend، سيتم استبدال هذا الجزء بطلب (Fetch API) إلى Google Apps Script
    if (code.trim() !== '' && password.trim() !== '') {
        sessionStorage.setItem('isStudentLoggedIn', 'true');
        sessionStorage.setItem('studentCode', code); // الاحتفاظ بكود الطالب لجلب بياناته
        window.location.href = 'student-dashboard.html';
    } else {
        errorMsg.textContent = 'الرجاء إدخال الكود الجامعي وكلمة المرور بشكل صحيح.';
    }
});
