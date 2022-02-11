const forzaTypes = [
    { type: "s32", key: "isRaceOn" },
    { type: "u32", key: "timestampMs" },
    { type: "f32", key: "engineMaxRpm" },
    { type: "f32", key: "engineIdleRpm" },
    { type: "f32", key: "currentEngineRpm" },
    { type: "f32", key: "accelerationX" },
    { type: "f32", key: "accelerationY" },
    { type: "f32", key: "accelerationZ" },
    { type: "f32", key: "velocityX" },
    { type: "f32", key: "velocityY" },
    { type: "f32", key: "velocityZ" },
    { type: "f32", key: "angularVelocityX" },
    { type: "f32", key: "angularVelocityY" },
    { type: "f32", key: "angularVelocityZ" },
    { type: "f32", key: "yaw" },
    { type: "f32", key: "pitch" },
    { type: "f32", key: "roll" },
    { type: "f32", key: "normalizedSuspensionTravelFrontLeft" },
    { type: "f32", key: "normalizedSuspensionTravelFrontRight" },
    { type: "f32", key: "normalizedSuspensionTravelRearLeft" },
    { type: "f32", key: "normalizedSuspensionTravelRearRight" },
    { type: "f32", key: "tireSlipRatioFrontLeft" },
    { type: "f32", key: "tireSlipRatioFrontRight" },
    { type: "f32", key: "tireSlipRatioRearLeft" },
    { type: "f32", key: "tireSlipRatioRearRight" },
    { type: "f32", key: "wheelRotationSpeedFrontLeft" },
    { type: "f32", key: "wheelRotationSpeedFrontRight" },
    { type: "f32", key: "wheelRotationSpeedRearLeft" },
    { type: "f32", key: "wheelRotationSpeedRearRight" },
    { type: "s32", key: "wheelOnRumbleStripFrontLeft" },
    { type: "s32", key: "wheelOnRumbleStripFrontRight" },
    { type: "s32", key: "wheelOnRumbleStripRearLeft" },
    { type: "s32", key: "wheelOnRumbleStripRearRight" },
    { type: "f32", key: "wheelInPuddleDepthFrontLeft" },
    { type: "f32", key: "wheelInPuddleDepthFrontRight" },
    { type: "f32", key: "wheelInPuddleDepthRearLeft" },
    { type: "f32", key: "wheelInPuddleDepthRearRight" },
    { type: "f32", key: "surfaceRumbleFrontLeft" },
    { type: "f32", key: "surfaceRumbleFrontRight" },
    { type: "f32", key: "surfaceRumbleRearLeft" },
    { type: "f32", key: "surfaceRumbleRearRight" },
    { type: "f32", key: "tireSlipAngleFrontLeft" },
    { type: "f32", key: "tireSlipAngleFrontRight" },
    { type: "f32", key: "tireSlipAngleRearLeft" },
    { type: "f32", key: "tireSlipAngleRearRight" },
    { type: "f32", key: "tireCombinedSlipFrontLeft" },
    { type: "f32", key: "tireCombinedSlipFrontRight" },
    { type: "f32", key: "tireCombinedSlipRearLeft" },
    { type: "f32", key: "tireCombinedSlipRearRight" },
    { type: "f32", key: "suspensionTravelMetersFrontLeft" },
    { type: "f32", key: "suspensionTravelMetersFrontRight" },
    { type: "f32", key: "suspensionTravelMetersRearLeft" },
    { type: "f32", key: "suspensionTravelMetersRearRight" },
    { type: "s32", key: "carOrdinal" },
    { type: "s32", key: "carClass" },
    { type: "s32", key: "carPerformanceIndex" },
    { type: "s32", key: "drivetrainType" },
    { type: "s32", key: "numCylinders" },
    { type: "s32", key: "carType" },
    { type: "s32", key: "unknown1" },
    { type: "s32", key: "unknown2" },
    { type: "f32", key: "positionX" },
    { type: "f32", key: "positionY" },
    { type: "f32", key: "positionZ" },
    { type: "f32", key: "speed" },
    { type: "f32", key: "power" },
    { type: "f32", key: "torque" },
    { type: "f32", key: "tireTempFrontLeft" },
    { type: "f32", key: "tireTempFrontRight" },
    { type: "f32", key: "tireTempRearLeft" },
    { type: "f32", key: "tireTempRearRight" },
    { type: "f32", key: "boost" },
    { type: "f32", key: "fuel" },
    { type: "f32", key: "distanceTraveled" },
    { type: "f32", key: "bestLap" },
    { type: "f32", key: "lastLap" },
    { type: "f32", key: "currentLap" },
    { type: "f32", key: "currentRaceTime" },
    { type: "u16", key: "lapNumber" },
    { type: "u8", key: "racePosition" },
    { type: "u8", key: "accel" },
    { type: "u8", key: "brake" },
    { type: "u8", key: "clutch" },
    { type: "u8", key: "handBrake" },
    { type: "u8", key: "gear" },
    { type: "s8", key: "steer" },
    { type: "s8", key: "normalizedDrivingLine" },
    { type: "s8", key: "normalizedAIBrakeDifference" }
]

export function decode(message) {
    const data = new Map()

    let offset = 0
    for (let i = 0; i < forzaTypes.length; i++) {
        const { type, key } = forzaTypes[i];

        if (type === 's32') {
            data.set(key, message.readInt32LE(offset))
            offset += 4
        }
        if (type === 'u32') {
            data.set(key, message.readUInt32LE(offset))
            offset += 4
        }
        if (type === 'f32') {
            data.set(key, message.readFloatLE(offset))
            offset += 4
        }
        if (type === 'u16') {
            data.set(key, message.readUInt16LE(offset))
            offset += 2
        }
        if (type === 'u8') {
            data.set(key, message.readUInt8(offset))
            offset += 1
        }
        if (type === 's8') {
            data.set(key, message.readInt8(offset))
            offset += 1
        }
    }

    return Object.fromEntries(data)
}