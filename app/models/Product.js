class Product {
  constructor(
    id,
    name,
    thumbnail,
    size,
    quantity,
    retailPrice,
    wholeSalePrice,
    category
  ) {
    this.id = id;
    this.name = name;
    this.thumbnail = thumbnail;
    this.size = size;
    this.quantity = quantity;
    this.retailPrice = retailPrice;
    this.wholeSalePrice = wholeSalePrice;
    this.category = category;
  }

  // You can add methods here if needed, for example:
  getProfit() {
    return this.retailPrice - this.wholeSalePrice;
  }

  updateQuantity(newQuantity) {
    this.quantity = newQuantity;
  }

  // Add more methods as needed
}

export default Product;
