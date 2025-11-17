'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card border-danger shadow">
            <div className="card-body py-5">
              <div style={{ fontSize: '4rem' }}>⚠️</div>
              <h1 className="text-danger mb-3">Something went wrong!</h1>
              <p className="text-muted mb-4">
                Our garden caretaker encountered an issue. Don't worry, 
                it's probably just a temporary bug in the soil.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <button
                  onClick={reset}
                  className="btn btn-success me-md-2"
                >
                  Try Again
                </button>
                <Link href="/" className="btn btn-outline-success">
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}