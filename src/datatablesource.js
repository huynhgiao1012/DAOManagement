import Rating from "@mui/material/Rating";
export const userColumns = [
  { field: "id", headerName: "ID", headerAlign: "center", flex: 1 },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "img",
    headerName: "Avatar",
    renderCell: (params) => {
      return (
        <img
          className="cellImg"
          src={
            params.row.img !== ""
              ? params.row.img
              : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
          }
          alt="avatar"
        />
      );
    },
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    flex: 1,
  },

  {
    field: "phone",
    headerName: "Phone",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Role",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
export const mechanicColumns = [
  {
    field: "id",
    headerName: "ID",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "img",
    headerName: "Avatar",
    renderCell: (params) => {
      return (
        <img
          className="cellImg"
          src={
            params.row.img !== ""
              ? params.row.img
              : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
          }
          alt="avatar"
        />
      );
    },
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    flex: 1,
  },

  {
    field: "phone",
    headerName: "Phone",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "point",
    headerName: "Point",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "group",
    headerName: "Group",
    headerAlign: "center",
    flex: 1,
  },
];
export const accountantColumns = [
  {
    field: "id",
    headerName: "ID",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "img",
    headerName: "Avatar",
    renderCell: (params) => {
      return (
        <img
          className="cellImg"
          src="https://img.freepik.com/premium-vector/cute-boy-thinking-cartoon-avatar_138676-2439.jpg"
          alt="avatar"
        />
      );
    },
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    flex: 1,
  },

  {
    field: "phone",
    headerName: "Phone",
    headerAlign: "center",
    flex: 1,
  },
];
export const serviceColumns = [
  { field: "id", headerName: "ID", headerAlign: "center", flex: 0.5 },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "price",
    headerName: "Price",
    headerAlign: "center",
    flex: 0.5,
  },
];
export const serviceColumns2 = [
  { field: "id", headerName: "ID", headerAlign: "center", flex: 0.2 },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    flex: 0.3,
  },
  {
    field: "price",
    headerName: "Price",
    headerAlign: "center",
    flex: 0.2,
  },
];
export const formColumn = [
  { field: "id", headerName: "ID", flex: 1, headerAlign: "center" },
  {
    field: "customerName",
    headerName: "Customer's Name",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "service",
    headerName: "Service Name",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.date.split("-").reverse().join("-")}</div>;
    },
  },
  {
    field: "time",
    headerName: "Time",
    flex: 1,
    headerAlign: "center",
  },
];
export const feedbackColumn = [
  { field: "id", headerName: "ID", flex: 1, headerAlign: "center" },
  {
    field: "customerName",
    headerName: "Customer's Name",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "phone",
    headerName: "Customer's Phone",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "service",
    headerName: "Service",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <div>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(params.row.price)}
        </div>
      );
    },
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.date.split("-").reverse().join("-")}</div>;
    },
  },
  {
    field: "rating",
    headerName: "Rating",
    flex: 1,
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <div>
          {params.row.rating > 0 ? (
            <Rating name="read-only" value={params.row.rating} readOnly />
          ) : (
            0
          )}
        </div>
      );
    },
  },
  {
    field: "review",
    headerName: "Review",
    flex: 1,
    headerAlign: "center",
  },
];
export const garageColumn = [
  { field: "id", headerName: "ID", flex: 1, headerAlign: "center" },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "openTime",
    headerName: "Open Time",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "closeTime",
    headerName: "Close Time",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "bank",
    headerName: "Bank",
    flex: 1,
    headerAlign: "center",
  },
];
export const garageColumn2 = [
  { field: "id", headerName: "ID", flex: 1, headerAlign: "center" },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    headerAlign: "center",
  },
];
export const managerColumn = [
  {
    field: "Id",
    headerName: "ID",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "Name",
    headerName: "Name",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "img",
    headerName: "Avatar",
    renderCell: (params) => {
      return (
        <img
          className="cellImg"
          src={
            params.row.Img !== ""
              ? params.row.Img
              : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
          }
          alt="avatar"
        />
      );
    },
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "Email",
    headerName: "Email",
    headerAlign: "center",
    flex: 1,
  },

  {
    field: "Phone",
    headerName: "Phone",
    headerAlign: "center",
    flex: 1,
  },
];
export const brandColumn = [
  {
    field: "_id",
    headerName: "ID",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "brand",
    headerName: "Name",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "img",
    headerName: "Brand's Image",
    renderCell: (params) => {
      return (
        <img
          className="cellImg"
          src={
            params.row.img !== ""
              ? params.row.img
              : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
          }
          alt="avatar"
        />
      );
    },
    headerAlign: "center",
    flex: 1,
  },
];
export const banksData = [
  {
    id: 1,
    label: "SGICB - Ngân hàng TMCP Sài Gòn Công Thương",
    value: "970400",
  },
  {
    id: 2,
    label: "STB - Ngân hàng TMCP Sài Gòn Thương Tín",
    value: "970403",
  },
  {
    id: 3,
    label: "VBA - Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam",
    value: "970405",
  },
  {
    id: 4,

    label: "DOB - Ngân hàng TMCP Đông Á",
    value: "970406",
  },
  {
    id: 5,

    label: "TCP - Ngân hàng TMCP Kỹ Thương",
    value: 970407,
  },
  {
    id: 6,

    label: "GPB - Ngân hàng Thương mại TNHH Một Thành Viên Dầu Khí Toàn Cầu",
    value: "970408",
  },
  {
    id: 7,

    label: "BAB - Ngân hàng TMCP Bắc Á",
    value: "970409",
  },
  {
    id: 8,

    label: "SCVN - Ngân hàng TNHH Một Thành Viên Standard Chartered",
    value: "970410",
  },
  {
    id: 9,

    label: "PVCB - Ngân hàng TMCP Đại Chúng Việt Nam",
    value: "970412",
  },
  {
    id: 10,

    label: "Oceanbank - Ngân hàng TNHH Một Thành Viên Đại Dương",
    value: "970414",
  },
  {
    id: 11,

    label: "ICB - Ngân hàng TMCP Công Thương Việt Nam",
    value: "970415",
  },
  {
    id: 12,

    label: "ACB - Ngân hàng TMCP Á Châu",
    value: "970416",
  },
  {
    id: 13,

    label: "BIDV - Ngân hàng Đầu tư và Phát triển Việt Nam",
    value: "970418",
  },
  {
    id: 14,

    label: "NCB - Ngân hàng TMCP Quốc Dân",
    value: "970419",
  },
  {
    id: 15,

    label: "VRB - Ngân hàng liên doanh Việt Nga",
    value: "970421",
  },
  {
    id: 16,

    label: "MB - Ngân hàng TMCP Quân Đội",
    value: "970422",
  },
  {
    id: 17,

    label: "TPB - Ngân hàng TMCP Tiên Phong",
    value: "970423",
  },
  {
    id: 18,

    label: "SHBVN - Ngân hàng TNHH Một Thành Viên Shinhan Việt Nam",
    value: "970424",
  },
  {
    id: 19,

    label: "ABB - Ngân hàng TMCP An Bình",
    value: "970425",
  },
  {
    id: 20,

    label: "MSB - Ngân hàng TMCP Hàng Hải",
    value: "970426",
  },
  {
    id: 21,

    label: "VAB - Ngân hàng TMCP Việt Á",
    value: "970427",
  },
  {
    id: 22,

    label: "NAB - Ngân hàng TMCP Nam Á",
    value: "970428",
  },
  {
    id: 23,

    label: "SCB - Ngân hàng TMCP Sài Gòn",
    value: "970429",
  },
  {
    id: 24,

    label: "PGB - Ngân hàng TMCP Xăng dầu Petrolimex",
    value: "970430",
  },
  {
    id: 25,

    label: "EIB - Ngân hàng TMCP Xuất Nhập khẩu Việt Nam",
    value: "970431",
  },
  {
    id: 26,

    label: "CAKE - Ngân hàng TMCP Việt Nam Thịnh Vượng",
    value: "970432",
  },
  {
    id: 27,

    label: "VIETBANK - Ngân hàng TMCP Việt Nam Thương Tín",
    value: "970433",
  },
  {
    id: 28,

    label: "IVB - Ngân hàng TNHH Indovina",
    value: "970434",
  },
  {
    id: 29,

    label: "VCB - Ngân hàng TMCP Ngoại thương Việt Nam",
    value: "970436",
  },
  {
    id: 30,

    label: "HDB - Ngân hàng TMCP Phát triển TP.HCM",
    value: "970437",
  },
  {
    id: 31,

    label: "BVB - Ngân hàng TMCP Bảo Việt",
    value: "970438",
  },
  {
    id: 32,

    label: "PBVN - Ngân hàng TNHH Một Thành Viên Public Việt Nam",
    value: "970439",
  },
  {
    id: 33,

    label: "SEAB - Ngân hàng TMCP Đông Nam Á",
    value: "970440",
  },
  {
    id: 34,

    label: "VIB - Ngân hàng TMCP Quốc Tế Việt Nam",
    value: "970441",
  },
  {
    id: 35,

    label: "HLBVN - Ngân hàng TNHH Một Thành Viên Hong Leong Việt Nam",
    value: "970442",
  },
  {
    id: 36,

    label: "SHB - Ngân hàng TMCP Sài Gòn - Hà Nội",
    value: "970443",
  },
  {
    id: 37,

    label: "CBB - Ngân hàng Thương mại TNHH Một Thành Viên Xây Dựng Việt Nam",
    value: "970444",
  },
  {
    id: 38,

    label: "COOPBANK - Ngân hàng Hợp Tác Xã Việt Nam",
    value: "970446",
  },
  {
    id: 39,

    label: "OCB - Ngân hàng TMCP Phương Đông",
    value: "970448",
  },
  {
    id: 40,

    label: "LPBANK - Ngân hàng TMCP Bưu Điện Liên Việt",
    value: "970449",
  },
  {
    id: 41,

    label: "KLB - Ngân hàng TMCP Kiên Long",
    value: "970452",
  },
  {
    id: 42,

    label: "BV - Ngân hàng TMCP Bản Việt",
    value: "970454",
  },
  {
    id: 43,

    label: "IBK - HN - Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh Hà Nội",
    value: "970455",
  },
  {
    id: 44,

    label:
      "IBK - HCM - Ngân hàng Industrial Bank of Korea - Chi nhánh Hồ Chí Minh",
    value: "970456",
  },
  {
    id: 45,

    label: "WVN - Ngân hàng Woori Bank Việt Nam",
    value: "970457",
  },
  {
    id: 46,
    label: "UOB - Ngân hàng UOB Việt Nam",
    value: "970458",
  },
  {
    id: 47,
    label: "CIMB - Ngân hàng TNHH Một Thành Viên CIMB Việt Nam",
    value: "970459",
  },
  {
    id: 48,
    label: "CFC - Công ty tài chính cổ phần Xi Măng",
    value: "970460",
  },
];
