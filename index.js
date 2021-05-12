const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");
const { urlencoded } = require("express");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

mongoose
	.connect("mongodb://localhost:27017/farmStand", { useNewUrlParser: true })
	.then(() => {
		console.log("Mongo connection open");
	})
	.catch((err) => {
		console.log("No, error!!");
		console.log(err);
	});

app.set("views", path.join(__dirname));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/products/new", (req, res) => {
	res.render("views/products/new.ejs");
});

app.post("/products", async (req, res) => {
	const newProduct = new Product(req.body);
	await newProduct.save();
	res.redirect(`/products/${newProduct.id}`);
});

app.get("/products", async (req, res) => {
	const { category } = req.query;
	console.log(category);
	if (category) {
		const prod = await Product.find({ category: category });
		res.render("views/products/index.ejs", { prod });
	} else {
		const prod = await Product.find({});
		res.render("views/products/index.ejs", { prod });
	}
});

app.get("/products/:id/edit", async (req, res) => {
	const { id } = req.params;
	const prod = await Product.findById(id);
	res.render("views/products/edit.ejs", { prod });
});

app.put("/products/:id", async (req, res) => {
	const { id } = req.params;
	// console.log(id);
	const prod = await Product.findByIdAndUpdate(id, req.body, {
		runValidators: true,
		new: true,
	});
	// console.log(id);
	res.redirect(`${prod.id}`);
});

app.delete("/products/:id", async (req, res) => {
	const { id } = req.params;
	// console.log(id);
	await Product.findByIdAndDelete(id);
	res.redirect("/products");
});

app.get("/products/:id", async (req, res) => {
	const { id } = req.params;
	const p = await Product.findById(id);
	// console.log(p);
	res.render("views/products/show.ejs", { p });
});

app.listen(3000, () => {
	console.log("Listening");
});
