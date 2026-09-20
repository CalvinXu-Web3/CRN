/* The frontend never signs or fabricates EIP-712 verifier attestations. */
export function buildAttestationRequest() {
  throw new Error("No verifier attestation service is configured.");
}
