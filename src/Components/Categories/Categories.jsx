import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

export default function Categories() {
  const [AllCategories, setAllCategories] = useState(null);
  const [SubCategories, setSubCategories] = useState({});

  async function getCategories() {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setAllCategories(response.data.data);

      // Fetch subcategories for each category
      const subCatObj = {};
      await Promise.all(
        response.data.data.map(async (category) => {
          try {
            const subRes = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${category._id}/subcategories`);
            subCatObj[category._id] = subRes.data.data;
          } catch {
            subCatObj[category._id] = [];
          }
        })
      );
      setSubCategories(subCatObj);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setAllCategories([]);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (!AllCategories) {
    return (
      <div className="d-flex bg-light text-white justify-content-center align-items-center vh-100">
        <HashLoader color='#999' size={60} />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Categories</h2>
      <div className="row g-4">
        {AllCategories.map(category => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={category._id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={category.image}
                className="card-img-top"
                alt={category.name}
                style={{ height: 180, objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-center">{category.name}</h5>
                <p className="card-text text-center text-muted small mb-0">
                  {(SubCategories[category._id] || []).map(subCategory => (
                    <span key={subCategory._id} className="badge bg-secondary me-1">
                      {subCategory.name}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}