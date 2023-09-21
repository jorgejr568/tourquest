export default function firstName(name) {
  const firstWord = name?.split(" ")?.shift();

  return `${firstWord?.charAt(0)?.toUpperCase()}${firstWord?.slice(1)}`;
}
