'use client';

import { useState, useEffect } from 'react';

interface Plant {
  id: number;
  common_name: string;
  scientific_name: string[];
  cycle: string;
  watering: string;
  sunlight: string[];
}

export default function ExplorePage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const API_KEY = 'sk-yb0F691aaad11914b13516';

  // jika api gagal, akan muncul dummy plant
  const mockPlants: Plant[] = [
    {
      id: 1,
      common_name: "Snake Plant",
      scientific_name: ["Dracaena trifasciata"],
      cycle: "Perennial",
      watering: "Minimum",
      sunlight: ["Part shade"]
    },
    {
      id: 2,
      common_name: "Peace Lily", 
      scientific_name: ["Spathiphyllum wallisii"],
      cycle: "Perennial",
      watering: "Frequent",
      sunlight: ["Part shade"]
    },
    {
      id: 3,
      common_name: "Spider Plant",
      scientific_name: ["Chlorophytum comosum"],
      cycle: "Perennial", 
      watering: "Average",
      sunlight: ["Full sun"]
    }
  ];

  const fetchPlants = async (pageNum: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://perenual.com/api/species-list?key=${API_KEY}&page=${pageNum}`
      );
      
      if (response.ok) {
        const data = await response.json();
        
        const processedPlants = (data.data || []).slice(0, 6).map((plant: any) => ({
          id: plant.id || Date.now() + Math.random(),
          common_name: plant.common_name || `Plant ${plant.id || 'Unknown'}`,
          scientific_name: plant.scientific_name || ['Unknown Species'],
          cycle: plant.cycle || 'Unknown',
          watering: plant.watering || 'Average',
          sunlight: plant.sunlight || ['Not specified']
        }));
        
        setPlants(processedPlants.length > 0 ? processedPlants : mockPlants);
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      setPlants(mockPlants);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants(page);
  }, [page]);

  const addToMyPlants = (plant: Plant) => {
    const userPlant = {
      id: Date.now().toString(),
      name: plant.common_name,
      type: plant.cycle,
      lastWatered: new Date().toISOString().split('T')[0],
      wateringSchedule: getWateringSchedule(plant.watering),
      careNotes: [
        `Scientific name: ${plant.scientific_name[0]}`,
        `Type: ${plant.cycle}`,
        `Watering: ${plant.watering}`,
        `Sunlight: ${plant.sunlight.join(', ')}`
      ]
    };

    const existingPlants = JSON.parse(localStorage.getItem('plants') || '[]');
    const updatedPlants = [...existingPlants, userPlant];
    localStorage.setItem('plants', JSON.stringify(updatedPlants));
    
    alert(`✅ ${plant.common_name} added to collection!`);
  };

  const getWateringSchedule = (watering: string) => {
    const wateringMap: { [key: string]: number } = {
      'frequent': 3,
      'average': 7,
      'minimum': 14,
      'none': 30,
      'regular': 5
    };
    return wateringMap[watering.toLowerCase()] || 7;
  };

  const loadNextPage = () => {
    setPage(prev => prev + 1);
  };

  const loadPrevPage = () => {
    setPage(prev => Math.max(1, prev - 1));
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading plants from page {page}...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>🌍 Explore Plants</h1>
          <p className="text-muted">Discover plants from API - Page {page}</p>
        </div>
        <div className="text-end">
          <small className="text-success">
            {plants.length} plants on page {page}
          </small>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-4">
        <button 
          className="btn btn-outline-primary"
          onClick={loadPrevPage}
          disabled={page === 1}
        >
          ← Previous
        </button>
        
        <button 
          className="btn btn-outline-primary"
          onClick={loadNextPage}
        >
          Next →
        </button>
      </div>

      <div className="row">
        {plants.map((plant) => (
          <div key={plant.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="text-center mb-3" style={{fontSize: '3rem'}}>
                  🌿 
                </div>
                
                <h5 className="card-title">{plant.common_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  <i>{plant.scientific_name[0]}</i>
                </h6>
                
                <div className="small">
                  <p className="mb-1">
                    <strong>Type:</strong> 
                    <span className={`badge ${plant.cycle === 'Unknown' ? 'bg-secondary' : 'bg-info'} ms-1`}>
                      {plant.cycle}
                    </span>
                  </p>
                  <p className="mb-1">
                    <strong>Watering:</strong> 
                    <span className={`badge ${
                      plant.watering.toLowerCase() === 'frequent' ? 'bg-primary' : 
                      plant.watering.toLowerCase() === 'minimum' ? 'bg-warning' : 'bg-success'
                    } ms-1`}>
                      {plant.watering}
                    </span>
                  </p>
                  <p className="mb-1">
                    <strong>Sunlight:</strong> 
                    <span className="badge bg-light text-dark ms-1">
                      {plant.sunlight.join(', ')}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="card-footer">
                <button 
                  className="btn btn-success w-100"
                  onClick={() => addToMyPlants(plant)}
                >
                  + Add to My Plants
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {plants.length === 0 && !loading && (
        <div className="alert alert-info text-center">
          <h4>No Plants Found</h4>
          <p>Try changing pages or refreshing.</p>
        </div>
      )}
    </div>
  );
}