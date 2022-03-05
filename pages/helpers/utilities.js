export function ellipseAddress(address, width) {
  const concatAddress = address.slice(0, width) + "..." + address.slice(-width);
  console.log("Loggin address %s", concatAddress);
  return concatAddress;
}
