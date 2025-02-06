import { motion } from "framer-motion";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";


interface CategoryData  {
    category: string;
    percentage: number;
}

interface CategoryListProps {
    categories: CategoryData[];
}


const COLORS = ["#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart: React.FC<CategoryListProps> = ({ categories }) => {
    console.log(categories)
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Category Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categories}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="percentage"
              label={({ category, percent }: { category: string; percent: number }) => `${category} ${(percent * 100).toFixed(0)}%`}
            >
              {categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend 
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                payload={categories.map((category, index) => ({
                  value: category.category, // Aquí está la categoría que se mostrará
                  type: 'circle',
                  color: COLORS[index % COLORS.length],
                }))}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
