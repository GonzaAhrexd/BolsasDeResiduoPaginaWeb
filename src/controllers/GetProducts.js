
const Product = require("../models/productos");

const getProducts = async (req, res) => {
  const products = await Product.find();

  if (products) {
    res.json({ products });
  } else {
    res.json({ mensaje: "No hay productos" });
  }
};

module.exports = getProducts;
