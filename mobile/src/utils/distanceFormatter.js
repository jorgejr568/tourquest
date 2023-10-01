const KM_DECIMAL_PLACES = 2;

export default function distanceFormatter(meters) {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }

  return `${(meters / 1000).toFixed(KM_DECIMAL_PLACES)}km`;
}
