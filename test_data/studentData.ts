export const DATA_STUDENT = {
  student: {
    blank: {
      FullName: {
        fullName: "",
        email: "long.bui@example.com",
        class: "Lớp toán nâng cao",
        fee: "1500000",
        feePaymentCycle: "2 tháng",
        paymentDate: "2025-09-05",
      },
      Email: {
        fullName: "Trần Mỹ Dung",
        email: "",
        class: "Lớp lập trình thiếu nhi",
        fee: "1200000",
        feePaymentCycle: "1 tháng",
        paymentDate: "2025-09-10",
      },
      Class: {
        fullName: "Hoàng Bảo Long",
        email: "bao.long@example.com",
        class: "",
        fee: "1300000",
        feePaymentCycle: "1 tháng",
        paymentDate: "2025-09-07",
      },
      Fee: {
        fullName: "Trịnh Thu Hà",
        email: "ha.trinh@example.com",
        class: "Lớp phụ đạo văn",
        fee: "",
        feePaymentCycle: "1 tháng",
        paymentDate: "2025-09-22",
      },
      feePaymentCycle: {
        fullName: "Bùi Quốc Khánh",
        email: "khanh.bui@example.com",
        class: "Lớp tiếng anh dễ",
        fee: "3000000",
        feePaymentCycle: "",
        paymentDate: "2025-09-12",
      },
      paymentDate: {
        fullName: "Nguyễn Văn Đức",
        email: "duc.nguyen@example.com",
        class: "Lớp toán",
        fee: "1100000",
        feePaymentCycle: "1 tháng",
        paymentDate: "",
      },
    },

    invalid: {
      InvalidEmail_MissingAt: {
        fullName: "Phạm Gia Huy",
        email: "huy.pham.example.com", // thiếu @
        class: "Lớp toán nâng cao",
        fee: "1800000",
        feePaymentCycle: "1 tháng",
        paymentDate: "2025-09-15",
      },
      InvalidEmail_MissingDomain: {
        fullName: "Ngô Thảo Nhi",
        email: "nhi@", // thiếu domain
        class: "Lớp toán nâng cao",
        fee: "1000000",
        feePaymentCycle: "3 tháng",
        paymentDate: "2025-09-20",
      },
      InvalidEmail_MissingUsername: {
        fullName: "Đinh Quốc Bảo",
        email: "@gmail.com", // thiếu username
        class: "Lớp toán nâng cao",
        fee: "2000000",
        feePaymentCycle: "1 tháng",
        paymentDate: "2025-09-25",
      },
      InvalidEmail_InvalidChars: {
        fullName: "Lê Hoàng Minh",
        email: "minh@@gmail.com", // ký tự không hợp lệ
        class: "Lớp toán nâng cao",
        fee: "900000",
        feePaymentCycle: "1 tháng",
        paymentDate: "2025-09-30",
      },
      InvalidEmail_NoTLD: {
        fullName: "Nguyễn Hải Yến",
        email: "yenn@gmail", // thiếu .com
        class: "Lớp toán nâng cao",
        fee: "2500000",
        feePaymentCycle: "2 tháng",
        paymentDate: "2025-09-18",
      },
    },

    student2: {
      fullName: "Phan Nhật Tân",
      email: "tan.phan@example.com",
      class: "Lớp toán nâng cao",
      fee: "1600000",
      feePaymentCycle: "1 tháng",
      paymentDate: "2027-09-18",
      filePaths: "../assets/student.jpg",
    },
    studentFull: {
      fullName: "Phan Nhật Tân",
      dob: "2018-06-11",
      email: "tan.phan@example.com",
      class: "Lớp toán nâng cao",
      gradeLevel: "6",
      fee: "1600000",
      feePaymentCycle: "1 tháng",
      paymentDate: "2025-09-08",
      paymentMethod: "MoMo",
      filePaths: "../assets/student.jpg",
      parent: "Nguyễn Mỹ Linh",
      bussinessStaff: "Phạm Thị Lan",
    },
  },
};
