Câu A1
1. Static
- Vẫn chiếm chỗ trong flow : Có
- Tham chiếu vị trí: Không dùng top/left/right/bottom
- Cuộn theo trang: Có
- Usecase: Mặc định
2. Relative
- Vẫn chiếm chỗ trong flow : Có
- Tham chiếu vị trí: Vị trí gốc của nó
- Cuộn theo trang: Có
- Usecase: Dịch nhẹ element hoặc làm mốc tạo độ cho absolute con
3. Absolute
- Vẫn chiếm chỗ trong flow : Không
- Tham chiếu vị trí: Gần phần tử cha không phải là static nhất
- Cuộn theo trang: Có
- Usecase: Badge, dropdown, tooltip, overlay
4. Fixed
- Vẫn chiếm chỗ trong flow : Không
- Tham chiếu vị trí: viewport
- Cuộn theo trang: Không
- Usecase: Chatbutton, sticky navbar, modal overlay
1. Sticky
- Vẫn chiếm chỗ trong flow : chiếm chỗ đến khi chạm ngưỡng
- Tham chiếu vị trí: viewport khi đã chạm ngưỡng
- Cuộn theo trang: Khi đã chạm ngưỡng
- Usecase: Sticky header, sticky sidebar

- Absolute tham chiếu body khi tất cả cha đều là static và tham chiếu parent khi cha gần nhất không phải là static.

- Nearest positioned ancestor: phần tử cha gần nhất có position khác static.

Câu A2
1. Trường hợp 1:
- Bố cục: 4 cột đều nhau cùng hàng.
```
[  Item 1  ][  Item 2  ][  Item 3  ][  Item 4  ]
```
2. Trường hợp 2:
- Bố cục: 3 hàng, 2 cột. mỗi hàng có 2 item(width + margin = 50% mỗi item).
```
[  Item 1  ][  Item 2  ]
[  Item 3  ][  Item 4  ]
[  Item 5  ][  Item 6  ]
```
3. Trường hợp 3:
- Bố cục: item 1 sát trái, item 2 ở giữa, item 3 sát phải
```
[  Item 1  ]       [  Item 2  ]       [  Item 3  ]
```
4. Trường hợp 4:
- Bố cục: 3 cột trên 1 hàng. Cột 1 = 200px cố định, Cột 2 = linh hoạt (chiếm phần còn lại), Cột 3 = 200px cố định, giữa các item có gap 20px.
```
[200px]   [    1fr (co giãn)    ]   [200px]
```
5. Trường hợp 5:
- Bố cục: 3 hàng, hàng 1 hàng 2 đầy 3 item, hàng 3 chỉ có 1 item và 2 ô còn lại trống,các item có gap 10px.
```
[ Item 1 ]  [ Item 2 ]  [ Item 3 ]
[ Item 4 ]  [ Item 5 ]  [ Item 6 ]
[ Item 7 ]  [        ]  [        ]
```

Câu C1
1. Navigation bar ngang (logo,menu,buttons): dùng Flexbox vì navbar là layout 1 chiều (ngang). Flexbox với justify-content: space-between và align-items: center sẽ giúp phân bố đều cái item và căn dọc.
2. Lưới ảnh Instagram 3 cột đều nhau, số ảnh không biết trước: dùng Grid vì đây là layout 2 chiều (hàng + cột). grid-template-columns: repeat(3, 1fr) tự động tạo hàng mới khi cần. Flexbox cũng làm được nhưng Grid kiểm soát 2 chiều tốt hơn.
3. Layout blog gồm main content và sidebar: dùng Grid vì đây là page-level layout với 2 vùng lớn. grid-template-columns: 1fr 300px tạo 1fr và 1 sidebar 300px. Khi responsive chỉ cần thay grid-template-columns: 1fr sidebar tự động xuống hàng.
4.Footer với 4 cột thông tin: dùng cả 2 đều được Grid: grid-template-columns: repeat(4, 1fr) — 4 cột đều nhau, dễ responsive. Flexbox: display: flex; flex-wrap: wrap
5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy: dùng Flexbox (column direction)
Card là layout 1 chiều dọc. Dùng display: flex; flex-direction: column cho card, sau đó margin-top: auto trên nút → nút tự "đẩy" xuống đáy.

Câu C2
1. Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
- Nguyên nhân: .card không dùng Flexbox column, nên chiều cao mỗi card phụ thuộc vào content bên trong (ảnh, tiêu đề dài/ngắn, mô tả...). Nút "Mua" không được "ghim" xuống đáy.

```css
.card-container { display: flex; flex-wrap: wrap; }
.card {
  width: 30%;
  margin: 1.5%;
  display: flex;
  flex-direction: column;
}
.card img { width: 100%; height: 200px; object-fit: cover;}
.card h3 { font-size: 18px; }
.card .btn {
  padding: 10px;
  margin-top: auto;
}
```

2. Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên
- Nguyên nhân: Thiếu justify-content: center và align-items: center. display: flex mặc định là justify-content: flex-start và align-items: stretch.

```css
.hero {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hero-content {
  text-align: center;
}
```

3. Lỗi 3: Sidebar bị co lại khi content quá dài
- Nguyên nhân: Khi dùng display: flex các phần tử bên trong sẽ thành flex item và có thuộc tính mặc định là flex-shrink: 1 (tự động thu nhỏ nếu container không đủ chỗ). Khi .content chứa nội dung quá dài flexbox phải chia lại không gian như là thu nhỏ sidebar.

```css
.layout { display: flex; background-color: yellowgreen;}
.sidebar {
  width: 250px;
  flex-shrink: 0;
  background-color: aquamarine;
}
.content { flex: 1; background-color: chartreuse;}
```