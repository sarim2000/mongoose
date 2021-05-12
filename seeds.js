const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
	.connect("mongodb://localhost:27017/farmStand", { useNewUrlParser: true })
	.then(() => {
		console.log("Mongo connection open");
	})
	.catch((err) => {
		console.log("No, error!!");
		console.log(err);
	});

// const p = new Product({
// 	name: "Ruby Grapefruit",
// 	price: 1.99,
// 	category: "fruit",
// });
// p.save()
// 	.then((p) => {
// 		console.log(p);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});
const SeedProducts = [
	{
		name: "Fairy Eggplant",
		price: 1.0,
		category: "vegetable",
	},
	{
		name: "Melon",
		price: 3.0,
		category: "fruit",
	},
	{
		name: "Apple",
		price: 5.6,
		category: "fruit",
	},
	{
		name: "Brinjal",
		price: 10.99,
		category: "vegetable",
	},
	{
		name: "Milk",
		price: 100.0,
		category: "dairy",
	},
];

Product.insertMany(SeedProducts)
	.then((res) => {
		console.log(res);
	})
	.catch((e) => {
		console.log(e);
	});
