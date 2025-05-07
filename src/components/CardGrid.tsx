import { Card } from "antd";
import { Link } from "react-router-dom";

const cardData = [
  {
    id: 1,
    name: "Али",
    date: "01.01.2025",
    content: "This is card one.",
    price: "₸1,200",
  },
  {
    id: 2,
    name: "Жанна",
    date: "02.01.2025",
    content: "This is card two.",
    price: "₸1,200",
  },
  {
    id: 3,
    name: "Мерей",
    date: "03.01.2025",
    content: "This is card three.",
    price: "₸1,200",
  },
  {
    id: 4,
    name: "Нариман",
    date: "04.01.2025",
    content: "This is card four.",
    price: "₸1,200",
  },
  {
    id: 5,
    name: "Алина",
    date: "05.01.2025",
    content: "This is card five.",
    price: "₸1,200",
  },
  {
    id: 6,
    name: "Марат",
    date: "06.01.2025",
    content: "This is card six.",
    price: "₸1,200",
  },
  {
    id: 7,
    name: "Бексултан",
    date: "06.01.2025",
    content: "This is card seven.",
    price: "₸1,200",
  },
  {
    id: 8,
    name: "Рахат",
    date: "06.01.2025",
    content: "This is card eight.",
    price: "₸1,200",
  },
  {
    id: 9,
    name: "Ансар",
    date: "06.01.2025",
    content: "This is card nine.",
    price: "₸1,200",
  },
];
const CardGrid = () => {
  return (
    <div className="max-h-[520px] overflow-y-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cardData.map((card) => (
          <Link to="/sales_item">
            <Card
              key={card.id}
              className="h-60 shadow-md rounded-xl border border-gray-200"
              headStyle={{
                backgroundColor: "#335C67",
                padding: "12px 20px",
              }}
              title={
                <div className="flex justify-between items-center text-base font-semibold text-white">
                  <span>{card.name}</span>
                  <span>{card.date}</span>
                </div>
              }
            >
              <p>{card.content}</p>
              <div className="absolute bottom-4 right-4 text-sm font-bold text-black">
                Цена: {card.price}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
