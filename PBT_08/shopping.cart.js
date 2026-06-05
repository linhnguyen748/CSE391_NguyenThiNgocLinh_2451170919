function createCart() {
    let items = [];
    let discountPercent = 0;
    let discountFixed = 0;
    let discountCode = "";

    return {

        // Thêm sản phẩm
        addItem(product, quantity = 1) {
            const existing = items.find(item => item.id === product.id);

            if (existing) {
                existing.quantity += quantity;
                console.log(`Đã tăng số lượng ${product.name} lên ${existing.quantity}`);
            } else {
                items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                });

                console.log(`Đã thêm ${product.name} vào giỏ`);
            }
        },

        // Xóa sản phẩm
        removeItem(productId) {
            const before = items.length;

            items = items.filter(item => item.id !== productId);

            if (items.length < before) {
                console.log(`Đã xóa sản phẩm id=${productId}`);
            } else {
                console.log("Không tìm thấy sản phẩm");
            }
        },

        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);

            if (!item) {
                console.log("Không tìm thấy sản phẩm");
                return;
            }

            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                console.log(`Đã cập nhật ${item.name}: ${newQuantity}`);
            }
        },

        // Áp dụng mã giảm giá
        applyDiscount(code) {
            discountPercent = 0;
            discountFixed = 0;
            discountCode = "";

            if (code === "SALE10") {
                discountPercent = 10;
                discountCode = code;
                console.log("Giảm 10%");
            } else if (code === "SALE20") {
                discountPercent = 20;
                discountCode = code;
                console.log("Giảm 20%");
            } else if (code === "FREESHIP") {
                discountFixed = 30000;
                discountCode = code;
                console.log("Giảm 30.000đ");
            } else {
                console.log("Mã không hợp lệ");
            }
        },

        // Tính tổng tiền
        getTotal() {
            let total = items.reduce((sum, item) => {
                return sum + item.price * item.quantity;
            }, 0);

            total -= total * (discountPercent / 100);
            total -= discountFixed;

            if (total < 0) total = 0;

            return total;
        },

        // Tổng số lượng SP
        getItemCount() {
            return items.reduce((sum, item) => {
                return sum + item.quantity;
            }, 0);
        },

        // In giỏ hàng
        printCart() {
            if (items.length === 0) {
                console.log("Giỏ hàng trống");
                return;
            }

            console.log("\n===== GIỎ HÀNG =====");

            items.forEach((item, index) => {
                const total = item.price * item.quantity;

                console.log(
                    `${index + 1}. ${item.name} | ` +
                    `SL: ${item.quantity} | ` +
                    `Đơn giá: ${item.price.toLocaleString("vi-VN")}đ | ` +
                    `Tổng: ${total.toLocaleString("vi-VN")}đ`
                );
            });

            if (discountCode !== "") {
                console.log(`Mã giảm giá: ${discountCode}`);
            }

            console.log(
                `Tổng cộng: ${this.getTotal().toLocaleString("vi-VN")}đ`
            );
        },

        // Xóa toàn bộ giỏ hàng
        clearCart() {
            items = [];
            discountPercent = 0;
            discountFixed = 0;
            discountCode = "";

            console.log("Đã xóa toàn bộ giỏ hàng");
        }
    };
}


//TEST

const cart = createCart();

cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);

cart.addItem(
    { id: 2, name: "AirPods Pro", price: 6990000 },
    2
);

cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);

cart.printCart();

cart.applyDiscount("SALE10");

cart.printCart();

console.log("Tổng số sản phẩm:", cart.getItemCount());

cart.updateQuantity(1, 3);

cart.printCart();

cart.removeItem(2);

cart.printCart();

cart.clearCart();

cart.printCart();