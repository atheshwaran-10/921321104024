import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

interface Product {
  name: string;
  price: Number;
  rating: Number;
  discount: Number;
  availability: string;
}

interface SortByArray {
  price: Number;
  rating: Number;
  discount: Number;
}



const products: Product[] = [
  {
    name: "Laptop 1",
    price: 999.99,
    rating: 4.5,
    discount: 10,
    availability: "yes",
  },
  {
    name: "Laptop 2",
    price: 599.99,
    rating: 4.2,
    discount: 5,
    availability: "out-of-stock",
  },
  {
    name: "Laptop 3",
    price: 99.99,
    rating: 4.0,
    discount: 2000,
    availability: "yes",
  },
  {
    name: "Laptop 4",
    price: 99.99,
    rating: 4.1,
    discount: 15,
    availability: "yes",
  },
  {
    name: "Laptop 5",
    price: 299.99,
    rating: 4.3,
    discount: 12,
    availability: "yes",
  },
  {
    name: "Laptop 6",
    price: 499.99,
    rating: 4.6,
    discount: 8,
    availability: "yes",
  },
  {
    name: "Laptop 7",
    price: 149.99,
    rating: 4.1,
    discount: 18,
    availability: "yes",
  },
  {
    name: "Laptop 8",
    price: 79.99,
    rating: 4.4,
    discount: 25,
    availability: "yes",
  },
  {
    name: "Laptop 9",
    price: 399.99,
    rating: 4.8,
    discount: 7,
    availability: "out-of-stock",
  },
  {
    name: "Laptop 10",
    price: 129.99,
    rating: 4.2,
    discount: 15,
    availability: "yes",
  },
];

const sortProducts = (
  products: Product[],
  sortBy: SortByArray[],
  order: string
) => {
  return products.sort((a, b) => {
    for (let sort of sortBy) {
      const prop = sort as unknown as keyof Product;
      if (a[prop] !== b[prop]) {
        if (order === "asc") {
          return Number(a[prop]) - Number(b[prop]);
        } else {
          return Number(b[prop]) - Number(a[prop]);
        }
      }
    }
    return 0;
  });
};

app.get("/categories/:categoryname/products", async (req, res) => {
  const { categoryname } = req.params;
  let { n, sortBy, order,page } = req.query;
  if (!n) res.send("Number of products is required");

  let numberOfProducts = Number(n);
  let sortByArray: SortByArray[] = [];
  let sortedOrder="asc";

  if(sortBy)
  {
    const sortedString = sortBy as string;
    sortByArray=sortedString.split(",") as unknown as SortByArray[]
  }

  if(order)
      sortedOrder=order as string;

  let retrievedProducts = products;
  let currentPage = 1;
  if(page)
      currentPage=Number(page);

  const start = (currentPage - 1) * numberOfProducts;
  const endIndex = currentPage * numberOfProducts;

  const sortedProducts = sortProducts(retrievedProducts, sortByArray, sortedOrder);
  const paginatedProducts = sortedProducts.slice(start, endIndex);
  res.send(paginatedProducts)

});

app.post("/", async (req, res) => {});

app.listen(4000, function () {
  console.log("Server started on port 4000");
});
