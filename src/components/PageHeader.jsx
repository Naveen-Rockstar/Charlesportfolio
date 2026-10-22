import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PageHeader({ breadcrumb, pageNumber, title, description, onBackToHome }) {
  return (
    <div className="page-editorial-header">
      <div className="container">
        <div className="page-header-meta">
          <button
            type="button"
            className="page-back-link"
            onClick={onBackToHome}
            aria-label="Back to Homepage"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>HOME</span>
          </button>
          <span className="page-meta-sep" aria-hidden="true">/</span>
          <span className="page-breadcrumb-text">{breadcrumb}</span>
          <span className="page-meta-num">{pageNumber}</span>
        </div>

        <div className="page-header-title-box">
          <h1 className="page-main-heading">{title}</h1>
          {description && (
            <p className="page-main-description">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
