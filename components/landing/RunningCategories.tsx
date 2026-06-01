import { Music, Palette, Trophy, Users, Lightbulb } from "lucide-react";

export const RunningCategories = () => {
  return (
    <div className="overflow-hidden border-b-5 bg-lime flex">
      <ul className="flex gap-10 p-4 text-md lg:text-xl font-grotesk uppercase font-bold animate-[infinite-scroll_10s_linear_infinite] whitespace-nowrap">
        {categories.concat(categories).map((category, index) => {
          return (
            <li className="flex gap-2 items-center" key={index}>
              <category.icon />
              <p>{category.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const categories = [
  { name: "Konser Musil", icon: Music },
  { name: "Teater dan Kesenian", icon: Palette },
  { name: "Acara Olahraga", icon: Trophy },
  { name: "Acara Komunitas", icon: Users },
  { name: "Pertemuan Kreatif", icon: Lightbulb },
];
