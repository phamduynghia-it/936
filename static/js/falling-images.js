// Danh sách các ảnh trong thư mục static
const imageList = Array.from({ length: 5 }, (_, i) => `static/a${i + 1}.jpg`);

let currentIndex = 0;
const fallInterval = 4000;   // Mỗi 4 giây tạo 1 ảnh rơi
const fallDuration = 8000;   // Thời gian rơi (ms)

function createFallingImage() {
    if (imageList.length === 0) return;

    const img = document.createElement("img");
    const src = imageList[currentIndex];
    img.src = src;
    img.className = "falling-image";

    // Kích thước dựa theo màn hình (mobile-friendly)
    const screenWidth = Math.min(window.innerWidth, window.innerHeight);
    const imgSize = screenWidth / 4;

    img.style.width = imgSize + "px";
    img.style.position = "fixed";
    img.style.zIndex = 1000;
    img.style.pointerEvents = "none";
    img.style.transition = `top ${fallDuration}ms linear`;

    // 👉 Giữ nguyên tỷ lệ gốc cho a5.jpg
    if (src.includes("a5.jpg")) {
        img.style.height = "auto";       // giữ tỷ lệ gốc
        img.style.objectFit = "contain"; // không cắt ảnh
    } else {
        img.style.height = imgSize + "px"; // các ảnh khác vuông
        img.style.objectFit = "cover";
    }

    // Vị trí rơi ngẫu nhiên theo chiều ngang
    const minLeft = 0;
    const maxLeft = window.innerWidth - imgSize;
    img.style.left = Math.max(minLeft, Math.random() * maxLeft) + "px";

    // Bắt đầu từ trên màn hình
    img.style.top = "-" + imgSize + "px";

    document.body.appendChild(img);

    // Kích hoạt hiệu ứng rơi
    setTimeout(() => {
        img.style.top = window.innerHeight + "px";
    }, 50);

    // Xóa ảnh sau khi rơi xong
    setTimeout(() => {
        img.remove();
    }, fallDuration + 500);

    // Chuyển sang ảnh tiếp theo
    currentIndex = (currentIndex + 1) % imageList.length;
}

// Tạo ảnh rơi định kỳ
setInterval(createFallingImage, fallInterval);

// Tạo ảnh rơi ngay khi load trang
window.addEventListener("DOMContentLoaded", createFallingImage);
