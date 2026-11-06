// 1. حماية الصفحة: التحقق من أن الإدارة قامت بتسجيل الدخول فعلياً
document.addEventListener('DOMContentLoaded', function() {
    const isAdmin = sessionStorage.getItem('isAdminLoggedIn');
    
    // إذا لم يكن هناك جلسة صالحة، قم بطرده فوراً إلى صفحة الدخول
    if (!isAdmin || isAdmin !== 'true') {
        window.location.href = 'index.html';
    }
});

// 2. دالة التبديل بين أقسام لوحة التحكم (القائمة الجانبية)
function switchSection(sectionId, clickedElement) {
    // إخفاء كل الأقسام
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active-section');
    });

    // إظهار القسم المطلوب
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active-section');
    }

    // إزالة التنسيق النشط (Active) من كل عناصر القائمة الجانبية
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // إضافة التنسيق النشط للعنصر الذي تم النقر عليه
    clickedElement.classList.add('active');
}

// 3. دالة تسجيل الخروج
function logout() {
    // مسح الجلسة بالكامل
    sessionStorage.clear();
    // إعادة التوجيه لصفحة الدخول
    window.location.href = 'index.html';
}
