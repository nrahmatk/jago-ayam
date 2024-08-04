import { Link } from 'react-router-dom';
import "./Card.css";

export default function Card({ cuisine }) {
  return (
    <div className="grid-item-row">
    <div className="card">
    <Link to={`/cuisine/${cuisine.id}`}>
      <img src={cuisine.imgUrl} className="card-img" alt={cuisine.name} />
      </Link>
      <div className="card-content">
        <p className="card-title">{cuisine.name}</p>
        <p className="card-desc"> {cuisine.description}</p>
      </div>
    </div>
    </div>
  );
}
