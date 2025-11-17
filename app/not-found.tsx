import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card shadow">
            <div className="card-body py-5">
              <div style={{ fontSize: '4rem' }}>🌱</div>
              <h1 className="display-4 text-muted">404</h1>
              <h2 className="mb-4">Plant Not Found</h2>
              <p className="text-muted mb-4">
                Oops! The plant you're looking for has wandered off... 
                or maybe it was never planted here.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Link href="/" className="btn btn-success me-md-2">
                  ← Back to Home
                </Link>
                <Link href="/plants" className="btn btn-outline-success">
                  View My Plants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}