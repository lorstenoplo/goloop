export default function truncate(str: string | undefined, n: number) {
  if (str) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }
}
