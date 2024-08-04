import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Detail.css";
import { useParams } from "react-router-dom";
import ScrollToTop from "../components/ScrolltoTop";

export default function Detail() {
  const { cuisineId } = useParams();
  const [cuisine, setCuisine] = useState({});
  const [loading, setLoading] = useState(true); // Tambahkan state loading
  const [error, setError] = useState(null); // Tambahkan state error

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading true sebelum fetch data
      try {
        const response = await axios.get(
          `http://localhost:3000/pub/cuisines/${cuisineId}`
        );
        setCuisine(response.data);
        setLoading(false); // Set loading false setelah data berhasil diambil
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading false jika terjadi error
      }
    };
    fetchData();
  }, [cuisineId]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="detail-container">
        <div className="detail-image-container">
          <img
            src={cuisine.imgUrl}
            alt={cuisine.name}
            className="detail-image"
          />
        </div>
        <div className="detail-info">
          <h1>{cuisine.name}</h1>
          <div>
            <button>{cuisine.Category?.name}</button>
          </div>
          <p>{cuisine.description}</p>
          <div className="price">
            <h2>{formatRupiah(cuisine.price)}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
