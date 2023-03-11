export const safeJson = (data: any) => {
  return JSON.parse(JSON.stringify(data));
}

export const formatDate = (date: any) => {
  const d = new Date(date);
  const month = d.toLocaleString('default', { month: 'long' });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}