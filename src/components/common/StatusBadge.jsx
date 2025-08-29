import React from 'react';

const statusStyles = {
  // Booking & General
  'Confirmed': { bg: 'success-subtle', text: 'success-emphasis' },
  'Active': { bg: 'success-subtle', text: 'success-emphasis' },
  'Pending': { bg: 'warning-subtle', text: 'warning-emphasis' },
  'Trial': { bg: 'warning-subtle', text: 'warning-emphasis' },
  'Cancelled': { bg: 'danger-subtle', text: 'danger-emphasis' },
  'Inactive': { bg: 'danger-subtle', text: 'danger-emphasis' },
  'Expired': { bg: 'danger-subtle', text: 'danger-emphasis' },
  'Maintenance': {bg: 'secondary-subtle', text: 'secondary-emphasis'},
  // Default
  default: { bg: 'secondary-subtle', text: 'secondary-emphasis' }
};

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.default;
  return (
    <span className={`badge ${style.bg ? `bg-${style.bg}` : ''} ${style.text ? `text-${style.text}`: ''}`}>
      {status}
    </span>
  );
}
