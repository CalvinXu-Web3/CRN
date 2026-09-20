/* Rewards must be calculated server-side from verified, versioned inputs. */
export function calculateImpact() {
  throw new Error("Impact scoring is unavailable until a production verification service is configured.");
}
