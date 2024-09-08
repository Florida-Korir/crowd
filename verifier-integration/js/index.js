const path = require("path");
const express = require("express");
const { auth, resolver } = require("@iden3/js-iden3-auth");
const getRawBody = require("raw-body");

const app = express();
const port = 8080;

app.use(express.static("../static"));

app.get("/api/sign-in", (req, res) => {
  console.log("get Auth Request");
  getAuthRequest(req, res);
});

app.post("/api/callback", async (req, res) => {
  console.log("callback");
  await callback(req, res);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Create a map to store the auth requests and their session IDs
const requestMap = new Map();

// GetAuthRequest returns the authentication request
async function getAuthRequest(req, res) {
  const hostUrl = "https://0064-197-237-206-208.ngrok-free.app"; // Replace with your ngrok URL
  const sessionId = 1;
  const callbackURL = "/api/callback";
  const audience = "did:polygonid:polygon:amoy:2qQ68JkRcf3xrHPQPWZei3YeVzHPP58wYNxx2mEouR";
  const redirectUrl = "http://localhost:5173/"; // Replace with your client-side route
  const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}&redirectUrl=${encodeURIComponent(redirectUrl)}`;

  // Generate request for basic authentication
  const request = auth.createAuthorizationRequest("test flow", audience, uri);

  request.id = "7f38a193-0918-4a48-9fac-36adfdb8b542";
  request.thid = "7f38a193-0918-4a48-9fac-36adfdb8b542";

  // Add request for a specific proof
  const proofRequest = {
    "circuitId": "credentialAtomicQuerySigV2",
    "id": 1725712251,
    "query": {
      "allowedIssuers": ["*"],
      "context": "ipfs://QmVPYdiYHAB1ZUc2senpzFqG7wVUPsjxxaPTFXHJQQr7fR",
      "type": "pohcheck",
      "credentialSubject": {
        "human": { "$eq": true }
      }
    }
  };

  const scope = request.body.scope ?? [];
  request.body.scope = [...scope, proofRequest];

  // Store the auth request in the map with session ID
  requestMap.set(`${sessionId}`, request);

  // Send the request back to the client
  return res.status(200).set("Content-Type", "application/json").send(request);
}

// Callback verifies the proof after sign-in
async function callback(req, res) {
  try {
    const sessionId = req.query.sessionId;
    const redirectUrl = 'http://localhost:5173/'; // Get redirect URL from query parameters

    if (!sessionId) {
      return res.status(400).json({ error: "Missing session ID" });
    }

    const raw = await getRawBody(req);
    const tokenStr = raw.toString().trim();
    if (!tokenStr) {
      return res.status(400).json({ error: "Invalid token received." });
    }

    console.log("Received token: ", tokenStr);

    const ethURL = "https://polygon-amoy.infura.io/v3/c059f6d0ff0f4faf81d19fe77bc957b6";
    const contractAddress = "0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124";
    const keyDIR = "../keys";

    const ethStateResolver = new resolver.EthStateResolver(ethURL, contractAddress);
    const resolvers = {
      ["polygon:amoy"]: ethStateResolver,
    };

    const authRequest = requestMap.get(`${sessionId}`);
    if (!authRequest) {
      return res.status(400).json({ error: "Invalid session ID or auth request not found." });
    }

    const verifier = await auth.Verifier.newVerifier({
      stateResolver: resolvers,
      circuitsDir: path.join(__dirname, keyDIR),
      ipfsGatewayURL: "https://ipfs.io",
    });

    const opts = {
      AcceptedStateTransitionDelay: 5 * 60 * 1000, // 5 minutes
    };

    const authResponse = await verifier.fullVerify(tokenStr, authRequest, opts);

    // Send a response that the client can use to perform redirection
    return res.status(200).json({ success: authResponse.success, redirectUrl });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ error: "Verification failed", details: error.message });
  }
}
