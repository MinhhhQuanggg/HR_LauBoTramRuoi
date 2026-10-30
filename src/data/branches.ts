import { Branch, BranchGroup } from "@/types/branch";

export const BRANCH_GROUPS: BranchGroup[] = [
  {
    region: "thu-duc-khu-dong",
    title: "Khu vực Thủ Đức & Khu Đông",
    description: "Hệ thống tiệm tại TP. Thủ Đức và cửa ngõ phía Đông",
    branches: [
      {
        id: "td-01",
        name: "Lẩu Bò Trăm Rưỡi - Tô Ngọc Vân",
        address: "Tô Ngọc Vân, TP. Thủ Đức, TP. Hồ Chí Minh",
        district: "TP. Thủ Đức",
        city: "Hồ Chí Minh",
        phone: "0981256712",
        region: "thu-duc-khu-dong",
      },
      {
        id: "td-02",
        name: "Lẩu Bò Trăm Rưỡi - Đỗ Xuân Hợp",
        address: "Đỗ Xuân Hợp, Phước Long B, TP. Thủ Đức, TP. Hồ Chí Minh",
        district: "TP. Thủ Đức",
        city: "Hồ Chí Minh",
        phone: "0981256712",
        region: "thu-duc-khu-dong",
      },
    ],
  },
  {
    region: "go-vap-phu-nhuan",
    title: "Khu vực Gò Vấp & Phú Nhuận",
    description: "Chuỗi các tiệm trọng điểm tại Gò Vấp & Phú Nhuận",
    branches: [
      {
        id: "gv-01",
        name: "Lẩu Bò Trăm Rưỡi - Lê Đức Thọ",
        address: "107 Lê Đức Thọ, Phường 17, Gò Vấp, TP. Hồ Chí Minh",
        district: "Gò Vấp",
        city: "Hồ Chí Minh",
        phone: "0981256712",
        region: "go-vap-phu-nhuan",
      },
      {
        id: "gv-02",
        name: "Lẩu Bò Trăm Rưỡi - Phan Văn Trị",
        address: "701 Phan Văn Trị, Phường 7, Gò Vấp, TP. Hồ Chí Minh",
        district: "Gò Vấp",
        city: "Hồ Chí Minh",
        phone: "0981256712",
        region: "go-vap-phu-nhuan",
      },
      {
        id: "gv-03",
        name: "Lẩu Bò Trăm Rưỡi - Quang Trung",
        address: "685 Quang Trung, Phường 11, Gò Vấp, TP. Hồ Chí Minh",
        district: "Gò Vấp",
        city: "Hồ Chí Minh",
        phone: "0981256712",
        region: "go-vap-phu-nhuan",
      },
      {
        id: "gv-04",
        name: "Lẩu Bò Trăm Rưỡi - Phan Huy Ích",
        address: "342 Phan Huy Ích, Phường 12, Gò Vấp, TP. Hồ Chí Minh",
        district: "Gò Vấp",
        city: "Hồ Chí Minh",
        phone: "0981256712",
        region: "go-vap-phu-nhuan",
      },
      {
        id: "pn-01",
        name: "Lẩu Bò Trăm Rưỡi - Phan Xích Long",
        address: "Khu Phan Xích Long, Phú Nhuận, TP. Hồ Chí Minh",
        district: "Phú Nhuận",
        city: "Hồ Chí Minh",
        phone: "0981256712",
        region: "go-vap-phu-nhuan",
      },
    ],
  },
  {
    region: "trung-tam",
    title: "Khu vực Trung Tâm (Quận 3, Quận 10)",
    description: "Các chi nhánh trung tâm sôi động nhất hệ thống",
    branches: [
      {
        id: "q10-01",
        name: "Lẩu Bò Trăm Rưỡi - CMT8",
        address: "Cách Mạng Tháng 8, Phường 13, Quận 10, TP. Hồ Chí Minh",
        district: "Quận 10",
        city: "Hồ Chí Minh",
        phone: "0981256712",
        region: "trung-tam",
      },
      {
        id: "q3-01",
        name: "Lẩu Bò Trăm Rưỡi - Quận 3",
        address: "Khu vực Quận 3, TP. Hồ Chí Minh",
        district: "Quận 3",
        city: "Hồ Chí Minh",
        phone: "0981256712",
        region: "trung-tam",
      },
    ],
  },
];

export const ALL_BRANCHES: Branch[] = BRANCH_GROUPS.flatMap((group) => group.branches);
