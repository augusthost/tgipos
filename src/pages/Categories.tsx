import { motion } from "framer-motion";
import { PlusCircle, Edit, Trash } from "lucide-react";
import { getImageUrl } from "@/lib/helper";
import { useFetchCategories } from "@/services/categoryService";

const Categories = () => {
  const { data: categories, isLoading, error } = useFetchCategories();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Categories</h1>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center px-4 py-2 bg-secondary text-white rounded-lg btn-hover"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Category
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <div className="h-32 w-full overflow-hidden">
              <img
                src={getImageUrl(category.image)}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            <div className="p-4 flex items-center justify-between">
              <h3 className="font-medium">{category.name}</h3>

              <div className="flex space-x-2">
                <button className="p-1.5 rounded-lg text-secondary hover:bg-secondary/10 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
