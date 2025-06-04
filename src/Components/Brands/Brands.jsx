import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners';

export default function Brands() {
    // This component will display a list of brands
    const [AllBrands, setAllBrands] = useState(null)

    async function getBrands() {
        // This function will fetch brands from the API
        // You can implement the API call here
        await axios.get('https://ecommerce.routemisr.com/api/v1/brands').then(response => {
            console.log("Brands fetched successfully:", response.data);
            setAllBrands(response.data.data);
        }
        ).catch(error => {
            console.error("Error fetching brands:", error);
        });

    }

    useEffect(() => {
        getBrands();
    }, [])

    if (!AllBrands) {
        return <div className="d-flex bg-light text-white justify-content-center align-items-center vh-100">
            <HashLoader color='#999' size={60} />
        </div>
    }
  return (
    <>
    
        <div className="container py-5">
      <h2 className="mb-4 text-center">Brands</h2>
      <div className="row g-4">
        {AllBrands.map(brand => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={brand._id}>
            <div className="card h-100 shadow-sm border-0 text-center">
              <img
                src={brand.image}
                className="card-img-top p-4"
                alt={brand.name}
                style={{ height: 180, objectFit: "contain", background: "#f8f9fa" }}
              />
              <div className="card-body">
                <h5 className="card-title">{brand.name}</h5>
                <p className="card-text text-muted small mb-0">{brand.slug}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
