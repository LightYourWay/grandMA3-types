/** @noSelfInFile **/

enum ApiVersion {
    v1_8,
    v1_9
}

function getApi(): [ApiVersion.v1_8, MA3_v1_8] | [ApiVersion.v1_9, MA3_v1_9] {
    if (Version().startsWith('1.8')) {
        return [ApiVersion.v1_8, _G as any];
    }
    else if (Version().startsWith('1.9')) {
        return [ApiVersion.v1_9, _G as any];
    } else {
        throw "Unknown API version";
    }
}