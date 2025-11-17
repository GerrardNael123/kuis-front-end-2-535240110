import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body text-center">
              <h1 className="card-title">🌿 Plant Care Tracker</h1>
              <p className="card-text">
                <strong>Nama:</strong> Gerrard Nathannael <br />
                <strong>NIM:</strong> 535240110 <br />
                <strong>Topik:</strong> Aplikasi pelacak perawatan tanaman hias
              </p>
              
              <div className="row mt-4">
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">📝 My Plants</h5>
                      <p className="card-text">Kelola koleksi tanaman hias Anda</p>
                      <Link href="/plants" className="btn btn-success">
                        Lihat Tanaman
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">➕ Add Plant</h5>
                      <p className="card-text">Tambah tanaman baru ke koleksi</p>
                      <Link href="/add-plant" className="btn btn-primary">
                        Tambah Tanaman
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">💧 Care Schedule</h5>
                      <p className="card-text">Lihat jadwal perawatan</p>
                      <button className="btn btn-info" disabled>
                        Coming Soon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}