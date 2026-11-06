// استبدل هذا الرابط بعد نشر الـ Google Apps Script كـ Web App
const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

// دالة إرسال الطلبات إلى Google Apps Script
async function callCloudAPI(action, payload = {}) {
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({ action: action, ...payload })
        });
        return await response.json();
    } catch (error) {
        console.error("Cloud API Connection Error:", error);
        return { success: false, message: "فشل الاتصال بالسحابة" };
    }
}
