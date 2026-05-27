local ____lualib = require("lualib_bundle")
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local ____exports = {}
---
-- @noSelfInFile *
____exports.ApiVersion = ApiVersion or ({})
____exports.ApiVersion.v1_8 = 0
____exports.ApiVersion[____exports.ApiVersion.v1_8] = "v1_8"
____exports.ApiVersion.v1_9 = 1
____exports.ApiVersion[____exports.ApiVersion.v1_9] = "v1_9"
function ____exports.getApi()
    if __TS__StringStartsWith(
        Version(),
        "1.8"
    ) then
        return {____exports.ApiVersion.v1_8, _G}
    elseif __TS__StringStartsWith(
        Version(),
        "1.9"
    ) then
        return {____exports.ApiVersion.v1_9, _G}
    else
        error("Unknown API version", 0)
    end
end
return ____exports
