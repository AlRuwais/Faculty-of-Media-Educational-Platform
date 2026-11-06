// 1. حماية صفحة الطالب والتنقل
document.addEventListener('DOMContentLoaded', function() {
    const isStudent = sessionStorage.getItem('isStudentLoggedIn');
    const studentCode = sessionStorage.getItem('studentCode');

    if (!isStudent || isStudent !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    // عرض بيانات الطالب الأساسية
    document.getElementById('student-code-display').textContent = studentCode || '----';
    document.getElementById('student-name').textContent = 'طالب إعلام';
    document.getElementById('student-year').textContent = 'الفرقة الأولى';
});

function switchStudentTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active-tab'));
    document.querySelectorAll('.student-sidebar .nav-links li').forEach(li => li.classList.remove('active'));

    document.getElementById(tabId).classList.add('active-tab');
    element.classList.add('active');
}

// 2. خوارزمية حساب المسافة الجغرافية (Haversine Formula) بالمتر
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // نصف قطر الأرض بالمتر
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // النتيجة بالمتر
}

// 3. تسجيل الحضور باستخدام الـ GPS والكود السري
function registerAttendance() {
    const secretCode = document.getElementById('attendance-secret-code').value;
    const statusMsg = document.getElementById('attendance-status');

    if (!secretCode) {
        statusMsg.style.color = 'red';
        statusMsg.textContent = '❌ يرجى إدخال الكود السري للمحاضرة أولاً.';
        return;
    }

    statusMsg.style.color = 'blue';
    statusMsg.textContent = '⏳ جاري تحديد موقعك الجغرافي والتحقق...';

    if (!navigator.geolocation) {
        statusMsg.style.color = 'red';
        statusMsg.textContent = '❌ متصفحك لا يدعم تحديد الموقع الجغرافي (GPS).';
        return;
    }

    // الحصول على إحداثيات الطالب الحالية
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const studentLat = position.coords.latitude;
            const studentLng = position.coords.longitude;

            // إحداثيات مبنى/قاعة الكلية افتراضياً (يتم جلبها ديناميكياً من لوحة الإدارة)
            const targetLat = 30.0594;
            const targetLng = 31.2584;
            const maxAllowedDistanceMeters = 150; // أقصى مسافة مسموحة (مثلاً 150 متر)

            const distance = calculateDistance(studentLat, studentLng, targetLat, targetLng);

            if (distance <= maxAllowedDistanceMeters) {
                statusMsg.style.color = 'green';
                statusMsg.textContent = `✅ تم تسجيل حضورك بنجاح! المسافة عن القاعة: ${Math.round(distance)} متر.`;
            } else {
                statusMsg.style.color = 'red';
                statusMsg.textContent = `❌ فشل التسجيل: أنت خارج نطاق القاعة الدراسية (${Math.round(distance)} متر بعيداً).`;
            }
        },
        (error) => {
            statusMsg.style.color = 'red';
            statusMsg.textContent = '❌ يتعذر الوصول إلى موقعك. يرجى تفعيل الـ GPS في جهازك والموافقة على الأذونات.';
        },
        { enableHighAccuracy: true }
    );
}

function studentLogout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}
