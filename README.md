# CRN — Case & Recovery Network

First-phase static H5 for Web3 investigation, on-chain evidence and investor recovery.

- Open `index.html` directly for the local interface. A local HTTP server is recommended for clipboard, generated QR previews and native-share support.
- Replace only the clearly labeled demo/pending fields in `assets/js/data.js` after source review.
- The app starts in `CORE` mode: sharing remains on, while bounty, wallet claims, verification and production uploads remain off.
- The interface defaults to Simplified Chinese and includes a persistent `中文 / EN` switch. Presentation text lives in `assets/js/i18n.js`; case records in `assets/js/data.js` remain source-labelled rather than translated as new facts.
- The phase-two contract reference is in `contracts/BountyPool.sol`; do not deploy it or fund it without tests and an independent security audit.
1111111