// packages/ui/src/components/LoadingError.tsx

import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: 'error' | 'warning' | 'info';
}

export interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
  action?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
  style?: React.CSSProperties;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = '#3b82f6',
  className = '',
  style,
}) => {
  const sizeMap = {
    small: { width: '20px', height: '20px', borderWidth: '2px' },
    medium: { width: '40px', height: '40px', borderWidth: '4px' },
    large: { width: '60px', height: '60px', borderWidth: '6px' },
  };

  const dimensions = sizeMap[size];

  const spinnerStyle: React.CSSProperties = {
    ...dimensions,
    border: `${dimensions.borderWidth} solid #f3f4f6`,
    borderTop: `${dimensions.borderWidth} solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    ...style,
  };

  return (
    <div className={`loading-spinner ${className}`}>
      <div style={spinnerStyle} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export const LoadingCard: React.FC<{
  title?: string;
  message?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({
  title = "Loading Weather Data",
  message = "Please wait while we fetch the latest weather information...",
  className = '',
  style,
}) => {
  return (
    <div className={`loading-card ${className}`} style={style}>
      <div className="loading-content">
        <LoadingSpinner size="large" />
        <h3 className="loading-title">{title}</h3>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  message,
  onRetry,
  retryText = "Try Again",
  className = '',
  style,
  type = 'error',
}) => {
  const typeIcons = {
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  const typeColors = {
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  };

  return (
    <div 
      className={`error-message ${type} ${className}`} 
      style={{ borderColor: typeColors[type], ...style }}
    >
      <div className="error-icon">
        {typeIcons[type]}
      </div>
      
      <div className="error-content">
        {title && <h3 className="error-title">{title}</h3>}
        <p className="error-text">{message}</p>
        
        {onRetry && (
          <button 
            className="retry-button"
            onClick={onRetry}
            style={{ backgroundColor: typeColors[type] }}
          >
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
};

export const ErrorCard: React.FC<ErrorMessageProps & {
  showIcon?: boolean;
}> = ({
  title = "Something went wrong",
  message,
  onRetry,
  retryText = "Try Again",
  className = '',
  style,
  type = 'error',
  showIcon = true,
}) => {
  return (
    <div className={`error-card ${className}`} style={style}>
      <div className="error-card-content">
        {showIcon && (
          <div className="error-card-icon">
            🌧️
          </div>
        )}
        
        <div className="error-card-text">
          <h3 className="error-card-title">{title}</h3>
          <p className="error-card-message">{message}</p>
        </div>
        
        {onRetry && (
          <div className="error-card-actions">
            <button 
              className="error-card-retry"
              onClick={onRetry}
            >
              {retryText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '🌤️',
  title,
  message,
  action,
  className = '',
  style,
}) => {
  return (
    <div className={`empty-state ${className}`} style={style}>
      <div className="empty-state-content">
        <div className="empty-state-icon">
          {icon}
        </div>
        
        <h3 className="empty-state-title">{title}</h3>
        <p className="empty-state-message">{message}</p>
        
        {action && (
          <button 
            className="empty-state-action"
            onClick={action.onClick}
          >
            {action.text}
          </button>
        )}
      </div>
    </div>
  );
};

export const SkeletonLoader: React.FC<{
  type: 'card' | 'forecast' | 'search';
  className?: string;
  style?: React.CSSProperties;
}> = ({ type, className = '', style }) => {
  const renderCardSkeleton = () => (
    <div className="skeleton-card">
      <div className="skeleton-header">
        <div className="skeleton-line skeleton-title"></div>
      </div>
      <div className="skeleton-main">
        <div className="skeleton-icon"></div>
        <div className="skeleton-temp-info">
          <div className="skeleton-line skeleton-temp"></div>
          <div className="skeleton-line skeleton-condition"></div>
          <div className="skeleton-line skeleton-feels-like"></div>
        </div>
      </div>
      <div className="skeleton-details">
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton-detail-row">
            <div className="skeleton-line skeleton-detail"></div>
            <div className="skeleton-line skeleton-detail"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderForecastSkeleton = () => (
    <div className="skeleton-forecast">
      <div className="skeleton-line skeleton-forecast-title"></div>
      <div className="skeleton-forecast-items">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="skeleton-forecast-item">
            <div className="skeleton-line skeleton-day"></div>
            <div className="skeleton-icon skeleton-small"></div>
            <div className="skeleton-line skeleton-temp"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSearchSkeleton = () => (
    <div className="skeleton-search">
      <div className="skeleton-search-input"></div>
      <div className="skeleton-search-suggestions">
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton-suggestion">
            <div className="skeleton-line skeleton-suggestion-name"></div>
            <div className="skeleton-line skeleton-suggestion-country"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const skeletonContent = {
    card: renderCardSkeleton(),
    forecast: renderForecastSkeleton(),
    search: renderSearchSkeleton(),
  };

  return (
    <div className={`skeleton-loader ${className}`} style={style}>
      {skeletonContent[type]}
      
      <style>{`
        .skeleton-loader {
          animation: skeleton-pulse 1.5s ease-in-out infinite;
        }
        
        .skeleton-line,
        .skeleton-icon,
        .skeleton-search-input {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.5s ease-in-out infinite;
        }
        
        .skeleton-shimmer {
          animation: skeleton-shimmer 1.5s ease-in-out infinite;
        }
        
        @keyframes skeleton-pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        @keyframes skeleton-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
};