define(['views/testView'], function (testView) {
    describe('description of spec', function () {
		describe('given some simple setup', function () {
			it('view should exist', function () {
				expect(testView).not.toBeNull();
			});
		});
    });
});