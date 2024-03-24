# ocvc*

onchain vibe check*

> _diy vibe generator_

> _vibes in a frame_

> _verifiable supplementary cv material; cv + ocvc = 👍_

---

__Table of Contents__

1. [Demo](#demo)
2. [Overview](#overview)
3. [Motivation](#motivation)
4. [Workflows](#workflows)
5. [Technologies](#technologies)
6. [Roadmap](#roadmap)
7. [Contributors](#contributors)

## Demo

> Developers: To learn how this app was made, please skip to [technologies](#technologies)

Interact with _ocvc*_ using _Warpcast_'s frame validator tool:

https://warpcast.com/~/developers/frames?url=https%3A%2F%2Focvc.vercel.app%2F13642%2Fframe

<img width="482" alt="image" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/b286df2c-9dc1-427e-bbe8-9a014f7e12d8">

## Overview

_ocvc*_ is a data aggregation tool for Farcaster users to generate and share their vibes. Using the tool, users are able to select various "vibe metrics" and then copy a URL that can display these vibes as an Open Frame. OCVC* retrieves its data from Farcaster Hubs and EVM-compatible chains (e.g. Base, Ethereum). Because it supports Open Frames, users can use these generated links and share them on any platform that supports the Open Frames protocol, such as XMTP.

<img width="600" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/002a2c70-2142-4811-9dcb-f0746f67cfb6">

_ocvc frame on Converse_

## Motivation

With the popularity of services like _Bountycaster_ on the rise, we can see a future where onchain work becomes more in-demand. Work comes in many different forms such as ad-hoc collaborative projects between disparate independent entities. ocvc* can help users like this quickly assess each other's "vibes" and streamline the process of collaboration committments.

## Workflows

1. Generating your onchain vibe check
2. Sharing your onchain vibe check!

### Generating Onchain Vibe Check

Users are able to generate their ocvc* as a frame URL.

This workflow involves:

1. **Logging in** using Privy
2. **Selecting** various vibe metrics
3. **Generating** their ocvc

#### Logging in
<img width="600" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/f44148bf-89f7-40d6-a408-2a02cf9b280d">


<img width="600" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/84338ecd-73cf-43b8-887d-187f7fac78b2">

<img width="600" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/62e79c84-5152-4bd4-a88d-ba5ef4ef1da6">

#### Selecting Vibe Metrics

<img width="600" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/0235afbd-e4d6-4d45-b7df-ca03dd95527f">

<img width="600" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/88fb2d73-6695-4633-9093-158b531d6bcf">

<img width="600" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/6b55e22b-d0bf-4e6e-bfc1-84dc0cb94d4f">

<img width="600" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/3ac0d2fc-5bd1-4d42-94fe-09609b0ebaf8">

#### Generating OCVC*

<img width="600" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/44599541-ce90-47c9-b859-79b8b211b70b">

### Sharing

This workflow involves:

1. **Navigating** to their page on ocvc (`https://ocvc.vercel.app/<fid>`)
2. **Clipboarding** the frame URL
3. **Sharing** the URL on Open Frame compatible client

#### Navigating to ocvc page

<img width="600" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/697df791-104a-45df-8fb4-bdd99ab16bdf">

<img width="600" alt="image" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/913db560-9626-4134-bc97-cebf0929f522">

_^ if fc user has not generated yet_

#### Clipboarding the Frame URL

<img width="600" alt="image" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/096d80a7-bfba-4d3c-8de5-326805bec02f">

### Sharing OCVC Frame URL

<img width="600" src="https://github.com/eucalyptus-viminalis/ocvc/assets/65995595/002a2c70-2142-4811-9dcb-f0746f67cfb6">



## Technologies

- `Privy`: Privy is a super easy user account solution that is fully customizable with Web2 or Web3 login methods
  - usage: Privy is used to login the user. The user must be logged in with Privy to generate their vibe checks as their Farcaster data is essential for vibe metric retrieval
  - website: [Privy](https://docs.privy.io)
- `Karma3Labs`: Karma3Labs exposes APIs that aggregate social reputation data for use by other developers
  - usage: Karma3Labs is used to fetch Farcaster reputation scores for the user's "Status" vibe metric (please see `src/app/generate/status`)
  - website: [Karma3Labs](https://docs.karma3labs.com/farcaster)
- `Neynar`: Neynar is a developer-friendly API service for Farcaster data
  - usage: Neynar, together with their nodejs-sdk, is being used to easily retrieve a Farcaster's user's data such as their verified Ethereum addresses (please see `src/app/generate/*`)
  - website: [Neynar](https://docs.neynar.com)
- `Airstack`: Airstack is a data service for decentralized social and blockchain data
  - usage: Airstack was used to query for Farcaster's user's blockchain data such as their latest token transfers on Base (please see `src/app/generate/status` + `src/app/generate/taste`)
  - website: [Airstack](https://docs.airstack.xyz)
- `frames.js`: frames.js is an open source Typescript library to integrate Frames into various JS frameworks
  - usage: frames.js is used to quickly generate metadata that is in compliance with the Open Frames specs (please see: `src/app/[fid]/<endpoint>/image/route.tsx`)
  - website: [frames.js](https://docs.karma3labs.com/farcaster)
- `@vercel/og`: This Typescript library exposes a convenience method to generate a valid OpenGraph image using JSX elements. It uses `satori` under the hoood.
  - usage: `ImageResponse` is used for generating all OpenGraph images for interframe. See: `src/app/[fid]/<endpoint>/image/route.tsx`
  - website: [Vercel OG](https://vercel.com/docs/functions/og-image-generation)
- `Open Frame`: Open Frame(s) are an extension of the OpenGraph protocol to generate interactive content within various clients that support them.
  - usage: The API routes return a valid response that adheres to the Open Frames spec
  - website: [Open Frames spec](https://github.com/open-frames/standard/blob/v0.0.1/README.md)

## Roadmap

- ocvc(s) as downloadable PDFs
- render the ocvc on the website
- more vibey vibe metrics (Supporters
- more actionable Frame buttons

## Contributors

- 3070 ([Warpcast Profile](https://warpcast.com/3070)): design, code
- Oladipo ([Warpcast Profile](https://warpcast.com/oladipoyuusuf)): slides, video, copy

---

> note: despite the name, nothing is being saved onchain; ocvc* is merely aggregating (sufficiently-)onchain vibe metrics from fc and the superchain. ocvc(s) as EAS would be nice though...

