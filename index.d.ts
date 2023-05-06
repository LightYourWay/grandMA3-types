/** @noSelfInFile **/

import './typings'

declare enum ApiVersion {
    v1_8 = 0,
    v1_9 = 1
}

declare function getApi(): [ApiVersion.v1_8, MA3_v1_8] | [ApiVersion.v1_9, MA3_v1_9];
