import dbConnect from "./mongodb"; // Your MongoDB connection function
import Product from "../api/models/product"; // Your product model

const renameImageField = async () => {
  try {
    await dbConnect();

    const result = await Product.updateMany(
      {},
      { $rename: { "image": "imageUrl" } }
    );

    console.log("Renamed image field to imageUrl in all products:", result.modifiedCount);
  } catch (error) {
    console.error("Error renaming field:", error);
  }
};

renameImageField();
