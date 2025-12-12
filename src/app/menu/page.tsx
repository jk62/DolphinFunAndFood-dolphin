"use client";

import React from "react";
import Image from "next/image";

import dolphinLogo from "./public/dolphin-logo.jpg";

type MenuItem = {
  name: string;
  price: string;
};

type MenuSection = {
  category: string;
  items: MenuItem[];
};

const menuData: MenuSection[] = [
  {
    category: "Sunrise Selections",
    items: [
      { name: "Tea", price: "30" },
      { name: "Masala Tea", price: "40" },
      { name: "Coffee", price: "75" },
      // Add all other items from the menu images you uploaded
    ],
  },
  // Add all other categories here...
];

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#0066CC] py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <Image
            src={dolphinLogo}
            alt="Dolphin Fun & Food Logo"
            width={150}
            height={150}
          />
          <h1 className="text-5xl font-bold mt-4">Our Menu</h1>
        </div>
        <div className="space-y-16">
          {menuData.map((section) => (
            <section
              key={section.category}
              className="bg-white text-gray-900 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-6 text-center">
                {section.category}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between border-b pb-2"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-700">{item.price}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // src/app/menu/page.tsx
// "use client";

// import React from "react";

// type MenuItem = {
//   name: string;
//   description: string;
//   price: string;
// };

// type MenuSection = {
//   category: string;
//   items: MenuItem[];
// };

// const menuData: MenuSection[] = [
//   {
//     category: "Starters",
//     items: [
//       {
//         name: "Spring Rolls",
//         description: "Crispy rolls stuffed with veggies",
//         price: "₹150",
//       },
//       {
//         name: "Paneer Tikka",
//         description: "Grilled cottage cheese cubes",
//         price: "₹200",
//       },
//     ],
//   },
//   {
//     category: "Main Course",
//     items: [
//       {
//         name: "Paneer Butter Masala",
//         description: "Cottage cheese in a rich tomato gravy",
//         price: "₹250",
//       },
//       {
//         name: "Veg Biryani",
//         description: "Aromatic basmati rice with mixed vegetables",
//         price: "₹300",
//       },
//     ],
//   },
//   // Add more categories and items as needed based on the Google menu
// ];

// export default function MenuPage() {
//   return (
//     <main className="min-h-screen bg-white py-10">
//       <div className="container mx-auto px-4">
//         <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
//         {menuData.map((section) => (
//           <section key={section.category} className="mb-8">
//             <h2 className="text-2xl font-semibold mb-4">{section.category}</h2>
//             <ul>
//               {section.items.map((item) => (
//                 <li key={item.name} className="mb-4 border-b pb-2">
//                   <div className="flex justify-between">
//                     <span className="font-medium text-lg">{item.name}</span>
//                     <span className="text-gray-600">{item.price}</span>
//                   </div>
//                   <p className="text-sm text-gray-500">{item.description}</p>
//                 </li>
//               ))}
//             </ul>
//           </section>
//         ))}
//       </div>
//     </main>
//   );
// }
