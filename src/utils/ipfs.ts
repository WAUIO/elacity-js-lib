const ipfsGateway =
  process.env.REACT_APP_IPFS_GATEWAY || "https://ipfs.ela.city";

/**
 * Prefix a path with a full IPFS URL link
 *
 * @param path
 * @returns
 */
export const ipfsLink = (path: string) => {
  if (path.startsWith("data:image/")) {
    return path;
  }

  // eslint-disable-next-line max-len
  return `${ipfsGateway || "https://gateway.pinata.cloud"}/${
    (path || "").match(/^\//gi) ? (path || "").substring(1) : path
  }`;
};

/**
 * Replace if necessary, pinata gateway to have internal one
 *
 * @param link
 * @returns
 */
export const toIpfsGateway = (link: string) => {
  if (!ipfsGateway) {
    return link;
  }

  if (link?.match("https://gateway.pinata.cloud")) {
    // replace with custom gateway
    return link.replace("https://gateway.pinata.cloud", ipfsGateway);
  }

  if (link?.match("ipfs://")) {
    // replace with custom gateway
    return link.replace("ipfs://", `${ipfsGateway}/ipfs/`);
  }

  return link;
};

/**
 * Dynamically transform a link to an internal IPFS link
 *
 * @param path
 * @returns
 */
export const ipfsLinkFor = (path: string) => {
  if (!path) {
    return path;
  }

  if (path.startsWith("data:image/")) {
    return path;
  }

  if (path.startsWith("/static")) {
    return path;
  }

  if (path.startsWith("https")) {
    return toIpfsGateway(path);
  }

  if (path.startsWith("/ipfs/")) {
    return ipfsLink(path);
  }

  return ipfsLink(`/ipfs/${path}`);
};
