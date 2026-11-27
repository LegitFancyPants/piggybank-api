const DEVICE_ID_REGEX = /^[a-zA-Z0-9._-]{1,128}$/;

export function requireDeviceId(req, res, next) {
  const rawHeader = req.header("x-device-id");
  const deviceId = typeof rawHeader === "string" ? rawHeader.trim() : "";

  if (!deviceId || !DEVICE_ID_REGEX.test(deviceId)) {
    return res.status(400).json({
      error: "Valid X-Device-Id header is required",
    });
  }

  req.deviceId = deviceId;
  next();
}
