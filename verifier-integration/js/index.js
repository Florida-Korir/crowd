const path = require("path");
const express = require("express");
const { auth, resolver, protocol } = require("@iden3/js-iden3-auth");
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
  // Audience is verifier id
  const hostUrl = "https://b883-196-207-172-168.ngrok-free.app";
  const sessionId = 1;
  const callbackURL = "/api/callback";
  const audience =
    "did:polygonid:polygon:amoy:2qQ68JkRcf3xrHPQPWZei3YeVzHPP58wYNxx2mEouR";

  const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

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
        "human": {
          "$eq": true
        }
      }
    }
  };

  // Add proofRequest to the request's body scope
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
    // Get session ID from request query parameters
    const sessionId = req.query.sessionId;

    if (!sessionId) {
      return res.status(400).json({ error: "Missing session ID" });
    }

    // Get JWZ token from the POST request body
    const raw = await getRawBody(req);
    const tokenStr = raw.toString().trim();

    if (!tokenStr) {
      return res.status(400).json({ error: "Invalid token received." });
    }

    console.log("Received token: ", tokenStr);

    const ethURL = "https://polygon-amoy.infura.io/v3/c059f6d0ff0f4faf81d19fe77bc957b6";
    const contractAddress = "0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124";
    const keyDIR = "../keys";

    // Create the EthStateResolver for Polygon network
    const ethStateResolver = new resolver.EthStateResolver(ethURL, contractAddress);

    // Setup resolvers with the ethStateResolver
    const resolvers = {
      ["polygon:amoy"]: ethStateResolver,
    };

    // Fetch the authRequest from the session ID
    const authRequest = requestMap.get(`${sessionId}`);

    if (!authRequest) {
      return res.status(400).json({ error: "Invalid session ID or auth request not found." });
    }

    // Initialize Verifier
    const verifier = await auth.Verifier.newVerifier({
      stateResolver: resolvers,
      circuitsDir: path.join(__dirname, keyDIR),
      ipfsGatewayURL: "https://ipfs.io",
    });

    // Verification options
    const opts = {
      AcceptedStateTransitionDelay: 5 * 60 * 1000, // 5 minutes
    };

    // Execute full verification
    const authResponse = await verifier.fullVerify(tokenStr, authRequest, opts);

    // Define the redirect URL
    const redirectUrl = "https://example.com/success"; // Change this to your desired URL

    // Redirect upon successful verification
    return res.redirect(302, redirectUrl);
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ error: "Verification failed", details: error.message });
  }
}
