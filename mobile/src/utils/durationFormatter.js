export default function durationFormatter(seconds) {
  if (seconds < 60) {
    return "menos de 1 minuto";
  }

  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${pluralize(minutes, "minuto", "minutos")}`;
  }

  return "mais de 1 hora";
}

const pluralize = (count, singular, plural) => {
  if (count === 1) {
    return singular;
  }

  return plural;
};
