const mongoose = require("mongoose");

const Product = mongoose.model("Product");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const products = await Product.paginate({}, { page, limit: 10 }).catch(r =>
      res.send(r.message)
    );

    return res.json(products);
  },

  async show(req, res) {
    const product = await Product.findById(req.params.id).catch(r =>
      res.send("Produto não encontrado.")
    );

    return res.json(product);
  },

  async store(req, res) {
    const product = await Product.create(req.body).catch(r =>
      res.send(r.message)
    );

    return res.json(product);
  },

  async update(req, res) {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).catch(r => res.send(r.message));

    return res.json(product);
  },

  async destroy(req, res) {
    await Product.findByIdAndRemove(req.params.id).catch(r =>
      res.send("Produto não encontrado")
    );

    return res.send("Produto deletado com sucesso!");
  }
};
