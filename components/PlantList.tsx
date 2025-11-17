'use client';

import { useState, useEffect } from 'react';
import { Plant } from '@/types/plant';
import Link from 'next/link';

export default function PlantList() {
  const [plants, setPlants] = useState<Plant[]>([]);

  // localStorage
  const loadPlants = () => {
    const savedPlants = localStorage.getItem('plants');
    if (savedPlants) {
      setPlants(JSON.parse(savedPlants));
    }
  };

  useEffect(() => {
    loadPlants();

    const handleStorageUpdate = () => {
      loadPlants();
    };

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('plantsUpdated', handleStorageUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('plantsUpdated', handleStorageUpdate);
    };
  }, []);

  const deletePlant = (id: string) => {
    const updatedPlants = plants.filter(plant => plant.id !== id);
    setPlants(updatedPlants);
    localStorage.setItem('plants', JSON.stringify(updatedPlants));
  };

  const waterPlant = (id: string) => {
    const updatedPlants = plants.map(plant => 
      plant.id === id 
        ? { ...plant, lastWatered: new Date().toISOString().split('T')[0] }
        : plant
    );
    setPlants(updatedPlants);
    localStorage.setItem('plants', JSON.stringify(updatedPlants));
  };

  const getNextWatering = (plant: Plant) => {
    const lastWatered = new Date(plant.lastWatered);
    const nextWatering = new Date(lastWatered);
    nextWatering.setDate(lastWatered.getDate() + plant.wateringSchedule);
    return nextWatering.toISOString().split('T')[0];
  };

  if (plants.length === 0) {
    return (
      <div className="alert alert-info text-center">
        <h4>Belum ada tanaman 🌱</h4>
        <p>Tambahkan tanaman pertama Anda untuk mulai tracking!</p>
        <Link href="/add-plant" className="btn btn-success">
          Tambah Tanaman Pertama
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Plants ({plants.length})</h2>
        <Link href="/add-plant" className="btn btn-primary">
          + Add New Plant
        </Link>
      </div>

      <div className="row">
        {plants.map((plant) => (
          <div key={plant.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{plant.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{plant.type}</h6>
                
                <div className="plant-info">
                  <p className="mb-1">
                    <small>💧 Terakhir disiram: {plant.lastWatered}</small>
                  </p>
                  <p className="mb-1">
                    <small>📅 Jadwal: {plant.wateringSchedule} hari sekali</small>
                  </p>
                  <p className="mb-2">
                    <small>⏰ Next: {getNextWatering(plant)}</small>
                  </p>
                </div>

                {plant.careNotes.length > 0 && (
                  <div className="care-notes">
                    <strong>Catatan:</strong>
                    <ul className="small">
                      {plant.careNotes.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="card-footer">
                <div className="btn-group w-100" role="group">
                  <Link 
                    href={`/plants/${plant.id}`} 
                    className="btn btn-outline-primary btn-sm"
                  >
                    Detail
                  </Link>
                  <button 
                    onClick={() => waterPlant(plant.id)}
                    className="btn btn-outline-success btn-sm"
                  >
                    Water
                  </button>
                  <button 
                    onClick={() => deletePlant(plant.id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}