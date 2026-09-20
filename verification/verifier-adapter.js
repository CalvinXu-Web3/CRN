/* Production boundary: adapters must return real platform fields or DATA_UNAVAILABLE. */
export class SocialVerifier {
  async verify() {
    return { verificationStatus: "DATA_UNAVAILABLE", verificationMethod: "NOT_CONFIGURED", capturedAt: null, platform: null, postId: null, authorId: null, metric: null, value: null };
  }
}
