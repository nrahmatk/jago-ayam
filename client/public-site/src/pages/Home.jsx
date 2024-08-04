import Navbar from "../components/Navbar";
import BannerHero from "../components/BannerHero";
import Card from "../components/Card";
import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BrandDiscovery from "../components/BrandDiscovery";
import { useRef } from "react";

export default function Home() {
  const [cuisines, setCuisines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/pub/cuisines?page=${currentPage}&size=9&search=${search}&filter=${filter}&sort=${sort}`
        );

        const dataCategories = await axios.get(
          "http://localhost:3000/categories"
        );
        setCuisines(response.data.data);
        setTotalPages(response.data.totalPage);
        setCategories(dataCategories.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, search, filter, sort]); 

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToContainer();
  };

  const handleSort = () => {
    setSort(sort === "DESC" ? "ASC" : "DESC");
  };

  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };

  const handleFilter = (e) => {
    setCurrentPage(1);
    setFilter(e.target.value);
  };

  const scrollToContainer = () => {
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
      <Navbar />
      <BannerHero scrollToContainer={scrollToContainer} />
      <div className="scroll-menu" ref={containerRef}></div>
      <div className="container-cuisine">
        <div className="grid">
          <h1 className="grid-title">Menu kami</h1>
          <div className="grid-description">
            Siap memanjakan lidahmu dengan berbagai jenis kuliner berkualitas
          </div>
          <div className="custom-page">
            <div className="custom-item">
              <button className="custom-sort" onClick={handleSort}>
                Urutkan dari yang {sort === "DESC" ? "terlama" : "terbaru"}
              </button>
            </div>
            <div className="custom-item">
              <select
                className="custom-select"
                value={filter}
                onChange={handleFilter}
              >
                <option value="">Pilih kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="custom-item">
              <input
                className="custom-search"
                name="search"
                type="text"
                placeholder="Cari menu ..."
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="grid-item">
            {cuisines.map((cuisine) => (
              <Card key={cuisine.id} cuisine={cuisine} />
            ))}
          </div>
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={pageNumber === currentPage ? "active" : ""}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
      <BrandDiscovery />
    </>
  );
}
