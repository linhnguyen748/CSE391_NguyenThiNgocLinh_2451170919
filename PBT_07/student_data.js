const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// Khởi tạo các biến để lưu trữ kết quả thống kê
let countGioi = 0, countKha = 0, countTB = 0, countYeu = 0;

let maxAvg = -1;
let minAvg = 11;
let bestStudent = "";
let worstStudent = "";

let totalMath = 0, totalPhysics = 0, totalCS = 0;

let sumMaleAvg = 0, countMale = 0;
let sumFemaleAvg = 0, countFemale = 0;

// In Header của bảng
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    let st = students[i];
    
    // 1. Tính điểm trung bình
    let avg = st.math * 0.4 + st.physics * 0.3 + st.cs * 0.3;
    
    // 2. Xếp loại và đếm số lượng
    let rank = "";
    if (avg >= 8.0) {
        rank = "Giỏi";
        countGioi++;
    } else if (avg >= 6.5) {
        rank = "Khá";
        countKha++;
    } else if (avg >= 5.0) {
        rank = "Trung bình";
        countTB++;
    } else {
        rank = "Yếu";
        countYeu++;
    }
    
    // Tìm max / min
    if (avg > maxAvg) {
        maxAvg = avg;
        bestStudent = st.name;
    }
    if (avg < minAvg) {
        minAvg = avg;
        worstStudent = st.name;
    }
    
    // Cộng dồn điểm để tính TB môn học
    totalMath += st.math;
    totalPhysics += st.physics;
    totalCS += st.cs;
    
    // Cộng dồn để tính TB giới tính (Bonus)
    if (st.gender === "M") {
        sumMaleAvg += avg;
        countMale++;
    } else if (st.gender === "F") {
        sumFemaleAvg += avg;
        countFemale++;
    }
    
    // 3. In từng dòng của bảng (Dùng padEnd để căn lề cho đẹp)
    let stt = String(i + 1).padEnd(3);
    let name = st.name.padEnd(6);
    let avgStr = avg.toFixed(1).padEnd(4);
    let rankStr = rank.padEnd(11);
    
    console.log(`| ${stt} | ${name} | ${avgStr} | ${rankStr} |`);
}

// 4, 5, 6, 7. Thống kê
console.log("\n=== BÁO CÁO THỐNG KÊ ===");

console.log(`1. Số lượng sinh viên theo xếp loại:`);
console.log(`   - Giỏi: ${countGioi}`);
console.log(`   - Khá: ${countKha}`);
console.log(`   - Trung bình: ${countTB}`);
console.log(`   - Yếu: ${countYeu}`);

console.log(`\n2. Thành tích:`);
console.log(`   - Cao nhất: ${bestStudent} (${maxAvg.toFixed(1)} điểm)`);
console.log(`   - Thấp nhất: ${worstStudent} (${minAvg.toFixed(1)} điểm)`);

let numStudents = students.length;
console.log(`\n3. Điểm trung bình toàn lớp theo môn học:`);
console.log(`   - Toán: ${(totalMath / numStudents).toFixed(1)}`);
console.log(`   - Lý: ${(totalPhysics / numStudents).toFixed(1)}`);
console.log(`   - CS: ${(totalCS / numStudents).toFixed(1)}`);

let avgMale = countMale > 0 ? (sumMaleAvg / countMale).toFixed(1) : 0;
let avgFemale = countFemale > 0 ? (sumFemaleAvg / countFemale).toFixed(1) : 0;
console.log(`\n4. [Bonus] Điểm trung bình theo giới tính:`);
console.log(`   - Nam (M): ${avgMale}`);
console.log(`   - Nữ (F): ${avgFemale}`);