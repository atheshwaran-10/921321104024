import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const access_token = process.env.ACCESS_TOKEN;

interface Product {
  id?: string;
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availability: string;
  company: string;
  category: string;
}

interface SortByArray {
  price: Number;
  rating: Number;
  discount: Number;
}

let allProducts: Product[] = [];
const categories = [
  "Phone",
  "Computer",
  "TV",
  "Earphone",
  "Tablet",
  "Charger",
  "Mouse",
  "Keypad",
  "Bluetooth",
  "Pendrive",
  "Remote",
  "Speaker",
  "Headset",
  "Laptop",
  "PC",
];


const generateId = (index: number): string => {
  return `product_${index}`;
};

const addIdsToProducts = (products: Product[]): Product[] => {
  return products.map((product, index) => ({
    ...product,
    id: generateId(index),
    category:"",
    company:""
  }));
};


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



const getProducts = async (company: string, categoryName:string) => {
  try {
    const token = access_token;
    const url = `http://20.244.56.144/test/companies/${company}/categories/${categoryName}/products?top=10&minPrice=1&maxPrice=10000`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${company} products:`, error);
    return [];
  }
};
const fetchAndStoreProducts = async (categories: string[]) => {
  const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

  for (const category of categories) {
    for (const company of companies) {
      const companyProducts = await getProducts(company, category);
      const productsWithAttributes =
        addIdsToProducts(companyProducts);
      allProducts = [
        ...allProducts,
        ...productsWithAttributes.map((product) => ({
          ...product,
          company,
          category,
        })),
      ];
    }
  }

  console.log("All products fetched and stored");
};

fetchAndStoreProducts(categories);

app.get("/products", (req, res) => {
  res.send(allProducts);
});

app.get("/categories/:categoryname/products", async (req, res) => {
  const { categoryname } = req.params;
  let { n, sortBy, order, page, company } = req.query;
  if (!n) res.send("Number of products is required");

  let numberOfProducts = Number(n);
  let sortByArray: SortByArray[] = [];
  let sortedOrder = "asc";

  if (sortBy) {
    const sortedString = sortBy as string;
    sortByArray = sortedString.split(",") as unknown as SortByArray[];
  }

  if (order) sortedOrder = order as string;

  let retrievedProducts = allProducts.filter(
    (product) => product.category === categoryname
  );

   if (company) {
     retrievedProducts = retrievedProducts.filter(
       (product) => product.company === company
     );
   }


  let currentPage = 1;
  if (page) currentPage = Number(page);

  const start = (currentPage - 1) * numberOfProducts;
  const endIndex = currentPage * numberOfProducts;

  const sortedProducts = sortProducts(
    retrievedProducts,
    sortByArray,
    sortedOrder
  );
  const paginatedProducts = sortedProducts.slice(start, endIndex);
  res.send(paginatedProducts);
  
});

app.get("/categories/:categoryname/products/:productid", (req, res) => {
  const { productid } = req.params;
  const product = allProducts.find((p) => p.id === productid);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send("Product not found");
  }
});

app.listen(4000, function () {
  console.log("Server started on port 4000");
});
