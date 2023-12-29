<div align="center">
# Magic Post
</div>

[Video giới thiệu sản phẩm](https://www.youtube.com/watch?v=OglZlTCWAYA)

## Cách chạy

- Để chạy ứng dụng, cần cài đặt [Node.js](https://nodejs.org/en) (phiên bản được sử dụng trong quá trình phát triển là v18.16.1)
- Thực hiện các lệnh sau để chạy web
    
    ```bash
    cd MagicPost
    
    # terminal 1
    cd backend
    npm i
    npm start
    
    # terminal 2
    cd frontend
    npm i
    npm start
    ```
    
- Các tài khoản để tiện kiểm tra
    
    
    | Vai trò | Username | Passwords |
    | --- | --- | --- |
    | Lãnh đạo công ty | General Manager | 111 |
    | Trưởng điểm giao dịch Thanh Xuân | DGD_TX_Hanoi_Manager | 111 |
    | Trưởng điểm tập kết | DTK_Hanoi_Manager | 111 |
    | Giao dịch viên điểm giao dịch Thanh Xuân | DGD_TX_Hanoi_Employee1 | 111 |
    | Nhân viên điểm tập kết | DTK_Hanoi_Employee1 | 111 |
    
    Mã vận đơn mẫu: MPDS5R1FYgzTH
    

## Thành viên nhóm

- Hoàng Mạnh Hùng - 21020518
- Phan Anh Đức - 21021481
- Hoàng Hùng Mạnh - 21020522

## Công việc các thành viên

- Hoàng Mạnh Hùng (frontend)
    - Thiết kế giao diện responsive, đẹp và hiện đại
    - Thiết kế trang web đơn giản, thân thiện với người dùng
    - Thiết kế website theo hướng chia nhỏ thành các module độc lập, giúp tái sử dụng linh hoạt và dễ bảo trì
    - Kết hợp nhiều thư viện front-end và sử dụng API từ backend để lấy và gửi dữ liệu giữa máy khách và máy chủ.
    - Tích hợp đồ họa và hiệu ứng để làm cho trang web trở nên sinh động và thú vị.
    - Xây dựng và triển khai kịch bản kiểm thử tự động để giảm lỗi và đảm bảo chất lượng mã nguồn.
    - Theo dõi và quản lý trạng thái cấp độ người dùng, bao gồm việc quản lý đăng nhập, quyền truy cập, và trạng thái đối với người dùng cụ thể.
    - Tối ưu hóa các yếu tố tương tác như các biểu đồ, bảng dữ liệu, và các phần khác để đảm bảo trải nghiệm người dùng mượt mà.
    - Thực hiện tính năng tương tác thời gian thực
- Hoàng Hùng Mạnh (backend)
    - Phân quyền
        - Đăng ký, đăng nhập và quản lý thông tin người dùng.
        - Kiểm soát quyền truy cập dựa trên vai trò của người dùng.
    - Chức năng cho trưởng điểm tại điểm giao dịch
        - Quản lý tài khoản của nhân viên giao dịch
        - Thống kê hàng gửi, hàng nhận tại điểm giao dịch.
        - Xem được đóng góp của các nhân viên trong điểm giao dịch
    - Chức năng cho giao dịch viên tại điểm giao dịch
        - Ghi nhận hàng cần gửi của khách (người gửi), in giấy biên nhận chuyển phát và phát cho khách hàng
        - Tạo đơn chuyển hàng gửi đến điểm tập kết trước khi đem hàng gửi đến điểm tập kết.
        - Xác nhận hàng về từ điểm tập kết.
        - Tạo đơn hàng cần chuyển đến tay người nhận.
        - Xác nhận hàng đã chuyển đến tay người nhận theo .
        - Xác nhận hàng không chuyển được đến người nhận và trả lại điểm giao dịch.
        - Thống kê các hàng đã chuyển thành công, các hàng chuyển không thành công và trả lại điểm giao dịch.
        - Xem được độ đóng góp của mình so với những người khác trong điểm giao dịch
    - Chức năng cho khách hàng
        - Tra cứu trạng thái và tiến trình chuyển phát của kiện hàng mình gửi.
- Phan Anh Đức (backend)
    - Thiết kế database
    - Tạo dữ liệu giả 1000 data
    - Tối ưu hóa query để truy vấn nhanh
    - Chức năng cho lãnh đạo công ty
        - Theo dõi được các đơn hàng ra vào của từng điểm giao dịch, điểm tập kết, làm biểu đồ thống kê dễ nhìn
        - Tạo, thêm sửa xóa các tài khoản của các trưởng điểm tập kết, giao dịch
        - Quản lý được các điểm giao dịch tập kết
    - Chức năng cho nhân viên tại điểm tập kết
        - Xác nhận đơn hàng đi từ điểm giao dịch khác chuyển đến.
        - Tạo đơn chuyển hàng đến điểm tập kết đích (điểm giao dịch phụ trách vùng ứng với địa chỉ của người nhận)
        - Xác nhận đơn hàng nhận về từ điểm tập kết khác.
        - Tạo đơn chuyển hàng đến điểm giao dịch đích.
        - Thống kê độ đóng góp của mình so với những người khác trong điểm tập kết
        - Thống kê số đơn hàng đến và đi do nhân viên đó phụ trách
    - Chức năng cho trưởng điểm tại điểm tập kết
        - Quản lý tài khoản của nhân viên tập kết
        - Thống kê hàng gửi, hàng nhận tại điểm tập kết
        - Xem được đóng góp của các nhân viên trong điểm tập kết
