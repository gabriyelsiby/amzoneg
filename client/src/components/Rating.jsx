import React from 'react';
export default function Rating({ value = 0 }) {
return <div className="text-yellow-500">{'★'.repeat(Math.round(value))}{'☆'.repeat(5 - Math.round(value))}</div>;
}

