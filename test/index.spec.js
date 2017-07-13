import { expect } from 'chai';
import nock from 'nock';
nock.disableNetConnect();

import VeritoneApi from '../index.js';

const noop = () => {};
const apiBaseUrl = 'http://fake.domain';

describe('API methods', function() {
	beforeEach(function() {
		this.api = VeritoneApi({
			token: 'api-token-abc',
			baseUrl: apiBaseUrl
		});
	});

	afterEach(function() {
		nock.cleanAll();
	});

	// xdescribe('Asset');
	// xdescribe('Job');
	// xdescribe('Engine');
	// xdescribe('Task');
	// xdescribe('DropboxWatcher');
	// xdescribe('Faces');
	// xdescribe('Mentions');
	// xdescribe('Widgets');
	// xdescribe('Folder');
	// xdescribe('Collection');
	// xdescribe('Ingestion');
});
