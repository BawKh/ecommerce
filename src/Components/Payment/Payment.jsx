import { Link, Outlet, useLocation } from 'react-router-dom';
// ...other imports...

export default function Payment() {
  // ...your existing code...
  const location = useLocation();

  return (
    <>
      <div className="w-50 m-auto p-3 border-secondary border rounded-3 my-5">
        <h2>Payment Page</h2>

        <ul className="nav nav-tabs d-flex justify-content-center" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <Link
              to={'cash'}
              className={`nav-link${location.pathname.endsWith('/cash') ? ' active' : ''}`}
              type="button"
              role="tab"
            >
              Cash order
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              to={'online'}
              className={`nav-link${location.pathname.endsWith('/online') ? ' active' : ''}`}
              type="button"
              role="tab"
            >
              Online order
            </Link>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" role="tabpanel">
            { location.pathname.endsWith('/online') || location.pathname.endsWith('/cash') ? 
              <Outlet /> : 
              <div className="text-center my-5">
                <h4>Please select a payment method</h4>
              </div>
             }
          </div>
        </div>
      </div>
    </>
  );
}