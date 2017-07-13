import { expect } from 'chai';
import nock from 'nock';
nock.disableNetConnect();

import veritoneApi from './ApiClient';

const apiBaseUrl = 'http://fake.domain';

describe('veritoneApi', function() {
	describe('veritoneApi constructor', function() {
		it('throws if no token is configured', function() {
			expect(() => veritoneApi({})).to.throw();
			expect(() => veritoneApi({})).to.throw();
			expect(() => veritoneApi({ token: 'testToken' })).not.to.throw();
		});
	});

	describe('API methods', function() {
		it('Returns the configured API functions', function() {
			const api = veritoneApi(
				{
					token: 'api-token-abc'
				},
				{
					libraries: {
						getLibrary: () => 'ok'
					}
				}
			);

			expect(typeof api.libraries.getLibrary).to.equal('function');
		});

		it('should wrap handlers to make an API call with options', function(done) {
			const testToken = 'api-token-abc';
			const api = veritoneApi(
				{
					token: testToken,
					baseUrl: apiBaseUrl,
					maxRetries: 2,
					retryIntervalMs: 25,
					version: 11
				},
				{
					libraries: {
						getLibrary: () => ({
							method: 'get',
							path: '/test-path'
						})
					}
				}
			);

			const scope = nock(`${apiBaseUrl}`, {
				reqheaders: {
					authorization: `Bearer ${testToken}`
				}
			})
				.get(/v11\/test-path/)
				.reply(404, 'not found')
				.get(/v11\/test-path/)
				.reply(200, 'ok');

			api.libraries.getLibrary((err, res) => {
				expect(err).to.equal(null);
				expect(res.data).to.equal('ok');

				scope.done();
				done();
			});
		});
	});
});