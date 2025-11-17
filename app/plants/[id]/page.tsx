'use client';

import { useState, useEffect } from 'react';
import { Plant } from '@/types/plant';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PlantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [plant, setPlant] = useState<Plant | null>(null);

  useEffect(() => {
    const plants = JSON.parse(localStorage.getItem('plants') || '[]');
    const foundPlant = plants.find((p: Plant) => p.id === params.id);
    setPlant(foundPlant);
  }, [params.id]);

  if (!plant) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          Plant not found
        </div>
        <Link href="/plants" className="btn btn-primary">
          Back to Plants
        </Link>
      </div>
    );
  }

  const getNextWatering = (plant: Plant) => {
    const lastWatered = new Date(plant.lastWatered);
    const nextWatering = new Date(lastWatered);
    nextWatering.setDate(lastWatered.getDate() + plant.wateringSchedule);
    return nextWatering.toISOString().split('T')[0];
  };

  const waterPlant = () => {
    const plants = JSON.parse(localStorage.getItem('plants') || '[]');
    const updatedPlants = plants.map((p: Plant) =>
      p.id === plant.id
        ? { ...p, lastWatered: new Date().toISOString().split('T')[0] }
        : p
    );
    localStorage.setItem('plants', JSON.stringify(updatedPlants));
    setPlant({ ...plant, lastWatered: new Date().toISOString().split('T')[0] });
    alert('Plant watered! 💧');
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2 className="mb-0">🌿 {plant.name}</h2>
              <button 
                onClick={() => router.back()}
                className="btn btn-outline-secondary btn-sm"
              >
                ← Back
              </button>
            </div>
            
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h5>Plant Information</h5>
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <th>Name:</th>
                        <td>{plant.name}</td>
                      </tr>
                      <tr>
                        <th>Type:</th>
                        <td>{plant.type}</td>
                      </tr>
                      <tr>
                        <th>Last Watered:</th>
                        <td>{plant.lastWatered}</td>
                      </tr>
                      <tr>
                        <th>Watering Schedule:</th>
                        <td>Every {plant.wateringSchedule} days</td>
                      </tr>
                      <tr>
                        <th>Next Watering:</th>
                        <td>{getNextWatering(plant)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="col-md-6">
                  <h5>Care Notes</h5>
                  {plant.careNotes.length > 0 ? (
                    <ul className="list-group">
                      {plant.careNotes.map((note, index) => (
                        <li key={index} className="list-group-item">
                          {note}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No care notes added</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <button 
                  onClick={waterPlant}
                  className="btn btn-success me-2"
                >
                  💧 Water Plant Now
                </button>
                <Link href="/plants" className="btn btn-primary">
                  View All Plants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}