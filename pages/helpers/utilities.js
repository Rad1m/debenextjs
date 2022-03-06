// helper utilities

export function ellipseAddress(address, width) {
  const concatAddress = address.slice(0, width) + "..." + address.slice(-width);
  return concatAddress;
}
