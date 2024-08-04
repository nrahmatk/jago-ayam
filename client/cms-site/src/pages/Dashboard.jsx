import React, { useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";

export default function Dashboard() {
  const [data, setData] = useState({
    totalCuisines: 0,
    totalCategories: 0,
    totalUsers: 0,
    updates: "Loading updates...",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/cuisines/count", {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        setData({
          totalCuisines: response.data.totalCuisines,
          totalCategories: response.data.totalCategories,
          totalUsers: response.data.totalUsers,
          updates: "Latest information updates go here...", // Ganti dengan data dari response jika ada
        });
        setLoading(false);
      } catch (error) {
        console.log(error)
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;



  return (
    <>
      <div className="content-title">
        <h2>Dashboard</h2>
      </div>
      <div className="dashboard-card">
        <div className="card">
          <h3>Total Cuisines</h3>
          <p>{data.totalCuisines}</p>
        </div>
        <div className="card">
          <h3>Total Categories</h3>
          <p>{data.totalCategories}</p>
        </div>
        <div className="card">
          <h3>Total Users</h3>
          <p>{data.totalUsers}</p>
        </div>
        <div className="card">
          <h3>Updates</h3>
          <p>Latest information updates go here...</p>
        </div>
      </div>
    </>
  );
}
