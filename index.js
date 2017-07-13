'use strict';

import veritoneApi from './apis/helper/ApiClient';
import apis from './apis';
import legacyApis from './apis/legacy_deleteme'

export default function ApiClient(options) {
	return veritoneApi(options, apis, legacyApis)
}

