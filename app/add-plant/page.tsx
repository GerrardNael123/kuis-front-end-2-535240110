'use client';

import { useState } from 'react';
import { Plant } from '@/types/plant';
import { useRouter } from 'next/navigation';

export default function AddPlantPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    lastWatered: new Date().toISOString().split('T')[0],
    wateringSchedule: 7,
    careNotes: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPlant: Plant = {
      id: Date.now().toString(),
      ...formData,
      careNotes: formData.careNotes.filter(note => note.trim() !== ''),
    };

    // save ke localStorage
    const existingPlants = JSON.parse(localStorage.getItem('plants') || '[]');
    const updatedPlants = [...existingPlants, newPlant];
    localStorage.setItem('plants', JSON.stringify(updatedPlants));

    router.push('/plants');
    
    setTimeout(() => {
      window.dispatchEvent(new Event('storage'));
    }, 100);
  };

  const addCareNote = () => {
    setFormData({
      ...formData,
      careNotes: [...formData.careNotes, ''],
    });
  };

  const updateCareNote = (index: number, value: string) => {
    const updatedNotes = [...formData.careNotes];
    updatedNotes[index] = value;
    setFormData({ ...formData, careNotes: updatedNotes });
  };

  const removeCareNote = (index: number) => {
    const updatedNotes = formData.careNotes.filter((_, i) => i !== index);
    setFormData({ ...formData, careNotes: updatedNotes });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">➕ Add New Plant</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Plant Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="type" className="form-label">Plant Type</label>
                  <select
                    className="form-select"
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  >
                    <option value="">Pilih jenis tanaman</option>
                    <option value="Monstera">Monstera</option>
                    <option value="Lidah Mertua">Lidah Mertua</option>
                    <option value="Succulent">Succulent</option>
                    <option value="Anggrek">Anggrek</option>
                    <option value="Peace Lily">Peace Lily</option>
                    <option value="Pothos">Pothos</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="lastWatered" className="form-label">Last Watered Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="lastWatered"
                    value={formData.lastWatered}
                    onChange={(e) => setFormData({ ...formData, lastWatered: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="wateringSchedule" className="form-label">
                    Watering Schedule (every X days)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="wateringSchedule"
                    min="1"
                    max="30"
                    value={formData.wateringSchedule}
                    onChange={(e) => setFormData({ ...formData, wateringSchedule: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Care Notes</label>
                  {formData.careNotes.map((note, index) => (
                    <div key={index} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Care note ${index + 1}`}
                        value={note}
                        onChange={(e) => updateCareNote(index, e.target.value)}
                      />
                      {formData.careNotes.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeCareNote(index)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={addCareNote}
                  >
                    + Add Care Note
                  </button>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-md-2"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Add Plant
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}